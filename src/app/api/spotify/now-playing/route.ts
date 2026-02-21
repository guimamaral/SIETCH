import { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/security';

const TOKEN_ENDPOINT    = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type:    'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? '',
    }),
    cache: 'no-store',
  });

  const data = await res.json();
  return data.access_token;
}

export async function GET(request: NextRequest) {
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const rateLimit = checkRateLimit(`spotify:${clientIp}`, 30, 60 * 1000); // 30 req/min

  if (!rateLimit.allowed) {
    return Response.json(
      { isPlaying: false },
      {
        status: 429,
        headers: { 'Retry-After': Math.ceil(rateLimit.resetIn / 1000).toString() },
      }
    );
  }

  const accessToken = await getAccessToken();

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  if (res.status === 204 || res.status >= 400) {
    return Response.json({ isPlaying: false });
  }

  const song = await res.json();

  if (!song?.item) {
    return Response.json({ isPlaying: false });
  }

  return Response.json({
    isPlaying:  song.is_playing,
    title:      song.item.name,
    artist:     (song.item.artists as { name: string }[]).map(a => a.name).join(', '),
    album:      song.item.album.name,
    albumArt:   (song.item.album.images as { url: string }[])[0]?.url ?? null,
    songUrl:    song.item.external_urls.spotify,
  });
}

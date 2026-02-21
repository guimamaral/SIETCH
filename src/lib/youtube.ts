import { YouTubeVideo } from '@/types';

export const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID ?? '';
export const CHANNEL_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL ?? '';

const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

/**
 * Fetches the latest videos from the YouTube RSS feed.
 * Returns up to 15 most recent videos (YouTube RSS limit).
 * Falls back to an empty array if the fetch fails.
 */
export async function getLatestVideos(): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(RSS_URL, { next: { revalidate: 3600 } });

    if (!response.ok) {
      return [];
    }

    const xml = await response.text();
    return parseRssFeed(xml);
  } catch {
    return [];
  }
}

/**
 * Parses YouTube RSS XML into an array of YouTubeVideo objects.
 * YouTube's RSS feed structure is stable and well-defined.
 */
function parseRssFeed(xml: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;

  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];

    const videoId = extractTag(entry, 'yt:videoId');
    const title = extractTag(entry, 'title');
    const publishedAt = extractTag(entry, 'published');

    if (videoId && title && publishedAt) {
      videos.push({ videoId, title, publishedAt });
    }
  }

  return videos;
}

function extractTag(xml: string, tagName: string): string | null {
  const regex = new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`);
  const match = regex.exec(xml);
  if (!match) return null;
  // Decode basic XML entities
  return match[1]
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';

interface Track {
  isPlaying: boolean;
  title?:    string;
  artist?:   string;
  album?:    string;
  albumArt?: string;
  songUrl?:  string;
}

function isSafeSpotifyUrl(url?: string): boolean {
  return !!url && url.startsWith('https://open.spotify.com/');
}

export function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchTrack = useCallback(async () => {
    try {
      const res  = await window.fetch('/api/spotify/now-playing');
      const data = await res.json();
      setTrack(data);
    } catch {
      // fail silently — Spotify is non-critical
    }
  }, []);

  useEffect(() => {
    function startPolling() {
      fetchTrack();
      intervalRef.current = setInterval(fetchTrack, 30_000);
    }

    function stopPolling() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    function onVisibilityChange() {
      if (document.hidden) {
        stopPolling();
      } else {
        startPolling();
      }
    }

    startPolling();
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [fetchTrack]);

  if (!track?.isPlaying) {
    return <span className={styles.nowPlayingIdle}>—</span>;
  }

  const content = (
    <>
      {track.albumArt && (
        <Image
          src={track.albumArt}
          alt={track.album ?? 'Album art'}
          width={14}
          height={14}
          className={styles.nowPlayingArt}
        />
      )}
      <span>{track.title} — {track.artist}</span>
    </>
  );

  if (isSafeSpotifyUrl(track.songUrl)) {
    return (
      <a
        href={track.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.nowPlayingTrack}
      >
        {content}
      </a>
    );
  }

  return <span className={styles.nowPlayingTrack}>{content}</span>;
}

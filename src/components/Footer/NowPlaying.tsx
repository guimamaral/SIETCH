'use client';

import { useEffect, useState } from 'react';
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

export function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        const res  = await window.fetch('/api/spotify/now-playing');
        const data = await res.json();
        setTrack(data);
      } catch {
        // fail silently — Spotify is non-critical
      }
    }

    fetch();
    const id = setInterval(fetch, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!track?.isPlaying) {
    return <span className={styles.nowPlayingIdle}>—</span>;
  }

  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.nowPlayingTrack}
    >
      {track.albumArt && (
        <Image
          src={track.albumArt}
          alt={track.album ?? 'Album art'}
          width={14}
          height={14}
          className={styles.nowPlayingArt}
          unoptimized
        />
      )}
      <span>{track.title} — {track.artist}</span>
    </a>
  );
}

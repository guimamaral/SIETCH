'use client';

import { useEffect, useState } from 'react';
import styles from './WormSign.module.css';

const WORM_SIZE = 22;  // px — SVG dimensions
const TRACK_PAD = 40;  // px from top/bottom of viewport

export function WormSign() {
  const [top, setTop] = useState<number | null>(null);

  useEffect(() => {
    const container = document.querySelector('[data-worm-scroll]') as HTMLElement | null;
    if (!container) return;

    function update() {
      const { scrollTop, scrollHeight, clientHeight } = container!;
      const max = scrollHeight - clientHeight;
      const progress = max > 0 ? scrollTop / max : 0;
      const available = window.innerHeight - TRACK_PAD * 2 - WORM_SIZE;
      // Crawls up: progress=0 → bottom of track, progress=1 → top of track
      setTop(TRACK_PAD + (1 - progress) * available);
    }

    container.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
    return () => {
      container.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (top === null) return null;

  return (
    <>
      <div className={styles.track} />
      <div className={styles.worm} style={{ top }} aria-hidden="true">
        {/* Shai-Hulud — front-facing sandworm mouth */}
        <svg width={WORM_SIZE} height={WORM_SIZE} viewBox="0 0 22 22">
          {/* Outer body ring */}
          <circle cx="11" cy="11" r="10" fill="currentColor" />
          {/* Mouth cavity */}
          <circle cx="11" cy="11" r="7" fill="var(--color-bg)" />
          {/* Teeth ring 1 */}
          <circle cx="11" cy="11" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Teeth ring 2 */}
          <circle cx="11" cy="11" r="3.5" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Center */}
          <circle cx="11" cy="11" r="1.5" fill="currentColor" opacity="0.7" />
        </svg>
      </div>
    </>
  );
}

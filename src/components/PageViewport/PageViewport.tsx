'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@/hooks';
import { PAGES } from '@/lib/pages';
import { NullPage } from '@/pages-content/NullPage';
import { WormSign } from '@/components/WormSign/WormSign';
import { BlogPostMeta, YouTubeVideo } from '@/types';
import styles from './PageViewport.module.css';

interface PageViewportProps {
  posts?: BlogPostMeta[];
  videos?: YouTubeVideo[];
}

export function PageViewport({ posts = [], videos = [] }: PageViewportProps) {
  const { currentIndex, nullptrActive } = useNavigation();
  const [displayIndex, setDisplayIndex] = useState(currentIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevIndexRef = useRef(currentIndex);
  const prevNullRef = useRef(nullptrActive);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex !== prevIndexRef.current) {
      const leavingNull = prevNullRef.current;
      prevNullRef.current = nullptrActive;
      prevIndexRef.current = currentIndex;

      if (leavingNull) {
        // Skip transition when leaving NullPage to avoid flashing landing
        setDisplayIndex(currentIndex);
        return;
      }

      setIsTransitioning(true);

      // Wait for fade out, then switch content
      const timer = setTimeout(() => {
        setDisplayIndex(currentIndex);
        setIsTransitioning(false);
      }, 150); // Half of transition duration

      return () => clearTimeout(timer);
    }
    prevNullRef.current = nullptrActive;
  }, [currentIndex, nullptrActive]);

  // Reset scroll to top on page change and notify WormSign
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = 0;
    el.dispatchEvent(new Event('scroll'));
  }, [displayIndex, nullptrActive]);

  const CurrentPage = PAGES[displayIndex].component;

  return (
    <main
      className={`${styles.viewport} ${isTransitioning ? styles.transitioning : ''}`}
      role="main"
    >
      <WormSign />
      <div
        ref={scrollRef}
        className={`${styles.scrollContainer} scroll-container`}
        data-worm-scroll
      >
        {nullptrActive ? <NullPage /> : <CurrentPage posts={posts} videos={videos} />}
      </div>

      {/* Screen reader announcement for page changes */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {`Page ${currentIndex + 1} of ${PAGES.length}: ${PAGES[currentIndex].title}`}
      </div>
    </main>
  );
}

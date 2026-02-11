'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@/hooks';
import { PAGES } from '@/lib/pages';
import { NullPage } from '@/pages-content/NullPage';
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

  useEffect(() => {
    if (currentIndex !== prevIndexRef.current) {
      setIsTransitioning(true);

      // Wait for fade out, then switch content
      const timer = setTimeout(() => {
        setDisplayIndex(currentIndex);
        setIsTransitioning(false);
      }, 150); // Half of transition duration

      prevIndexRef.current = currentIndex;
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const CurrentPage = PAGES[displayIndex].component;

  return (
    <main
      className={`${styles.viewport} ${isTransitioning ? styles.transitioning : ''}`}
      role="main"
    >
      <div className={`${styles.scrollContainer} scroll-container`}>
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

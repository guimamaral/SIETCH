'use client';

import { useKeyboardNavigation } from '@/hooks';
import { PageHeader } from '@/components/PageHeader';
import { NavStrip } from '@/components/NavStrip';
import { PageViewport } from '@/components/PageViewport';
import { Footer } from '@/components/Footer';
import { BlogPostMeta, YouTubeVideo } from '@/types';
import styles from './SiteShell.module.css';

interface SiteShellProps {
  posts?: BlogPostMeta[];
  videos?: YouTubeVideo[];
}

export function SiteShell({ posts = [], videos = [] }: SiteShellProps) {
  // Initialize keyboard navigation
  useKeyboardNavigation();

  return (
    <div className={styles.shell}>
      <div className={styles.container}>
        <PageHeader />
        <NavStrip />
        <PageViewport posts={posts} videos={videos} />
        <Footer />
      </div>
    </div>
  );
}

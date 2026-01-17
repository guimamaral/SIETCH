'use client';

import { useKeyboardNavigation } from '@/hooks';
import { PageHeader } from '@/components/PageHeader';
import { NavStrip } from '@/components/NavStrip';
import { PageViewport } from '@/components/PageViewport';
import { Footer } from '@/components/Footer';
import { BlogPostMeta } from '@/types';
import styles from './SiteShell.module.css';

interface SiteShellProps {
  posts?: BlogPostMeta[];
}

export function SiteShell({ posts = [] }: SiteShellProps) {
  // Initialize keyboard navigation
  useKeyboardNavigation();

  return (
    <div className={styles.shell}>
      <div className={styles.container}>
        <PageHeader />
        <NavStrip />
        <PageViewport posts={posts} />
        <Footer />
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { BlogPostMeta } from '@/types';
import styles from './pages.module.css';

interface BlogPageProps {
  posts?: BlogPostMeta[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function BlogPage({ posts = [] }: BlogPageProps) {
  return (
    <section className={styles.page}>
      <h2 className={styles.sectionTitle}>BLOG</h2>

      {posts.length === 0 ? (
        <p className={styles.emptyState}>No posts yet. Check back soon.</p>
      ) : (
        <ul className={styles.postList}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.postItem}>
              <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                <span className={styles.postDate}>{formatDate(post.date)}</span>
                <span className={styles.postTitle}>{post.title}</span>
              </Link>
              {post.description && (
                <p className={styles.postDescription}>{post.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

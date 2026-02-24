'use client';

import Link from 'next/link';
import { BlogPostMeta } from '@/types';
import { formatDate } from '@/lib/format';
import styles from './pages.module.css';

interface BlogPageProps {
  posts?: BlogPostMeta[];
}

export function BlogPage({ posts = [] }: BlogPageProps) {
  return (
    <section className={styles.page}>
      <div className={styles.siteTitle}>
        <span className={styles.siteName}>GOLDEN PATH</span>
        <span className={styles.siteDefinition}>an optimum path through the countless threads of cause and effect that were encountered by the human race</span>
      </div>
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

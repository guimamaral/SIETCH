import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import styles from './page.module.css';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Static generation for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Metadata generation
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.description,
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className={styles.blogPost}>
      <div className={styles.container}>
        <nav className={styles.backNav}>
          <Link href="/#0x06" className={styles.backLink}>
            ← BACK TO BLOG
          </Link>
        </nav>

        <article className={styles.article}>
          <header className={styles.header}>
            <time className={styles.date} dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <h1 className={styles.title}>{post.title}</h1>
            {post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        <nav className={styles.footerNav}>
          <Link href="/#0x06" className={styles.backLink}>
            ← BACK TO BLOG
          </Link>
        </nav>
      </div>
    </main>
  );
}

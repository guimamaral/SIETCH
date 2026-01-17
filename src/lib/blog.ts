import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, BlogPostMeta } from '@/types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Get all blog post metadata (for listing)
 * Filters out drafts in production
 */
export function getAllPosts(): BlogPostMeta[] {
  // Ensure directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const fullPath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || '',
        description: data.description || '',
        tags: data.tags || [],
        draft: data.draft || false,
      };
    })
    .filter((post) => {
      // Filter drafts in production
      if (process.env.NODE_ENV === 'production') {
        return !post.draft;
      }
      return true;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1)); // Newest first

  return posts;
}

/**
 * Get all post slugs (for static generation)
 */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

/**
 * Get a single post by slug with rendered HTML content
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    description: data.description || '',
    tags: data.tags || [],
    draft: data.draft || false,
    content,
    contentHtml,
  };
}

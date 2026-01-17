import { SiteShell } from '@/components/SiteShell';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  // Fetch blog posts at build time (SSG)
  const posts = getAllPosts();

  return <SiteShell posts={posts} />;
}

import { SiteShell } from '@/components/SiteShell';
import { getAllPosts } from '@/lib/blog';
import { getLatestVideos } from '@/lib/youtube';

export default async function Home() {
  // Fetch data at build time (SSG)
  const posts = getAllPosts();
  const videos = await getLatestVideos();

  return <SiteShell posts={posts} videos={videos} />;
}

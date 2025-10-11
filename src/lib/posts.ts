import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostFrontMatter = {
  title: string;
  summary: string;
  publishedAt: string;
  tags?: string[];
};

export type Post = PostFrontMatter & {
  slug: string;
};

export type PostWithContent = Post & {
  html: string;
};

const postsDirectory = path.join(process.cwd(), "content", "blog");

function sortByDateDesc(a: Post, b: Post) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export async function getPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(postsDirectory);
  return files.filter((file) => file.endsWith(".md")).map((file) => file.replace(/\.md$/, ""));
}

export async function getPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const fullPath = path.join(postsDirectory, `${slug}.md`);
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data } = matter(fileContents);
      const frontMatter = data as PostFrontMatter;
      return { ...frontMatter, slug } satisfies Post;
    })
  );

  return posts.sort(sortByDateDesc);
}

export async function getPostBySlug(slug: string): Promise<PostWithContent | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontMatter = data as PostFrontMatter;

    const processedContent = await remark().use(html).process(content);

    return {
      ...frontMatter,
      slug,
      html: processedContent.toString()
    } satisfies PostWithContent;
  } catch (error) {
    console.error(`Failed to load post for slug: ${slug}`, error);
    return null;
  }
}

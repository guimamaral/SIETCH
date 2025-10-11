import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

type BlogPostPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: `${post.title} · SIETCH`,
    description: post.summary
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-16 sm:px-10">
      <Link
        href="/blog"
        className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-300 transition hover:text-white"
      >
        ← BACK TO BLOG
      </Link>
      <header className="space-y-4">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-brand-accent">
          {new Date(post.publishedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
          })}
        </p>
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">{post.title}</h1>
        <p className="text-base text-slate-300">{post.summary}</p>
      </header>
      <article
        className="prose prose-invert prose-headings:text-white prose-a:text-brand-accent"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </main>
  );
}

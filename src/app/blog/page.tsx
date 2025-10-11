import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog · SIETCH",
  description: "Markdown-powered blog posts for the SIETCH personal website."
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-12 px-6 py-16 sm:px-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold tracking-[0.4em] text-brand-accent">BLOG</p>
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">Build notes & reflections</h1>
        <p className="max-w-2xl text-base text-slate-300">
          Entries are sourced from Markdown files so publishing stays as simple as pushing to Git. Each
          post captures experiments, learnings, and implementation details for the SIETCH playground.
        </p>
      </header>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="card space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-brand-accent">
              {new Date(post.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
            </p>
            <h2 className="text-2xl font-semibold text-white">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-slate-300">{post.summary}</p>
            {post.tags && (
              <ul className="flex flex-wrap gap-2 text-[0.65rem] font-semibold tracking-[0.3em] text-brand-accent">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-brand-accent/40 px-3 py-1">
                    {tag.toUpperCase()}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-sm text-slate-400">No posts yet. Add a Markdown file in `content/blog` to get started.</p>
        )}
      </div>
    </main>
  );
}

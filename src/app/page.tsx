import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getPosts();
  const featuredPost = posts[0];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-24 px-6 py-16 sm:px-10">
      <header className="flex flex-col gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-[0.4em] text-brand-accent">SIETCH</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">Daniel Atreides</h1>
          <p className="max-w-xl text-sm text-slate-300 sm:text-base">
            Product-minded engineer crafting playful, performant web experiences. Inspired by joyful
            UI touches like rotating mascots and precise typography.
          </p>
        </div>
        <div className="flex items-center gap-6 self-start sm:self-auto">
          <nav className="flex items-center gap-6">
            <a className="nav-link" href="#experience">
              EXPERIENCE
            </a>
            <Link className="nav-link" href="/blog">
              BLOG
            </Link>
            <a className="nav-link" href="#contact">
              CONTACT
            </a>
          </nav>
          <div className="relative h-16 w-16 sm:h-20 sm:w-20">
            <Image
              src="/pepe.svg"
              alt="Playful frog mascot rotating"
              fill
              sizes="(max-width: 640px) 64px, 80px"
              className="animate-spin-slow"
              priority
            />
          </div>
        </div>
      </header>

      <section id="experience" className="space-y-10">
        <div>
          <h2 className="section-heading">Experience</h2>
          <p className="section-subtitle">
            A snapshot of recent roles delivering immersive web products across startups and agencies.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="card space-y-3">
            <header className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Lead Frontend Engineer · Arrakis Labs</h3>
              <span className="text-xs font-mono text-slate-400">2022 — Present</span>
            </header>
            <p className="text-sm text-slate-300">
              Guiding a team building immersive data visualizations for climate-tech clients. Introduced a
              robust design system, performance budgets, and accessibility-first workflows.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              <li>Shipped real-time dashboards handling 150k+ events/min with streaming data layers.</li>
              <li>Cut First Contentful Paint by 40% via React Server Components and edge caching.</li>
              <li>Mentored designers and engineers on motion design best practices.</li>
            </ul>
          </article>
          <article className="card space-y-3">
            <header className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Senior UI Engineer · Caladan Studio</h3>
              <span className="text-xs font-mono text-slate-400">2019 — 2022</span>
            </header>
            <p className="text-sm text-slate-300">
              Crafted bespoke marketing sites and interactive storytelling experiences for global brands.
              Led rapid prototyping sprints combining Next.js, Three.js, and creative coding techniques.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
              <li>Launched 12+ award-winning campaigns with motion-rich hero experiences.</li>
              <li>Introduced component-driven workflows with Storybook and accessibility testing.</li>
              <li>Partnered with clients to transform mood boards into production-ready UI systems.</li>
            </ul>
          </article>
        </div>
      </section>

      {featuredPost && (
        <section id="blog" className="space-y-6">
          <div>
            <h2 className="section-heading">Latest from the blog</h2>
            <p className="section-subtitle">
              Long-form reflections and build notes sourced from Markdown files so updates stay simple.
            </p>
          </div>
          <article className="card flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 space-y-2">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-brand-accent">
                {new Date(featuredPost.publishedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </p>
              <h3 className="text-2xl font-semibold text-white">{featuredPost.title}</h3>
              <p className="text-sm text-slate-300">{featuredPost.summary}</p>
            </div>
            <div className="flex items-center gap-3 self-start md:self-auto">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="rounded-full border border-brand-accent/60 px-4 py-2 text-xs font-semibold tracking-[0.3em] text-brand-accent transition hover:border-brand-accent hover:bg-brand-accent/10"
              >
                READ POST
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold tracking-[0.3em] text-slate-200 transition hover:border-white/40 hover:text-white"
              >
                VIEW ALL
              </Link>
            </div>
          </article>
        </section>
      )}

      <section id="contact" className="mb-16 space-y-6">
        <div>
          <h2 className="section-heading">Contact</h2>
          <p className="section-subtitle">
            Interested in collaborating or just want to say hi? Drop a note below or reach out directly.
          </p>
        </div>
        <div className="card flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 text-sm text-slate-300">
            <p>
              <span className="font-semibold text-white">Email:</span> <a href="mailto:daniel@sietch.dev">daniel@sietch.dev</a>
            </p>
            <p>
              <span className="font-semibold text-white">LinkedIn:</span> <a href="https://www.linkedin.com">linkedin.com/in/daniel</a>
            </p>
          </div>
          <Link
            href="mailto:daniel@sietch.dev"
            className="rounded-full bg-brand-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-950 transition hover:bg-sky-300"
          >
            SAY HELLO
          </Link>
        </div>
      </section>
    </main>
  );
}

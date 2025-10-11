# SIETCH Personal Website

A Next.js 14 + TypeScript personal site inspired by danielkasabov.com with a rotating frog mascot and section-based navigation for **EXPERIENCE**, **BLOG**, and **CONTACT**. Blog posts are sourced from static Markdown files stored in `content/blog`.

## Tech stack
- [Next.js 14 App Router](https://nextjs.org/docs/app) with React Server Components
- TypeScript with strict configuration and path aliases (`@/*`)
- Tailwind CSS for rapid styling plus custom utility classes
- Markdown content parsed with `gray-matter` + `remark`

## Getting started
1. Install dependencies
   ```bash
   npm install
   ```
2. Run the development server
   ```bash
   npm run dev
   ```
3. Visit `http://localhost:3000` to view the site. The homepage highlights experience, latest blog entry, and contact links. Navigate to `/blog` for the full archive.

## Content management
- Add new posts inside `content/blog/*.md`. Each file supports front matter fields:
  ```yaml
  ---
  title: "Post title"
  summary: "Short summary"
  publishedAt: "YYYY-MM-DD"
  tags:
    - tag-one
    - tag-two
  ---
  Markdown body...
  ```
- Slugs are derived from filenames.

## Deployment
Deploy the generated static app on any Node-friendly host:
- **Managed:** Vercel, Netlify, or Cloudflare Pages (Git-based builds).
- **Self-hosted:** AWS EC2 or similar VPS. Clone the repo, run `npm install && npm run build`, and serve with `npm start` behind Nginx/Caddy + HTTPS.

## Accessibility & performance notes
- Mascot uses a CSS spin animation with a reduced motion fallback.
- Layout emphasizes semantic headings and high contrast for readability.

## Testing
Automated UI tests are out of scope; rely on manual verification while iterating locally.
# SIETCH

Personal website project plan inspired by https://www.danielkasabov.com/.

## Technology Stack
- **Framework:** Next.js (App Router) with TypeScript for strong typing and SEO-friendly routing.
- **Styling:** Tailwind CSS layered with hand-authored CSS modules when needed for fine-grained control.
- **Content:** Static Markdown/MDX files for the blog, sourced at build time.
- **Tooling:** ESLint + Prettier for linting/formatting and Vercel Analytics (optional) for insights.

## Hosting Options
- **Managed static hosting:** Vercel, Netlify, or Cloudflare Pages for automatic builds from Git.
- **Self-managed:** Personal AWS EC2 instance (Ubuntu/Debian) running Node.js LTS and a reverse proxy such as Nginx or Caddy. Use PM2 or systemd to keep the Next.js server running, and enable HTTPS via Let's Encrypt (Certbot).

## Deployment Outline
1. Scaffold the project with `npx create-next-app@latest --typescript`.
2. Install Tailwind CSS (`npx tailwindcss init -p`) and configure global styles/components.
3. Add a rotating Pepe mascot, section navigation (EXPERIENCE, BLOG, CONTACT), and Markdown-driven blog content.
4. Build static assets (`npm run build`) and deploy:
   - For EC2: clone the repo, run `npm install`, `npm run build`, and start with `npm run start` behind Nginx/Caddy.
   - For managed hosts: push to Git and let the platform handle builds/deployments.

## Testing
No automated UI/unit tests required per project scope; rely on manual browser testing before deployment.

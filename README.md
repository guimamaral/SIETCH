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

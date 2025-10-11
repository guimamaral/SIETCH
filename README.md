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

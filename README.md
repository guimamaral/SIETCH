# Minimalist Hex-Navigable Personal Site

A minimalist, keyboard-first personal website built with Next.js. Features arrow key navigation, hexadecimal page numbering, light/dark theme toggle, and a markdown-based blog system.

Inspired by [athariandre.com](https://www.athariandre.com/).

## Features

- **8 Pages** with hex numbering (0x00–0x07)
  - Landing, Purpose, Work Experience, Projects, Skills, Tutoring, Blog, Contact
- **Keyboard Navigation**
  - `←` / `↑` — Previous page
  - `→` / `↓` — Next page
  - `Home` — First page (0x00)
  - `End` — Last page (0x07)
  - `Space` — Toggle light/dark theme
- **Single Viewport Layout** — No page scrolling; content scrolls internally
- **Shareable URLs** — Hash-based routing (`/#0x03` for Projects)
- **Theme System** — Light/dark modes with system preference detection and localStorage persistence
- **Markdown Blog** — Write posts in `/content/blog/*.md` with frontmatter
- **Responsive Design** — Works on mobile (clickable nav when keyboard unavailable)
- **Accessibility** — `aria-current`, focus states, reduced motion support

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with theme initialization
│   │   ├── page.tsx           # Main SPA entry point
│   │   ├── globals.css        # CSS variables, themes, base styles
│   │   └── blog/[slug]/       # Individual blog post route
│   │
│   ├── components/            # UI components
│   │   ├── SiteShell/         # Main layout wrapper
│   │   ├── PageHeader/        # Current page indicator
│   │   ├── NavStrip/          # Hex navigation bar
│   │   ├── PageViewport/      # Page content renderer
│   │   └── Footer/            # Hints and social links
│   │
│   ├── pages-content/         # Page content components
│   │   ├── LandingPage.tsx
│   │   ├── PurposePage.tsx
│   │   ├── WorkExperiencePage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── SkillsPage.tsx
│   │   ├── TutoringPage.tsx
│   │   ├── BlogPage.tsx
│   │   └── ContactPage.tsx
│   │
│   ├── lib/
│   │   ├── pages.ts           # Pages registry (single source of truth)
│   │   ├── hex.ts             # Hex formatting utilities
│   │   ├── blog.ts            # Blog loading utilities
│   │   └── constants.ts       # Site configuration
│   │
│   ├── hooks/                 # Custom React hooks
│   ├── context/               # React context providers
│   └── types/                 # TypeScript interfaces
│
├── content/
│   └── blog/                  # Markdown blog posts
│
└── public/                    # Static assets
```

## Customization

### Update Your Information

1. **Site Config** — Edit `src/lib/constants.ts`:
   ```typescript
   export const SITE_CONFIG = {
     name: 'Your Name',
     title: 'Your Name — Personal Site',
     subtitle: 'Your Tagline Here',
     social: {
       email: 'you@example.com',
       github: 'https://github.com/yourusername',
       linkedin: 'https://linkedin.com/in/yourusername',
     },
   };
   ```

2. **Page Content** — Edit files in `src/pages-content/`:
   - Each file contains placeholder content marked with `{/* TODO: ... */}`
   - Replace with your actual information

3. **Footer Links** — Update `src/components/Footer/Footer.tsx`

### Adding Blog Posts

Create markdown files in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2024-03-15"
description: "A brief description for the post list."
tags: ["tag1", "tag2"]
---

# Your Content Here

Write your post content in markdown...
```

Posts are automatically sorted by date (newest first) and appear on the Blog page (0x06).

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to AWS EC2 with Nginx and HTTPS.

**Quick overview:**
1. Install Node.js LTS on EC2
2. Clone repo and run `npm ci && npm run build`
3. Start with PM2: `pm2 start npm --name site -- start`
4. Configure Nginx as reverse proxy
5. Add HTTPS with Certbot

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS (CSS Modules + CSS Variables)
- **Blog**: gray-matter + remark
- **Deployment**: Node.js + PM2 + Nginx

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `↓` | Next page |
| `←` or `↑` | Previous page |
| `Home` | First page (0x00) |
| `End` | Last page (0x07) |
| `Space` | Toggle theme |

*Note: Arrow keys are disabled when typing in input fields.*

## License

MIT

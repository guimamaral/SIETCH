# Minimalist Hex-Navigable Personal Site — Build Spec (for Claude Opus 4.5)

## 0) Inspiration
This site’s look/feel and interaction model is inspired by:
- https://www.athariandre.com/

Key inspiration traits:
- Minimal, text-forward layout (no heavy imagery)
- Full-screen “page” experience
- Keyboard-first navigation (arrow keys)
- Small UI chrome: page index, nav strip, hints, footer links
- Optional theme toggle (e.g., Space)

---

## 1) Website Style

### Visual Aesthetic
- **Minimalist / terminal-adjacent** but modern and clean
- Mostly monochrome (light/dark theme), strong whitespace
- Typography-forward, with consistent rhythm and spacing
- Subtle separators (thin rules / spacing) instead of boxes/cards

### Typography
- Use **system font stack** or a single clean monospace/sans combo:
  - Option A (most similar vibe): `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
  - Option B (slightly more “editorial”): `system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`
- Headings: uppercase with tracking (letter-spacing)
- Body: smaller size, high line-height for readability

### Layout Structure (Single-Viewport)
- Entire site is a **single viewport** (`min-height: 100vh`)
- Central content column, left-aligned text
- Responsive: content column width clamps (e.g., `max-width: 860px`, `padding: 24px`)

### UI Chrome (Persistent Across Pages)
Top area:
- Current page number in **hexadecimal**
- Current page title (uppercase)
- Nav strip showing all page indices in hex (active highlighted)

Middle:
- Active page content (single section at a time)

Bottom area:
- Interaction hint: “USE ARROW KEYS TO NAVIGATE”
- Optional: “PRESS SPACE TO TOGGLE THEME”
- Footer links (email/github/linkedin/etc.)

### Interaction Model
- Arrow keys move between pages:
  - `ArrowRight` / `ArrowDown`: next page
  - `ArrowLeft` / `ArrowUp`: previous page
- Optional helpers:
  - `Home`: first page
  - `End`: last page
  - `Space`: toggle theme (light/dark)
  - `?`: show help overlay (nice-to-have)
- Smooth but minimal transitions:
  - Fade or slight slide (respect reduced motion)

### Hex Numbering Rules
- Display indices as `0x00`…`0x07` (8 pages).
- Always uppercase hex digits (A–F).
- Use zero-padding to 2 digits minimum.
- Total pages displayed as hex too when shown (e.g., “0x05 / 0x08”).

---

## 2) Website Contents (Pages)

Total pages: **8** (indices 0x00–0x07)

### 0x00 — Landing
- Large: **Your Name**
- Small subtitle: 1–2 lines (e.g., “CS @ UT Austin • Security • Systems”)
- Minimal instruction hint to navigate

### 0x01 — Purpose
- Short paragraphs + bullets:
  - Current ventures
  - Aspirations
  - Favorite things (a tight list; keep it tasteful/minimal)
- Optional: “Now” section (what you’re focused on this month)

### 0x02 — Work Experience
- Chronological entries
- Each entry format:
  - Role — Company
  - Dates (Month YYYY – Month YYYY)
  - 2–4 bullets with impact and tech keywords

### 0x03 — Projects
- 4–8 projects max
- Each project:
  - Name (link if public)
  - 1–2 sentence description
  - 2–4 tags (tech stack / domain)
  - Optional: “Highlights” bullet(s)

### 0x04 — Skills
- Categorized list:
  - Languages
  - Systems / Infra
  - Security
  - Tools
  - Soft skills (optional, keep minimal)

### 0x05 — Tutoring
- Clear offering + credibility:
  - What you tutor (topics)
  - Who it’s for (AP, undergrad, interview prep, etc.)
  - Outcomes/metrics if available (hours taught, reviews, etc.)
  - CTA: email / booking link

### 0x06 — Blog
- List of posts (title, date, short excerpt)
- Click a post to open its own route OR render inline (see Implementation)

### 0x07 — Contact
- Email (primary)
- LinkedIn / GitHub / X (optional)
- Location (optional, broad)
- Short “best way to reach me” note

---

## 3) Tech Stack

### Core
- **Next.js** (App Router)
- **Vanilla CSS** (CSS Modules or global CSS)
- No UI frameworks required

### Content
- Blog posts stored as **local Markdown files**:
  - Use `gray-matter` for frontmatter
  - Use `remark` (or `next-mdx-remote` if MDX is desired)
- Store content under `/content/blog/*.md`

### Deployment
- Deploy on **AWS EC2** (Ubuntu)
- Recommended approach:
  - Build Next.js for production and run via Node (or Docker)
  - Use **Nginx** as reverse proxy (HTTPS termination + caching)
  - Use **PM2** or systemd to keep Node process alive
  - TLS via **Certbot** (Let’s Encrypt)

---

## 4) Nice-to-Have Details

### UX / Polish
- URL reflects current page:
  - `/#0x05` or `/?p=0x05` (so links are shareable)
- Clickable nav strip:
  - Clicking `0x03` jumps to Projects
- Keyboard help overlay (`?`)
- Subtle transition animation:
  - But **disable/limit** when `prefers-reduced-motion: reduce`
- Theme persistence:
  - Save theme in `localStorage`
  - Respect system preference on first load

### Accessibility
- Ensure focus is not trapped
- Don’t hijack arrow keys when user is typing in inputs/textarea
- High contrast in both themes
- `aria-current` for active nav item

### SEO / Meta
- Basic Open Graph tags
- `sitemap.xml` (optional)
- `robots.txt` (optional)

### Analytics (Optional)
- Plausible / Umami / simple self-hosted
- Keep minimal

---

## 5) Implementation Plan (Step-by-Step)

### Step 1 — Project Setup
1. Create Next.js project (App Router).
2. Add CSS approach:
   - `app/globals.css` for base styles
   - Optional CSS modules per component
3. Define base layout with:
   - `app/layout.tsx`
   - global metadata (title/description)

### Step 2 — Define Page Model (Single Source of Truth)
Create a `pages` registry, e.g. `src/lib/pages.ts`:

- Each page object:
  - `key`: stable id (e.g. `"landing"`, `"purpose"`)
  - `title`: e.g. `"LANDING"`, `"PURPOSE"`
  - `component`: React component reference
- The array order defines navigation order.
- Total pages = `pages.length`.
- Hex formatting helper:
  - `toHexIndex(i): "0x00"..."0x0F"...`
  - Always uppercase, pad to 2 digits.

### Step 3 — Build the Shell Layout (Persistent Chrome)
Create components:
- `SiteShell`
  - Header: hex index + page title
  - Nav strip: list of hex indices
  - Hint line (arrow keys)
  - Footer links
- `PageViewport`
  - Renders the active page component

CSS requirements:
- full-height layout
- max-width content column
- consistent spacing
- minimal borders/dividers

### Step 4 — Keyboard Navigation + State
Implement a `useNavigation()` hook:
- Holds `currentIndex`
- `goNext()`, `goPrev()`, `goTo(index)`
- Keydown listener added on mount
- Guard: ignore when focused element is input/textarea/contenteditable
- Wrap-around behavior:
  - Option A: wrap (from last to first)
  - Option B: clamp (stop at ends)
  - Choose one; default to wrap for smooth UX.

### Step 5 — URL Sync (Shareable “Page Links”)
Decide URL format (recommended: hash).
- On index change: `location.hash = pages[index].key` OR `0xNN`
- On load: parse hash and set initial index accordingly
- Also handle `hashchange` event to allow back/forward navigation

### Step 6 — Theme Toggle (Space)
- Add theme state: `"light" | "dark"`
- On first load:
  - Check `localStorage`
  - Else use `prefers-color-scheme`
- `Space` toggles theme
- Apply via `data-theme="dark"` on `html` or `body`
- CSS uses variables:
  - `--bg`, `--fg`, `--muted`, `--accent`, etc.

### Step 7 — Implement Each Page Component
Create page components under `src/pages/` or `src/components/pages/`:
- `LandingPage.tsx`
- `PurposePage.tsx`
- `WorkExperiencePage.tsx`
- `ProjectsPage.tsx`
- `SkillsPage.tsx`
- `TutoringPage.tsx`
- `BlogPage.tsx`
- `ContactPage.tsx`

Each uses consistent typography + spacing.
Use small, repeatable patterns:
- “Entry” component for resume items
- “Tag list” for project stacks

### Step 8 — Blog System (Markdown)
1. Create `/content/blog/` and add sample `.md` posts with frontmatter:
   - `title`
   - `date`
   - `description` (optional)
2. Build loader utility:
   - Read files (Node fs)
   - Parse frontmatter with `gray-matter`
   - Sort by date desc
3. Blog list page renders titles + dates + excerpts.
4. Blog post route:
   - Option A: dedicated route `/blog/[slug]`
   - Option B: keep minimalist single-viewport but open post in overlay
   - Recommended: Route-based for SEO and shareability.

### Step 9 — Styling + Transitions
- Add minimal transition between pages:
  - CSS class toggles for fade
- Implement reduced motion:
  - If reduced motion, disable transition durations
- Ensure mobile:
  - optional swipe gesture (nice-to-have)

### Step 10 — Production Build
- `next build`
- `next start` runs production server
- Confirm all pages render and navigation works.

### Step 11 — EC2 Deployment
**Suggested EC2 setup (Ubuntu):**
1. Provision EC2 instance + security group:
   - Allow 22 (SSH), 80 (HTTP), 443 (HTTPS)
2. Install Node.js (LTS) + npm
3. Copy code or clone GitHub repo
4. Build on server:
   - `npm ci`
   - `npm run build`
5. Run with PM2:
   - `pm2 start npm --name site -- start`
   - `pm2 save` + startup script
6. Install Nginx:
   - Reverse proxy from 80/443 → localhost:3000
7. Add TLS:
   - `certbot --nginx` to obtain Let’s Encrypt certs
8. Verify:
   - HTTPS works
   - caching headers (optional)
   - restart survives reboot

### Step 12 — Final QA Checklist
- Arrow keys work across pages
- Hex labels are correct and consistent
- Theme toggle works and persists
- Blog routes render
- No layout shift, good mobile behavior
- Lighthouse passable (performance + accessibility)
- Dead links removed

---

## 6) Notes / Assumptions for Claude
- This is intentionally minimalist: prioritize clarity and “text UI” vibe.
- Use **one central pages registry** to avoid nav drift.
- Use hash-based URL sync unless you strongly prefer query params.
- Blog should be route-based for shareable posts.
- Avoid heavy dependencies; keep bundle small.
- Ensure keyboard listener does not interfere with form fields.

---

## 7) Deliverables
Claude should produce:
- A complete Next.js project implementing the 8-page keyboard-navigable UI
- Hex numbering everywhere in navigation UI
- A working blog with markdown posts
- Theme toggle (Space) + persisted preference
- EC2 deployment instructions (and optionally Nginx config snippet)

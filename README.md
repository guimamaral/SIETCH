Deployment instructions:

1) npm run build
2) pm2 restart gamaral --update-env


# SIETCH Project Memory

## NoiseOverlay Static Effect Changes (2026-02-21 Audit)

### What changed
In the performance audit, two changes were made to `src/components/NoiseOverlay/NoiseOverlay.tsx`:

1. **GRAIN_SIZE 1 → 2** — Renders the canvas at half resolution (e.g. 960×540 instead of 1920×1080), reducing pixel operations by 4×. The canvas is stretched via CSS to fill the viewport, so the visual difference at 5% opacity is imperceptible.

2. **Visibility pause** — Added a `visibilitychange` listener that cancels `requestAnimationFrame` when the tab is hidden and resumes when visible. This saves CPU when the user isn't looking at the page.

### How to revert to original (per-pixel) static
In `src/components/NoiseOverlay/NoiseOverlay.tsx`, change line 40:
```
const GRAIN_SIZE      = 2;     // 2 = half-res canvas; 4× fewer pixel ops
```
back to:
```
const GRAIN_SIZE      = 1;     // 1 = per-CSS-pixel; raise for coarser grain
```

To also remove the visibility pause (not recommended — wastes CPU), delete the `onVisibilityChange` function and its event listener/cleanup (lines 102-110, and line 114).

## Key Project Facts
- **Stack:** Next.js 14, React 18, TypeScript, CSS Modules
- **Deployment:** PM2 on Debian (`pm2 restart gamaral --update-env`)
- **Env vars:** `.env.local` (gitignored). `NEXT_PUBLIC_*` for client-side, plain for server-only.
- **PM2 env caveat:** Non-NEXT_PUBLIC env vars need `export VAR=val && pm2 restart gamaral --update-env`
- **Image cache:** Stored in `.next/cache/images/`. Clear + rebuild + restart to bust.
- **Landing page image:** 19MB PNG at `/public/me-and-bro.png` — needs external compression (squoosh.app).

## Audit Changes Summary (2026-02-21)
See plan file for full details. Key files touched:
- `next.config.js` — `poweredByHeader: false`
- `src/middleware.ts` — CSP: removed `unsafe-eval` in prod, added `object-src 'none'`, `media-src`
- `src/app/api/spotify/now-playing/route.ts` — Rate limiting (30 req/min/IP)
- `src/components/Footer/NowPlaying.tsx` — URL validation, visibility polling pause, removed `unoptimized`
- `src/app/api/tutoring-inquiry/route.ts` — Content-Type validation (415)
- `src/lib/format.ts` — NEW shared `formatDate` (replaced 3 duplicates)
- `src/lib/pages.ts` — Removed unused `getPageByIndex`, `getPageByKey`
- `src/lib/hex.ts` — Removed unused `formatPageIndicator`
- Removed `console.error` from `youtube.ts` and tutoring route

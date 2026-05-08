# Handoff: Screengram Marketing Site

## Overview

This is the design handoff for the **Screengram marketing site** (`screengram.app`) — the public-facing concept page that introduces the product, runs through the 3-part manifesto (I, II, III), and shows an archive gallery of "volumes" (a screen + a place). It is the launch / waitlist page that lives at the apex domain.

The companion `Screengram App.html` (the iOS prototype) is **not** part of this handoff — it's a design spec for the iOS app itself, which is a separate workstream.

## Target Stack

The user has chosen:

- **Astro** (static-site generator)
- **Tailwind CSS**
- **TypeScript**
- **`@astrojs/cloudflare` adapter**
- **Cloudflare Pages** for hosting
- **Custom domain:** `screengram.app` (already registered by the user)

The site is fundamentally static — no SSR / API routes are required for v1. A waitlist email-capture form is the only piece that needs server-side handling; recommend a Cloudflare Worker + Turnstile, or a third-party service (Buttondown, ConvertKit, Resend Audiences) to keep the v1 surface small.

## About the Design Files

The files in this bundle are **design references created in HTML/JSX** — a working prototype showing the intended look, layout, palette system, and interactions. They are NOT production code to copy directly.

The task is to **recreate this design in Astro + Tailwind + TypeScript**, lifting the exact tokens (colors, typography, spacing, layout proportions) and structure (component hierarchy, content), but building it idiomatically in the target stack. Convert the React JSX to `.astro` components; convert the hand-written CSS variables and class system to Tailwind utility classes (with a custom theme extension for the palette tokens and the two type families). The Tweaks panel and `useTweaks` hook in the prototype are an authoring tool only — **do not ship them**. Pick a single palette (`cream`) and a single layout (`pip` w/ `pipCorner: bl`) as the published defaults.

## Fidelity

**High-fidelity.** Pixel-precise mockups with final colors, typography, spacing, and proportional layout. Reproduce the design to spec.

## Pages / Views

This is a single-page site. Top-to-bottom, the sections are:

### 1. Topbar (sticky-feeling, but not actually sticky)
- Left: a small `:S` mark in italic Newsreader serif.
- Middle: a thin metadata strip — `VOL. 01 · MAY 2026 · ISSUE NO. 01 · WEEKLY` in JetBrains Mono uppercase, faded color, tracked +0.16em.
- Right: a small "subscribe" / "get the app" pill button. Currently labeled "subscribe" — change copy to "Get notified" or similar for the marketing site.
- Border-bottom: 0.5px hairline in `--rule` at 30% alpha.

### 2. Masthead
- Centered, very large italic wordmark: **screengram**.
  - Newsreader, italic, weight 400, size ~clamp(72px, 14vw, 196px), letter-spacing −0.04em, line-height 0.92.
  - Color: `--ink` (#1a140e on cream).
- Above the wordmark, a tiny tag line: `THE FRONT-AND-BACK · SCREEN-AND-PLACE WEEKLY` in mono uppercase tracked +0.18em.
- Below the wordmark: a single italic serif tagline, e.g. `A diary kept by your phone, with the world behind it.`

### 3. Hero
- Aspect-ratio 16/9 (or "big" variant — wider).
- Background: a real beach-sunset photo (`images/vol-1-photo.jpg`) covering the full hero, with a subtle vignette + paper-grain overlay for "vintage" treatment.
- Foreground (PiP / picture-in-picture) — bottom-left, ~26% width, 9/19.5 aspect ratio:
  - A **fake iPhone bezel**: dark `#0a0a0a` shell, rounded outer corners (inherits from PiP frame), 4.5% padding, with an inset 9% rounded inner screen. A black "dynamic island" pill 38% wide × 4% tall, centered ~3% from the top.
  - The screen contents: `images/vol-1-screen.png` (a real iPhone screenshot — YouTube Music playing "Heaven Is A Place On Earth" by W&W & AXMO).
  - Drop shadow on the bezel: `0 18px 40px rgba(0,0,0,0.45), 0 0 0 1.5px rgba(0,0,0,0.6)`.
- Caption directly under the hero, in mono uppercase tracked +0.04em, faded color:
  `VOL. 01 — WILL ROGERS BEACH, 6:31 PM, HEAVEN IS A PLACE ON EARTH.`

### 4. Manifesto (essay)
Three numbered segments, each with a Roman numeral + year mark in the left rail and a body in the right column. Use `display: grid; grid-template-columns: 100px 1fr; gap: 32px;` per segment.

- **I — 2015**: Frontback died in 2015. The idea it was reaching for didn't.
- **II — Today**: The screenshot is the modern photograph.
- **III — Screengram**: A small ritual. Every week (or every day, or never), capture one screen + one place. Together. Filed.

(Use the exact prose from `concept-page.jsx` `Manifesto()` — copy verbatim into the Astro component.)

Body type: Newsreader, regular, 22px, line-height 1.42, letter-spacing −0.005em. Drop-cap on each segment's first paragraph (3 lines tall, italic, color `--accent`).

### 5. Gallery header
- Eyebrow: `THE ARCHIVE` in mono uppercase tracked +0.18em, accent color.
- Title: `Volumes 02 — 10` in italic Newsreader, ~52px.
- Sub: `Drop your own screengrams in. Each tile is a slot — a screen, a place, a moment in your week.`

### 6. Gallery
- 3-column grid on desktop (`grid-template-columns: repeat(3, 1fr)`), 2-col on tablet, 1-col on mobile.
- Gap: `--gut` (36px) horizontal, 56px vertical.
- 9 cards (vol-02 → vol-10). Each card is a `figure`:
  - **Composite frame:** aspect-ratio 4/3, rounded 6px, overflow-hidden.
  - **Background photo:** an `<image-slot>` web component — a drag-and-drop placeholder with placeholder text. Each slot has a unique `id` and `placeholder` (e.g. "drop a kitchen photo"). When implementing in Astro, replicate this with a styled empty `<div>` for v1 (the drag-and-drop only matters in the design tool); fall back to placeholder gradients keyed off `tone: 'warm' | 'cool' | 'dim'`. Future: a real upload widget hooked to R2.
  - **PiP screen:** bottom-left, 28% wide, 9/19.5 aspect, dark fake-phone bezel (same recipe as hero, smaller). Inside: a **mock iOS screen** (Maps / Messages / Music / Notes / Safari / Calendar / Photos / Wallet / Code).
  - **Caption** (below the figure): vol number in mono accent, italic title, faded `when · where`. e.g. `VOL. 02   morning, no destination — sun · 9:14 am · kitchen, oakland`.

The mock-iOS screens live in `mock-screens.jsx`. Each one is hand-built with HTML/CSS — no real screenshots — to evoke the app without infringing. Reproduce in Astro as small components or inline templates. **Important:** these are *suggestive abstractions*, not pixel copies of Apple UI. Keep them stylized (faded, slightly desaturated, "mid-2010s zine aesthetic"). Don't try to perfectly match Apple's marks/glyphs.

### 7. Footer
- Three columns: brand mark + tagline / nav links (about, archive, app, contact) / waitlist form.
- Waitlist form: single email input + submit button labeled "Reserve a volume". Mono caps. Hook to a Cloudflare Worker that POSTs to your email service.
- Bottom strip: small mono caps copy — `© 2026 SCREENGRAM · A WEEKLY · MADE WITH LOVE FOR PHOTOS YOU'D OTHERWISE LOSE`.

## Interactions & Behavior

- **Hover on cards**: subtle lift (`transform: translateY(-2px)`, shadow deepens), 180ms ease.
- **Hover on subscribe pill**: bg fades from `--ink` to `--accent`.
- **Image-slot drop** (only relevant if you keep the user-uploadable archive): on file drop, replace placeholder with the dropped image, persist to localStorage by slot id. For v1, you may skip this entirely.
- **Smooth-scroll** anchor links from topbar to sections.
- **No JS-required hard requirements** — the page should render and be readable with JS off (Astro's static output handles this naturally).
- **Reduced motion**: respect `prefers-reduced-motion: reduce` — disable hover lifts, transition durations to 0.01ms.

## State Management

None on v1. The page is fully static. The waitlist form posts and resets.

## Design Tokens

### Color palette (cream — the published default)

| Token       | Hex       | Usage                             |
|-------------|-----------|-----------------------------------|
| `--bg`      | `#f0e7d3` | Page background (warm cream)      |
| `--paper`   | `#f5ecd9` | Card / surface background         |
| `--ink`     | `#1a140e` | Primary text                      |
| `--faded`   | `#6e5f48` | Secondary text, captions          |
| `--rule`    | `#1a140e` | Hairline borders (used at 18–30% alpha) |
| `--accent`  | `#a3431a` | Vol numbers, eyebrows, drop caps  |

Other palettes exist in the prototype (`sepia`, `newsprint`, `cool`, `ink`) — **do not implement them on the marketing site for v1**. Lock to `cream`.

### Typography

| Family             | Source        | Weights          | Use                                                |
|--------------------|---------------|------------------|----------------------------------------------------|
| **Newsreader**     | Google Fonts  | 300–800 + italic | Wordmark, headings, body, captions                 |
| **JetBrains Mono** | Google Fonts  | 400, 500, 600    | Eyebrows, mono labels, vol numbers, footer micro   |

Typographic scale used:
- Wordmark: `clamp(72px, 14vw, 196px)` italic 400, ls −0.04em
- H1 (gallery / section heads): `clamp(40px, 5.5vw, 56px)` italic 400, ls −0.025em
- H2 / sub: 24–32px italic 400
- Body (manifesto): 22px regular, lh 1.42, ls −0.005em
- UI/labels: 13px mono 500, ls +0.06em
- Eyebrows: 11–12px mono 600 uppercase, ls +0.16em–+0.18em
- Caption micro: 11px mono uppercase, ls +0.04em

### Spacing scale

Use Tailwind defaults. Site-specific custom values:
- `--gut`: 36px (page horizontal padding)
- `--maxw`: 1240px (page max-width)
- Section vertical rhythm: 80px between major sections, 56px within (gallery rows), 28px essay segment padding.

### Border radius

- Pill buttons: `999px`
- Cards / figures: `6px`
- Phone bezel outer: inherited from PiP frame (~14px on hero, scaled on cards)
- Phone bezel inner screen: 9% radius (rounded relative to bezel size)

### Shadows

- Card hover: `0 14px 30px rgba(26,20,14,0.12)`
- Phone bezel: `0 18px 40px rgba(0,0,0,0.45), 0 0 0 1.5px rgba(0,0,0,0.6)` (hero); scale down for gallery cards.
- PiP inset highlight: `inset 0 0.5px 0 rgba(255,255,255,0.18)`

### Background paper grain

Two stacked `radial-gradient` dot patterns at 3px and 7px sizes, at 2.5% and 1.8% black alpha, slightly offset. Subtle but important — without it the cream looks digital.

```css
background-image:
  radial-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
  radial-gradient(rgba(0,0,0,0.018) 1px, transparent 1px);
background-size: 3px 3px, 7px 7px;
background-position: 0 0, 1.5px 2px;
```

## Assets

In `images/`:
- `vol-1-photo.jpg` — beach sunset, hero background. User-supplied. Must ship.
- `vol-1-screen.png` — iPhone YouTube Music screenshot, hero PiP. User-supplied. Must ship.

The 9 gallery cards reference image-slot placeholders, not real photos. For launch, use either:
- Generated gradient placeholders (per-card `tone: warm | cool | dim`), or
- 9 stock-but-good photos of moments-with-a-screen the user provides later.

Both fonts (Newsreader, JetBrains Mono) are Google Fonts — load via `<link>` in `<head>` with `display=swap`, or self-host for performance.

## Deployment notes

1. `npm create astro@latest` → minimal template, TypeScript strict, Tailwind integration.
2. `npx astro add cloudflare` for the Cloudflare adapter.
3. Wire up Tailwind `theme.extend` with the palette + font families above.
4. Push to GitHub.
5. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → pick repo → framework preset Astro → deploy.
6. Custom Domains → add `screengram.app` and `www.screengram.app`. If the domain is already on Cloudflare DNS, it auto-provisions; otherwise add a `CNAME` to `<project>.pages.dev`.
7. **Waitlist endpoint**: create a Cloudflare Worker (or reuse Pages Functions) at `/api/waitlist` that POSTs to your email-capture provider (Buttondown / ConvertKit / Resend audience). Validate with Cloudflare Turnstile.
8. Set `compatibility_date` and bind any env vars (`WAITLIST_API_KEY`, `TURNSTILE_SECRET`) via the Pages dashboard.

## Files in this bundle

| File | Role |
|---|---|
| `Screengram.html` | Entry point — open this in a browser to see the design live |
| `concept-page.jsx` | Top-level React component, all sections, palette system, content |
| `concept.css` | Hand-written CSS — palette vars, layout, typography, composite primitives |
| `mock-screens.jsx` | The stylized iOS-screen abstractions used in the gallery PiP cards |
| `tweaks-panel.jsx` | Authoring-only Tweaks panel — **do not port to production** |
| `image-slot.js` | Drag-and-drop placeholder web-component — not needed for marketing v1 |
| `images/vol-1-photo.jpg` | Hero background photo |
| `images/vol-1-screen.png` | Hero PiP screenshot |

## Out of scope for this handoff

- The iOS app itself (separate spec — `Screengram App.html` in the parent design project).
- Authenticated user accounts / per-user archives.
- Any backend beyond the waitlist endpoint.
- Android.

## Questions to resolve before building

1. Final waitlist provider — Buttondown / ConvertKit / Resend / homegrown D1 table?
2. Is the gallery content (vol-02 → vol-10) shipped as static placeholders, or does the user want to seed it with 9 real photos before launch?
3. Subscribe button copy — "Get notified" / "Join the waitlist" / "Reserve a volume"?
4. Any analytics? (Cloudflare Web Analytics is free + privacy-respecting and adds zero JS.)

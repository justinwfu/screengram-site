# Handoff: Screengram marketing site (v2 — classic landing page)

## Overview

This is the design handoff for the redesigned **Screengram marketing site** (`screengram.app`). The previous version was a magazine/manifesto-style essay; this redesign replaces it with a **classic app landing page**: navbar, hero with a phone mockup, three-step pitch, an annotated "the loop" section with four phone screens, an 8-card features grid, a layouts showcase, pull quotes, a final CTA, and a footer.

The repo to update is **`justinwfu/screengram-site`** (Astro 6 + Tailwind v4, deployed to Cloudflare Pages on push to `main`).

## About the design files

The bundled files (`concept-page.jsx`, `concept.css`, `mock-screens.jsx`, `images/*`) are **design references built as a working React + CSS prototype**. They are NOT production code — the task is to recreate this design as Astro components in the existing `screengram-site` repo, idiomatically (`.astro` files, the existing Tailwind setup, React islands only when interactivity is required).

Drop the bundled files into `screengram-site/design-export/`, overwriting the stale versions. Then port the components — section by section — into `src/components/`. Wire them into `src/pages/index.astro`. Keep `src/layouts/Layout.astro` (head, SEO, fonts, analytics) intact.

## Fidelity

**High-fidelity.** Pixel-precise mockups with final colors, typography, spacing, layout, and proportions. Reproduce to spec.

## Design tokens (lift verbatim)

```css
/* :root — cream palette only. Other palettes in concept-page.jsx are authoring-only. */
--bg:     #f0e7d3;
--paper:  #f5ecd9;
--card:   #fbf6e8;
--ink:    #1a140e;
--faded:  #6e5f48;
--rule:   #1a140e;
--accent: #a3431a;

--serif:  'Newsreader', 'Source Serif 4', Georgia, serif;
--mono:   'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;

--maxw:   1180px;
--gut:    28px;
```

Type families are already self-hosted via Astro 6's `fonts` config in the repo — no change needed.

## Page structure (top-to-bottom)

Match the order in `concept-page.jsx`'s `ConceptPage()` component.

### 1. Nav (sticky)
- Sticky to top, `backdrop-filter: blur(14px)`, half-opaque cream background
- Left: `:S` mark (italic Newsreader, accent-rust) + "screengram" italic wordmark
- Center: link list — `how it works`, `features`, `layouts`, `try the demo` — mono, uppercase, tracked 0.16em, color `--faded`
- Right: pill button "join the TestFlight" (ink bg, cream text, mono uppercase, leading accent-rust dot with `pulse` animation)
- Hairline bottom border in `color-mix(in oklab, --rule 20%, transparent)`
- ≤880px viewport: hide center links, keep mark + CTA

### 2. Hero
- Two-column grid (1.1fr text / 0.9fr phone), 48px gap, vertically centered
- **Left**:
  - Pill eyebrow: `[● dot]  new for iOS · TestFlight open` (card bg, hairline, dot is accent-rust with pulse halo)
  - H1 — italic serif, `clamp(44px, 5.4vw, 72px)`, ls -0.035em, line-height 0.98, text-wrap balance. Copy: `your screenshots, plus where you were when you took them.` ("plus" is italic + accent)
  - Sub — 19px faded serif, max-width 520px. Copy: "Screengram pairs every screenshot with a photo of the room. One image, two realities — filed into a tiny private library that only you can see."
  - CTA row — primary "join the TestFlight" (ink pill, hovers to accent) + ghost "open the live demo" (border, hovers to faint ink wash)
  - Meta strip — mono uppercase, tracked 0.14em: `iOS 17+ · free, no account · private by default`
- **Right**: `PhoneMock` (big) with `images/vol-1-photo.jpg` (beach sunset) as the photo half, Safari mock as the PiP at corner `bl`, caption "will rogers beach — sun 6:31 pm" tucked bottom-right. 4 confetti dots animated with a 6s `drift` cycle.
- **Below grid**: rounded card strip — `a screengram is —` + `📷 a back-camera photo` + `＋` + `📱 a screenshot` + `=` + accent-rust chip "one image you'll actually remember"
- ≤880px viewport: stack to one column

### 3. Pitch — three-step explainer
- Section header: mono small "— how it works —" (accent), then italic h2 "three taps, one weirdly honest photo."
- 3 cards in a row, gap 16px. Each card:
  - Card bg, 18px radius, 24px padding, hairline border
  - Mono small step number "01" / "02" / "03" in accent
  - Italic serif h3 (26px): "screenshot anything." / "open screengram." / "frame the room. file it."
  - Faded paragraph (15px) — see `concept-page.jsx`/`Pitch()` for exact copy

### 4. The Loop — 4 alternating phone rows
- Section header: "— the loop —", "screenshot → room → library.", sub "It takes about eight seconds. We timed it."
- 4 rows stacked, each in a card (radius 24, padding 32 40, hairline). Rows alternate direction (`grid-template-columns: 1fr 1.4fr` vs `1.4fr 1fr`).
- Each row has a **PhoneFrame** (220px wide, aspect 9/19.5, black bezel + island) holding one of four screen mock components, plus a copy block: mono step number + italic h3 + faded paragraph.

The four loop screens (see `LoopScreen` in `concept-page.jsx`):
- **`HomeScreen`** — masthead "screengram." italic, 5-tile recent strip (using `p-cafe`, `p-bedroom-night`, `p-kitchen-warm`, `p-city-dawn`, `p-night-phone`), daily prompt card with "● today's prompt · day 47" + italic prompt + ink "TAKE IT" pill + skip, big GO shutter (radial cream→bg outer with ink stroke + accent core), "use latest" hero row, 5-tab bar
- **`CamScreen`** — viewfinder with `images/p-city-dawn.png` background (crosswalk shot, dimmed by 35%), corner brackets, semi-transparent Safari screenshot overlay positioned bottom-left, "drag · pinch" caption, "● frame the room" pill, control bar with retake / large white shutter / zoom
- **`ReviewScreen`** — "— review —" mono / italic "file it.", composite stage with `images/p-kitchen-warm.png` background + Maps mock as PiP + "heaven is a place on earth" caption italic, PIP/SBS/STACK segmented selector, "retake" ghost + "file to library" italic pill
- **`LibraryScreen`** — title "library", "⌕ search captions, places" pill, by-album/by-month chips, 2-col grid of 6 tiles (each tile uses a different photo via `:nth-child(N) .scr-lib-bg` → `p-cafe`, `p-bedroom-night`, `p-kitchen-warm`, `p-city-dawn`, `p-night-phone`, `p-street-night`), 5-tab bar (library selected)

### 5. Features grid
- Section header: "— what's inside —", "small app. big rectangle energy."
- 4-col grid (2-col @1080px, 1-col @540px), gap 12px
- 8 cards. Each: 40×40 icon tile (bg=--bg, accent text, hairline) + italic h3 (22px) + faded paragraph (14px)
- Cards (text in concept-page.jsx `Features()`): daily prompt, three layouts, reveal reels, albums, home screen widget, share extension, search & filter, private by default
- Hover: lift 3px + faintly tinted accent wash

### 6. Layouts — dark inverted showcase
- Full-width inverted block: bg=--ink, color=--bg, 28px radius, 60px padding
- Two-column grid (1fr / 1fr)
- **Left**: "— three layouts —", italic h2 "same pair. different vibe.", paragraph, segmented switcher (`PiP | side-by-side | stack`). When `pip` selected, a second mini segmented appears for corner: `TL TR BL BR`
- **Right**: large `PhoneMock` with `images/p-kitchen-warm.png` background + Notes mock as the inset, caption "desk, before light — tue 6:51 am"
- **This section needs interactivity** — implement as an Astro island with React (`client:visible`)
- ≤880px: stack to one column

### 7. Quotes
- 3 columns, gap 16px (1-col @880px)
- Each quote: hairline top border, italic serif blockquote (22px), faded mono small `— beta tester · <city>`

### 8. Final CTA
- Accent-rust card (28px radius, 56px padding, with subtle decorative blobs absolutely-positioned for texture)
- Two-column grid (1.4fr text / 1fr actions)
- Left: "— ready? —" mono / italic h2 "gram something." (em on "something" colored --bg) / "The TestFlight is open. iOS 17+. Free. No account."
- Right: cream pill "join the TestFlight" + secondary link "or try the live demo first ↗"

### 9. Footer
- Hairline top border, 40px top padding, 4-col row (2-col @880px)
- Columns: `PUBLISHER → screengram press`, `SET IN → newsreader & jetbrains mono`, `EST. → 2026, late`, `CONTACT → hi@screengram.app`
- Below: italic serif tagline "what you were looking at, and where you were while you looked at it."
- Below: mono small "© 2026 — printed on a rectangle."

## Shared building blocks

### `PhoneMock` (Hero + Layouts showcase)
260px wide (300px when `big`), aspect 9/19.5, black bezel with rounded 44px radius, dynamic-island bar centered top, inner content at 34px radius, overflow hidden, dropshadow.

Three layout modes (passed as `layout` prop):
- **PiP** (default): photo fills entire screen, screenshot inset at 38% width with phone aspect ratio + small radius + outline shadow, anchored via `corner` prop (`tl|tr|bl|br`). Corner offsets: 14px from the matching edges; `top: 46px` for top corners so it clears the dynamic island.
- **SBS**: inner element gets `display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 100%;`. Photo in column 1, screen in column 2.
- **Stack**: `grid-template-rows: 1fr 1fr; grid-template-columns: 100%;`. Photo on top row, screen on bottom row.

`pm-pip .pm-caption` is hidden; the other modes show the caption tucked bottom-right.

### `PhoneFrame` (Loop screens)
Smaller (220px wide), 32px bezel radius, simpler island, 24px inner radius. Just hosts whichever screen component you pass.

### `MockScreens.jsx`
Lift the existing `MockScreens.jsx` as-is (already in the repo at `src/components/MockScreens.jsx`). It exports stylized iOS-screen abstractions (`MockMaps`, `MockMessages`, `MockMusic`, `MockNotes`, `MockSafari`, `MockCalendar`, `MockPhotos`, `MockWallet`, `MockCode`). **Critical:** they are designed at ~220px wide. Any container smaller than ~150px needs to apply the PiP-scaling pattern below.

### PiP scaling (CSS container queries)

When a Mock is placed in a small container (PiP corner, library tile, recent-strip thumb), the mock content (fixed at 220px design width) must scale down via container queries:

```css
.pm-screen-pip,
.scr-cam-overlay,
.scr-review-pip,
.scr-lib-pip {
  container-type: inline-size;
}
.pm-screen-pip > *,
.scr-cam-overlay > *,
.scr-review-pip > *,
.scr-lib-pip > * {
  position: absolute !important;   /* MUST be !important — the mocks set position: relative inline */
  top: 0 !important; left: 0 !important;
  width: 220px !important;
  height: calc(220px * 19.5 / 9) !important;
  transform-origin: top left;
  transform: scale(calc(100cqi / 220px));
}
```

The `!important` on `position` is non-negotiable — `screenSurface()` in `MockScreens.jsx` writes `position: relative` as an inline style. Without `!important` the mock contributes its full intrinsic height (~477px) to the parent, breaking the aspect-ratio layout.

## Assets

All in `design-export-bundle/images/`:

| File | Use |
|---|---|
| `vol-1-photo.jpg` | Hero phone photo half (Will Rogers Beach sunset, 4032×3024 JPEG, 2.7MB — optimize via Astro `<Image>` to AVIF widths `[640, 1024, 1440, 2048]`, quality 60) |
| `p-cafe.png` | Loop home strip #1, library tile #1, latest-thumb |
| `p-bedroom-night.png` | Loop home strip #2, library tile #2 |
| `p-kitchen-warm.png` | Loop home strip #3, library tile #3, ReviewScreen bg, Layouts showcase phone |
| `p-city-dawn.png` | Loop home strip #4, library tile #4, **CamScreen viewfinder bg** |
| `p-night-phone.png` | Loop home strip #5, library tile #5 |
| `p-street-night.png` | Library tile #6 |
| `p-kitchen-dim.png` | Reserve / future use |

All photos are user-supplied portrait/landscape stock. Use Astro `<Image>` with appropriate widths.

## Interactions / state

- **Nav links** — anchor scroll to `#how`, `#features`, `#layouts`, plus `<a href="Screengram App.html">` for demo (or rewire to wherever the iOS prototype lives now)
- **Hero CTAs** — `#cta` anchor + demo link
- **Layouts showcase** — interactive `useState` switcher for `layout` (`pip`/`sbs`/`stack`) and `corner` (`tl`/`tr`/`bl`/`br`). Re-renders the `PhoneMock`. **Implement as Astro React island** (`client:visible`)
- **Confetti** — pure CSS `@keyframes drift` (6s ease-in-out, infinite, staggered delays per dot)
- **Pulsing accent dot** in nav CTA + hero eyebrow — pure CSS `@keyframes pulse` (2.4s opacity 1 → 0.4 → 1)
- **Feature card hover** — translate -3px + bg tint
- **Button hover** — translate -1px, primary swaps ink → accent on hover, ghost gets a faint ink wash

No client-side data fetching, forms, or routing in this redesign. Cloudflare Web Analytics (already configured in `Layout.astro` via `PUBLIC_CF_ANALYTICS_TOKEN`) keeps tracking pageviews.

## Component map (delete / add)

**Delete from `src/components/`:**
`Topbar.astro`, `Masthead.astro`, `Manifesto.astro`, `Gallery.astro`, `GalleryHeader.astro`, `Composite.astro`, `HeroScreenshot.astro`, `ImageSlot.astro`, `CTA.astro`, `Colophon.astro`

**Add to `src/components/`:**
`Nav.astro`, `Hero.astro`, `PhoneMock.astro`, `Pitch.astro`, `Loop.astro`, `LoopRow.astro` (optional), `LoopScreen.astro` (or four separate `LoopScreenHome.astro` / `LoopScreenCam.astro` / `LoopScreenReview.astro` / `LoopScreenLibrary.astro`), `Features.astro`, `Layouts.tsx` or `Layouts.jsx` (React island), `Quotes.astro`, `FinalCTA.astro`, `Footer.astro`

**Keep as-is:**
`MockScreens.jsx`, `CloudflareAnalytics.astro`

**Wire up in `src/pages/index.astro`:**
```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Pitch from '../components/Pitch.astro';
import Loop from '../components/Loop.astro';
import Features from '../components/Features.astro';
import Layouts from '../components/Layouts.tsx';
import Quotes from '../components/Quotes.astro';
import FinalCTA from '../components/FinalCTA.astro';
import Footer from '../components/Footer.astro';
---
<Layout>
  <Nav />
  <main>
    <Hero />
    <Pitch />
    <Loop />
    <Features />
    <Layouts client:visible />
    <Quotes />
    <FinalCTA />
    <Footer />
  </main>
</Layout>
```

## Files in this handoff

- `concept-page.jsx` — React source, every section is a function, read top-to-bottom
- `concept.css` — design tokens, layout, every CSS class used. Most styles port 1:1 to Tailwind utilities; complex bits (the `:root` block, the `@keyframes`, the container-query PiP scaling, the SBS/Stack grid math) belong in `src/styles/concept.css`
- `mock-screens.jsx` — the iOS-screen abstractions (same as the existing `src/components/MockScreens.jsx`)
- `images/*` — all photos and the original vol-1 hero shot
- `demo/` — the interactive iOS prototype the marketing CTAs link to. Drop into `public/demo/` in the Astro repo; the CTAs (`Nav`, `Hero`, `FinalCTA`) should link to `/demo/`. See `demo/README.md` for details.

## Constraints from `screengram-site/CLAUDE.md`

Repeating because they still apply:

- Cream palette only. Ignore the Tweaks panel from the prototype — authoring-only.
- Mock iOS screens stay stylized; don't move them toward Apple HIG, don't swap in SF Symbols.
- `Screengram App.html` is out of scope here. The iOS prototype is a separate workstream.
- Never commit directly to `main`. Feature branch + squash-merged PR.
- No `any` in TypeScript.
- Astro islands only when interactivity is required (Layouts switcher is the only one in this redesign).
- All images via Astro `<Image>`.

## Acceptance checklist

- [ ] All 10 old components removed; 9–12 new components added
- [ ] `pages/index.astro` imports the new components in the order above
- [ ] Cream palette tokens in `concept.css`'s `:root`; no other palette references
- [ ] Newsreader + JetBrains Mono via Astro 6 `fonts` config (unchanged from current repo)
- [ ] Hero PhoneMock renders the beach photo with Safari PiP at bottom-left
- [ ] All 8 feature cards present with correct icons + copy
- [ ] Layouts switcher works: clicking PiP/SBS/Stack changes the phone composite; clicking corners works only when PiP is selected
- [ ] CamScreen viewfinder shows the city-dawn crosswalk photo, dimmed
- [ ] PiP scaling rules include `position: absolute !important` — otherwise mock contents break aspect ratios
- [ ] SBS uses `grid-template-rows: 100%`; Stack uses `grid-template-columns: 100%` — otherwise grid children collapse to 0 in one axis
- [ ] No client-side JS shipped from the loop / hero / features / footer (Astro static only)
- [ ] `npm run build && npm run preview` produces a working static site
- [ ] Lighthouse scores hold: Performance ≥ 95, Accessibility 100, SEO 100
- [ ] PR opened from feature branch; Cloudflare Pages preview URL renders correctly before squash-merge

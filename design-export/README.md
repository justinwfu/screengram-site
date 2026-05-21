# Design export — Screengram marketing site (v2, classic landing)

Drop these files into the screengram-site repo's `design-export/` folder, overwriting:

- concept-page.jsx
- concept.css
- mock-screens.jsx (unchanged from prior — included for completeness)
- images/vol-1-photo.jpg (unchanged — hero beach photo)
- images/p-*.png (NEW — 7 photos for gallery tiles, viewfinder, layouts)

## What changed

The marketing page was redesigned from the manifesto/essay format to a classic app landing page. New structure (read concept-page.jsx top-to-bottom):

1. Nav — sticky, wordmark, section links, pulsing "join the TestFlight" CTA
2. Hero — eyebrow chip + large italic headline + sub + 2 CTAs + meta strip + PhoneMock (beach photo bg, Safari PiP), confetti, "a + b = c" strip
3. Pitch — 3 cards (screenshot / open / frame & file)
4. Loop — 4 alternating phone mockups, each rendered via LoopScreen (HomeScreen / CamScreen / ReviewScreen / LibraryScreen) with step copy
5. Features — 8 cards (daily prompt, three layouts, reveal reels, albums, widget, share extension, search/filter, private)
6. Layouts — dark inverted section with interactive PiP/SBS/Stack switcher (needs an Astro island)
7. Quotes — 3 testimonial pull-quotes
8. FinalCTA — accent-rust card "gram something."
9. Footer — 4-col colophon + tagline

## Components to delete from src/components

Topbar, Masthead, Manifesto, Gallery, GalleryHeader, Composite, HeroScreenshot, ImageSlot, CTA, Colophon

## Components to add to src/components

Nav, Hero, PhoneMock, Pitch, Loop, LoopScreen (or four separate screen components), Features, Layouts (island), Quotes, FinalCTA, Footer

## Constraints

- Cream palette only. No TweaksPanel — that was authoring-only.
- Mock screens stay as stylized abstractions; don't move them toward Apple HIG.
- Keep `Layout.astro` head/SEO/fonts intact. Just rewire `pages/index.astro` to import the new components in order.

## CSS to lift verbatim into Tailwind theme

See concept.css `:root` block for tokens. Class-based styles can either be Tailwind utilities or live in `src/styles/concept.css` as today — your call.

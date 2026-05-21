# Live demo — iOS prototype

This folder is the interactive iOS prototype that the marketing-site CTAs link to ("open the live demo", "try the demo", "or try the live demo first").

## How to ship it

The simplest path: drop this whole `demo/` folder into the Astro site's `public/` directory. Cloudflare Pages will serve it as static assets:

```
screengram-site/
  public/
    demo/                   <-- this folder, as-is
      index.html
      app.css
      *.jsx
      images/...
```

Visitors hit `https://screengram.app/demo/` and load the prototype. `index.html` is served by default for the directory.

## Wiring the CTAs

The marketing page links currently say `href="Screengram App.html"`. In the Astro components, change those to `href="/demo/"`:

- `Nav.astro` — "try the demo" link
- `Hero.astro` — "open the live demo" ghost button
- `FinalCTA.astro` — "or try the live demo first ↗" link

## What's inside

- `index.html` — entry point (was `Screengram App.html`)
- `app.css` — design tokens + per-screen styles for the iOS prototype
- `screengram-app.jsx` — root React component, screen router, all 14 screens
- `ios-frame.jsx` — iPhone bezel component
- `mock-screens.jsx` — same iOS-screen abstractions used in the marketing site
- `tweaks-panel.jsx` — in-page tweaks UI (palette switcher, layout switcher, etc). **This is authoring chrome.** Leave it in if you want testers/visitors to fiddle with options; otherwise delete the `<TweaksPanel>` and `<SideRail>` JSX blocks from `screengram-app.jsx` and drop both files.
- `images/` — photos used as composite backgrounds

## Caveats

- Ships React 18 + ReactDOM + Babel-standalone from unpkg (~250KB gzipped). Fine for a prototype demo; not OK for production-grade pages. If you ever want to pre-compile, the JSX files would need a small Vite or esbuild setup.
- No SEO meta beyond `<title>` — it's a prototype, not a destination page.
- Fonts load from Google Fonts (Newsreader + JetBrains Mono). Matches the marketing site.

## Alternative: single-file bundle

If you'd rather ship one self-contained `.html` instead of a folder of files, I can produce that on request — it inlines all CSS / JSX / fonts / images as base64 or via data URLs.

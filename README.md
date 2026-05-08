# screengram-site

Marketing site for [screengram.app](https://screengram.app). Astro + Tailwind, deployed to Cloudflare Pages.

## Stack

- **Astro 6** (static output)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **React 19** via `@astrojs/react` (used as SSR-only for the mock-screen leaf components — no client-side JS shipped)
- **TypeScript** strict
- **Self-hosted fonts** via Astro 6's built-in `fonts` config (Newsreader + JetBrains Mono, downloaded at build, preloaded)
- **`@astrojs/sitemap`** for `sitemap-index.xml`

## Local development

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # static output to dist/
npm run preview      # preview the production build locally
```

### Env vars

Copy `.env.example` to `.env` and set values you need locally. The only public env var is:

- `PUBLIC_CF_ANALYTICS_TOKEN` — Cloudflare Web Analytics token. Beacon only renders in production builds when this is set.

### Regenerate placeholder branding

```sh
node scripts/og-gen.mjs
```

Regenerates `public/og.png`, `public/favicon.svg`, `public/favicon-32.png`, and `public/apple-touch-icon.png` from inline SVG. Re-run after branding changes.

## Repo layout

- `src/pages/` — file-based routes (`index.astro`, `404.astro`)
- `src/layouts/Layout.astro` — head defaults, SEO, OG, JSON-LD, fonts, analytics mount
- `src/components/` — section components (`Hero.astro`, `Manifesto.astro`, etc.)
- `src/components/MockScreens.jsx` — 9 stylized iOS-screen abstractions used by `Gallery.astro`. Server-rendered to static HTML at build (no `client:` directive).
- `src/styles/` — `global.css` (Tailwind import) + `concept.css` (design tokens + layout)
- `src/assets/` — images optimized via Astro `<Image>` (hero photo + screen)
- `public/` — static assets served as-is (favicons, OG card, robots.txt)
- `design-export/` — original Claude Design handoff (reference; not built)
- `scripts/og-gen.mjs` — one-shot brand-asset generator

## Git workflow

`main` is always deployable. **Never commit directly to `main`.** Every change goes through a feature branch and a squash-merged PR. Full details in [CONTRIBUTING.md](./CONTRIBUTING.md).

## Deploy

Cloudflare Pages builds and deploys on every push to GitHub.

- **Production:** `main` → `https://screengram.app`
- **Previews:** every PR gets a preview URL (`<branch>.<project>.pages.dev`)

### Initial Cloudflare Pages setup

1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → select `justinwfu/screengram-site`
2. **Build command:** `npm run build`
3. **Output directory:** `dist`
4. **Production branch:** `main`
5. Enable preview deployments for non-production branches (default).
6. Add custom domains: `screengram.app` and `www.screengram.app` (set up `www → apex` redirect at the domain level if not auto).
7. Web Analytics: Cloudflare Dashboard → Web Analytics → Add a site → copy the token → set `PUBLIC_CF_ANALYTICS_TOKEN` env var on the Production environment in Pages → trigger a redeploy.

### GitHub repo settings

- Settings → General → Pull Requests → check "Automatically delete head branches" and set default merge style to "Squash and merge."
- Settings → Branches → branch protection rule on `main`: require pull request before merging.

## Performance

Lighthouse against `npm run preview` (simulated mobile, 4G):

| Category       | Score |
| -------------- | ----- |
| Performance    | 96    |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |

Hero photo is delivered as responsive AVIF (`widths=[640, 1024, 1440, 2048]`, `sizes="(max-width: 1240px) 100vw, 1240px"`, `quality=60`). Fonts are self-hosted with `<link rel="preload">`. No render-blocking external requests.

## Post-deploy checklist

After the first Cloudflare deploy completes:

- [ ] Verify `https://screengram.app` loads with a valid SSL cert and HTTPS redirect is on.
- [ ] Verify `https://www.screengram.app` redirects to the apex.
- [ ] `https://screengram.app/sitemap-index.xml` returns the sitemap. Submit it in Google Search Console (Property → Sitemaps → Add).
- [ ] `https://screengram.app/robots.txt` returns allow-all + sitemap link.
- [ ] OG card renders correctly: paste the URL into [opengraph.xyz](https://www.opengraph.xyz/) or share on Slack/Discord.
- [ ] Cloudflare Web Analytics property set up; `PUBLIC_CF_ANALYTICS_TOKEN` env var set on Pages Production; redeployed; pageview shows up in the dashboard within ~5 min.
- [ ] Hit a non-existent URL (e.g. `/foo`) → renders the themed 404 page, returns HTTP 404.
- [ ] GitHub repo settings:
  - "Require pull request before merging" on `main` enabled
  - "Automatically delete head branches" enabled
  - Default merge style: "Squash and merge"

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Design constraints

- Use the `cream` palette only. Ignore the Tweaks panel from the Claude Design export — that's authoring-only.
- Mock iOS screens in `mock-screens.jsx` are intentionally stylized abstractions, not real iOS. Do not adjust them toward Apple's HIG, do not swap in SF Symbols, do not "improve" them to look more like iOS.
- `Screengram App.html` is out of scope for this project. It's a separate handoff later. Do not port it, link to it, or reference it.

## Workflow

- Never commit to `main`. Always work on a feature branch.
- Squash merge PRs. Delete branches after merge.
- Wait for explicit "continue" from the user before starting the next phase.

## Stack

- Astro 6 (latest), TypeScript strict
- Tailwind CSS v4 via `@tailwindcss/vite`
- React integration (`@astrojs/react`) — used as Astro islands only when interactivity is required
- Target: static output, deployed to Cloudflare Pages
- Custom domain: `screengram.app`

## Conventions

- No client-side JS unless a component genuinely needs it (Astro islands sparingly).
- All images optimized via Astro `<Image>`.
- No `any` in TypeScript.
- Tailwind for styling — extend `tailwind.config` / CSS theme tokens for the `cream` palette and the two type families (Newsreader, JetBrains Mono).

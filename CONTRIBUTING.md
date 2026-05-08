# Contributing

## Git workflow

`main` is always deployable. Never commit directly to `main`.

### Branching

- Branch off `main` for every change: `git checkout main && git pull && git checkout -b <branch-name>`
- Phase work uses the convention `phase-N-short-description` (e.g. `phase-2-port-design`).
- Other work uses a short, descriptive branch name (e.g. `fix-hero-shadow`, `add-og-image`).

### Committing

- Commit frequently within a branch with descriptive messages.
- Conventional-commit-ish prefixes are nice but not required (`feat:`, `fix:`, `chore:`, `docs:`).

### Opening a PR

1. Push the branch: `git push -u origin <branch-name>`
2. Open a PR to `main`. The PR template (`.github/pull_request_template.md`) prompts you for:
   - **Summary** — what this PR is for
   - **Changes** — bullet list of what changed
   - **Test plan** — how to verify
   - **Screenshots** — for any UI change
3. Wait for CI / preview deploy (Cloudflare Pages auto-deploys every PR).

### Merging

- **Squash merge** every PR — keeps `main` history linear and readable.
- **Delete the branch** after merge (GitHub setting: "Automatically delete head branches").
- Locally: `git checkout main && git pull && git branch -d <branch-name>`.

### Phase rhythm

Phases are completed sequentially. After a phase's PR merges:
1. Summarize what shipped.
2. Wait for explicit "continue" before starting the next phase.

## Local development

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # production build to dist/
npm run preview      # preview the production build locally
```

## Repo layout

- `src/pages/` — file-based routing
- `src/layouts/` — page layouts (head defaults, base HTML scaffolding)
- `src/components/` — reusable Astro/React components
- `src/styles/global.css` — Tailwind entry
- `public/` — static assets served as-is
- `design-export/` — design reference bundle (not shipped)

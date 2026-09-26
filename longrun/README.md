# Longrun

Single-screen landing page for Longrun, a frontier data research lab building evaluations and dynamic environments that leading AI labs use to measure, train, and improve frontier models. Standalone Next.js app: its own package, lockfile and Vercel config. It shares nothing with the SPV Ventures root app or `kulon-space/`, so it can be moved into its own repository by copying this folder.

## Development

```sh
cd longrun
npm ci
npm run dev
```

## Validation

```sh
npm run build
npm run typecheck
```

## Files

- `app/page.tsx`: page content and sections
- `app/terrain.tsx`: hero visual (isometric dot terrain that keeps shifting, with one agent trail running across it; respects reduced motion)
- `app/globals.css`: design tokens, typography and layout
- `app/layout.tsx`: metadata, domain, fonts
- `public/favicon.svg`: brand mark

## Before launch

- Domain: `longrun.ai` in `app/layout.tsx` is a placeholder.
- Contact/careers emails in `app/page.tsx` are placeholders; Browse has no catalog yet and falls back to email.
- Copy is draft positioning, not verified product claims.
- Hosting: create a Vercel project with Root Directory `longrun` (or a separate repo). Not deployed yet.

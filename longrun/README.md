# Longrun

Marketing site for Longrun, a company building dynamic reinforcement learning environments for long-horizon agents. Standalone Next.js app: its own package, lockfile and Vercel config. It shares nothing with the SPV Ventures root app or `kulon-space/`, so it can be moved into its own repository by copying this folder.

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
- `app/horizon.tsx`: hero visual (procedural canvas: changing environment lanes + agent trajectory + event log; respects reduced motion)
- `app/globals.css`: design tokens, typography and layout
- `app/layout.tsx`: metadata, domain, fonts
- `public/favicon.svg`: brand mark

## Before launch

- Domain: `longrun.ai` in `app/layout.tsx` is a placeholder.
- Contact/careers emails in `app/page.tsx` are placeholders.
- Environment families and copy are draft positioning, not verified product claims.
- Hosting: create a Vercel project with Root Directory `longrun` (or a separate repo). Not deployed yet.

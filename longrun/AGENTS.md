# Longrun maintenance

- Application directory: `longrun/` (standalone; do not share code or dependencies with the repo root app or `kulon-space/`).
- Design: dark graphite background, bone text, one amber accent (`--accent`), Instrument Serif display + Inter Tight body + JetBrains Mono labels, single screen (logo, visual, headline, buttons; no long-read sections). Keep it distinct from Idler (light, centered, multicolor).
- Validate with `npm run build` and `npm run typecheck` from this directory before pushing.
- Never commit credentials, node_modules, .next or .vercel.

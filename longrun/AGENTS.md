# Longrun maintenance

- Application directory: `longrun/` (standalone; do not share code or dependencies with the repo root app or `kulon-space/`).
- Design: single-screen landing on a near-black background with grainy blue glow rising from the bottom (`app/glow.tsx`, styles in `globals.css`). Centered white logo, tag line, headline, subline, three pill buttons (Contact solid white; Browse, Careers glass outline). No long-read sections.
- Use Longrun's own name, logo and copy; do not copy third-party wordmarks or text.
- Validate with `npm run build` and `npm run typecheck` from this directory before pushing.
- Never commit credentials, node_modules, .next or .vercel.

# Longrun maintenance

- Application directory: `longrun/` (standalone; do not share code or dependencies with the repo root app or `kulon-space/`).
- Design: single-screen landing on light grey. Centered logo, shifting dot terrain with an orange agent trail (`app/terrain.tsx`), tag line, headline, subline, three pill buttons (Contact primary dark with orange arrow; Browse, Careers outline). No long-read sections.
- Use Longrun's own name, logo and copy; do not copy third-party wordmarks or text.
- Validate with `npm run build` and `npm run typecheck` from this directory before pushing.
- Never commit credentials, node_modules, .next or .vercel.

# Longrun maintenance

- Application directory: `longrun/` (standalone; do not share code or dependencies with the repo root app or `kulon-space/`).
- Design: warm off-white, black type, thin rules, Inter + JetBrains Mono. One accent (`signal`) used only to mark the world changing in diagrams. No gradients, blobs, stock art or icon cards.
- Copy: the company is early. Never add customers, traction, metrics, partnerships, papers, benchmarks, logos or testimonials. Present the environment model as a research direction.
- Edit name, domain and contact in `app/site.ts` only.
- Validate with `npm run build` and `npm run typecheck` from this directory before pushing.
- Never commit credentials, node_modules, .next or .vercel.

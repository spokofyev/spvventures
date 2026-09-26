# Longrun

Launch site for Longrun (placeholder name), an early-stage research lab building dynamic, long-horizon environments for training and evaluating AI agents. Standalone Next.js app, independent of the repo-root SPV Ventures app and `kulon-space/`.

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

- `app/site.ts`: company name, domain, contact email, title and description (single source)
- `app/page.tsx`: section order
- `app/components/hero.tsx`, `sections.tsx`: page copy
- `app/components/episode.tsx`: static benchmark vs. illustrative long-horizon episode diagram
- `app/components/reveal.tsx`: one-time staggered reveal for diagrams (off for reduced motion; content visible without JS)
- `app/opengraph-image.tsx`, `robots.ts`, `sitemap.ts`: SEO and share image
- `app/globals.css`: Tailwind theme tokens

## Before launch

- Name, domain and email in `app/site.ts` are placeholders; `hello@longrun.ai` does not exist yet.
- Not deployed. Create a Vercel project with Root Directory `longrun`.
- Copy rules: no customers, metrics, partners, papers or logos. The environment model is a research direction, not a product.

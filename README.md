# SPV Ventures websites

This repository contains three independent applications.

| Application | Source | Hosting |
| --- | --- | --- |
| SPV Ventures | Repository root (`src/`, `public/`) | Existing SPV Ventures Vercel project |
| Kulon Space | [`kulon-space/`](kulon-space/) | Vercel project `kulon-space`, https://kulonspace.com |
| Longrun | [`longrun/`](longrun/) | Static export served by the SPV Ventures project at https://spvventures.co/longrun (files in `public/longrun/`) |

For Kulon Space updates, follow [`kulon-space/AGENTS.md`](kulon-space/AGENTS.md) and its [development guide](kulon-space/README.md). Its Vercel Root Directory must be `kulon-space`; edits are committed and pushed to `main` for automatic publication.

The root application uses its own package.json, lockfile and Vercel configuration. Keep the applications independent when changing build settings or dependencies.

## Deploy isolation

Both Vercel projects deploy from `main`, so each skips builds that don't touch its own files (`ignoreCommand` in each `vercel.json`):

- **SPV Ventures** (root `vercel.json`): skips when a commit only changes `kulon-space/` or `longrun/`.
- **Kulon Space** (`kulon-space/vercel.json`): skips when a commit doesn't change `kulon-space/`.

Keep the SPV Ventures site on `main` up to date; a build of the root app always ships whatever the root holds on `main`.

## Longrun at spvventures.co/longrun

`longrun/` is the source. `cd longrun && npm run export:spv` builds a static export with base path `/longrun` into `public/longrun/`; commit that folder with the source change. Pushing to `main` then redeploys spvventures.co (the root `ignoreCommand` sees the `public/` change). Root `vercel.json` routes `/longrun` to `public/longrun/index.html` before the SPA catch-all.

# SPV Ventures websites

This repository contains three independent applications.

| Application | Source | Hosting |
| --- | --- | --- |
| SPV Ventures | Repository root (`src/`, `public/`) | Existing SPV Ventures Vercel project |
| Kulon Space | [`kulon-space/`](kulon-space/) | Vercel project `kulon-space`, https://kulonspace.com |
| Longrun | [`longrun/`](longrun/) | Not deployed yet; see [`longrun/README.md`](longrun/README.md) |

For Kulon Space updates, follow [`kulon-space/AGENTS.md`](kulon-space/AGENTS.md) and its [development guide](kulon-space/README.md). Its Vercel Root Directory must be `kulon-space`; edits are committed and pushed to `main` for automatic publication.

The root application uses its own package.json, lockfile and Vercel configuration. Keep the applications independent when changing build settings or dependencies.

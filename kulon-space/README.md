# Kulon Space

The Kulon Space website is a standalone Next.js app in this folder. The SPV Ventures app at the repository root is separate.

## Production

- Domain: https://kulonspace.com
- Git: https://github.com/spokofyev/spvventures/tree/main/kulon-space
- Vercel project: `kulon-space`
- Production branch: `main`
- Vercel Root Directory: `kulon-space`
- Runtime: Node.js 24

Push changes to `main` to trigger the existing Vercel Git integration. No manual build uploads or second copy of the site are needed. Verify the deployment for the pushed commit before declaring an update live. Domain setup is managed in the same Vercel project.

## Development

```sh
cd kulon-space
npm ci
npm run dev
```

## Validation

```sh
npm run build
npm run typecheck
```

## Files

- `app/page.tsx`: page content and section structure
- `app/globals.css`: shared typography and layout
- `app/layout.tsx`: title, description, canonical domain and fonts
- `public/favicon.svg`: brand icon
- `vercel.json`: deployment configuration
- `AGENTS.md`: instructions for future automated updates

Use the committed package lockfile. Keep local generated files and credentials out of Git. The former ChatGPT Sites copy is not the production editing target.

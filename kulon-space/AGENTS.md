# Kulon Space maintenance

## Canonical project
- Repository: https://github.com/spokofyev/spvventures
- Production branch: main
- Application directory: kulon-space/
- Vercel project: kulon-space (prj_kRuoq3WB6MC82zqxG2C1Izs0XbzW)
- Vercel team: spokofyevs-projects (team_Xm1KMDGtiQcQeSGxjmMWBbFa)
- Production domain: https://kulonspace.com

Use this directory as the source of truth. Do not publish future edits through the former ChatGPT Sites project. The repository-root SPV Ventures application is separate; preserve it.

## Update workflow
1. Pull current main and preserve unrelated changes.
2. Edit this application while keeping the established monochrome design.
3. From this directory run npm ci when dependency inputs change, npm run build, and npm run typecheck.
4. Commit and push the requested changes to GitHub. The user explicitly wants every update pushed.
5. Vercel's existing Git integration publishes main automatically. Verify the deployment for the exact pushed commit reaches READY, then check kulonspace.com.
6. Resolve failures before reporting success. If access or DNS blocks deployment, report the exact remaining blocker.

Use the existing Vercel project. Never create a replacement project or deploy the repository root for Kulon Space. Never commit credentials, node_modules, .next, or .vercel.

import type { NextConfig } from "next";
import path from "node:path";

// LONGRUN_BASE_PATH=/longrun builds a static export served under
// spvventures.co/longrun (see `npm run export:spv`). Without it, the app
// builds normally for its own Vercel project.
const basePath = process.env.LONGRUN_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(process.cwd()) },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(basePath ? { output: "export", basePath, trailingSlash: true, images: { unoptimized: true } } : {}),
};

export default nextConfig;

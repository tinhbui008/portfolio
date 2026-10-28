import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained Node server in .next/standalone — small Docker image for Coolify.
  output: "standalone",
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;

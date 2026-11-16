import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The old vercel.app address sends every visitor to the real domain.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "developnearly-website.vercel.app" }],
        destination: "https://developnearly.online/:path*",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify-specific optimizations - static export for quick deployment
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

};

export default nextConfig;

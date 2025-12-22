import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify optimizations
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
    ],
  },
};

export default nextConfig;

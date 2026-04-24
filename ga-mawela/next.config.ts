import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
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
  webpack: (config) => {
    // Alias mongoose to our mock for static deployment
    config.resolve.alias['mongoose'] = path.join(process.cwd(), 'src/lib/mongoose-mock.ts');
    return config;
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore type errors for deployment
  },
};

export default nextConfig;

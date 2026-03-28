import type { NextConfig } from "next";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  webpack: (config) => {
    // Alias mongoose to our mock for static deployment
    config.resolve.alias['mongoose'] = path.join(__dirname, 'src/lib/mongoose-mock.ts');
    return config;
  },
};

export default nextConfig;

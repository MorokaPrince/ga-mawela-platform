import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Alias mongoose to our mock for static deployment
    config.resolve.alias['mongoose'] = path.join(process.cwd(), 'src/lib/mongoose-mock.ts');
    return config;
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  webpack: (config, { isServer }) => {
    // Alias mongoose to our mock for static deployment
    config.resolve.alias['mongoose'] = path.join(process.cwd(), 'src/lib/mongoose-mock.ts');
    // Disable parallel processing
    config.parallelism = 1;

    // Ensure we're not using turbopack
    if (config.name === 'client' || config.name === 'server') {
      config.mode = 'production';
    }

    return config;
  },
};

export default nextConfig;

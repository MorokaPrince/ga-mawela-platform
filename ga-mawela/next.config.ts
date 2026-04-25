import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: false,
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;

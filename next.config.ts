import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip ESLint errors during production build
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config: any) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
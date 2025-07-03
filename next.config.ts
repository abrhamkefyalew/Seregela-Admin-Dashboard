import type { NextConfig } from "next";


const nextConfig: NextConfig = {

  /* config options here */

  webpack: (config: any) => {  // Explicitly type config parameter
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};


export default nextConfig;



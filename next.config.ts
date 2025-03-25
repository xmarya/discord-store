import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  experimental: {
    nodeMiddleware: true, // Enable Node.js middleware
  },
};

export default nextConfig;

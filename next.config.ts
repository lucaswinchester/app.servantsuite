import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    domains: [
      'images.unsplash.com',
      'img.clerk.com',
      'images.clerk.dev',
      'clerk.servantsuite.com',
    ],
  },
  // Required for Clerk's auth to work properly
  transpilePackages: ["@clerk/nextjs"],
};

export default nextConfig;

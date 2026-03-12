import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack due to CJK path bug
  turbopack: undefined,
  webpack: (config) => {
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;

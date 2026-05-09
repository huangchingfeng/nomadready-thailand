import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
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
  async redirects() {
    return [
      // Non-locale static pages → /en/...
      { source: '/guide', destination: '/en/guide', permanent: true },
      { source: '/pricing', destination: '/en/pricing', permanent: true },
      { source: '/tools', destination: '/en/tools', permanent: true },
      { source: '/tools/:path*', destination: '/en/tools/:path*', permanent: true },
      { source: '/privacy', destination: '/en/privacy', permanent: true },
      { source: '/terms', destination: '/en/terms', permanent: true },
      { source: '/changelog', destination: '/en/changelog', permanent: true },
      { source: '/cheat-sheet', destination: '/en/cheat-sheet', permanent: true },
      { source: '/pattaya-workation', destination: '/en/pattaya-workation', permanent: true },
      { source: '/pattaya-72-hour-workation-checklist', destination: '/en/pattaya-72-hour-workation-checklist', permanent: true },
      { source: '/pattaya-digital-nomad-guide', destination: '/en/pattaya-digital-nomad-guide', permanent: true },
      { source: '/jomtien-vs-pratumnak', destination: '/en/jomtien-vs-pratumnak', permanent: true },
      { source: '/pattaya-vs-phuket-digital-nomad', destination: '/en/pattaya-vs-phuket-digital-nomad', permanent: true },
      { source: '/thailand-beach-workation', destination: '/en/thailand-beach-workation', permanent: true },
      { source: '/pattaya-cost-of-living-digital-nomad', destination: '/en/pattaya-cost-of-living-digital-nomad', permanent: true },
      { source: '/pattaya-without-nightlife-trap', destination: '/en/pattaya-without-nightlife-trap', permanent: true },
      { source: '/best-thailand-cities-digital-nomads', destination: '/en/best-thailand-cities-digital-nomads', permanent: true },
      { source: '/thailand-workation-checklist', destination: '/en/thailand-workation-checklist', permanent: true },
      // Country guide chapters without locale → /en/...
      { source: '/thailand/:slug*', destination: '/en/thailand/:slug*', permanent: true },
      { source: '/bali/:slug*', destination: '/en/bali/:slug*', permanent: true },
      // Old /guide/:slug route → /en/thailand/:slug
      { source: '/guide/:slug', destination: '/en/thailand/:slug', permanent: true },
    ];
  },
};

export default nextConfig;

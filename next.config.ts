import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.loyaleservices.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'admin.loyaleservices.com',
        pathname: '/**',
      },
    ],
  },
  // output: 'export',
};

export default nextConfig;

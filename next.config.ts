import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,   // ✅ add this line
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.loyaleservices.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "admin.loyaleservices.com",
        pathname: "/**",
      },
    ],
  },
  // output: 'export',
};

export default nextConfig;

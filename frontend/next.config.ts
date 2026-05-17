import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nuraskin.cc",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {},
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.nuraskin.cc";
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
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
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

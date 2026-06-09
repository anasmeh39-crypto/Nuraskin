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

  // Long-lived cache headers for immutable static assets
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
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
    deviceSizes: [390, 640, 828, 1080, 1200],
    imageSizes: [48, 96, 192, 256, 384],
    minimumCacheTTL: 31536000,
    // Compress aggressively — quality 75 is visually identical for product photos
    dangerouslyAllowSVG: false,
    contentDispositionType: "inline",
    qualities: [75],
  },

  experimental: {},
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

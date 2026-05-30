import type { MetadataRoute } from "next";

const BASE_URL = "https://nuraskin.cc";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All crawlers — full access to public pages
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",           // API routes — no crawl value
          "/checkout/",      // Transactional flow
          "/thank-you",      // Post-purchase confirmation
          "/_next/",         // Next.js internals
          "/admin",          // Safety net
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

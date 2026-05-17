/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://nuraskin.cc",
  generateRobotsTxt: true,
  exclude: ["/thank-you", "/checkout/*", "/checkout/upsell"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/thank-you", "/checkout/upsell"] },
    ],
  },
};

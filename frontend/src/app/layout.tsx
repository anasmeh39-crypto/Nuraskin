import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { CheckoutPopup } from "@/components/checkout/CheckoutPopup";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { BRAND_ASSETS } from "@/config/brand";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nuraskin.cc"),
  title: {
    default: "Nura Skin | نورا سكين — عناية بشرة المغرب",
    template: "%s | Nura Skin",
  },
  description:
    "Nura Skin — روتين عناية بشرة متكامل بمكونات مختارة. سيروم نياسيناميد، كريم ليلي، سيروم محيط العين وواقي شمس SPF 50. توصيل مجاني والدفع عند الاستلام في جميع أنحاء المغرب.",
  keywords: [
    "Nura Skin", "nuraskin", "نورا سكين", "عناية بشرة المغرب",
    "روتين عناية بشرة", "سيروم نياسيناميد", "كريم ليلي المغرب",
    "واقي شمس SPF 50", "سيروم محيط العين",
    "skincare maroc", "sérum visage maroc", "routine beauté maroc",
    "paiement à la livraison", "COD maroc", "livraison gratuite maroc",
  ],
  openGraph: {
    siteName: "Nura Skin | نورا سكين",
    locale: "ar_MA",
    type: "website",
    // og image uses an existing product hero — /og-home.jpg was missing
    images: [{ url: "/images/nura-hero-lifestyle.png", width: 1200, height: 630, alt: "Nura Skin — روتين عناية بشرة متكامل" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nuraskin",
    creator: "@nuraskin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: BRAND_ASSETS.favicon, type: "image/png", sizes: "64x64" },
      { url: BRAND_ASSETS.icon, type: "image/png", sizes: "440x440" },
    ],
    shortcut: BRAND_ASSETS.favicon,
    apple: [{ url: BRAND_ASSETS.appleIcon, sizes: "180x180", type: "image/png" }],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nuraskin.cc/#organization",
      name: "Nura Skin",
      alternateName: "نورا سكين",
      url: "https://nuraskin.cc",
      logo: {
        "@type": "ImageObject",
        url: "https://nuraskin.cc/brand/nura-logo.png",
        width: 440,
        height: 440,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        areaServed: "MA",
        availableLanguage: ["Arabic", "French"],
      },
      areaServed: "MA",
      sameAs: ["https://www.instagram.com/nuraskin.ma"],
    },
    {
      "@type": "WebSite",
      "@id": "https://nuraskin.cc/#website",
      url: "https://nuraskin.cc",
      name: "Nura Skin | نورا سكين",
      publisher: { "@id": "https://nuraskin.cc/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://nuraskin.cc/products?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
      inLanguage: ["ar-MA", "fr-MA"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const snapPixelId = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;

  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect to pixel CDNs so they don't cold-start on first interaction */}
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://analytics.tiktok.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://sc-static.net" />
        {/* hreflang — tells Google this site serves ar-MA and fr-MA */}
        <link rel="alternate" hrefLang="ar-MA" href="https://nuraskin.cc" />
        <link rel="alternate" hrefLang="fr-MA" href="https://nuraskin.cc" />
        <link rel="alternate" hrefLang="x-default" href="https://nuraskin.cc" />
        {/* Organization + WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-nura-bg font-arabic antialiased text-nura-plum">
        <ScrollToTop />
        <Header />
        <main>{children}</main>
        <Footer />

        {/* Cart + Checkout — client components */}
        <CartDrawer />
        <CheckoutPopup />

        {/* ── Meta Pixel ── */}
        {metaPixelId && (
          <Script id="meta-pixel" strategy="lazyOnload">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {/* ── TikTok Pixel ── */}
        {tiktokPixelId && (
          <Script id="tiktok-pixel" strategy="lazyOnload">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
                ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var r=document.createElement("script");r.type="text/javascript";r.async=!0;r.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a)};
                ttq.load('${tiktokPixelId}');
                ttq.page();
              }(window, document, 'ttq');
            `}
          </Script>
        )}

        {/* ── Snapchat Pixel ── */}
        {snapPixelId && (
          <Script id="snap-pixel" strategy="lazyOnload">
            {`
              (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
              {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
              a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
              r.src=n;var u=t.getElementsByTagName(s)[0];
              u.parentNode.insertBefore(r,u);})(window,document,
              'https://sc-static.net/scevent.min.js');
              snaptr('init', '${snapPixelId}', {'user_email': ''});
              snaptr('track', 'PAGE_VIEW');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}

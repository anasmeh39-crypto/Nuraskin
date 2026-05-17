import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { CheckoutPopup } from "@/components/checkout/CheckoutPopup";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nuraskin.cc"),
  title: {
    default: "نورا سكين | عناية متكاملة للبشرة المغربية",
    template: "%s | نورا سكين",
  },
  description:
    "منتجات عناية بشرة مختارة بعناية للمرأة المغربية. سيروم توازن وإشراقة البشرة بالنياسيناميد، كريم التجديد الليلي للبشرة، وسيروم نضارة محيط العين. الدفع عند الاستلام.",
  keywords: ["عناية بشرة المغرب", "سيروم مغربي", "ناياسيناميد", "هالات", "مسام"],
  openGraph: {
    siteName: "NURA SKIN — نورا سكين",
    locale: "ar_MA",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/brand/logo-icon-official.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/brand/favicon-square.svg", type: "image/svg+xml" },
    ],
    shortcut: "/brand/logo-icon-official.svg",
    apple: [{ url: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" }],
  },
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
      </head>
      <body className="bg-nura-bg font-arabic antialiased text-nura-plum">
        <Header />
        <main>{children}</main>
        <Footer />

        {/* Cart + Checkout — client components */}
        <CartDrawer />
        <CheckoutPopup />

        {/* ── Meta Pixel ── */}
        {metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
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
          <Script id="tiktok-pixel" strategy="afterInteractive">
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
          <Script id="snap-pixel" strategy="afterInteractive">
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

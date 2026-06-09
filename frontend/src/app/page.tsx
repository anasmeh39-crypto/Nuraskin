import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  Moon,
  ShieldCheck,
  SunMedium,
} from "lucide-react";
import dynamic from "next/dynamic";

// ── Above-fold — eager ────────────────────────────────────────────────────────
import { HeroSection } from "@/components/home/HeroSection";
import { HeroTrustStrip } from "@/components/home/HeroTrustStrip";

// ── Below-fold — code-split ───────────────────────────────────────────────────
const CertificationsTrustStrip = dynamic(() =>
  import("@/components/home/CertificationsTrustStrip").then(m => m.CertificationsTrustStrip)
);
const HomeIngredientShowcase = dynamic(() =>
  import("@/components/home/HomeIngredientShowcase").then(m => m.HomeIngredientShowcase)
);
const HomePacksSection = dynamic(() =>
  import("@/components/home/HomePacksSection").then(m => m.HomePacksSection)
);
const TestimonialsSection = dynamic(() =>
  import("@/components/home/TestimonialsSection").then(m => m.TestimonialsSection)
);
import { PRODUCTS, BUNDLES } from "@/config/products";
import { ProductCard } from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "روتين متكامل لبشرة أكثر توازناً وإشراقاً | Nura Skin",
  description:
    "Formules de luxe pour l'équilibre de votre peau. Découvrez nos sérums et crèmes haute performance. Livraison gratuite & paiement à la livraison partout au Maroc.",
  keywords: [
    "nura skin maroc", "skincare maroc", "routine beauté maroc",
    "sérum visage", "crème de nuit", "SPF 50 maroc",
    "روتين عناية بشرة", "نورا سكين المغرب", "الدفع عند الاستلام",
  ],
  openGraph: {
    title: "روتين متكامل لبشرة أكثر توازناً وإشراقاً | Nura Skin",
    description: "Nura Skin — روتين عناية بشرة متكامل. سيروم نياسيناميد، كريم ليلي، سيروم محيط العين وواقي شمس SPF 50. توصيل مجاني والدفع عند الاستلام.",
    url: "https://nuraskin.cc",
    type: "website",
    images: [{ url: "/images/nura-hero-lifestyle.png", width: 1200, height: 630, alt: "Nura Skin — روتين عناية بشرة متكامل" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "روتين متكامل لبشرة أكثر توازنًا | Nura Skin",
    description: "Nura Skin — روتين عناية بشرة. الدفع عند الاستلام في المغرب.",
    images: ["/images/nura-hero-lifestyle.png"],
  },
  alternates: {
    canonical: "https://nuraskin.cc",
    languages: {
      "ar-MA": "https://nuraskin.cc",
      "fr-MA": "https://nuraskin.cc",
    },
  },
};

export default function HomePage() {
  const routineBundle = BUNDLES.find((bundle) => bundle.id === "nura-complete-ritual") ?? BUNDLES[0];

  return (
    <>
      {/* 1 ── Hero */}
      <HeroSection />

      {/* 2 ── Trust strip: COD, free delivery, quality */}
      <HeroTrustStrip />

      {/* 3 ── Problem identification: connect to her skin concerns */}
      <section className="bg-ivory py-8 md:py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="luxury-kicker mb-3">مشاكل يومية، حلول واضحة</p>
            <h2 className="section-heading text-[#3A222C]">عناية تفهم بشرتك… وتمنحها ما تحتاجه كل يوم</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: SunMedium,
                title: "بهتان وعدم التوازن",
                text: "ملي كتفيقي وكتحسي بشرتك باهتة، مرهقة وما فيهاش داك الإشراق الطبيعي… كتحتاجي خطوة يومية لطيفة ترجع ليها التوازن والصفاء.",
                image: "/images/problem-dullness-portrait.png",
                imageClass: "scale-100 object-cover object-[46%_24%] opacity-[0.99] saturate-[1.04] contrast-[1.03]",
                href: "/products/nura-balance",
                cta: "سيروم النياسيناميد",
              },
              {
                icon: Moon,
                title: "بشرة متعبة ليلاً",
                text: "بعد يوم طويل، البشرة كتكون محتاجة عناية هادئة تساعدها تبان أكثر نعومة وراحة مع روتين ليلي بسيط.",
                image: "/images/problem-tired-skin-closeup.jpeg",
                imageClass: "scale-100 object-cover object-[35%_50%] opacity-[0.99] saturate-[1.04] contrast-[1.04]",
                href: "/products/nura-night-renewal",
                cta: "كريم الريتينول الليلي",
              },
              {
                icon: Eye,
                title: "محيط عين مرهق",
                text: "التعب، السهر، والخدمة كيبانو بسرعة حول العينين… وهاد المنطقة كتحتاج عناية خفيفة ومركزة باش تبان أكثر انتعاشاً.",
                image: "/images/problem-eye-fatigue-closeup.png",
                imageClass: "scale-100 object-cover object-[42%_48%] opacity-[0.99] saturate-[1.05] contrast-[1.05]",
                href: "/products/nura-eye-revive",
                cta: "سيروم محيط العين",
              },
              {
                icon: ShieldCheck,
                title: "حماية صباحية",
                text: "كل صباح، البشرة كتحتاج طبقة حماية خفيفة تساعدها تحافظ على مظهر صحي ومشرق خلال اليوم.",
                image: "/images/problem-morning-protection-portrait.png",
                imageClass: "scale-100 object-cover object-[34%_50%] opacity-[0.99] saturate-[1.05] contrast-[1.03]",
                href: "/products/nura-spf-50",
                cta: "إيكران الشمس SPF 50",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="relative min-h-[25.5rem] overflow-hidden rounded-[2rem] border border-rose-soft/25 bg-white shadow-[0_18px_54px_rgba(61,44,50,0.075)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_68px_rgba(142,90,104,0.13)]"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[62%] overflow-hidden" aria-hidden>
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                      className={card.imageClass}
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 top-[42%] h-[32%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,250,246,0.54)_62%,rgba(255,255,255,0.90)_100%)]" aria-hidden />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_84%_72%,rgba(248,224,226,0.12),transparent_34%)]" aria-hidden />
                  <div className="absolute inset-x-4 bottom-4 z-10 rounded-[1.4rem] border border-white/34 bg-white/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.74),0_12px_34px_rgba(61,44,50,0.065)] backdrop-blur-[1.5px]">
                    <Icon className="mb-4 h-6 w-6 text-rose-mid" strokeWidth={1.5} />
                    <h3 className="text-xl font-bold leading-snug text-[#3A222C]">{card.title}</h3>
                    <p className="mt-3 text-[13px] leading-7 text-[#5F4A51]">{card.text}</p>
                    <Link
                      href={card.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-rose-mid hover:underline"
                    >
                      {card.cta}
                      <ArrowLeft className="h-3 w-3" strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 ── Bundle offers: the conversion section — before solo products to anchor price high */}
      <HomePacksSection />

      {/* 5 ── Product grid: individual products for those who want to start with one */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="luxury-kicker mb-3">مجموعة نورا سكين</p>
            <h2 className="section-heading text-[#3A222C]">أو ابدئي بمنتج واحد</h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product, idx) => (
              <div key={product.slug} className="animate-premium-rise" style={{ animationDelay: `${idx * 90}ms` }}>
                <ProductCard product={product} showBadge={idx === 0} badge="الأكثر اختيارًا" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 ── Social proof: reviews & testimonials */}
      <TestimonialsSection />

      {/* 7 ── Ingredient education: for skeptics still reading */}
      <HomeIngredientShowcase />

      {/* 8 ── Certifications: legitimacy after desire is established */}
      <CertificationsTrustStrip />

      {/* 9 ── Final CTA: direct path to order */}
      <section className="px-4 py-10 md:py-14">
        <div className="container-wide overflow-hidden rounded-[2rem] border border-[#E7D8CB] bg-[#FAF3EE] shadow-[0_20px_60px_rgba(97,70,58,0.11)]">
          {/* Split: image left (end in RTL) · text right (start in RTL) */}
          <div className="grid md:grid-cols-[1fr_1fr]" dir="ltr">

            {/* Image panel — physical left on desktop, top on mobile */}
            <div className="relative min-h-[240px] overflow-hidden md:min-h-[420px]">
              <Image
                src="/images/routine-complete-family.png"
                alt="روتين نورا سكين الكامل — 4 منتجات"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center"
                priority={false}
              />
              {/* Fade edge toward text panel on desktop */}
              <div
                className="pointer-events-none absolute inset-0 hidden md:block"
                style={{ background: "linear-gradient(to right, transparent 55%, #FAF3EE 100%)" }}
                aria-hidden
              />
              {/* Fade edge on mobile (bottom) */}
              <div
                className="pointer-events-none absolute inset-0 md:hidden"
                style={{ background: "linear-gradient(to bottom, transparent 60%, #FAF3EE 100%)" }}
                aria-hidden
              />
            </div>

            {/* Text panel — physical right on desktop, bottom on mobile */}
            <div className="flex flex-col items-center justify-center px-7 pb-10 pt-6 text-center md:items-start md:px-12 md:py-14 md:text-start" dir="rtl">
              <p className="luxury-kicker mb-3">روتين نورا سكين</p>
              <h2 className="text-[1.75rem] font-semibold leading-snug text-[#3A222C] md:text-[2.25rem] md:leading-[1.2]">
                ابدئي روتيني<br className="hidden md:block" /> نورا سكين اليوم
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-7 text-[#6B5555] md:max-w-sm">
                عناية ناعمة، نتائج واضحة — توصيل مجاني لجميع أنحاء المغرب.
              </p>

              {/* Trust bullets */}
              <ul className="mt-5 space-y-2">
                {[
                  "الدفع عند الاستلام — ما تخلصي حتى توصلي",
                  "توصيل مجاني لجميع المدن",
                  "إرجاع مجاني خلال 30 يوم",
                ].map((t) => (
                  <li key={t} className="flex items-center justify-center gap-2.5 text-sm text-[#6B5555] md:justify-start">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-mid" />
                    {t}
                  </li>
                ))}
              </ul>

              <Link
                href="/packs"
                className="mt-8 inline-flex w-full flex-col items-center justify-center rounded-full bg-[#6B2D3A] px-9 py-4 text-sm font-bold text-white shadow-[0_14px_36px_rgba(107,45,58,0.28)] transition hover:-translate-y-0.5 hover:brightness-110 md:w-auto md:items-start"
              >
                <span>اطلبي الروتين الكامل — {routineBundle.price} درهم</span>
                <span className="mt-0.5 text-[11px] font-normal opacity-75">
                  الدفع عند الاستلام · توصيل مجاني
                </span>
              </Link>
              <p className="mt-3 text-xs text-[#9C836E]">
                توفيري {routineBundle.saving} درهم مقارنة بالشراء المنفرد
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

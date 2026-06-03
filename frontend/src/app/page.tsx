import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
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
    description: "Formules de luxe pour l'équilibre de votre peau. Livraison COD gratuite au Maroc.",
    url: "https://nuraskin.cc",
    type: "website",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630, alt: "Nura Skin — Routine Complète" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "روتين متكامل لبشرة أكثر توازنًا | Nura Skin",
    description: "Formules de luxe. Livraison COD gratuite au Maroc.",
    images: ["/og-home.jpg"],
  },
  alternates: { canonical: "https://nuraskin.cc" },
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
      <section className="bg-ivory py-16 md:py-20">
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
              },
              {
                icon: Moon,
                title: "بشرة متعبة ليلاً",
                text: "بعد يوم طويل، البشرة كتكون محتاجة عناية هادئة تساعدها تبان أكثر نعومة وراحة مع روتين ليلي بسيط.",
                image: "/images/problem-tired-skin-closeup.jpeg",
                imageClass: "scale-100 object-cover object-[35%_50%] opacity-[0.99] saturate-[1.04] contrast-[1.04]",
              },
              {
                icon: Eye,
                title: "محيط عين مرهق",
                text: "التعب، السهر، والخدمة كيبانو بسرعة حول العينين… وهاد المنطقة كتحتاج عناية خفيفة ومركزة باش تبان أكثر انتعاشاً.",
                image: "/images/problem-eye-fatigue-closeup.png",
                imageClass: "scale-100 object-cover object-[42%_48%] opacity-[0.99] saturate-[1.05] contrast-[1.05]",
              },
              {
                icon: ShieldCheck,
                title: "حماية صباحية",
                text: "كل صباح، البشرة كتحتاج طبقة حماية خفيفة تساعدها تحافظ على مظهر صحي ومشرق خلال اليوم.",
                image: "/images/problem-morning-protection-portrait.png",
                imageClass: "scale-100 object-cover object-[34%_50%] opacity-[0.99] saturate-[1.05] contrast-[1.03]",
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 ── Product grid: the 4 individual products */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="luxury-kicker mb-3">مجموعة نورا سكين</p>
            <h2 className="section-heading text-[#3A222C]">أربعة منتجات أساسية لروتين متكامل</h2>
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

      {/* 5 ── Bundle offers: the conversion section */}
      <HomePacksSection />

      {/* 6 ── Social proof: reviews & testimonials */}
      <TestimonialsSection />

      {/* 7 ── Ingredient education: for skeptics still reading */}
      <HomeIngredientShowcase />

      {/* 8 ── Certifications: legitimacy after desire is established */}
      <CertificationsTrustStrip />

      {/* 9 ── Final CTA: direct path to order */}
      <section className="px-4 py-16 md:py-16">
        <div className="container-wide relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-[#E7D8CB] bg-[#F8EEE8] text-center shadow-[0_26px_74px_rgba(97,70,58,0.13)] md:min-h-[28rem]">
          <Image
            src="/images/cta-routine-atmosphere.png"
            alt=""
            fill
            sizes="100vw"
            className="scale-[1.02] object-cover object-[44%_50%] md:scale-100 md:object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,250,246,0.42)_0%,rgba(255,252,248,0.82)_32%,rgba(255,252,248,0.84)_68%,rgba(255,250,246,0.40)_100%)] md:bg-[linear-gradient(90deg,rgba(255,250,246,0.28)_0%,rgba(255,252,248,0.72)_34%,rgba(255,252,248,0.76)_64%,rgba(255,250,246,0.30)_100%)]" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.62),rgba(255,252,248,0.28)_44%,transparent_74%)] md:bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.48),rgba(255,252,248,0.18)_42%,transparent_72%)]" aria-hidden />
          <div className="relative z-10 mx-auto flex min-h-[34rem] max-w-[22rem] flex-col items-center justify-center px-6 pb-16 pt-20 md:min-h-[28rem] md:max-w-xl md:px-8 md:py-14">
            <h2 className="max-w-[18rem] text-[2rem] font-semibold leading-[1.25] text-[#6F5046] md:max-w-none md:text-4xl md:leading-tight">
              ابدئي روتين نورا سكين اليوم
            </h2>
            <p className="mx-auto mt-5 max-w-[18rem] text-sm leading-8 text-[#81695F] md:mt-4 md:max-w-lg">
              عناية ناعمة، نتائج واضحة — توصيل مجاني لجميع أنحاء المغرب.
            </p>
            <Link
              href="/packs"
              className="mt-9 inline-flex w-full flex-col items-center justify-center rounded-full border border-[#D9BFAE] bg-[linear-gradient(135deg,#8A655A,#B98D72)] px-9 py-4 font-bold text-white shadow-[0_18px_42px_rgba(137,94,78,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(137,94,78,0.26)] md:mt-8 md:w-auto md:px-8 md:shadow-[0_16px_38px_rgba(137,94,78,0.20)]"
            >
              <span>اطلبي الروتين الكامل — {routineBundle.price} درهم</span>
              <span className="mt-1 text-[11px] font-normal opacity-80">
                الدفع عند الاستلام — ما تخلصي حتى توصلي
              </span>
            </Link>
            <p className="mt-4 text-xs text-[#9C836E]">
              توفيري {routineBundle.saving} درهم مقارنة بالشراء المنفرد · إرجاع مجاني
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

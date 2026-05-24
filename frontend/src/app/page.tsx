import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Droplets,
  Eye,
  FlaskConical,
  Moon,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Truck,
} from "lucide-react";
import { CertificationsTrustStrip } from "@/components/home/CertificationsTrustStrip";
import { HomeIngredientShowcase } from "@/components/home/HomeIngredientShowcase";
import { HomePacksSection } from "@/components/home/HomePacksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PRODUCTS, BUNDLES } from "@/config/products";
import { ProductCard } from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "نورا سكين | عناية متكاملة لبشرة أكثر توازنًا",
  description:
    "منتجات عناية بشرة مختارة بعناية لروتين يومي واضح. سيروم النياسيناميد، كريم التجديد الليلي، سيروم محيط العين، وواقي الشمس اليومي SPF 50. الدفع عند الاستلام وتوصيل مجاني لجميع أنحاء المغرب.",
  openGraph: {
    title: "نورا سكين | NURA SKIN",
    description: "عناية بشرة مدروسة بروتين بسيط وناعم",
    url: "https://nuraskin.cc",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://nuraskin.cc" },
};

export default function HomePage() {
  const routineBundle = BUNDLES.find((bundle) => bundle.id === "nura-complete-ritual") ?? BUNDLES[0];

  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#FDFAF6_0%,#FDF5F7_55%,#FAF0F2_100%)]">
        <div className="premium-ambient absolute inset-0 opacity-80" aria-hidden />
        <div className="premium-glow premium-glow-a absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/60 blur-3xl" />
        <div className="premium-glow premium-glow-b absolute bottom-0 right-0 h-72 w-72 rounded-full bg-rose-soft/25 blur-3xl" />
        <div className="absolute left-[16%] top-[24%] h-2 w-2 rounded-full bg-[#D7B9A8]/35 premium-particle" aria-hidden />
        <div className="absolute right-[11%] top-[18%] h-3 w-3 rounded-full bg-white/50 premium-particle premium-particle-delay" aria-hidden />
        <div className="container-wide relative grid items-center gap-6 py-6 pb-12 md:grid-cols-2 md:gap-10 md:py-24">
          <div className="animate-premium-rise order-2 text-center md:order-1 md:text-right">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-rose-mid md:mb-5 md:text-xs">NURA SKIN — نورا سكين</p>
            <h1 className="text-[2rem] font-bold leading-[1.16] text-[#3A222C] md:text-6xl md:leading-tight">
              روتين عناية ناعم لبشرة أكثر توازنًا وإشراقًا
            </h1>
            <p className="mx-auto mt-3 max-w-[22rem] text-sm leading-7 text-[#6B5555] md:mx-0 md:mt-6 md:max-w-xl md:text-lg md:leading-8">
              أربع تركيبات أساسية مختارة بعناية لتدعم احتياجات البشرة اليومية، من الإشراقة إلى الحماية الصباحية، دون تعقيد أو وعود مبالغ فيها.
            </p>
            <div className="mt-5 grid grid-cols-2 justify-center gap-2 md:mt-8 md:flex md:gap-3 md:justify-start">
              <Link href="/products" className="rounded-full bg-rose-deep px-4 py-3 text-center text-sm font-bold text-white shadow-rose-md transition hover:opacity-90 md:px-8 md:py-4 md:text-base">
                اكتشفي المجموعة
              </Link>
              <Link href="/about" className="rounded-full border border-rose-soft bg-white/70 px-4 py-3 text-center text-sm font-bold text-rose-deep transition hover:bg-white md:px-8 md:py-4 md:text-base">
                لماذا نورا؟
              </Link>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 md:mt-8 md:gap-3">
              {[
                { icon: ShieldCheck, text: "الدفع عند الاستلام" },
                { icon: Truck, text: "توصيل مجاني لجميع أنحاء المغرب" },
                { icon: FlaskConical, text: "تركيبات مختارة بعناية" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl border border-rose-soft/30 bg-white/75 px-2 py-2 text-center text-[10px] font-semibold leading-4 text-[#3A222C] shadow-[0_10px_28px_rgba(61,44,50,0.035)] md:min-h-0 md:flex-row md:gap-2 md:px-4 md:py-3 md:text-sm">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-rose-mid md:h-4 md:w-4" strokeWidth={1.5} />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="premium-float order-1 relative mx-auto w-[min(94vw,42rem)] max-w-xl md:order-2 md:w-full lg:max-w-2xl">
            <div className="rounded-[1.65rem] border border-white/80 bg-white/70 p-2.5 shadow-rose-lg backdrop-blur md:rounded-[2.5rem] md:p-4">
              <div className="overflow-hidden rounded-[1.35rem] bg-[radial-gradient(circle_at_50%_42%,rgba(244,216,182,0.28),rgba(250,247,244,0.82)_42%,rgba(227,226,222,0.62)_100%)] md:rounded-[2rem]">
                <Image
                  src="/images/nura-complete-routine-hero.png"
                  alt="روتين نورا سكين الكامل للعناية بالبشرة"
                  width={1693}
                  height={929}
                  priority
                  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 46vw, 92vw"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
            <div className="absolute -bottom-3 right-3 rounded-2xl border border-rose-soft/30 bg-white/95 px-4 py-3 shadow-rose-sm backdrop-blur md:-bottom-5 md:-right-3 md:rounded-3xl md:px-5 md:py-4">
              <p className="text-xs font-bold text-[#3A222C] md:text-sm">روتين متكامل</p>
              <p className="text-[10px] text-[#9B8A8A] md:text-xs">إشراقة، تجديد، عين، وحماية</p>
            </div>
          </div>
        </div>
      </section>

      <CertificationsTrustStrip />

      <section className="bg-white py-16 md:py-20">
        <div className="container-wide grid gap-8 md:grid-cols-3">
          {[
            { icon: FlaskConical, title: "تركيبات مختارة بعناية", text: "مكونات مدروسة بعناية لتناسب احتياجات بشرتك اليومية." },
            { icon: Sparkles, title: "روتين بسيط وفعّال", text: "عناية يومية واضحة تساعدك على الحفاظ على توازن البشرة وإشراقتها." },
            { icon: Droplets, title: "عناية تناسب روتينك اليومي", text: "خطوات واضحة ومكونات معروفة لدعم توازن البشرة وإشراقتها." },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="animate-premium-rise group relative min-h-[18.5rem] overflow-hidden rounded-[1.75rem] border border-rose-soft/20 bg-[linear-gradient(145deg,#FFFFFF,#FDF8F8)] p-8 shadow-[0_18px_52px_rgba(61,44,50,0.065)] transition-all duration-300 hover:-translate-y-1 hover:border-rose-soft/40 hover:shadow-[0_24px_68px_rgba(142,90,104,0.14)] md:min-h-[19rem] md:p-7"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {idx === 0 && (
                  <>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-[74%] overflow-hidden md:w-[64%]" aria-hidden>
                      <Image
                        src="/images/feature-ingredients-lab.png"
                        alt=""
                        fill
                        sizes="(min-width: 768px) 22vw, 74vw"
                        className="scale-[1.03] object-cover object-[18%_52%] opacity-[0.98] saturate-[1.04] contrast-[1.04]"
                      />
                    </div>
                    <div className="pointer-events-none absolute left-[3%] top-5 h-24 w-36 rounded-full bg-white/18 blur-2xl" aria-hidden />
                    <div className="pointer-events-none absolute bottom-6 left-[16%] h-20 w-44 rounded-full bg-[#EFD8C9]/18 blur-2xl" aria-hidden />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,252,249,0.05)_34%,rgba(255,252,249,0.30)_61%,rgba(253,248,248,0.76)_100%)]" aria-hidden />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_20%,rgba(248,224,226,0.18),transparent_34%)]" aria-hidden />
                    <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-white/15 via-white/55 to-transparent" aria-hidden />
                  </>
                )}
                {idx === 1 && (
                  <>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-[68%] overflow-hidden md:w-[62%]" aria-hidden>
                      <Image
                        src="/images/moroccan-model-card-2.png"
                        alt=""
                        fill
                        sizes="(min-width: 768px) 21vw, 68vw"
                        className="scale-[1.03] object-cover object-[6%_62%] opacity-[0.92] saturate-[1.04] contrast-[1.03] md:object-[8%_62%]"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,250,246,0.10)_34%,rgba(255,250,246,0.56)_66%,rgba(253,248,248,0.88)_100%)]" aria-hidden />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(248,224,226,0.22),transparent_38%)]" aria-hidden />
                  </>
                )}
                {idx === 2 && (
                  <>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-[68%] overflow-hidden md:w-[62%]" aria-hidden>
                      <Image
                        src="/images/retinol-texture-card-3.jpeg"
                        alt=""
                        fill
                        sizes="(min-width: 768px) 21vw, 68vw"
                        className="scale-[1.03] object-cover object-[6%_51%] opacity-[0.94] saturate-[1.05] contrast-[1.04]"
                      />
                    </div>
                    <div className="pointer-events-none absolute left-[32%] top-[22%] h-28 w-24 rounded-full bg-white/16 blur-xl" aria-hidden />
                    <div className="pointer-events-none absolute left-[23%] bottom-[18%] h-16 w-32 rounded-full bg-[#F2DCCF]/20 blur-xl" aria-hidden />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,250,246,0.12)_36%,rgba(255,250,246,0.58)_66%,rgba(253,248,248,0.88)_100%)]" aria-hidden />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_22%,rgba(248,224,226,0.22),transparent_38%)]" aria-hidden />
                  </>
                )}
                <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-blush text-rose-deep transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon className="h-5 w-5" strokeWidth={1.25} />
                </div>
                <div className={`relative z-10 -m-3 ml-auto max-w-[76%] rounded-2xl p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_12px_34px_rgba(61,44,50,0.055)] backdrop-blur-[3px] sm:max-w-[72%] md:max-w-[62%] ${idx === 0 ? "border border-white/38 bg-white/70" : "border border-white/48 bg-white/78"}`}>
                  <h2 className="text-[1.35rem] font-bold leading-snug text-[#3A222C]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#5F4A51]">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

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
                image: "/images/skincare-texture-card-1.png",
                imageClass: "scale-[1.04] object-cover object-left opacity-100 saturate-[1.16] contrast-[1.14] mix-blend-multiply",
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

      <HomePacksSection />

      <section className="bg-rose-blush py-16 md:py-20">
        <div className="container-wide grid items-center gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <div className="order-2 md:order-1">
            <p className="luxury-kicker mb-3">روتين متكامل</p>
            <h2 className="section-heading text-[#3A222C]">روتين متكامل لبشرة أكثر توازنًا وإشراقًا</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B5555]">
              اجمعي سيروم التوازن، كريم الليل، سيروم محيط العين، وواقي الشمس في نظام واحد يدعم العناية الصباحية والليلية.
            </p>
            <div className="mt-7 space-y-3">
              {["العناية الصباحية", "الحماية اليومية", "العناية الليلية", "عناية محيط العين"].map((step, idx) => (
                <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-ivory-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-light text-xs font-bold text-rose-deep">0{idx + 1}</span>
                  <span className="font-semibold text-[#3A222C]">{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-4 border-t border-white/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-[#9B8A8A]">{routineBundle.name_ar}</p>
                <p className="text-sm text-[#9B8A8A]">
                  القيمة الكاملة: <span className="line-through">{routineBundle.compareAtPrice} درهم</span>
                </p>
                <p className="text-2xl font-bold text-rose-deep">سعر الروتين: {routineBundle.price} درهم</p>
                <p className="text-xs font-bold text-emerald-700">وفّري {routineBundle.saving} درهم</p>
              </div>
              <Link href="/products" className="rounded-full bg-rose-deep px-6 py-3 text-center text-sm font-bold text-white shadow-rose-md transition hover:bg-[#774956]">
                اكتشفي الروتين الكامل
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="premium-float rounded-[2rem] border border-white/75 bg-[linear-gradient(145deg,#FFFDFC,#F7E8ED_54%,#F6F0E8)] p-4 shadow-rose-lg">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.6rem] border border-white/80 bg-white/50">
                <div className="absolute inset-x-8 bottom-8 h-16 rounded-full bg-rose-soft/25 blur-2xl" aria-hidden />
                <div className="grid grid-cols-4 items-end gap-2 sm:gap-3">
                  {["h-36", "h-44", "h-32", "h-40"].map((height) => (
                    <div key={height} className={`${height} w-16 rounded-[1.3rem] border border-rose-soft/35 bg-white/80 shadow-ivory-sm md:w-20`}>
                      <div className="mx-auto mt-5 h-10 w-10 rounded-full border border-rose-deep/20 bg-rose-blush/50" />
                      <div className="mx-auto mt-5 h-2 w-8 rounded-full bg-rose-soft/35" />
                      <div className="mx-auto mt-2 h-2 w-10 rounded-full bg-rose-soft/25" />
                    </div>
                  ))}
                </div>
                <span className="absolute bottom-4 rounded-full border border-white/90 bg-white/75 px-4 py-2 text-xs font-semibold text-rose-deep shadow-ivory-sm">
                  صورة الروتين الكامل
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <HomeIngredientShowcase />

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
          <div className="relative z-10 mx-auto flex min-h-[34rem] max-w-[19rem] flex-col items-center justify-center px-6 pb-16 pt-20 md:min-h-[28rem] md:max-w-xl md:px-8 md:py-14">
            <h2 className="max-w-[16rem] text-[2rem] font-semibold leading-[1.25] text-[#6F5046] md:max-w-none md:text-4xl md:leading-tight">ابدئي روتين نورا سكين اليوم</h2>
            <p className="mx-auto mt-6 max-w-[17.5rem] text-sm leading-8 text-[#81695F] md:mt-4 md:max-w-lg">
              عناية ناعمة، تجربة موثوقة، الدفع عند الاستلام وتوصيل مجاني لجميع أنحاء المغرب.
            </p>
            <Link href="/products" className="mt-11 inline-flex w-full justify-center rounded-full border border-[#D9BFAE] bg-[linear-gradient(135deg,#8A655A,#B98D72)] px-9 py-4 font-bold text-white shadow-[0_18px_42px_rgba(137,94,78,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(137,94,78,0.26)] md:mt-8 md:w-auto md:px-8 md:shadow-[0_16px_38px_rgba(137,94,78,0.20)]">
              تسوقي المنتجات
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

interface Props {
  currentSlug: string;
}

const THUMBNAILS: Record<string, string> = {
  "nura-balance":       "/images/products/serum-niacinamide-pack.png",
  "nura-eye-revive":   "/images/products/eye-serum-pack.png",
  "nura-night-renewal": "/images/products/retinol-cream-pack.png",
  "nura-spf-50":        "/images/products/sunscreen-spf50-pack.png",
};

const SHORT_NAME: Record<string, string> = {
  "nura-balance":      "النياسيناميد",
  "nura-eye-revive":  "سيروم العين",
  "nura-night-renewal": "كريم الريتينول",
  "nura-spf-50":       "واقي الشمس",
};

const MORNING = [
  { slug: "nura-balance",       step: "01", desc: "قطرتان على وجهك بعد التنظيف — توازن وإشراقة" },
  { slug: "nura-spf-50",        step: "02", desc: "آخر خطوة قبل الخروج أو المكياج — حماية يومية" },
] as const;

const NIGHT = [
  { slug: "nura-eye-revive",    step: "01", desc: "كمية صغيرة حول العين برفق — نضارة محيط العين" },
  { slug: "nura-night-renewal", step: "02", desc: "طبقة خفيفة على الوجه والرقبة — تجديد ليلي" },
] as const;

function DownArrow({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-col items-center py-1.5">
      <div className={`h-4 w-px ${light ? "bg-white/20" : "bg-amber-200/80"}`} />
      <svg width="12" height="8" viewBox="0 0 14 9" fill="none" className={light ? "text-white/25" : "text-amber-400"}>
        <path d="M7 9L0.0717969 0H13.9282L7 9Z" fill="currentColor" />
      </svg>
    </div>
  );
}

export function RoutineSection({ currentSlug }: Props) {
  const scrollToRituals = () => {
    document.getElementById("ritual-selector")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-[#FDFAF6] py-12 md:py-16" dir="rtl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-rose-soft/35 to-transparent" />

      <div className="container-wide relative">

        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <p className="luxury-kicker mx-auto mb-3 w-fit">روتين متكامل</p>
          <h2 className="section-heading text-[#2C1810]">4 منتجات — نظام عناية واحد</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#8C6E73]">
            كل منتج عنده دوره — مع بعض كيكملوا روتين كامل صباحاً وليلاً.
          </p>
        </motion.div>

        {/* ── COMPLETE ROUTINE PHOTO ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <div className="relative w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(92,45,62,0.14)]">
            <div className="relative aspect-[16/7] hidden sm:block">
              <Image
                src="/images/routine-complete-family.png"
                alt="روتين نورا الكامل — 4 منتجات"
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover object-center"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#1A0810]/55 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A0810]/20 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 text-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">روتين نورا الكامل</p>
                <p className="mt-1 text-base font-black text-white">4 منتجات متكاملة — صباحاً ومساءً</p>
              </div>
            </div>
            <div className="relative h-56 sm:hidden">
              <Image
                src="/images/routine-complete-family.png"
                alt="روتين نورا الكامل — 4 منتجات"
                fill
                sizes="100vw"
                className="object-cover object-center"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0810]/65 via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-4 text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">روتين نورا الكامل</p>
                <p className="mt-1 text-sm font-black text-white">4 منتجات متكاملة — صباحاً ومساءً</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── TWO ROUTINE CARDS ── */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* ☀️ MORNING */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[1.75rem] border border-amber-100 bg-gradient-to-br from-[#FFFCF4] via-[#FFF8EC] to-[#FFF0D6] shadow-[0_16px_48px_rgba(200,140,60,0.10)]"
          >
            {/* Hero lifestyle image */}
            <div className="relative h-48 sm:h-52 overflow-hidden">
              <Image
                src="/images/bundles/morning-routine-hero.jpg"
                alt="روتين الصباح — نياسيناميد وواقي الشمس"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D2000]/80 via-[#3D2000]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-amber-300">
                      ☀️ صباحاً
                    </span>
                    <h3 className="text-xl font-black leading-tight text-white">روتين الصباح</h3>
                    <p className="mt-0.5 text-[11px] text-amber-200/70">حماية، إشراقة، استعداد للنهار</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-md">
                    <Sun className="h-5 w-5 text-amber-300" strokeWidth={1.4} />
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="p-5">
              <div className="space-y-0">
                {MORNING.map((step, i) => {
                  const isHere = step.slug === currentSlug;
                  return (
                    <div key={step.slug}>
                      <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all ${
                        isHere
                          ? "border-amber-300 bg-white shadow-[0_6px_20px_rgba(200,140,60,0.14)]"
                          : "border-amber-100/80 bg-white/80"
                      }`}>
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                          isHere ? "bg-amber-500 text-white" : "bg-amber-500/15 text-amber-700"
                        }`}>
                          {step.step}
                        </span>
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-amber-100/50 bg-white/60">
                          <img
                            src={THUMBNAILS[step.slug]}
                            alt={SHORT_NAME[step.slug]}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-bold leading-tight text-[#3A2000]">
                            {SHORT_NAME[step.slug]}
                          </p>
                          <p className="mt-1 text-[11px] leading-[1.55] text-[#9B7060]">{step.desc}</p>
                        </div>
                        {isHere && (
                          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">
                            أنتِ هنا
                          </span>
                        )}
                      </div>
                      {i < MORNING.length - 1 && <DownArrow />}
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-center text-[10px] font-semibold text-amber-700/55">
                الاتساق الصباحي = نتائج حقيقية مع الوقت
              </p>
            </div>
          </motion.article>

          {/* 🌙 NIGHT */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#160A10] via-[#1E0D18] to-[#2D1525] shadow-[0_24px_65px_rgba(16,6,14,0.35)]"
          >
            {/* Hero lifestyle image */}
            <div className="relative h-48 sm:h-52 overflow-hidden">
              <Image
                src="/images/bundles/night-renewal-hero.jpg"
                alt="روتين الليل — سيروم العين وكريم الريتينول"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160A10]/90 via-[#160A10]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#E8B4C0]/80">
                      🌙 مساءً
                    </span>
                    <h3 className="text-xl font-black leading-tight text-white">روتين الليل</h3>
                    <p className="mt-0.5 text-[11px] text-white/40">تجديد، راحة، إصلاح أثناء النوم</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-md">
                    <Moon className="h-5 w-5 text-[#F2D8E0]" strokeWidth={1.4} />
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="p-5">
              <div className="space-y-0">
                {NIGHT.map((step, i) => {
                  const isHere = step.slug === currentSlug;
                  return (
                    <div key={step.slug}>
                      <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all ${
                        isHere
                          ? "border-[#C4788A]/45 bg-white/12 shadow-[0_6px_20px_rgba(196,120,138,0.18)]"
                          : "border-white/10 bg-white/8"
                      }`}>
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
                          isHere ? "bg-[#C4788A] text-white" : "bg-white/15 text-white/80"
                        }`}>
                          {step.step}
                        </span>
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/30 bg-white/20">
                          <img
                            src={THUMBNAILS[step.slug]}
                            alt={SHORT_NAME[step.slug]}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-bold leading-tight text-white">
                            {SHORT_NAME[step.slug]}
                          </p>
                          <p className="mt-1 text-[11px] leading-[1.55] text-white/50">{step.desc}</p>
                        </div>
                        {isHere && (
                          <span className="shrink-0 rounded-full bg-[#C4788A]/20 px-2 py-0.5 text-[9px] font-bold text-[#F2B8C6]">
                            أنتِ هنا
                          </span>
                        )}
                      </div>
                      {i < NIGHT.length - 1 && <DownArrow light />}
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-center text-[10px] font-semibold text-white/28">
                الليل هو وقت الإصلاح الحقيقي — لا تتخطّيه
              </p>
            </div>
          </motion.article>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="mt-8 text-center">
          <p className="mx-auto max-w-md text-[13px] leading-7 text-[#8C6E73]">
            المنتجات اللي ما عندكيش فالروتين ديالك؟ شوفيهم فالروتين الكامل وفري بزاف.
          </p>
          <button
            type="button"
            onClick={scrollToRituals}
            className="mt-4 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-rose-soft/45 bg-white px-7 text-sm font-bold text-rose-deep transition hover:bg-rose-blush active:scale-[0.98]"
          >
            شوفي الروتين الكامل ←
          </button>
        </div>
      </div>
    </section>
  );
}

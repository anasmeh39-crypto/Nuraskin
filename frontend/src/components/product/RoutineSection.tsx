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
  "nura-balance":       "النياسيناميد",
  "nura-eye-revive":   "سيروم العين",
  "nura-night-renewal": "كريم الريتينول",
  "nura-spf-50":        "واقي الشمس",
};

const MORNING = [
  { slug: "nura-balance", step: "01", desc: "قطرتان على وجهك بعد التنظيف — توازن وإشراقة" },
  { slug: "nura-spf-50",  step: "02", desc: "آخر خطوة قبل الخروج — حماية يومية كاملة" },
] as const;

const NIGHT = [
  { slug: "nura-eye-revive",    step: "01", desc: "كمية صغيرة حول العين برفق — نضارة محيط العين" },
  { slug: "nura-night-renewal", step: "02", desc: "طبقة خفيفة على الوجه والرقبة — تجديد ليلي" },
] as const;

export function RoutineSection({ currentSlug }: Props) {
  const scrollToRituals = () => {
    document.getElementById("ritual-selector")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-[#FDFAF6] py-14 md:py-20" dir="rtl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-rose-soft/35 to-transparent" />

      <div className="container-wide relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="luxury-kicker mx-auto mb-3 w-fit">روتين متكامل</p>
          <h2 className="section-heading text-[#2C1810]">4 منتجات — نظام عناية واحد</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#8C6E73]">
            كل منتج عنده دوره — مع بعض كيكملوا روتين كامل صباحاً وليلاً.
          </p>
        </motion.div>

        {/* ── Complete routine hero photo ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mb-10"
        >
          <div className="relative w-full overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(92,45,62,0.16)]">
            <div className="relative aspect-[16/7] hidden sm:block">
              <Image
                src="/images/routine-complete-family.png"
                alt="روتين نورا الكامل — 4 منتجات"
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover object-center"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#1A0810]/45 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-7 text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">NURA SKIN</p>
                <p className="mt-1 text-lg font-black text-white">4 منتجات متكاملة — صباحاً ومساءً</p>
              </div>
            </div>
            <div className="relative h-56 sm:hidden">
              <Image
                src="/images/routine-complete-family.png"
                alt="روتين نورا الكامل — 4 منتجات"
                fill
                sizes="100vw"
                className="object-cover object-center"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0810]/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-4 text-right">
                <p className="mt-1 text-sm font-black text-white">4 منتجات متكاملة — صباحاً ومساءً</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Two routine cards ── */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* ☀️ MORNING */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[2rem] bg-white shadow-[0_8px_40px_rgba(200,140,60,0.10)] ring-1 ring-amber-100/80"
          >
            {/* Hero image — reduced gradient */}
            <div className="relative h-52 overflow-hidden rounded-t-[2rem]">
              <Image
                src="/images/bundles/morning-routine-hero.jpg"
                alt="روتين الصباح"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                quality={85}
              />
              {/* Subtle gradient — only bottom 35% */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#3D2000]/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300">
                    ☀️ صباحاً
                  </span>
                  <h3 className="text-[22px] font-black leading-tight text-white">روتين الصباح</h3>
                  <p className="mt-0.5 text-[11px] text-amber-200/65">حماية، إشراقة، استعداد للنهار</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 backdrop-blur-md">
                  <Sun className="h-5 w-5 text-amber-300" strokeWidth={1.4} />
                </div>
              </div>
            </div>

            {/* Product tiles — 2 columns */}
            <div className="grid grid-cols-2 gap-3 p-5">
              {MORNING.map((step) => {
                const isHere = step.slug === currentSlug;
                return (
                  <div
                    key={step.slug}
                    className={`relative flex flex-col items-center rounded-[1.4rem] px-3 py-4 text-center transition-all ${
                      isHere
                        ? "bg-amber-50 ring-2 ring-amber-300/70 shadow-[0_4px_24px_rgba(245,158,11,0.14)]"
                        : "bg-[#FAF8F5]"
                    }`}
                  >
                    {/* Step number */}
                    <span className={`mb-2.5 text-[10px] font-black tracking-[0.25em] ${
                      isHere ? "text-amber-500" : "text-[#C8B89A]"
                    }`}>
                      {step.step}
                    </span>

                    {/* Product image */}
                    <div className={`relative mb-3 h-[88px] w-[88px] overflow-hidden rounded-2xl ${
                      isHere
                        ? "shadow-[0_6px_24px_rgba(245,158,11,0.20)]"
                        : "shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                    }`}>
                      <img
                        src={THUMBNAILS[step.slug]}
                        alt={SHORT_NAME[step.slug]}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Name */}
                    <p className={`text-[13px] font-black leading-tight ${
                      isHere ? "text-[#3A2000]" : "text-[#5A3A00]/80"
                    }`}>
                      {SHORT_NAME[step.slug]}
                    </p>

                    {/* Description */}
                    <p className="mt-1.5 text-[10px] leading-[1.6] text-[#9B7060]">
                      {step.desc}
                    </p>

                    {/* "أنتِ هنا" badge */}
                    {isHere && (
                      <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-[9px] font-black text-white shadow-[0_2px_8px_rgba(245,158,11,0.35)]">
                        ✦ أنتِ هنا
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Caption */}
            <p className="pb-5 text-center text-[10px] font-semibold text-amber-600/50">
              الاتساق الصباحي = نتائج حقيقية مع الوقت
            </p>
          </motion.article>

          {/* 🌙 NIGHT */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="overflow-hidden rounded-[2rem] bg-[#120A10] shadow-[0_24px_72px_rgba(16,6,14,0.40)] ring-1 ring-white/5"
          >
            {/* Hero image — reduced gradient */}
            <div className="relative h-52 overflow-hidden rounded-t-[2rem]">
              <Image
                src="/images/bundles/night-renewal-hero.jpg"
                alt="روتين الليل"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                quality={85}
              />
              {/* Subtle gradient — only bottom 35% */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#120A10]/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8B4C0]/75">
                    🌙 مساءً
                  </span>
                  <h3 className="text-[22px] font-black leading-tight text-white">روتين الليل</h3>
                  <p className="mt-0.5 text-[11px] text-white/38">تجديد، راحة، إصلاح أثناء النوم</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 ring-1 ring-white/12 backdrop-blur-md">
                  <Moon className="h-5 w-5 text-[#F2D8E0]" strokeWidth={1.4} />
                </div>
              </div>
            </div>

            {/* Product tiles — 2 columns */}
            <div className="grid grid-cols-2 gap-3 p-5">
              {NIGHT.map((step) => {
                const isHere = step.slug === currentSlug;
                return (
                  <div
                    key={step.slug}
                    className={`relative flex flex-col items-center rounded-[1.4rem] px-3 py-4 text-center transition-all ${
                      isHere
                        ? "bg-white/10 ring-2 ring-[#C4788A]/50 shadow-[0_4px_24px_rgba(196,120,138,0.18)]"
                        : "bg-white/5"
                    }`}
                  >
                    {/* Step number */}
                    <span className={`mb-2.5 text-[10px] font-black tracking-[0.25em] ${
                      isHere ? "text-[#F2B8C6]" : "text-white/25"
                    }`}>
                      {step.step}
                    </span>

                    {/* Product image */}
                    <div className={`relative mb-3 h-[88px] w-[88px] overflow-hidden rounded-2xl bg-white/12 ${
                      isHere
                        ? "shadow-[0_6px_24px_rgba(196,120,138,0.28)]"
                        : "shadow-[0_4px_16px_rgba(0,0,0,0.20)]"
                    }`}>
                      <img
                        src={THUMBNAILS[step.slug]}
                        alt={SHORT_NAME[step.slug]}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Name */}
                    <p className={`text-[13px] font-black leading-tight ${
                      isHere ? "text-white" : "text-white/65"
                    }`}>
                      {SHORT_NAME[step.slug]}
                    </p>

                    {/* Description */}
                    <p className="mt-1.5 text-[10px] leading-[1.6] text-white/38">
                      {step.desc}
                    </p>

                    {/* "أنتِ هنا" badge */}
                    {isHere && (
                      <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#C4788A] px-3 py-1 text-[9px] font-black text-white shadow-[0_2px_8px_rgba(196,120,138,0.40)]">
                        ✦ أنتِ هنا
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Caption */}
            <p className="pb-5 text-center text-[10px] font-semibold text-white/22">
              الليل هو وقت الإصلاح الحقيقي — لا تتخطّيه
            </p>
          </motion.article>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="mx-auto max-w-sm text-[13px] leading-7 text-[#8C6E73]">
            المنتجات اللي ما عندكيش فالروتين ديالك؟ شوفيهم فالروتين الكامل وفري بزاف.
          </p>
          <button
            type="button"
            onClick={scrollToRituals}
            className="mt-4 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-rose-soft/45 bg-white px-7 text-sm font-bold text-rose-deep shadow-sm transition hover:bg-rose-blush active:scale-[0.98]"
          >
            شوفي الروتين الكامل ←
          </button>
        </motion.div>

      </div>
    </section>
  );
}

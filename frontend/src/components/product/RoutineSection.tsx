"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

interface Props {
  currentSlug: string;
}

const THUMBNAILS: Record<string, string> = {
  "nura-balance":      "/images/products/serum-niacinamide-pack.png",
  "nura-eye-revive":  "/images/products/eye-serum-pack.png",
  "nura-night-renewal": "/images/products/retinol-cream-pack.png",
  "nura-spf-50":       "/images/products/sunscreen-spf50-pack.png",
};

const SHORT_NAME: Record<string, string> = {
  "nura-balance":      "النياسيناميد",
  "nura-eye-revive":  "سيروم العين",
  "nura-night-renewal": "كريم الريتينول",
  "nura-spf-50":       "واقي الشمس",
};

const FAMILY = ["nura-balance", "nura-eye-revive", "nura-spf-50", "nura-night-renewal"] as const;

const MORNING = [
  { slug: "nura-balance",  step: "01", desc: "قطرتان على وجهك بعد التنظيف — توازن وإشراقة", pump: false },
  { slug: "nura-spf-50",   step: "02", desc: "آخر خطوة قبل الخروج أو المكياج — حماية يومية",   pump: true  },
] as const;

const NIGHT = [
  { slug: "nura-eye-revive",   step: "01", desc: "كمية صغيرة حول العين برفق — نضارة محيط العين", pump: false },
  { slug: "nura-night-renewal", step: "02", desc: "طبقة خفيفة على الوجه والرقبة — تجديد ليلي",   pump: true  },
] as const;

function Arrow({ dark }: { dark?: boolean }) {
  return (
    <div className="flex justify-center py-2">
      <div className="flex flex-col items-center">
        <div className={`h-4 w-px ${dark ? "bg-white/20" : "bg-amber-200"}`} />
        <svg
          width="10" height="7" viewBox="0 0 10 7" fill="none"
          className={dark ? "text-white/25" : "text-amber-300"}
        >
          <path d="M5 7L0 0h10z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

export function RoutineSection({ currentSlug }: Props) {
  const scrollToRituals = () => {
    document.getElementById("ritual-selector")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-[#FDFAF6] py-12 md:py-18" dir="rtl">
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
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(92,45,62,0.14)]">
            {/* Desktop: wide landscape */}
            <div className="relative aspect-[16/7] hidden sm:block">
              <Image
                src="/images/routine-complete-family.png"
                alt="روتين نورا الكامل — 4 منتجات"
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#1A0810]/55 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A0810]/20 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 text-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">روتين نورا الكامل</p>
                <p className="mt-1 text-base font-black text-white">4 منتجات متكاملة — صباحاً ومساءً</p>
              </div>
            </div>
            {/* Mobile: 4:3 crop */}
            <div className="relative aspect-[4/3] sm:hidden">
              <Image
                src="/images/routine-complete-family.png"
                alt="روتين نورا الكامل — 4 منتجات"
                fill
                sizes="100vw"
                className="object-cover object-center"
                loading="lazy"
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* ☀️ MORNING */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[1.6rem] border border-amber-100 bg-gradient-to-br from-[#FFFCF5] via-[#FFF8EE] to-[#FFF2DC] p-5 shadow-[0_16px_48px_rgba(200,140,60,0.08)]"
          >
            {/* Sun glow — desktop only */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-amber-200/45 blur-2xl hidden sm:block" />

            {/* Header */}
            <div className="relative mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 shadow-sm">
                <Sun className="h-5 w-5 text-amber-600" strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="text-base font-black text-[#4A2E00]">روتين الصباح</h3>
                <p className="text-[11px] text-amber-700/65">حماية، إشراقة، استعداد للنهار</p>
              </div>
              <span className="mr-auto rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-700">
                ☀️ صباحاً
              </span>
            </div>

            {/* Steps */}
            <div className="relative space-y-0">
              {MORNING.map((step, i) => {
                const isHere = step.slug === currentSlug;
                return (
                  <div key={step.slug}>
                    <div className={`flex items-center gap-3 rounded-xl border p-3.5 transition-all ${
                      isHere
                        ? "border-amber-300 bg-white shadow-[0_6px_20px_rgba(200,140,60,0.14)]"
                        : "border-amber-100/70 bg-white/60"
                    }`}>
                      {/* Step badge */}
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-black ${
                        isHere ? "bg-amber-500 text-white" : "bg-amber-100 text-amber-700"
                      }`}>
                        {step.step}
                      </span>
                      {/* Product image */}
                      <img
                        src={THUMBNAILS[step.slug]}
                        alt={SHORT_NAME[step.slug]}
                        loading="lazy"
                        className="shrink-0 object-contain"
                        style={{
                          height: "56px",
                          width: step.pump ? "44px" : "38px",
                          filter: "drop-shadow(0 4px 10px rgba(92,45,62,0.15))",
                        }}
                      />
                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold leading-tight text-[#4A2E00]">
                          {SHORT_NAME[step.slug]}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-4 text-[#9B7060]">{step.desc}</p>
                      </div>
                      {isHere && (
                        <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">
                          أنتِ هنا
                        </span>
                      )}
                    </div>
                    {i < MORNING.length - 1 && <Arrow />}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* 🌙 NIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-[#170810] via-[#1E0E18] to-[#2D1525] p-5 shadow-[0_24px_65px_rgba(20,8,16,0.30)]"
          >
            {/* Moon glow — desktop only */}
            <div className="pointer-events-none absolute -top-12 left-1/3 h-36 w-36 rounded-full bg-[#C4788A]/18 blur-3xl hidden sm:block" />

            {/* Header */}
            <div className="relative mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <Moon className="h-5 w-5 text-[#F2D8E0]" strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="text-base font-black text-white">روتين الليل</h3>
                <p className="text-[11px] text-white/45">تجديد، راحة، إصلاح قبل النوم</p>
              </div>
              <span className="mr-auto rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/60">
                🌙 مساءً
              </span>
            </div>

            {/* Steps */}
            <div className="relative space-y-0">
              {NIGHT.map((step, i) => {
                const isHere = step.slug === currentSlug;
                return (
                  <div key={step.slug}>
                    <div className={`flex items-center gap-3 rounded-xl border p-3.5 transition-all ${
                      isHere
                        ? "border-[#C4788A]/45 bg-white/12 shadow-[0_6px_20px_rgba(196,120,138,0.18)]"
                        : "border-white/8 bg-white/6"
                    }`}>
                      {/* Step badge */}
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-black ${
                        isHere ? "bg-[#C4788A] text-white" : "bg-white/12 text-white/60"
                      }`}>
                        {step.step}
                      </span>
                      {/* Product image */}
                      <img
                        src={THUMBNAILS[step.slug]}
                        alt={SHORT_NAME[step.slug]}
                        loading="lazy"
                        className="shrink-0 object-contain"
                        style={{
                          height: "56px",
                          width: step.pump ? "44px" : "38px",
                          filter: "drop-shadow(0 4px 12px rgba(196,120,138,0.28)) brightness(1.08)",
                        }}
                      />
                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold leading-tight text-white/90">
                          {SHORT_NAME[step.slug]}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-4 text-white/42">{step.desc}</p>
                      </div>
                      {isHere && (
                        <span className="shrink-0 rounded-full bg-[#C4788A]/20 px-2 py-0.5 text-[9px] font-bold text-[#F2B8C6]">
                          أنتِ هنا
                        </span>
                      )}
                    </div>
                    {i < NIGHT.length - 1 && <Arrow dark />}
                  </div>
                );
              })}
            </div>
          </motion.div>
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

"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const THUMBNAILS: Record<string, string> = {
  "nura-balance":       "/images/products/serum-niacinamide-pack.png",
  "nura-eye-revive":   "/images/products/eye-serum-pack.png",
  "nura-night-renewal": "/images/products/retinol-cream-pack.png",
  "nura-spf-50":        "/images/products/sunscreen-spf50-pack.png",
};

const FAMILY = [
  { slug: "nura-balance",       label: "نياسيناميد",   pump: false },
  { slug: "nura-eye-revive",   label: "سيروم العين",  pump: false },
  { slug: "nura-spf-50",        label: "واقي الشمس",   pump: true  },
  { slug: "nura-night-renewal", label: "ريتينول",      pump: true  },
] as const;

const MORNING_STEPS = [
  {
    slug: "nura-balance",
    label: "النياسيناميد",
    desc: "وزعي قطرتين على وجهك بعد التنظيف — يوازن البشرة ويمنحها إشراقة",
    pump: false,
  },
  {
    slug: "nura-spf-50",
    label: "واقي الشمس SPF 50",
    desc: "آخر خطوة قبل الخروج — يحمي هاد الإشراقة من الشمس طول النهار",
    pump: true,
  },
] as const;

const NIGHT_STEPS = [
  {
    slug: "nura-eye-revive",
    label: "سيروم محيط العين",
    desc: "كمية صغيرة حول العين برفق — يدعم مظهر الانتعاش وينقص البوفينيس",
    pump: false,
  },
  {
    slug: "nura-night-renewal",
    label: "كريم الريتينول",
    desc: "طبقة على الوجه والرقبة — يجدد البشرة وأنتِ نايمة",
    pump: true,
  },
] as const;

function DownArrow({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-col items-center py-2">
      <div className={`h-5 w-px ${light ? "bg-white/20" : "bg-amber-200"}`} />
      <svg
        width="14" height="9" viewBox="0 0 14 9" fill="none"
        className={light ? "text-white/25" : "text-amber-300"}
      >
        <path d="M7 9L0.0717969 0H13.9282L7 9Z" fill="currentColor" />
      </svg>
    </div>
  );
}

type StepProps = {
  slug: string;
  label: string;
  desc: string;
  pump: boolean;
  stepNum: string;
  light?: boolean;
};

function RoutineStep({ slug, label, desc, pump, stepNum, light }: StepProps) {
  return (
    <div className={`flex items-center gap-4 rounded-2xl border p-4 backdrop-blur-sm ${
      light
        ? "border-white/10 bg-white/8"
        : "border-amber-100/80 bg-white/75"
    }`}>
      {/* Step number */}
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
        light ? "bg-white/15 text-white/80" : "bg-amber-500/15 text-amber-700"
      }`}>
        {stepNum}
      </span>

      {/* Product image */}
      <div className="flex shrink-0 items-end justify-center" style={{ width: pump ? "46px" : "38px", height: "64px" }}>
        <img
          src={THUMBNAILS[slug]}
          alt={label}
          loading="lazy"
          className="h-full w-full object-contain"
          style={{
            filter: light
              ? "drop-shadow(0 6px 14px rgba(196,120,138,0.35)) brightness(1.1)"
              : "drop-shadow(0 6px 14px rgba(92,45,62,0.18))",
          }}
        />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className={`text-[13px] font-bold leading-tight ${light ? "text-white" : "text-[#3A2000]"}`}>
          {label}
        </p>
        <p className={`mt-1 text-[11px] leading-[1.5] ${light ? "text-white/45" : "text-[#9B7060]"}`}>
          {desc}
        </p>
      </div>
    </div>
  );
}

export function RoutineEducationSection() {
  return (
    <section className="bg-[#FDFAF6] py-12 md:py-16" dir="rtl">
      <div className="container-wide">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <p className="luxury-kicker mx-auto mb-3 w-fit">روتين متكامل</p>
          <h2 className="section-heading text-[#2C1810]">
            بشرتك ما كتحتاجش منتج واحد — كتحتاج نظام
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#8C6E73]">
            كل منتج عنده دور محدد — كيلاقيوا مع بعضياتهم، النتيجة كتبان.
          </p>
        </motion.div>

        {/* ── FAMILY STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mb-8 flex flex-col items-center"
        >
          <div className="inline-flex items-end gap-2 rounded-2xl border border-[#E8D6CC] bg-white px-5 pt-4 pb-3 shadow-[0_10px_32px_rgba(92,45,62,0.06)] sm:gap-4 sm:px-8">
            {FAMILY.map((p, i) => (
              <div key={p.slug} className="flex items-end gap-2 sm:gap-4">
                <div className="flex flex-col items-center gap-1.5">
                  <img
                    src={THUMBNAILS[p.slug]}
                    alt={p.label}
                    loading="lazy"
                    className="object-contain"
                    style={{
                      height: p.pump ? "60px" : "52px",
                      width: p.pump ? "44px" : "36px",
                      filter: "drop-shadow(0 5px 10px rgba(92,45,62,0.18))",
                    }}
                  />
                  <span className="text-[9px] font-semibold text-[#B0958A] text-center max-w-[44px] leading-tight">
                    {p.label}
                  </span>
                </div>
                {i < FAMILY.length - 1 && (
                  <span className="mb-7 text-base font-bold text-[#D4BC9B]">+</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-[10px] font-semibold tracking-wide text-[#C4B0A8] uppercase">
            روتين نورا الكامل — 4 منتجات متكاملة
          </p>
        </motion.div>

        {/* ── TWO ROUTINE CARDS ── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* ☀️ MORNING */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[1.75rem] border border-amber-100 bg-gradient-to-br from-[#FFFCF4] via-[#FFF8EC] to-[#FFF0D6] p-5 shadow-[0_16px_48px_rgba(200,140,60,0.09)]"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-amber-200/50 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-8 left-0 h-28 w-28 rounded-full bg-amber-100/60 blur-2xl" />

            {/* Header */}
            <div className="relative mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 shadow-sm ring-1 ring-amber-200/60">
                <Sun className="h-5 w-5 text-amber-600" strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="text-base font-black text-[#4A2E00]">روتين الصباح</h3>
                <p className="text-[11px] text-amber-700/65">حماية، إشراقة، استعداد للنهار</p>
              </div>
              <span className="mr-auto rounded-full bg-amber-500/12 px-3 py-1 text-[10px] font-bold text-amber-700 ring-1 ring-amber-200">
                ☀️ صباحاً
              </span>
            </div>

            {/* Steps */}
            <div className="relative">
              {MORNING_STEPS.map((step, i) => (
                <div key={step.slug}>
                  <RoutineStep stepNum={`0${i + 1}`} {...step} />
                  {i < MORNING_STEPS.length - 1 && <DownArrow />}
                </div>
              ))}
            </div>

            {/* Bottom tag */}
            <p className="mt-4 text-center text-[10px] font-semibold text-amber-700/55">
              الاتساق الصباحي = نتائج حقيقية مع الوقت
            </p>
          </motion.article>

          {/* 🌙 NIGHT */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#160A10] via-[#1E0D18] to-[#2D1525] p-5 shadow-[0_24px_65px_rgba(16,6,14,0.35)]"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -top-14 left-1/3 h-40 w-40 rounded-full bg-[#C4788A]/18 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 -right-8 h-28 w-28 rounded-full bg-[#7B3F55]/20 blur-2xl" />

            {/* Header */}
            <div className="relative mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/12">
                <Moon className="h-5 w-5 text-[#F2D8E0]" strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="text-base font-black text-white">روتين الليل</h3>
                <p className="text-[11px] text-white/42">تجديد، راحة، إصلاح أثناء النوم</p>
              </div>
              <span className="mr-auto rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/60 ring-1 ring-white/10">
                🌙 مساءً
              </span>
            </div>

            {/* Steps */}
            <div className="relative">
              {NIGHT_STEPS.map((step, i) => (
                <div key={step.slug}>
                  <RoutineStep stepNum={`0${i + 1}`} light {...step} />
                  {i < NIGHT_STEPS.length - 1 && <DownArrow light />}
                </div>
              ))}
            </div>

            {/* Bottom tag */}
            <p className="mt-4 text-center text-[10px] font-semibold text-white/28">
              الليل هو وقت الإصلاح الحقيقي — لا تتخطّيه
            </p>
          </motion.article>
        </div>

        {/* ── BOTTOM INSIGHT ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 rounded-2xl border border-[#E8D6CC] bg-white px-6 py-5 text-center shadow-[0_10px_32px_rgba(92,45,62,0.05)]"
        >
          <p className="text-[15px] font-bold text-[#3A222C]">
            الاتساق هو السر — مو المنتج الواحد
          </p>
          <p className="mx-auto mt-1.5 max-w-md text-xs leading-6 text-[#8C6E73]">
            بشرة متوازنة ومشرقة مو نتيجة يوم واحد — هي نتيجة روتين صباحي وليلي منتظم.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

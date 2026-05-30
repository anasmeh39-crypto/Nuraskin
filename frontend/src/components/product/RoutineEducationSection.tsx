"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

// Real gallery photos — first image of each product
const THUMBNAILS: Record<string, string> = {
  "nura-balance":       "/images/nura-balance-gallery-1.png",
  "nura-eye-revive":   "/images/nura-eye-revive-gallery-1.png",
  "nura-night-renewal": "/images/nura-night-renewal-gallery-1.png",
  "nura-spf-50":        "/images/nura-spf-50-gallery-1.png",
};

const MORNING_STEPS = [
  {
    slug: "nura-balance",
    label: "النياسيناميد",
    desc: "وزعي قطرتين على وجهك بعد التنظيف — يوازن البشرة ويمنحها إشراقة",
  },
  {
    slug: "nura-spf-50",
    label: "واقي الشمس SPF 50",
    desc: "آخر خطوة قبل الخروج — يحمي هاد الإشراقة من الشمس طول النهار",
  },
] as const;

const NIGHT_STEPS = [
  {
    slug: "nura-eye-revive",
    label: "سيروم محيط العين",
    desc: "كمية صغيرة حول العين برفق — يدعم مظهر الانتعاش وينقص البوفينيس",
  },
  {
    slug: "nura-night-renewal",
    label: "كريم الريتينول",
    desc: "طبقة على الوجه والرقبة — يجدد البشرة وأنتِ نايمة",
  },
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

type StepProps = {
  slug: string;
  label: string;
  desc: string;
  stepNum: string;
  light?: boolean;
};

function RoutineStep({ slug, label, desc, stepNum, light }: StepProps) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 backdrop-blur-sm ${
      light
        ? "border-white/10 bg-white/8"
        : "border-amber-100/80 bg-white/80"
    }`}>
      {/* Step number */}
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
        light ? "bg-white/15 text-white/80" : "bg-amber-500/15 text-amber-700"
      }`}>
        {stepNum}
      </span>

      {/* Real product photo */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/30 bg-white/20">
        <img
          src={THUMBNAILS[slug]}
          alt={label}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className={`text-[13px] font-bold leading-tight ${light ? "text-white" : "text-[#3A2000]"}`}>
          {label}
        </p>
        <p className={`mt-1 text-[11px] leading-[1.55] ${light ? "text-white/50" : "text-[#9B7060]"}`}>
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
                loading="lazy"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#1A0810]/55 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A0810]/20 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 text-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">روتين نورا الكامل</p>
                <p className="mt-1 text-base font-black text-white">4 منتجات متكاملة — صباحاً ومساءً</p>
              </div>
            </div>
            <div className="relative aspect-[3/2] sm:hidden">
              <Image
                src="/images/routine-complete-family.png"
                alt="روتين نورا الكامل — 4 منتجات"
                fill
                sizes="100vw"
                className="object-cover object-center"
                loading="lazy"
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
                loading="lazy"
                quality={85}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D2000]/80 via-[#3D2000]/20 to-transparent" />
              {/* Header overlaid on image */}
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
                {MORNING_STEPS.map((step, i) => (
                  <div key={step.slug}>
                    <RoutineStep stepNum={`0${i + 1}`} {...step} />
                    {i < MORNING_STEPS.length - 1 && <DownArrow />}
                  </div>
                ))}
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
                loading="lazy"
                quality={85}
              />
              {/* Gradient overlay — darker for night feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#160A10]/90 via-[#160A10]/30 to-transparent" />
              {/* Header overlaid on image */}
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
                {NIGHT_STEPS.map((step, i) => (
                  <div key={step.slug}>
                    <RoutineStep stepNum={`0${i + 1}`} light {...step} />
                    {i < NIGHT_STEPS.length - 1 && <DownArrow light />}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-[10px] font-semibold text-white/28">
                الليل هو وقت الإصلاح الحقيقي — لا تتخطّيه
              </p>
            </div>
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

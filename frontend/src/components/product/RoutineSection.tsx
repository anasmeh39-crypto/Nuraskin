"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { Droplets, Eye, Moon, Sparkles, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  currentSlug: string;
}

type RoutineStep = {
  time: string;
  label: string;
  desc: string;
  slug: string;
  Icon: LucideIcon;
};

const ROUTINE_STEPS: Record<string, RoutineStep[]> = {
  morning: [
    {
      time: "01",
      label: "المنظّف اللطيف",
      desc: "نظّفي البشرة بلطف لتجهيزها تماماً لاستقبال الخطوات التالية.",
      slug: "",
      Icon: Droplets,
    },
    {
      time: "02",
      label: "سيروم توازن وإشراقة البشرة بالنياسيناميد",
      desc: "قطرتان إلى الوجه بعد التنظيف — وزّعي بلطف على كامل الوجه.",
      slug: "nura-balance",
      Icon: Sparkles,
    },
    {
      time: "03",
      label: "سيروم نضارة محيط العين",
      desc: "كمية صغيرة حول محيط العين — بدون فرك؛ استخدمي الطرف الدائري للإصبع.",
      slug: "nura-eye-revive",
      Icon: Eye,
    },
    {
      time: "04",
      label: "واقي الشمس اليومي SPF 50",
      desc: "يوضع صباحًا كآخر خطوة في روتين العناية بالبشرة، قبل الخروج أو قبل المكياج.",
      slug: "nura-spf-50",
      Icon: Sun,
    },
  ],
  night: [
    {
      time: "01",
      label: "التنظيف المزدوج",
      desc: "أزيلي المكياج والشوائب خطوة بخطوة — البشرة النظيفة تستقبل المنتجات أفضل.",
      slug: "",
      Icon: Droplets,
    },
    {
      time: "02",
      label: "سيروم نضارة محيط العين",
      desc: "كمية صغيرة حول محيط العين — برفق ودون فرك.",
      slug: "nura-eye-revive",
      Icon: Eye,
    },
    {
      time: "03",
      label: "كريم التجديد الليلي للبشرة",
      desc: "طبقة أخيرة على الوجه والرقبة — استخدميه بعد السيروم إن وُجد.",
      slug: "nura-night-renewal",
      Icon: Moon,
    },
  ],
};

const PRODUCT_PACK_IMAGES: Record<string, string> = {
  "nura-balance": "/images/products/serum-niacinamide-pack.png",
  "nura-eye-revive": "/images/products/eye-serum-pack.png",
  "nura-night-renewal": "/images/products/retinol-cream-pack.png",
  "nura-spf-50": "/images/products/sunscreen-spf50-pack.png",
};

export function RoutineSection({ currentSlug }: Props) {
  const scrollToRituals = () => {
    document.getElementById("ritual-selector")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-ivory py-20" dir="rtl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-rose-soft/40 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-gold-light/25 blur-3xl" />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-rose-mid">روتين متكامل</p>
          <h2 className="section-heading text-[#2C1810]">أكملي روتينك — صباحاً وليلاً</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6B5555]">
            المنتجات مكمّلة لبعضها؛ الترتيب الصحيح والانتظام يعزّزان مظهر البشرة دون مبالغة.
          </p>
        </motion.div>

        <div className="relative mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 text-center md:block">
            <p className="mb-2 text-[13px] italic text-[#8C6E73]">روتينك الكامل = صباح + ليل</p>
            <svg className="mx-auto h-6 w-28 text-[#C4788A]" viewBox="0 0 120 24" fill="none" aria-hidden>
              <path d="M10 12h100" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M18 5l-8 7 8 7M102 5l8 7-8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {(["morning", "night"] as const).map((time) => (
            <motion.div
              key={time}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: time === "morning" ? 0 : 0.08 }}
              className={`relative rounded-[1.75rem] border bg-white p-6 shadow-[0_18px_50px_rgba(58,34,44,0.06)] md:p-8 ${
                time === "morning"
                  ? "border-amber-100/80 ring-1 ring-amber-50"
                  : "border-rose-soft/35 ring-1 ring-rose-blush/40"
              }`}
            >
              <div className="mb-8 flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-inner ${
                    time === "morning"
                      ? "bg-gradient-to-br from-amber-50 to-white text-amber-700"
                      : "bg-gradient-to-br from-rose-blush to-white text-rose-deep"
                  }`}
                >
                  {time === "morning" ? (
                    <Sun className="h-6 w-6" strokeWidth={1.35} aria-hidden />
                  ) : (
                    <Moon className="h-6 w-6" strokeWidth={1.35} aria-hidden />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2C1810]">
                    {time === "morning" ? "روتين الصباح" : "روتين الليل"}
                  </h3>
                  <p className="text-xs text-[#9B8A8A]">
                    {time === "morning" ? "حماية، إشراقة، استعداد للنهار" : "تنظيف عميق، تجديد، راحة قبل النوم"}
                  </p>
                </div>
              </div>

              <div className="relative space-y-0 ps-1">
                {ROUTINE_STEPS[time].map((step, i) => {
                  const StepIcon = step.Icon;
                  const isHere = step.slug === currentSlug;
                  const isLinked = Boolean(step.slug);
                  const isLast = i === ROUTINE_STEPS[time].length - 1;

                  return (
                    <div key={step.time} className="relative flex gap-4 pb-8 last:pb-0">
                      {!isLast && (
                        <span
                          className={`absolute end-[1.15rem] top-12 bottom-0 w-px ${
                            isLinked ? "bg-rose-soft/50" : "bg-border/90"
                          }`}
                          aria-hidden
                        />
                      )}

                      <div className="relative z-[1] flex shrink-0 flex-col items-center gap-1">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl border shadow-sm transition-colors ${
                            isHere
                              ? "border-rose-deep bg-rose-deep text-white"
                              : isLinked
                                ? "border-rose-soft/50 bg-rose-blush/70 text-rose-deep"
                                : "border-border bg-white text-[#9B8A8A]"
                          }`}
                        >
                          <StepIcon className="h-5 w-5" strokeWidth={1.35} aria-hidden />
                        </div>
                        <span
                          className={`text-[10px] font-black tabular-nums ${
                            isHere ? "text-rose-deep" : "text-[#9B8A8A]"
                          }`}
                        >
                          {step.time}
                        </span>
                      </div>

                      <div
                        className={`min-w-0 flex-1 rounded-2xl border px-4 py-3 transition-colors ${
                          isHere
                            ? "border-rose-deep/35 bg-gradient-to-br from-rose-blush to-white"
                            : isLinked
                              ? "border-transparent bg-ivory/90"
                              : "border-border/60 bg-white/60 opacity-75"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isLinked && (
                            <img
                              src={PRODUCT_PACK_IMAGES[step.slug]}
                              alt={`صورة ${step.label} داخل الروتين`}
                              className="h-[50px] w-[50px] shrink-0 object-contain bg-transparent"
                              style={{ filter: "drop-shadow(0 4px 8px rgba(92,45,62,0.15))" }}
                              loading="lazy"
                            />
                          )}
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className={`text-sm font-bold leading-snug ${isLinked ? "text-[#2C1810]" : "text-[#8A7878]"}`}>
                                {step.label}
                              </p>
                              {isHere && (
                                <motion.span
                                  animate={{ boxShadow: ["0 0 0 0 rgba(196,120,138,0.4)", "0 0 0 8px rgba(196,120,138,0)", "0 0 0 0 rgba(196,120,138,0.4)"] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                  className="current-step-badge rounded-full bg-rose-deep px-2 py-0.5 text-[10px] font-bold text-white"
                                >
                                  خطوتك الحالية
                                </motion.span>
                              )}
                            </div>
                            <p className="mt-1.5 text-xs leading-relaxed text-[#7A6560]">{step.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <p className="mx-auto max-w-xl text-[13px] leading-7 text-[#8C6E73]">
            المنتجات اللي مشوفتيهاش في روتينك الحالي؟ كتلقيهم في الروتين الكامل.
          </p>
          <button
            type="button"
            onClick={scrollToRituals}
            className="mt-4 inline-flex min-h-[46px] items-center justify-center rounded-full border border-rose-soft/45 bg-white px-6 text-sm font-bold text-rose-deep transition hover:bg-rose-blush"
          >
            شوفي الروتين الكامل ←
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const TIMELINE_LABELS: Record<string, string[]> = {
  "nura-balance": ["قبل البداية", "بعد أسبوعين", "بعد شهر"],
  "nura-night-renewal": ["قبل البداية", "بعد 10 أيام", "بعد 3 أسابيع"],
  "nura-eye-revive": ["قبل البداية", "بعد أسبوع", "بعد أسبوعين"],
};

interface Props {
  productSlug: string;
}

export function BeforeAfterSlider({ productSlug }: Props) {
  const [sliderX, setSliderX] = useState(48);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const BEFORE_IMAGES: Record<string, string> = {
    "nura-balance":     "/images/nura-balance-before.png",
    "nura-eye-revive":  "/images/nura-eye-revive-before.png",
  };
  const AFTER_IMAGES: Record<string, string> = {
    "nura-balance":     "/images/nura-balance-after.png",
    "nura-eye-revive":  "/images/nura-eye-revive-after.png",
  };
  const beforeImageSrc = BEFORE_IMAGES[productSlug];
  const afterImageSrc = AFTER_IMAGES[productSlug];

  const updateSlider = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pct = Math.min(92, Math.max(8, ((clientX - rect.left) / rect.width) * 100));
    setSliderX(pct);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging.current) updateSlider(e.clientX); };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleClick = (e: React.MouseEvent) => updateSlider(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => { updateSlider(e.touches[0].clientX); };

  const timelines = TIMELINE_LABELS[productSlug] || TIMELINE_LABELS["nura-balance"];

  const BEFORE_LABELS: Record<string, string> = {
    "nura-balance":      "لمعان — مسام — تعب",
    "nura-eye-revive":  "هالات — انتفاخ — إرهاق",
    "nura-night-renewal": "بشرة باهتة — جفاف — تعب",
    "nura-spf-50":      "بدون حماية — تعرض للشمس",
  };
  const AFTER_LABELS: Record<string, { title: string; sub: string }> = {
    "nura-balance":       { title: "إشراقة ونعومة", sub: "بشرة أكثر توازناً" },
    "nura-eye-revive":   { title: "نظرة أكثر انتعاشاً", sub: "محيط عين أكثر هدوءاً وإشراقاً" },
    "nura-night-renewal": { title: "نعومة ونضارة", sub: "بشرة أكثر راحة وتجدداً" },
    "nura-spf-50":        { title: "حماية كاملة", sub: "مطمئنة طول النهار" },
  };
  const beforeLabel = BEFORE_LABELS[productSlug] ?? BEFORE_LABELS["nura-balance"];
  const afterLabel = AFTER_LABELS[productSlug] ?? AFTER_LABELS["nura-balance"];

  const handleTouchStart = (e: React.TouchEvent) => { updateSlider(e.touches[0].clientX); };

  return (
    <section className="py-10 sm:py-20 bg-ivory overflow-hidden">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-7 sm:mb-12"
        >
          <p className="text-xs text-rose-mid font-semibold tracking-wider uppercase mb-3">التحول</p>
          <h2 className="section-heading text-[#2C1810]">الفارق اللي تحسيه</h2>
          <p className="text-[#6B5555] mt-3 max-w-md mx-auto text-sm leading-relaxed">
            هاد الروتين كيحسن مظهر البشرة بشكل واضح مع الاستعمال المنتظم، والنتائج كتختلف حسب نوع البشرة والانتظام.
          </p>
        </motion.div>

        <div className="max-w-xl sm:max-w-3xl mx-auto">
          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            ref={containerRef}
            className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-rose-soft/25 bg-white p-1.5 sm:p-2 shadow-rose-lg cursor-col-resize select-none touch-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <div className="relative overflow-hidden rounded-[1.15rem] sm:rounded-[1.6rem] bg-ivory aspect-square">
              {/* After (right) */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-50 flex items-center justify-center">
                {afterImageSrc ? (
                  <img
                    src={afterImageSrc}
                    alt={`مظهر البشرة بعد استعمال ${productSlug} من نورا سكين`}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/70 mx-auto flex items-center justify-center mb-3">
                      <span className="font-display text-rose-mid text-2xl italic">بعد</span>
                    </div>
                    <p className="text-rose-deep font-bold text-sm">{afterLabel.title}</p>
                    <p className="text-rose-mid text-xs mt-1">{afterLabel.sub}</p>
                    <div className="flex gap-1 justify-center mt-3">
                      {[1,2,3,4,5].map(s => <div key={s} className="w-1.5 h-1.5 rounded-full bg-rose-soft" />)}
                    </div>
                  </div>
                )}
              </div>

              {/* Before (left) — clipped */}
              <div
                className="absolute inset-0 overflow-hidden will-change-[clip-path]"
                style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                  {beforeImageSrc ? (
                    <img
                      src={beforeImageSrc}
                      alt={`مظهر البشرة قبل استعمال ${productSlug} من نورا سكين`}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-white/70 mx-auto flex items-center justify-center mb-3">
                        <span className="font-arabic text-gray-500 text-sm font-semibold">قبل</span>
                      </div>
                      <p className="text-gray-600 font-semibold text-sm">{beforeLabel}</p>
                      <p className="text-gray-400 text-xs mt-1">قبل نورا سكين</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Slider line */}
              <div
                className="absolute inset-y-0 w-px bg-white/95 shadow-[0_0_24px_rgba(61,44,50,0.18)]"
                style={{ left: `${sliderX}%` }}
              >
                <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 shadow-rose-md backdrop-blur-md transition-transform duration-200 hover:scale-105">
                  <div className="flex items-center gap-1 text-rose-deep">
                    <svg className="w-3.5 h-3.5 flip-ltr" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="h-5 w-px bg-rose-soft" aria-hidden />
                    <svg className="w-3.5 h-3.5 flip-ltr" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 start-4 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full shadow-ivory-sm">
                <span className="text-xs font-bold text-[#6B5555]">قبل</span>
              </div>
              <div className="absolute top-4 end-4 bg-rose-deep/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-rose-sm">
                <span className="text-xs font-bold text-white">بعد</span>
              </div>

              {/* Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/82 backdrop-blur-md text-[#6B5555] text-[10px] font-semibold px-3 py-1 rounded-full shadow-ivory-sm">
                اسحبي باش تشوفي الفرق
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="mt-5 sm:mt-8 flex items-center">
            {timelines.map((label, i) => (
              <React.Fragment key={i}>
                <div className="text-center flex-1">
                  <div className="w-3 h-3 rounded-full mx-auto mb-2 bg-rose-soft" />
                  <p className="text-xs text-[#6B5555]">{label}</p>
                </div>
                {i < timelines.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-rose-soft/40 to-rose-soft mb-4" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-center text-[10px] text-[#9B8A8A] mt-4">
            النتائج تختلف من شخص لآخر حسب نوع البشرة والاستخدام المنتظم.
          </p>
        </div>
      </div>
    </section>
  );
}

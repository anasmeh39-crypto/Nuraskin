"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

const slides = [
  {
    title: "روتين عناية صباحي ناعم",
    subtitle: "سيروم توازن وإشراقة البشرة بالنياسيناميد",
    label: "Morning skincare bottle",
  },
  {
    title: "تجديد ليلي بإحساس فاخر",
    subtitle: "كريم التجديد الليلي للبشرة",
    label: "Night renewal cream",
  },
  {
    title: "نضارة دقيقة لمحيط العين",
    subtitle: "سيروم نضارة محيط العين",
    label: "Eye serum closeup",
  },
];

export function ImageSliderSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const goNext = () => setActive((current) => (current + 1) % slides.length);
  const goPrev = () => setActive((current) => (current - 1 + slides.length) % slides.length);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container-wide">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="luxury-kicker mb-4 w-fit">
              <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.5} />
              تجربة بصرية للروتين
            </p>
            <h2 className="section-heading max-w-2xl">صور بديلة جاهزة لعرض منتجاتكِ لاحقاً</h2>
            <p className="section-subheading max-w-2xl">
              مساحة سلايدر مخصصة للصور الحقيقية: عبوات، ملمس المنتج، وروتين الاستخدام.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={goPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-brand-deep shadow-sm transition hover:bg-gold-light"
              aria-label="السابق"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={goNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-brand-deep shadow-sm transition hover:bg-gold-light"
              aria-label="التالي"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="grid items-center gap-6 rounded-[2.5rem] border border-border bg-[linear-gradient(135deg,#fffaf1_0%,#f7dde4_55%,#fffdf9_100%)] p-4 soft-shadow md:grid-cols-[1.15fr_0.85fr] md:p-8">
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-white/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <PlaceholderImage
                  label={slides[active].label}
                  aspectRatio="landscape"
                  className="h-full w-full rounded-[2rem]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 md:p-8">
            <p className="mb-3 text-sm font-semibold text-gold">NURA SKIN VISUAL STORY</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <h3 className="mb-3 text-3xl font-bold leading-tight text-brand-deep md:text-4xl">
                  {slides[active].title}
                </h3>
                <p className="text-lg leading-8 text-gray-600">{slides[active].subtitle}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  onClick={() => setActive(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === active ? "w-10 bg-brand-deep" : "w-2.5 bg-white/80"
                  }`}
                  aria-label={`عرض الشريحة ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ShieldCheck, Sparkles } from "lucide-react";

interface GallerySlot {
  label: string;
  sublabel?: string;
  bg: string;
  accent?: string;
  image?: string;
  fit?: "cover" | "contain";
}

const GALLERY_SLOTS: GallerySlot[] = [
  { label: "NURA SKIN", sublabel: "صورة المنتج", bg: "from-rose-50 to-pink-100" },
  { label: "الملمس", sublabel: "قوام خفيف", bg: "from-amber-50 to-orange-50" },
  { label: "المكونات", sublabel: "ناياسيناميد", bg: "from-green-50 to-emerald-50" },
  { label: "الاستخدام", sublabel: "أسلوب الحياة", bg: "from-purple-50 to-pink-50" },
  { label: "النتيجة", sublabel: "إشراقة البشرة", bg: "from-yellow-50 to-pink-50" },
];

const PRODUCT_FIRST_IMAGES: Record<string, string> = {
  "nura-balance": "/images/nura-balance-gallery-1.png",
  "nura-night-renewal": "/images/nura-night-renewal-gallery-1.png",
  "nura-eye-revive": "/images/nura-eye-revive-gallery-1.png",
  "nura-spf-50": "/images/nura-spf-50-gallery-1.png",
};

const RETINOL_GALLERY_SLOTS: GallerySlot[] = [
  {
    label: "NURA SKIN",
    sublabel: "صورة المنتج",
    bg: "from-rose-50 to-pink-100",
    image: "/images/nura-night-renewal-gallery-1.png",
    fit: "cover",
  },
  {
    label: "مثبت سريرياً",
    sublabel: "إثبات سريري",
    bg: "from-rose-50 to-pink-100",
    image: "/images/nura-night-renewal-gallery-2.png",
    fit: "contain",
  },
  {
    label: "فوائد كريم الريتينول",
    sublabel: "الفوائد",
    bg: "from-rose-50 to-pink-100",
    image: "/images/nura-night-renewal-gallery-3.png",
    fit: "contain",
  },
  {
    label: "تجربة العناية الليلية",
    sublabel: "تجربة فاخرة",
    bg: "from-amber-50 to-orange-50",
    image: "/images/nura-night-renewal-gallery-4.png",
    fit: "contain",
  },
  {
    label: "ملمس كريم الريتينول",
    sublabel: "طريقة الاستخدام",
    bg: "from-rose-50 to-pink-100",
    image: "/images/nura-night-renewal-gallery-5.png",
    fit: "contain",
  },
];

// Shared complete-tier slots (same 4 products, same images across all product pages)
const COMPLETE_TIER_SLOTS: GallerySlot[] = [
  { label: "طقس نورا الكامل", sublabel: "٤ منتجات — صباح + ليل", bg: "from-rose-50 to-pink-100", image: "/images/bundles/full-routine-hero.jpg", fit: "cover" },
  { label: "الطقس الكامل", sublabel: "روتين متكامل", bg: "from-amber-50 to-orange-50", image: "/images/bundles/nura-complete-premium-routine.png", fit: "contain" },
  { label: "لايف ستايل", sublabel: "طقس العناية الكامل", bg: "from-rose-50 to-pink-100", image: "/images/bundles/complete-routine.jpg", fit: "cover" },
  { label: "سيروم النياسيناميد", sublabel: "إشراقة وتوازن", bg: "from-rose-50 to-pink-100", image: "/images/products/serum-niacinamide-pack.png", fit: "contain" },
  { label: "كريم الريتينول", sublabel: "تجديد ليلي", bg: "from-amber-50 to-orange-50", image: "/images/products/retinol-cream-pack.png", fit: "contain" },
];

// Bundle gallery slots — keyed by productSlug, then by offerTier
const BUNDLE_GALLERIES: Record<string, Record<string, GallerySlot[]>> = {
  "nura-balance": {
    duo: [
      { label: "روتين أساسي", sublabel: "نياسيناميد + ريتينول", bg: "from-rose-50 to-pink-100", image: "/images/bundles/night-renewal-hero.jpg", fit: "cover" },
      { label: "سيروم النياسيناميد", sublabel: "إشراقة نهارية", bg: "from-rose-50 to-pink-100", image: "/images/products/serum-niacinamide-pack.png", fit: "contain" },
      { label: "كريم الريتينول الليلي", sublabel: "تجديد ليلي", bg: "from-amber-50 to-orange-50", image: "/images/products/retinol-cream-pack.png", fit: "contain" },
    ],
    trio: [
      { label: "طقس الصباح الكامل", sublabel: "٣ منتجات — روتين صباحي", bg: "from-rose-50 to-pink-100", image: "/images/bundles/morning-routine-hero.jpg", fit: "cover" },
      { label: "لايف ستايل", sublabel: "روتين الصباح", bg: "from-amber-50 to-orange-50", image: "/images/bundles/morning-routine.jpg", fit: "cover" },
      { label: "سيروم النياسيناميد", sublabel: "إشراقة وتوازن", bg: "from-rose-50 to-pink-100", image: "/images/products/serum-niacinamide-pack.png", fit: "contain" },
      { label: "سيروم محيط العين", sublabel: "مضاد الهالات", bg: "from-green-50 to-emerald-50", image: "/images/products/eye-serum-pack.png", fit: "contain" },
      { label: "واقي الشمس SPF50", sublabel: "حماية يومية", bg: "from-amber-50 to-yellow-50", image: "/images/products/sunscreen-spf50-pack.png", fit: "contain" },
    ],
    complete: COMPLETE_TIER_SLOTS,
  },

  "nura-eye-revive": {
    // duo: eye serum + retinol night cream
    duo: [
      { label: "روتين التجديد الليلي", sublabel: "محيط العين + كريم ليلي", bg: "from-rose-50 to-pink-100", image: "/images/bundles/night-renewal-hero.jpg", fit: "cover" },
      { label: "سيروم محيط العين", sublabel: "إشراقة النظرة", bg: "from-green-50 to-emerald-50", image: "/images/products/eye-serum-pack.png", fit: "contain" },
      { label: "كريم الريتينول الليلي", sublabel: "تجديد ليلي عميق", bg: "from-amber-50 to-orange-50", image: "/images/products/retinol-cream-pack.png", fit: "contain" },
    ],
    // trio: eye serum + niacinamide + spf
    trio: [
      { label: "طقس الإشراقة اليومية", sublabel: "٣ منتجات — روتين صباحي", bg: "from-rose-50 to-pink-100", image: "/images/bundles/morning-routine-hero.jpg", fit: "cover" },
      { label: "لايف ستايل", sublabel: "روتين الصباح", bg: "from-amber-50 to-orange-50", image: "/images/bundles/morning-routine.jpg", fit: "cover" },
      { label: "سيروم محيط العين", sublabel: "إشراقة النظرة", bg: "from-green-50 to-emerald-50", image: "/images/products/eye-serum-pack.png", fit: "contain" },
      { label: "سيروم النياسيناميد", sublabel: "إشراقة وتوازن", bg: "from-rose-50 to-pink-100", image: "/images/products/serum-niacinamide-pack.png", fit: "contain" },
      { label: "واقي الشمس SPF50", sublabel: "حماية يومية", bg: "from-amber-50 to-yellow-50", image: "/images/products/sunscreen-spf50-pack.png", fit: "contain" },
    ],
    complete: COMPLETE_TIER_SLOTS,
  },

  "nura-night-renewal": {
    // duo: retinol + eye serum
    duo: [
      { label: "روتين التجديد الليلي", sublabel: "كريم ليلي + عناية عيون", bg: "from-rose-50 to-pink-100", image: "/images/bundles/night-renewal-hero.jpg", fit: "cover" },
      { label: "كريم الريتينول الليلي", sublabel: "تجديد ليلي عميق", bg: "from-amber-50 to-orange-50", image: "/images/products/retinol-cream-pack.png", fit: "contain" },
      { label: "سيروم محيط العين", sublabel: "إشراقة النظرة", bg: "from-green-50 to-emerald-50", image: "/images/products/eye-serum-pack.png", fit: "contain" },
    ],
    // trio: retinol + niacinamide + spf
    trio: [
      { label: "طقس التجديد والحماية", sublabel: "٣ منتجات — ليل + نهار", bg: "from-rose-50 to-pink-100", image: "/images/bundles/morning-routine-hero.jpg", fit: "cover" },
      { label: "لايف ستايل", sublabel: "روتين متكامل", bg: "from-amber-50 to-orange-50", image: "/images/bundles/morning-routine.jpg", fit: "cover" },
      { label: "كريم الريتينول الليلي", sublabel: "تجديد ليلي", bg: "from-amber-50 to-orange-50", image: "/images/products/retinol-cream-pack.png", fit: "contain" },
      { label: "سيروم النياسيناميد", sublabel: "إشراقة نهارية", bg: "from-rose-50 to-pink-100", image: "/images/products/serum-niacinamide-pack.png", fit: "contain" },
      { label: "واقي الشمس SPF50", sublabel: "حماية يومية", bg: "from-amber-50 to-yellow-50", image: "/images/products/sunscreen-spf50-pack.png", fit: "contain" },
    ],
    complete: COMPLETE_TIER_SLOTS,
  },

  "nura-spf-50": {
    // no duo tier for spf-50 (see products config)
    // trio: retinol + niacinamide + spf
    trio: [
      { label: "طقس الحماية والإشراقة", sublabel: "٣ منتجات — حماية + تجديد", bg: "from-rose-50 to-pink-100", image: "/images/bundles/morning-routine-hero.jpg", fit: "cover" },
      { label: "لايف ستايل", sublabel: "روتين الحماية", bg: "from-amber-50 to-orange-50", image: "/images/bundles/morning-routine.jpg", fit: "cover" },
      { label: "واقي الشمس SPF50", sublabel: "حماية يومية", bg: "from-amber-50 to-yellow-50", image: "/images/products/sunscreen-spf50-pack.png", fit: "contain" },
      { label: "سيروم النياسيناميد", sublabel: "إشراقة وتوازن", bg: "from-rose-50 to-pink-100", image: "/images/products/serum-niacinamide-pack.png", fit: "contain" },
      { label: "كريم الريتينول", sublabel: "تجديد ليلي", bg: "from-amber-50 to-orange-50", image: "/images/products/retinol-cream-pack.png", fit: "contain" },
    ],
    complete: COMPLETE_TIER_SLOTS,
  },
};

interface Props {
  productName: string;
  productSlug: string;
  offerTier?: string;
}

export function ProductGallery({ productName, productSlug, offerTier }: Props) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Reset to first slide whenever offer tier changes
  useEffect(() => {
    setActive(0);
  }, [offerTier]);

  const gallerySlots = React.useMemo(
    () => {
      // Switch to bundle gallery when a non-single offer tier is selected
      if (offerTier && offerTier !== "single") {
        const bundleSlots = BUNDLE_GALLERIES[productSlug]?.[offerTier];
        if (bundleSlots) return bundleSlots;
      }

      if (productSlug === "nura-night-renewal") return RETINOL_GALLERY_SLOTS;

      return GALLERY_SLOTS.map((slot, index) =>
        index === 0 && PRODUCT_FIRST_IMAGES[productSlug]
          ? { ...slot, image: PRODUCT_FIRST_IMAGES[productSlug] }
          : productSlug === "nura-balance" && index === 1
          ? { ...slot, image: "/images/nura-balance-gallery-2.png" }
          : productSlug === "nura-balance" && index === 2
          ? { ...slot, image: "/images/nura-balance-gallery-3.png" }
          : productSlug === "nura-balance" && index === 3
          ? { ...slot, image: "/images/nura-balance-gallery-4.png" }
          : productSlug === "nura-balance" && index === 4
          ? { ...slot, image: "/images/nura-balance-gallery-5.png" }
          : productSlug === "nura-eye-revive" && index === 1
          ? { ...slot, image: "/images/nura-eye-revive-gallery-2.png" }
          : productSlug === "nura-eye-revive" && index === 2
          ? { ...slot, image: "/images/nura-eye-revive-gallery-3.png", fit: "contain" }
          : productSlug === "nura-eye-revive" && index === 3
          ? { ...slot, image: "/images/nura-eye-revive-gallery-5.png" }
          : productSlug === "nura-eye-revive" && index === 4
          ? { ...slot, image: "/images/nura-eye-revive-gallery-4.png" }
          : productSlug === "nura-spf-50" && index === 1
          ? { ...slot, image: "/images/nura-spf-50-gallery-2.png" }
          : productSlug === "nura-spf-50" && index === 2
          ? { ...slot, image: "/images/nura-spf-50-gallery-3.png" }
          : productSlug === "nura-spf-50" && index === 3
          ? { ...slot, image: "/images/nura-spf-50-gallery-4.png" }
          : productSlug === "nura-spf-50" && index === 4
          ? { ...slot, image: "/images/nura-spf-50-gallery-5.png", fit: "contain" }
          : slot
      );
    },
    [productSlug, offerTier]
  );
  const displayIndex = mounted ? active : 0;
  const activeSlot = gallerySlots[displayIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative rounded-4xl overflow-hidden aspect-square bg-rose-blush">
        <AnimatePresence mode="wait">
          <motion.div
            key={displayIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className={`absolute inset-0 ${activeSlot.image ? "" : `bg-gradient-to-br ${activeSlot.bg}`} flex flex-col items-center justify-center gap-4`}
          >
            {activeSlot.image ? (
              <>
                <img
                  src={activeSlot.image}
                  alt={`${productName} - ${activeSlot.sublabel || activeSlot.label}`}
                  className={`absolute inset-0 h-full w-full ${
                    activeSlot.fit === "contain" ? "object-contain" : "object-cover"
                  }`}
                />
                {activeSlot.fit !== "contain" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D2C32]/15 via-transparent to-white/5" />
                )}
              </>
            ) : (
              <>
                <div className="w-32 h-32 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-rose-sm">
                  <div className="w-20 h-20 rounded-full border-2 border-rose-soft/60 flex items-center justify-center">
                    <Droplets className="h-9 w-9 text-rose-deep/70" strokeWidth={1.25} />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-rose-deep font-semibold text-sm">{productName}</p>
                  <p className="text-rose-mid/70 text-xs mt-0.5">{activeSlot.sublabel}</p>
                </div>
              </>
            )}
            {activeSlot.image && (
              <div className="absolute bottom-5 start-5 rounded-full border border-white/45 bg-white/72 px-3 py-1 text-xs font-semibold text-rose-deep shadow-ivory-sm backdrop-blur-md">
                {activeSlot.sublabel}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gallery nav arrows */}
        <button
          onClick={() => setActive((a) => (a === 0 ? gallerySlots.length - 1 : a - 1))}
          className="absolute top-1/2 start-3 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-ivory-sm hover:bg-white transition-colors"
        >
          <svg className="w-4 h-4 text-rose-deep flip-ltr" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setActive((a) => (a + 1) % gallerySlots.length)}
          className="absolute top-1/2 end-3 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-ivory-sm hover:bg-white transition-colors"
        >
          <svg className="w-4 h-4 text-rose-deep flip-ltr" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {gallerySlots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === displayIndex ? "bg-rose-deep w-6" : "bg-rose-soft/60 w-1.5"}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {gallerySlots.map((slot, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative rounded-2xl overflow-hidden aspect-square transition-all duration-200 ${
              i === displayIndex
                ? "ring-2 ring-rose-deep ring-offset-1"
                : "ring-1 ring-border hover:ring-rose-soft"
            }`}
          >
            {slot.image ? (
              <img
                src={slot.image}
                alt=""
                className={`h-full w-full ${slot.fit === "contain" ? "object-contain" : "object-cover"}`}
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${slot.bg} flex items-center justify-center`}>
                <Sparkles className="h-4 w-4 text-rose-deep/60" strokeWidth={1.4} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Premium badge strip */}
      <div className="flex gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 rounded-full border border-rose-soft/35 bg-rose-blush/80 px-2.5 py-1 text-[10px] font-semibold text-rose-deep">
          <Sparkles className="h-3 w-3 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
          تركيبة مدروسة
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-gold/25 bg-gold-light/90 px-2.5 py-1 text-[10px] font-semibold text-brand-deep">
          <Droplets className="h-3 w-3 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
          عناية يومية واضحة
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-brand-deep/10 bg-white px-2.5 py-1 text-[10px] font-semibold text-brand-deep shadow-sm">
          <ShieldCheck className="h-3 w-3 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
          الدفع عند الاستلام
        </span>
      </div>
    </div>
  );
}

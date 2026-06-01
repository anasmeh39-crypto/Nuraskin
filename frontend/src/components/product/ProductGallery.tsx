"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ShieldCheck, Sparkles } from "lucide-react";

interface GallerySlot {
  label: string;
  sublabel?: string;
  bg: string;
  image?: string;
  fit?: "cover" | "contain";
}

// ─── Single-product galleries — 8 slots each ──────────────────────────────
// nura-balance and nura-eye-revive: 4 product images + 4 routine/pack images
// nura-night-renewal and nura-spf-50: 5 real images + 3 "coming soon" placeholders
const SINGLE_PRODUCT_GALLERIES: Record<string, GallerySlot[]> = {
  "nura-balance": [
    { label: "1", sublabel: "سيروم النياسيناميد",      bg: "from-rose-50 to-pink-100",    image: "/images/nura-balance-gallery-1.png",            fit: "cover"   },
    { label: "2", sublabel: "ملمس خفيف",               bg: "from-amber-50 to-orange-50",  image: "/images/nura-balance-gallery-2.png",            fit: "contain" },
    { label: "3", sublabel: "مكونات نقية",              bg: "from-green-50 to-emerald-50", image: "/images/nura-balance-gallery-3.png",            fit: "contain" },
    { label: "4", sublabel: "طريقة الاستخدام",         bg: "from-purple-50 to-pink-50",   image: "/images/nura-balance-gallery-4.png",            fit: "contain" },
    { label: "5", sublabel: "إشراقة البشرة",           bg: "from-yellow-50 to-pink-50",   image: "/images/nura-balance-gallery-5.png",            fit: "cover"   },
    { label: "6", sublabel: "عبوة النياسيناميد",       bg: "from-rose-50 to-pink-100",    image: "/images/products/product-niacinamide.png",      fit: "contain" },
    { label: "7", sublabel: "منتجات الصباح",           bg: "from-amber-50 to-orange-50",  image: "/images/nura-morning-products-hero.png",        fit: "cover"   },
    { label: "8", sublabel: "طقس العناية",             bg: "from-rose-50 to-pink-100",    image: "/images/products/serum-niacinamide-pack.png",   fit: "contain" },
  ],

  "nura-eye-revive": [
    { label: "1", sublabel: "سيروم محيط العين",        bg: "from-rose-50 to-pink-100",    image: "/images/nura-eye-revive-gallery-1.png",         fit: "cover"   },
    { label: "2", sublabel: "ملمس ناعم",               bg: "from-amber-50 to-orange-50",  image: "/images/nura-eye-revive-gallery-2.png",         fit: "cover"   },
    { label: "3", sublabel: "مكونات فعالة",            bg: "from-green-50 to-emerald-50", image: "/images/nura-eye-revive-gallery-3.png",         fit: "contain" },
    { label: "4", sublabel: "نتيجة واضحة",             bg: "from-yellow-50 to-pink-50",   image: "/images/nura-eye-revive-gallery-5.png",         fit: "cover"   },
    { label: "5", sublabel: "طريقة الاستخدام",         bg: "from-purple-50 to-pink-50",   image: "/images/nura-eye-revive-gallery-4.png",         fit: "cover"   },
    { label: "6", sublabel: "عرض المنتج",              bg: "from-rose-50 to-pink-100",    image: "/images/nura-eye-revive-showcase.png",          fit: "cover"   },
    { label: "7", sublabel: "عبوة سيروم العين",        bg: "from-green-50 to-emerald-50", image: "/images/products/product-anti-cernes.png",      fit: "contain" },
    { label: "8", sublabel: "طقس العناية",             bg: "from-rose-50 to-pink-100",    image: "/images/products/eye-serum-pack.png",           fit: "contain" },
  ],

  "nura-night-renewal": [
    { label: "1", sublabel: "كريم الريتينول",          bg: "from-rose-50 to-pink-100",    image: "/images/nura-night-renewal-gallery-1.png",      fit: "cover"   },
    { label: "2", sublabel: "إثبات سريري",             bg: "from-rose-50 to-pink-100",    image: "/images/nura-night-renewal-gallery-2.png",      fit: "contain" },
    { label: "3", sublabel: "الفوائد",                 bg: "from-rose-50 to-pink-100",    image: "/images/nura-night-renewal-gallery-3.png",      fit: "contain" },
    { label: "4", sublabel: "تجربة فاخرة",             bg: "from-amber-50 to-orange-50",  image: "/images/nura-night-renewal-gallery-4.png",      fit: "contain" },
    { label: "5", sublabel: "طريقة الاستخدام",         bg: "from-rose-50 to-pink-100",    image: "/images/nura-night-renewal-gallery-5.png",      fit: "contain" },
    { label: "6", sublabel: "صورة قريباً",             bg: "from-rose-50 to-pink-50"                                                                              },
    { label: "7", sublabel: "صورة قريباً",             bg: "from-amber-50 to-orange-50"                                                                           },
    { label: "8", sublabel: "صورة قريباً",             bg: "from-rose-100 to-pink-100"                                                                            },
  ],

  "nura-spf-50": [
    { label: "1", sublabel: "واقي الشمس SPF50",        bg: "from-rose-50 to-pink-100",    image: "/images/nura-spf-50-gallery-1.png",             fit: "cover"   },
    { label: "2", sublabel: "ملمس خفيف",               bg: "from-amber-50 to-orange-50",  image: "/images/nura-spf-50-gallery-2.png",             fit: "contain" },
    { label: "3", sublabel: "حماية يومية",             bg: "from-green-50 to-emerald-50", image: "/images/nura-spf-50-gallery-3.png",             fit: "contain" },
    { label: "4", sublabel: "طريقة الاستخدام",         bg: "from-purple-50 to-pink-50",   image: "/images/nura-spf-50-gallery-4.png",             fit: "contain" },
    { label: "5", sublabel: "إشراقة محمية",            bg: "from-yellow-50 to-pink-50",   image: "/images/nura-spf-50-gallery-5.png",             fit: "contain" },
    { label: "6", sublabel: "صورة قريباً",             bg: "from-amber-50 to-yellow-50"                                                                           },
    { label: "7", sublabel: "صورة قريباً",             bg: "from-rose-50 to-pink-50"                                                                              },
    { label: "8", sublabel: "صورة قريباً",             bg: "from-amber-50 to-orange-50"                                                                           },
  ],
};

// ─── Shared complete-tier slots ────────────────────────────────────────────
const COMPLETE_TIER_SLOTS: GallerySlot[] = [
  { label: "1", sublabel: "٤ منتجات — صباح + ليل",    bg: "from-rose-50 to-pink-100",    image: "/images/bundles/full-routine-hero.jpg",             fit: "cover"   },
  { label: "2", sublabel: "طقس العناية الكامل",       bg: "from-rose-50 to-pink-100",    image: "/images/nura-complete-bathroom-editorial.jpg",      fit: "cover"   },
  { label: "3", sublabel: "روتين متكامل",             bg: "from-amber-50 to-orange-50",  image: "/images/bundles/complete-routine.jpg",              fit: "cover"   },
  { label: "4", sublabel: "٤ منتجات معاً",            bg: "from-rose-50 to-pink-100",    image: "/images/routine-complete-family.png",               fit: "contain" },
  { label: "5", sublabel: "نياسيناميد + ريتينول",     bg: "from-amber-50 to-orange-50",  image: "/images/bundles/nura-complete-premium-routine.png", fit: "contain" },
];

// ─── Bundle galleries — keyed by productSlug → offerTier ──────────────────
const BUNDLE_GALLERIES: Record<string, Record<string, GallerySlot[]>> = {
  "nura-balance": {
    duo: [
      { label: "1", sublabel: "نياسيناميد + ريتينول",  bg: "from-rose-50 to-pink-100",    image: "/images/bundles/night-renewal-hero.jpg",         fit: "cover"   },
      { label: "2", sublabel: "طقس العناية الليلية",   bg: "from-rose-50 to-pink-100",    image: "/images/bundles/night-renewal.jpg",              fit: "cover"   },
      { label: "3", sublabel: "إشراقة نهارية",         bg: "from-rose-50 to-pink-100",    image: "/images/products/serum-niacinamide-pack.png",   fit: "contain" },
      { label: "4", sublabel: "تجديد ليلي",            bg: "from-amber-50 to-orange-50",  image: "/images/products/retinol-cream-pack.png",       fit: "contain" },
    ],
    trio: [
      { label: "1", sublabel: "٣ منتجات — روتين صباحي", bg: "from-rose-50 to-pink-100",  image: "/images/bundles/morning-routine-hero.jpg",       fit: "cover"   },
      { label: "2", sublabel: "روتين الصباح",          bg: "from-amber-50 to-orange-50",  image: "/images/bundles/morning-routine.jpg",            fit: "cover"   },
      { label: "3", sublabel: "إشراقة وتوازن",         bg: "from-rose-50 to-pink-100",    image: "/images/products/serum-niacinamide-pack.png",   fit: "contain" },
      { label: "4", sublabel: "مضاد الهالات",          bg: "from-green-50 to-emerald-50", image: "/images/products/eye-serum-pack.png",           fit: "contain" },
      { label: "5", sublabel: "حماية يومية",           bg: "from-amber-50 to-yellow-50",  image: "/images/products/sunscreen-spf50-pack.png",     fit: "contain" },
    ],
    complete: COMPLETE_TIER_SLOTS,
  },

  "nura-eye-revive": {
    duo: [
      { label: "1", sublabel: "محيط العين + كريم ليلي", bg: "from-rose-50 to-pink-100",  image: "/images/bundles/night-renewal-hero.jpg",         fit: "cover"   },
      { label: "2", sublabel: "طقس العناية الليلية",   bg: "from-rose-50 to-pink-100",    image: "/images/bundles/night-renewal.jpg",              fit: "cover"   },
      { label: "3", sublabel: "إشراقة النظرة",         bg: "from-green-50 to-emerald-50", image: "/images/products/eye-serum-pack.png",           fit: "contain" },
      { label: "4", sublabel: "تجديد ليلي عميق",       bg: "from-amber-50 to-orange-50",  image: "/images/products/retinol-cream-pack.png",       fit: "contain" },
    ],
    trio: [
      { label: "1", sublabel: "٣ منتجات — روتين صباحي", bg: "from-rose-50 to-pink-100",  image: "/images/bundles/morning-routine-hero.jpg",       fit: "cover"   },
      { label: "2", sublabel: "روتين الصباح",          bg: "from-amber-50 to-orange-50",  image: "/images/bundles/morning-routine.jpg",            fit: "cover"   },
      { label: "3", sublabel: "إشراقة النظرة",         bg: "from-green-50 to-emerald-50", image: "/images/products/eye-serum-pack.png",           fit: "contain" },
      { label: "4", sublabel: "إشراقة وتوازن",         bg: "from-rose-50 to-pink-100",    image: "/images/products/serum-niacinamide-pack.png",   fit: "contain" },
      { label: "5", sublabel: "حماية يومية",           bg: "from-amber-50 to-yellow-50",  image: "/images/products/sunscreen-spf50-pack.png",     fit: "contain" },
    ],
    complete: COMPLETE_TIER_SLOTS,
  },

  "nura-night-renewal": {
    duo: [
      { label: "1", sublabel: "كريم ليلي + عناية عيون", bg: "from-rose-50 to-pink-100",  image: "/images/bundles/night-renewal-hero.jpg",         fit: "cover"   },
      { label: "2", sublabel: "طقس العناية الليلية",   bg: "from-rose-50 to-pink-100",    image: "/images/bundles/night-renewal.jpg",              fit: "cover"   },
      { label: "3", sublabel: "تجديد ليلي عميق",       bg: "from-amber-50 to-orange-50",  image: "/images/products/retinol-cream-pack.png",       fit: "contain" },
      { label: "4", sublabel: "إشراقة النظرة",         bg: "from-green-50 to-emerald-50", image: "/images/products/eye-serum-pack.png",           fit: "contain" },
    ],
    trio: [
      { label: "1", sublabel: "٣ منتجات — ليل + نهار", bg: "from-rose-50 to-pink-100",   image: "/images/bundles/morning-routine-hero.jpg",       fit: "cover"   },
      { label: "2", sublabel: "روتين متكامل",          bg: "from-amber-50 to-orange-50",  image: "/images/bundles/morning-routine.jpg",            fit: "cover"   },
      { label: "3", sublabel: "تجديد ليلي",            bg: "from-amber-50 to-orange-50",  image: "/images/products/retinol-cream-pack.png",       fit: "contain" },
      { label: "4", sublabel: "إشراقة نهارية",         bg: "from-rose-50 to-pink-100",    image: "/images/products/serum-niacinamide-pack.png",   fit: "contain" },
      { label: "5", sublabel: "حماية يومية",           bg: "from-amber-50 to-yellow-50",  image: "/images/products/sunscreen-spf50-pack.png",     fit: "contain" },
    ],
    complete: COMPLETE_TIER_SLOTS,
  },

  "nura-spf-50": {
    trio: [
      { label: "1", sublabel: "٣ منتجات — حماية + تجديد", bg: "from-rose-50 to-pink-100", image: "/images/bundles/morning-routine-hero.jpg",     fit: "cover"   },
      { label: "2", sublabel: "روتين الحماية",         bg: "from-amber-50 to-orange-50",  image: "/images/bundles/morning-routine.jpg",            fit: "cover"   },
      { label: "3", sublabel: "حماية يومية",           bg: "from-amber-50 to-yellow-50",  image: "/images/products/sunscreen-spf50-pack.png",     fit: "contain" },
      { label: "4", sublabel: "إشراقة وتوازن",         bg: "from-rose-50 to-pink-100",    image: "/images/products/serum-niacinamide-pack.png",   fit: "contain" },
      { label: "5", sublabel: "تجديد ليلي",            bg: "from-amber-50 to-orange-50",  image: "/images/products/retinol-cream-pack.png",       fit: "contain" },
    ],
    complete: COMPLETE_TIER_SLOTS,
  },
};

interface Props {
  productName: string;
  productSlug: string;
  offerTier?: string;
  offerLabel?: string;
}

export function ProductGallery({ productName, productSlug, offerTier, offerLabel }: Props) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const slotCount = useRef(1);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    const len = slotCount.current;
    setActive((a) => dx > 0 ? (a + 1) % len : (a === 0 ? len - 1 : a - 1));
    touchStartX.current = null;
    touchStartY.current = null;
  }, []);

  useEffect(() => { setActive(0); }, [offerTier]);
  useEffect(() => { setMounted(true); }, []);

  const gallerySlots = React.useMemo(() => {
    if (offerTier && offerTier !== "single") {
      const bundleSlots = BUNDLE_GALLERIES[productSlug]?.[offerTier];
      if (bundleSlots) return bundleSlots;
    }
    return SINGLE_PRODUCT_GALLERIES[productSlug] ?? [];
  }, [productSlug, offerTier]);

  slotCount.current = gallerySlots.length;

  const displayIndex = mounted ? active : 0;
  const activeSlot = gallerySlots[displayIndex] ?? gallerySlots[0];

  // Thumbnails: scrollable strip for 8 slots, fixed grid for ≤5
  const isScrollableThumbs = gallerySlots.length > 5;
  const thumbGridClass =
    gallerySlots.length <= 3 ? "grid-cols-3" :
    gallerySlots.length === 4 ? "grid-cols-4" :
    "grid-cols-5";

  const showBundleBadge = !!offerLabel && !!offerTier && offerTier !== "single";

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      {/* ── Main image ──────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-none sm:rounded-4xl overflow-hidden aspect-square bg-rose-blush"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        {/* Bundle context badge */}
        <AnimatePresence>
          {showBundleBadge && (
            <motion.div
              key={`badge-${offerTier}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="absolute top-4 inset-x-0 z-20 flex justify-center pointer-events-none"
            >
              <span className="rounded-full bg-white/92 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold text-rose-deep shadow-rose-sm">
                {offerLabel}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${offerTier ?? "single"}-${displayIndex}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className={`absolute inset-0 flex flex-col items-center justify-center gap-4 ${
              activeSlot?.image ? "" : `bg-gradient-to-br ${activeSlot?.bg}`
            }`}
          >
            {activeSlot?.image ? (
              <>
                <Image
                  src={activeSlot.image}
                  alt={`${productName} — ${activeSlot.sublabel ?? activeSlot.label}`}
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={activeSlot.fit === "contain" ? "object-contain" : "object-cover"}
                />
                {activeSlot.fit !== "contain" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D2C32]/15 via-transparent to-white/5" />
                )}
                <div className="absolute bottom-5 start-5 rounded-full border border-white/45 bg-white/72 px-3 py-1 text-xs font-semibold text-rose-deep shadow-ivory-sm backdrop-blur-md">
                  {activeSlot.sublabel}
                </div>
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
                  <p className="text-rose-mid/70 text-xs mt-0.5">{activeSlot?.sublabel}</p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
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
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === displayIndex ? "bg-rose-deep w-6" : "bg-rose-soft/60 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Thumbnails ─────────────────────────────────────────────────────── */}
      <div
        className={
          isScrollableThumbs
            ? "flex gap-1.5 px-4 sm:px-0 overflow-x-auto pb-0.5"
            : `grid ${thumbGridClass} gap-1.5 px-4 sm:px-0 sm:gap-2`
        }
        style={isScrollableThumbs ? { scrollbarWidth: "none" } : undefined}
      >
        {gallerySlots.map((slot, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative overflow-hidden rounded-2xl transition-all duration-200 flex-shrink-0 ${
              isScrollableThumbs ? "w-16 h-16" : "aspect-square"
            } ${
              i === displayIndex
                ? "ring-2 ring-rose-deep ring-offset-1"
                : "ring-1 ring-border hover:ring-rose-soft"
            }`}
          >
            {slot.image ? (
              <Image
                src={slot.image}
                alt=""
                fill
                quality={60}
                sizes="64px"
                className={slot.fit === "contain" ? "object-contain" : "object-cover"}
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${slot.bg} flex items-center justify-center`}>
                <Sparkles className="h-4 w-4 text-rose-deep/60" strokeWidth={1.4} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ── Premium badge strip ─────────────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap px-4 sm:px-0">
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

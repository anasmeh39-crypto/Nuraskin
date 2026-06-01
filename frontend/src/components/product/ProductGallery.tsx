"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ImageOff, ShieldCheck, Sparkles } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface GallerySlot {
  sublabel: string;
  bg: string;
  image?: string;
  fit?: "cover" | "contain";
  /** true = real image missing, show Arabic "يجب إضافة صورة هنا" */
  missing?: boolean;
}

// ─── Shorthand helpers ────────────────────────────────────────────────────────
const img = (
  image: string,
  sublabel: string,
  fit: "cover" | "contain" = "cover",
  bg = "from-rose-50 to-pink-100",
): GallerySlot => ({ image, sublabel, fit, bg });

const todo = (sublabel = "يجب إضافة صورة هنا"): GallerySlot => ({
  sublabel,
  bg: "from-slate-50 to-gray-100",
  missing: true,
});

// ─── Image path aliases ───────────────────────────────────────────────────────
const P = {
  // single-product gallery shots
  BAL1: "/images/nura-balance-gallery-1.png",
  BAL2: "/images/nura-balance-gallery-2.png",
  BAL3: "/images/nura-balance-gallery-3.png",
  BAL4: "/images/nura-balance-gallery-4.png",
  BAL5: "/images/nura-balance-gallery-5.png",

  EYE1: "/images/nura-eye-revive-gallery-1.png",
  EYE2: "/images/nura-eye-revive-gallery-2.png",
  EYE3: "/images/nura-eye-revive-gallery-3.png",
  EYE4: "/images/nura-eye-revive-gallery-4.png",
  EYE5: "/images/nura-eye-revive-gallery-5.png",
  EYE_SHOW: "/images/nura-eye-revive-showcase.png",
  EYE_S1: "/images/usage/eye-revive-step-1.png",
  EYE_S2: "/images/usage/eye-revive-step-2.png",
  EYE_S3: "/images/usage/eye-revive-step-3.png",
  EYE_MODEL: "/images/nura-eye-revive-lifestyle-model.png",
  EYE_CLIN:  "/images/nura-eye-revive-clinical-65.png",
  EYE_INGR:  "/images/nura-eye-revive-ingredients.png",
  EYE_NIGHT: "/images/nura-eye-revive-lifestyle-night.png",

  RET1: "/images/nura-night-renewal-gallery-1.png",
  RET2: "/images/nura-night-renewal-gallery-2.png",
  RET3: "/images/nura-night-renewal-gallery-3.png",
  RET4: "/images/nura-night-renewal-gallery-4.png",
  RET5: "/images/nura-night-renewal-gallery-5.png",
  RET_TEX: "/images/retinol-texture-card-3.jpeg",

  SPF1: "/images/nura-spf-50-gallery-1.png",
  SPF2: "/images/nura-spf-50-gallery-2.png",
  SPF3: "/images/nura-spf-50-gallery-3.png",
  SPF4: "/images/nura-spf-50-gallery-4.png",
  SPF5: "/images/nura-spf-50-gallery-5.png",

  // clean product shots
  pNIA: "/images/products/product-niacinamide.png",
  pEYE: "/images/products/product-anti-cernes.png",
  pRET: "/images/products/product-retinol.png",
  pSPF: "/images/products/product-sunscreen.png",

  // pack shots (transparent-bg composition)
  pkNIA: "/images/products/serum-niacinamide-pack.png",
  pkEYE: "/images/products/eye-serum-pack.png",
  pkRET: "/images/products/retinol-cream-pack.png",
  pkSPF: "/images/products/sunscreen-spf50-pack.png",

  // lifestyle / routine
  MORN_HERO: "/images/bundles/morning-routine-hero.jpg",
  MORN_LIFE: "/images/bundles/morning-routine.jpg",
  NIGHT_HERO: "/images/bundles/night-renewal-hero.jpg",
  NIGHT_LIFE: "/images/bundles/night-renewal.jpg",
  FULL_HERO: "/images/bundles/full-routine-hero.jpg",
  FULL_LIFE: "/images/bundles/complete-routine.jpg",
  FULL_PREM: "/images/bundles/nura-complete-premium-routine.png",

  MORN_PROD: "/images/nura-morning-products-hero.png",
  COMP_EDIT: "/images/nura-complete-bathroom-editorial.jpg",
  COMP_HERO: "/images/nura-complete-routine-hero.png",
  COMP_FAM: "/images/routine-complete-family.png",

  EMO_DAY: "/images/emotion-confidence-day.png",
  EMO_NIGHT: "/images/emotion-evening-peace.png",
} as const;

// ─── SINGLE-PRODUCT GALLERIES  (slots 1-4 = product hero, 5-8 = routine/pack)
const SINGLE_GALLERIES: Record<string, GallerySlot[]> = {
  "nura-balance": [
    img(P.BAL1,     "واجهة السيروم — عرض أمامي",    "cover",   "from-rose-50 to-pink-100"),
    img(P.BAL2,     "زاوية المنتج — قوام خفيف",      "contain", "from-amber-50 to-rose-50"),
    img(P.BAL3,     "مكونات النياسيناميد النقية",    "contain", "from-green-50 to-emerald-50"),
    img(P.BAL4,     "طريقة الاستخدام اليومية",       "contain", "from-rose-50 to-pink-100"),
    img(P.BAL5,     "إشراقة البشرة — نتيجة حقيقية", "cover",   "from-yellow-50 to-pink-50"),
    img(P.MORN_PROD,"منتجات الصباح معاً",           "cover",   "from-amber-50 to-orange-50"),
  ],

  "nura-eye-revive": [
    img(P.EYE1,      "سيروم محيط العين — واجهة أمامية",  "cover",   "from-rose-50 to-pink-100"),
    img(P.EYE_MODEL, "ثقة وإشراقة — لايف ستايل",         "cover",   "from-rose-50 to-pink-100"),
    img(P.EYE_CLIN,  "مثبت سريرياً — يقلل الهالات 65%", "cover",   "from-pink-50 to-rose-100"),
    img(P.EYE_INGR,  "مكونات فعالة — كافيين وببتيدات",  "cover",   "from-amber-50 to-rose-50"),
    img(P.EYE2,      "زاوية المنتج — تركيبة فاخرة",      "cover",   "from-amber-50 to-rose-50"),
    img(P.EYE3,      "قوام ناعم — تطبيق حول العين",      "contain", "from-green-50 to-teal-50"),
    img(P.EYE_NIGHT, "طقس العناية الليلية",               "cover",   "from-rose-50 to-pink-100"),
    img(P.EYE_SHOW,  "عرض المنتج — بريميوم",              "cover",   "from-rose-50 to-pink-100"),
  ],

  "nura-night-renewal": [
    img(P.RET1,    "كريم الريتينول — واجهة أمامية",  "cover",   "from-rose-50 to-pink-100"),
    img(P.RET2,    "إثبات سريري — فعالية مثبتة",     "contain", "from-rose-50 to-pink-100"),
    img(P.RET3,    "فوائد كريم الريتينول",            "contain", "from-amber-50 to-orange-50"),
    img(P.RET4,    "تجربة عناية ليلية فاخرة",        "contain", "from-rose-50 to-pink-100"),
    img(P.RET5,    "طريقة تطبيق الكريم الليلي",      "contain", "from-rose-50 to-pink-100"),
    img(P.RET_TEX, "ملمس الكريم — قوام ناعم",        "contain", "from-amber-50 to-orange-50"),
    img(P.pRET,    "عبوة كريم الريتينول الليلي",     "contain", "from-amber-50 to-orange-50"),
    img(P.pkRET,   "عرض الطقس — كريم الريتينول",     "contain", "from-rose-50 to-pink-100"),
  ],

  "nura-spf-50": [
    img(P.SPF1,   "واقي الشمس SPF50 — أمامي",       "cover",   "from-amber-50 to-yellow-50"),
    img(P.SPF2,   "ملمس خفيف — تركيبة مرطبة",       "contain", "from-amber-50 to-orange-50"),
    img(P.SPF3,   "حماية UVA/UVB — تركيبة يومية",   "contain", "from-amber-50 to-yellow-50"),
    img(P.SPF4,   "طريقة الاستخدام الصباحية",        "contain", "from-amber-50 to-orange-50"),
    img(P.SPF5,   "حماية كاملة — استعداد للنهار",   "contain", "from-yellow-50 to-amber-50"),
    img(P.pSPF,   "عبوة واقي الشمس SPF50",          "contain", "from-amber-50 to-yellow-50"),
    img(P.pkSPF,  "عرض الطقس — واقي الشمس",         "contain", "from-amber-50 to-yellow-50"),
    todo(),
  ],
};

// ─── COMPLETE TIER — shared across all product pages ─────────────────────────
// slots 1-4 = the 4 pack shots, slots 5-8 = complete routine lifestyle
const COMPLETE_SLOTS: GallerySlot[] = [
  img(P.pkNIA,     "سيروم النياسيناميد",             "contain", "from-rose-50 to-pink-100"),
  img(P.pkEYE,     "سيروم محيط العين",               "contain", "from-green-50 to-emerald-50"),
  img(P.pkRET,     "كريم الريتينول الليلي",          "contain", "from-amber-50 to-orange-50"),
  img(P.pkSPF,     "واقي الشمس SPF50",               "contain", "from-amber-50 to-yellow-50"),
  img(P.FULL_HERO, "روتين نورا الكامل — ٤ منتجات",  "cover",   "from-rose-50 to-pink-100"),
  img(P.COMP_EDIT, "طقس العناية الكامل — لايف ستايل","cover",   "from-rose-50 to-pink-100"),
  img(P.COMP_FAM,  "٤ منتجات معاً — فلات لاي",       "contain", "from-rose-50 to-pink-100"),
  img(P.COMP_HERO, "روتين نورا — هيرو صباح + ليل",  "contain", "from-rose-50 to-pink-100"),
];

// ─── BUNDLE GALLERIES — keyed by productSlug → offerTier ─────────────────────
// slots 1-4 = specific products in that bundle
// slots 5-8 = routine lifestyle / context for that bundle
const BUNDLE_GALLERIES: Record<string, Record<string, GallerySlot[]>> = {

  "nura-balance": {
    // duo = niacinamide + retinol night cream (night routine)
    duo: [
      img(P.pkNIA,      "سيروم النياسيناميد",              "contain", "from-rose-50 to-pink-100"),
      img(P.pkRET,      "كريم الريتينول الليلي",           "contain", "from-amber-50 to-orange-50"),
      img(P.pNIA,       "عبوة النياسيناميد",               "contain", "from-rose-50 to-pink-100"),
      img(P.pRET,       "عبوة كريم الريتينول",             "contain", "from-amber-50 to-orange-50"),
      img(P.NIGHT_HERO, "روتين أساسي — نياسيناميد + ريتينول","cover", "from-rose-50 to-pink-100"),
      img(P.NIGHT_LIFE, "طقس العناية الليلية",             "cover",   "from-rose-50 to-pink-100"),
      img(P.EMO_NIGHT,  "مساء العناية والراحة",             "cover",   "from-indigo-50 to-purple-50"),
      todo(),
    ],
    // trio = niacinamide + eye serum + SPF (morning routine)
    trio: [
      img(P.pkNIA,      "سيروم النياسيناميد",              "contain", "from-rose-50 to-pink-100"),
      img(P.pkEYE,      "سيروم محيط العين",                "contain", "from-green-50 to-emerald-50"),
      img(P.pkSPF,      "واقي الشمس SPF50",                "contain", "from-amber-50 to-yellow-50"),
      img(P.MORN_PROD,  "٣ منتجات الصباح معاً",           "cover",   "from-amber-50 to-orange-50"),
      img(P.MORN_HERO,  "روتين الصباح الكامل — ٣ منتجات", "cover",   "from-rose-50 to-pink-100"),
      img(P.MORN_LIFE,  "طقس الصباح — إشراقة وحماية",     "cover",   "from-amber-50 to-orange-50"),
      img(P.EMO_DAY,    "ثقة وإشراقة طوال النهار",        "cover",   "from-amber-50 to-yellow-50"),
      todo(),
    ],
    complete: COMPLETE_SLOTS,
  },

  "nura-eye-revive": {
    // duo = eye serum + retinol night cream (night routine)
    duo: [
      img(P.pkEYE,      "سيروم محيط العين",                "contain", "from-green-50 to-emerald-50"),
      img(P.pkRET,      "كريم الريتينول الليلي",           "contain", "from-amber-50 to-orange-50"),
      img(P.pEYE,       "عبوة سيروم محيط العين",           "contain", "from-green-50 to-emerald-50"),
      img(P.pRET,       "عبوة كريم الريتينول",             "contain", "from-amber-50 to-orange-50"),
      img(P.NIGHT_HERO, "روتين أساسي — عيون + ريتينول",   "cover",   "from-rose-50 to-pink-100"),
      img(P.NIGHT_LIFE, "طقس العناية الليلية",             "cover",   "from-rose-50 to-pink-100"),
      img(P.EMO_NIGHT,  "مساء العناية والراحة",             "cover",   "from-indigo-50 to-purple-50"),
      todo(),
    ],
    // trio = eye serum + niacinamide + SPF (morning routine)
    trio: [
      img(P.pkEYE,      "سيروم محيط العين",                "contain", "from-green-50 to-emerald-50"),
      img(P.MORN_HERO,  "روتين الإشراقة اليومية",         "cover",   "from-rose-50 to-pink-100"),
      img(P.MORN_LIFE,  "طقس الصباح — إشراقة وحماية",     "cover",   "from-amber-50 to-orange-50"),
      todo(),
    ],
    complete: COMPLETE_SLOTS,
  },

  "nura-night-renewal": {
    // duo = retinol + eye serum (night routine)
    duo: [
      img(P.pkRET,      "كريم الريتينول الليلي",           "contain", "from-amber-50 to-orange-50"),
      img(P.pkEYE,      "سيروم محيط العين",                "contain", "from-green-50 to-emerald-50"),
      img(P.pRET,       "عبوة كريم الريتينول",             "contain", "from-amber-50 to-orange-50"),
      img(P.pEYE,       "عبوة سيروم محيط العين",           "contain", "from-green-50 to-emerald-50"),
      img(P.NIGHT_HERO, "روتين التجديد الليلي — ريتينول + عيون","cover","from-rose-50 to-pink-100"),
      img(P.NIGHT_LIFE, "طقس العناية الليلية",             "cover",   "from-rose-50 to-pink-100"),
      img(P.EMO_NIGHT,  "مساء العناية والراحة",             "cover",   "from-indigo-50 to-purple-50"),
      todo(),
    ],
    // trio = retinol + niacinamide + SPF
    trio: [
      img(P.pkRET,      "كريم الريتينول الليلي",           "contain", "from-amber-50 to-orange-50"),
      img(P.pkNIA,      "سيروم النياسيناميد",              "contain", "from-rose-50 to-pink-100"),
      img(P.pkSPF,      "واقي الشمس SPF50",                "contain", "from-amber-50 to-yellow-50"),
      img(P.MORN_PROD,  "٣ منتجات معاً",                  "cover",   "from-amber-50 to-orange-50"),
      img(P.MORN_HERO,  "روتين التجديد والحماية",         "cover",   "from-rose-50 to-pink-100"),
      img(P.MORN_LIFE,  "طقس الصباح والليل معاً",         "cover",   "from-amber-50 to-orange-50"),
      img(P.EMO_DAY,    "ثقة وإشراقة طوال النهار",        "cover",   "from-amber-50 to-yellow-50"),
      todo(),
    ],
    complete: COMPLETE_SLOTS,
  },

  "nura-spf-50": {
    // no duo tier for SPF
    // trio = SPF + niacinamide + retinol
    trio: [
      img(P.pkSPF,      "واقي الشمس SPF50",                "contain", "from-amber-50 to-yellow-50"),
      img(P.pkNIA,      "سيروم النياسيناميد",              "contain", "from-rose-50 to-pink-100"),
      img(P.pkRET,      "كريم الريتينول الليلي",           "contain", "from-amber-50 to-orange-50"),
      img(P.MORN_PROD,  "٣ منتجات معاً",                  "cover",   "from-amber-50 to-orange-50"),
      img(P.MORN_HERO,  "روتين الحماية والإشراقة",        "cover",   "from-rose-50 to-pink-100"),
      img(P.MORN_LIFE,  "طقس الصباح — حماية وإشراقة",    "cover",   "from-amber-50 to-orange-50"),
      img(P.EMO_DAY,    "ثقة وإشراقة طوال النهار",        "cover",   "from-amber-50 to-yellow-50"),
      todo(),
    ],
    complete: COMPLETE_SLOTS,
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
interface Props {
  productName: string;
  productSlug: string;
  offerTier?: string;
  offerLabel?: string;
}

export function ProductGallery({ productName, productSlug, offerTier, offerLabel }: Props) {
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const slotCount   = useRef(1);

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
    return SINGLE_GALLERIES[productSlug] ?? [];
  }, [productSlug, offerTier]);

  slotCount.current = gallerySlots.length;

  const displayIndex  = mounted ? active : 0;
  const activeSlot    = gallerySlots[displayIndex] ?? gallerySlots[0];
  const showBadge     = !!offerLabel && !!offerTier && offerTier !== "single";

  // Scrollable strip for 8-slot galleries; fixed grid for ≤5
  const scrollThumbs  = gallerySlots.length > 5;
  const thumbGrid     =
    gallerySlots.length <= 3 ? "grid-cols-3" :
    gallerySlots.length === 4 ? "grid-cols-4" : "grid-cols-5";

  return (
    <div className="flex flex-col gap-2 sm:gap-4">

      {/* ── Main image ──────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-none sm:rounded-4xl overflow-hidden aspect-square bg-rose-blush"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        {/* Bundle name badge */}
        <AnimatePresence>
          {showBadge && (
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

        {/* Image slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${offerTier ?? "single"}-${displayIndex}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] as const }}
            className={`absolute inset-0 flex flex-col items-center justify-center gap-4 ${
              activeSlot?.image ? "" : `bg-gradient-to-br ${activeSlot?.bg}`
            }`}
          >
            {activeSlot?.image ? (
              <>
                <Image
                  src={activeSlot.image}
                  alt={`${productName} — ${activeSlot.sublabel}`}
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
            ) : activeSlot?.missing ? (
              /* ── Missing-image placeholder ── */
              <div className="flex flex-col items-center gap-3 px-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <ImageOff className="h-7 w-7 text-slate-400" strokeWidth={1.4} />
                </div>
                <p className="text-[13px] font-bold text-slate-500 leading-snug" dir="rtl">
                  يجب إضافة صورة هنا
                </p>
                <p className="text-[10px] text-slate-400">
                  {activeSlot.sublabel !== "يجب إضافة صورة هنا" ? activeSlot.sublabel : ""}
                </p>
              </div>
            ) : (
              /* ── Decorative gradient slot ── */
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

        {/* Arrows */}
        <button
          onClick={() => setActive((a) => (a === 0 ? gallerySlots.length - 1 : a - 1))}
          className="absolute top-1/2 start-3 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-ivory-sm hover:bg-white transition-colors z-10"
        >
          <svg className="w-4 h-4 text-rose-deep flip-ltr" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setActive((a) => (a + 1) % gallerySlots.length)}
          className="absolute top-1/2 end-3 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-ivory-sm hover:bg-white transition-colors z-10"
        >
          <svg className="w-4 h-4 text-rose-deep flip-ltr" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
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
          scrollThumbs
            ? "flex gap-1.5 px-4 sm:px-0 overflow-x-auto pb-0.5"
            : `grid ${thumbGrid} gap-1.5 px-4 sm:px-0 sm:gap-2`
        }
        style={scrollThumbs ? { scrollbarWidth: "none" } : undefined}
      >
        {gallerySlots.map((slot, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative overflow-hidden rounded-2xl flex-shrink-0 transition-all duration-200 ${
              scrollThumbs ? "w-16 h-16" : "aspect-square"
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
            ) : slot.missing ? (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                <ImageOff className="h-4 w-4 text-slate-300" strokeWidth={1.4} />
              </div>
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${slot.bg} flex items-center justify-center`}>
                <Sparkles className="h-4 w-4 text-rose-deep/60" strokeWidth={1.4} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ── Badge strip ─────────────────────────────────────────────────────── */}
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

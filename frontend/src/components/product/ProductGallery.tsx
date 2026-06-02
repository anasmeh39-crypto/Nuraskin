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
  missing?: boolean;
}

interface ProductGalleryConfig {
  /** 4 images — always show the main product */
  heroImages: GallerySlot[];
  bundleImages: {
    single:   GallerySlot[];   // extra product shots
    duo:      GallerySlot[];   // night routine (2 products)
    trio:     GallerySlot[];   // morning routine (3 products)
    complete: GallerySlot[];   // full routine (4 products)
  };
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

// ─── Image path constants ─────────────────────────────────────────────────────
const P = {
  BAL1: "/images/nura-balance-gallery-1.png",
  BAL2: "/images/nura-balance-gallery-2.png",
  BAL3: "/images/nura-balance-gallery-3.png",
  BAL4: "/images/nura-balance-gallery-4.png",
  BAL5: "/images/nura-balance-gallery-5.png",

  EYE1:    "/images/nura-eye-revive-gallery-1.png",
  EYE2:    "/images/nura-eye-revive-gallery-2.png",
  EYE3:    "/images/nura-eye-revive-gallery-3.png",
  EYE4:    "/images/nura-eye-revive-gallery-4.png",
  EYE_SHOW:  "/images/nura-eye-revive-showcase.png",
  EYE_MODEL: "/images/nura-eye-revive-lifestyle-model.png",
  EYE_CLIN:  "/images/nura-eye-revive-clinical-65.png",
  EYE_INGR:  "/images/nura-eye-revive-ingredients.png",
  EYE_NIGHT: "/images/nura-eye-revive-lifestyle-night.png",

  RET1:    "/images/nura-night-renewal-gallery-1.png",
  RET2:    "/images/nura-night-renewal-gallery-2.png",
  RET3:    "/images/nura-night-renewal-gallery-3.png",
  RET4:    "/images/nura-night-renewal-gallery-4.png",
  RET5:    "/images/nura-night-renewal-gallery-5.png",
  RET_TEX: "/images/retinol-texture-card-3.jpeg",

  SPF1: "/images/nura-spf-50-gallery-1.png",
  SPF2: "/images/nura-spf-50-gallery-2.png",
  SPF3: "/images/nura-spf-50-gallery-3.png",
  SPF4: "/images/nura-spf-50-gallery-4.png",
  SPF5: "/images/nura-spf-50-gallery-5.png",

  pkNIA: "/images/products/serum-niacinamide-pack.png",
  pkEYE: "/images/products/eye-serum-pack.png",
  pkRET: "/images/products/retinol-cream-pack.png",
  pkSPF: "/images/products/sunscreen-spf50-pack.png",

  MORN_HERO: "/images/bundles/morning-routine-hero.jpg",
  MORN_LIFE: "/images/bundles/morning-routine.jpg",
  MORN_PROD: "/images/nura-morning-products-hero.png",
  NIGHT_HERO: "/images/bundles/night-renewal-hero.jpg",
  NIGHT_LIFE: "/images/bundles/night-renewal.jpg",
  FULL_HERO:  "/images/bundles/full-routine-hero.jpg",
  COMP_EDIT:  "/images/nura-complete-bathroom-editorial.jpg",
  COMP_FAM:   "/images/routine-complete-family.png",
  COMP_HERO:  "/images/nura-complete-routine-hero.png",
} as const;

// ─── Shared complete bundle (same 4 images on every product page) ─────────────
const COMPLETE_BUNDLE: GallerySlot[] = [
  img(P.FULL_HERO,  "روتين نورا الكامل — ٤ منتجات",    "cover"),
  img(P.COMP_EDIT,  "طقس العناية الكامل",                "cover"),
  img(P.COMP_FAM,   "٤ منتجات معاً — فلات لاي",         "contain"),
  img(P.COMP_HERO,  "صباح + ليل — روتين متكامل",        "contain", "from-rose-50 to-pink-50"),
];

// ─── Gallery configurations per product ───────────────────────────────────────
const GALLERY: Record<string, ProductGalleryConfig> = {

  "nura-balance": {
    heroImages: [
      img(P.BAL1, "سيروم النياسيناميد",              "cover"),
      img(P.BAL2, "قوام خفيف — ملمس السيروم",         "contain", "from-amber-50 to-rose-50"),
      img(P.BAL3, "مكونات النياسيناميد النقية",       "contain", "from-green-50 to-emerald-50"),
      img(P.BAL4, "طريقة الاستخدام اليومية",          "contain"),
    ],
    bundleImages: {
      single: [
        img(P.BAL5, "إشراقة البشرة — نتيجة حقيقية",  "cover",   "from-yellow-50 to-pink-50"),
        todo(), todo(), todo(),
      ],
      duo: [
        img(P.NIGHT_HERO, "روتين أساسي — نياسيناميد + ريتينول", "cover"),
        img(P.NIGHT_LIFE, "طقس العناية الليلية",                  "cover"),
        img(P.pkNIA,      "سيروم النياسيناميد",                   "contain", "from-rose-50 to-pink-100"),
        img(P.pkRET,      "كريم الريتينول الليلي",                 "contain", "from-amber-50 to-orange-50"),
      ],
      trio: [
        img(P.MORN_HERO,  "روتين الصباح الكامل — ٣ منتجات",      "cover"),
        img(P.MORN_LIFE,  "طقس الصباح — إشراقة وحماية",           "cover"),
        img(P.MORN_PROD,  "٣ منتجات الصباح معاً",                 "cover",   "from-amber-50 to-orange-50"),
        img(P.pkSPF,      "واقي الشمس SPF50",                      "contain", "from-amber-50 to-yellow-50"),
      ],
      complete: COMPLETE_BUNDLE,
    },
  },

  "nura-eye-revive": {
    heroImages: [
      img(P.EYE1,      "سيروم محيط العين",                      "cover"),
      img(P.EYE_MODEL, "ثقة وإشراقة — لايف ستايل",             "cover"),
      img(P.EYE_CLIN,  "مثبت سريرياً — يقلل الهالات 65%",      "cover",   "from-pink-50 to-rose-100"),
      img(P.EYE_INGR,  "مكونات فعالة — كافيين وببتيدات",       "cover",   "from-amber-50 to-rose-50"),
    ],
    bundleImages: {
      single: [
        img(P.EYE2,    "زاوية المنتج — تركيبة فاخرة",           "cover"),
        img(P.EYE4,    "تطبيق السيروم حول العين",                "cover"),
        img(P.EYE_SHOW,"عرض المنتج — بريميوم",                   "cover"),
        img(P.EYE3,    "قوام ناعم — سيروم محيط العين",          "contain", "from-green-50 to-teal-50"),
      ],
      duo: [
        img(P.NIGHT_HERO, "روتين أساسي — عيون + ريتينول",       "cover"),
        img(P.NIGHT_LIFE, "طقس العناية الليلية",                  "cover"),
        img(P.pkEYE,      "سيروم محيط العين",                    "contain", "from-green-50 to-emerald-50"),
        img(P.pkRET,      "كريم الريتينول الليلي",                "contain", "from-amber-50 to-orange-50"),
      ],
      trio: [
        img(P.MORN_HERO,  "روتين الإشراقة اليومية — ٣ منتجات", "cover"),
        img(P.MORN_LIFE,  "طقس الصباح — إشراقة وحماية",          "cover"),
        img(P.MORN_PROD,  "٣ منتجات الصباح معاً",                "cover",   "from-amber-50 to-orange-50"),
        img(P.pkSPF,      "واقي الشمس SPF50",                     "contain", "from-amber-50 to-yellow-50"),
      ],
      complete: COMPLETE_BUNDLE,
    },
  },

  "nura-night-renewal": {
    heroImages: [
      img(P.RET1, "كريم الريتينول الليلي",                       "cover"),
      img(P.RET2, "إثبات سريري — فعالية مثبتة",                  "contain"),
      img(P.RET3, "فوائد كريم الريتينول",                         "contain", "from-amber-50 to-orange-50"),
      img(P.RET4, "تجربة عناية ليلية فاخرة",                     "contain"),
    ],
    bundleImages: {
      single: [
        img(P.RET5,    "طريقة التطبيق — كريم الريتينول",          "contain"),
        img(P.RET_TEX, "ملمس الكريم — قوام ناعم",                 "contain", "from-amber-50 to-orange-50"),
        todo(), todo(),
      ],
      duo: [
        img(P.NIGHT_HERO, "روتين التجديد الليلي — ريتينول + عيون","cover"),
        img(P.NIGHT_LIFE, "طقس العناية الليلية",                   "cover"),
        img(P.pkRET,      "كريم الريتينول الليلي",                  "contain", "from-amber-50 to-orange-50"),
        img(P.pkEYE,      "سيروم محيط العين",                      "contain", "from-green-50 to-emerald-50"),
      ],
      trio: [
        img(P.MORN_HERO,  "روتين التجديد والحماية",                "cover"),
        img(P.MORN_LIFE,  "طقس الصباح والليل معاً",               "cover"),
        img(P.pkRET,      "كريم الريتينول",                         "contain", "from-amber-50 to-orange-50"),
        img(P.pkNIA,      "سيروم النياسيناميد",                     "contain"),
      ],
      complete: COMPLETE_BUNDLE,
    },
  },

  "nura-spf-50": {
    heroImages: [
      img(P.SPF1, "واقي الشمس SPF50",                             "cover",   "from-amber-50 to-yellow-50"),
      img(P.SPF2, "ملمس خفيف — تركيبة مرطبة",                    "contain", "from-amber-50 to-orange-50"),
      img(P.SPF3, "حماية UVA/UVB — تركيبة يومية",                "contain", "from-amber-50 to-yellow-50"),
      img(P.SPF4, "طريقة الاستخدام الصباحية",                     "contain", "from-amber-50 to-orange-50"),
    ],
    bundleImages: {
      single: [
        img(P.SPF5, "حماية كاملة — استعداد للنهار",               "contain", "from-yellow-50 to-amber-50"),
        todo(), todo(), todo(),
      ],
      duo:  [], // SPF has no duo tier — falls back to trio in buildGallery
      trio: [
        img(P.MORN_HERO, "روتين الحماية والإشراقة",               "cover"),
        img(P.MORN_LIFE, "طقس الصباح — حماية وإشراقة",            "cover"),
        img(P.MORN_PROD, "٣ منتجات الصباح معاً",                  "cover",   "from-amber-50 to-orange-50"),
        img(P.pkSPF,     "واقي الشمس SPF50",                       "contain", "from-amber-50 to-yellow-50"),
      ],
      complete: COMPLETE_BUNDLE,
    },
  },
};

// ─── Active gallery builder ───────────────────────────────────────────────────
// Single:  heroImages first   → product is the focus
// Bundle:  bundleImages first → "I see exactly what I selected" (slot 1 = offer hero)
function buildGallery(slug: string, tier: string): GallerySlot[] {
  const config = GALLERY[slug];
  if (!config) return [];

  const isSingle = !tier || tier === "single";
  let bundle =
    config.bundleImages[tier as keyof typeof config.bundleImages] ??
    config.bundleImages.trio ??
    config.bundleImages.single;

  // Ensure bundle always has exactly 4 slots (pad with todo if needed)
  while (bundle.length < 4) bundle = [...bundle, todo()];
  bundle = bundle.slice(0, 4);

  const slots = isSingle
    ? [...config.heroImages, ...bundle]
    : [...bundle, ...config.heroImages];

  // Never show placeholder "يجب إضافة صورة هنا" slots on the live store
  return slots.filter(s => !s.missing);
}

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
  const slotCount   = useRef(8);

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

  const gallerySlots = React.useMemo(
    () => buildGallery(productSlug, offerTier ?? "single"),
    [productSlug, offerTier],
  );

  slotCount.current = gallerySlots.length;

  const displayIndex = mounted ? active : 0;
  const activeSlot   = gallerySlots[displayIndex] ?? gallerySlots[0];
  const showBadge    = !!offerLabel && !!offerTier && offerTier !== "single";

  return (
    <div className="flex flex-col gap-2 sm:gap-3">

      {/* ── Main image ──────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-none sm:rounded-4xl overflow-hidden aspect-square bg-rose-blush"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        {/* Bundle badge */}
        <AnimatePresence>
          {showBadge && (
            <motion.div
              key={`badge-${offerTier}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 inset-x-0 z-20 flex justify-center pointer-events-none"
            >
              <span className="rounded-full bg-white/92 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold text-rose-deep shadow-rose-sm">
                {offerLabel}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${offerTier ?? "single"}-${displayIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
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
                  quality={80}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={activeSlot.fit === "contain" ? "object-contain" : "object-cover"}
                />
                {activeSlot.fit !== "contain" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D2C32]/20 via-transparent to-transparent" />
                )}
                <div className="absolute bottom-4 start-4 rounded-full border border-white/40 bg-white/75 px-3 py-1 text-[11px] font-semibold text-rose-deep shadow-sm backdrop-blur-sm">
                  {activeSlot.sublabel}
                </div>
              </>
            ) : activeSlot?.missing ? (
              <div className="flex flex-col items-center gap-3 px-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center shadow-sm">
                  <ImageOff className="h-6 w-6 text-slate-400" strokeWidth={1.4} />
                </div>
                <p className="text-[13px] font-bold text-slate-400" dir="rtl">
                  يجب إضافة صورة هنا
                </p>
              </div>
            ) : (
              <>
                <div className="w-28 h-28 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-rose-sm">
                  <Droplets className="h-8 w-8 text-rose-deep/70" strokeWidth={1.25} />
                </div>
                <p className="text-rose-deep font-semibold text-sm">{productName}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Arrow nav */}
        <button
          onClick={() => setActive((a) => (a === 0 ? gallerySlots.length - 1 : a - 1))}
          className="absolute top-1/2 start-3 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <svg className="w-4 h-4 text-rose-deep flip-ltr" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setActive((a) => (a + 1) % gallerySlots.length)}
          className="absolute top-1/2 end-3 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <svg className="w-4 h-4 text-rose-deep flip-ltr" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot indicators — max 8 dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {gallerySlots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === displayIndex ? "bg-white w-5" : "bg-white/50 w-1"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Thumbnails — always 4×2 grid, clean and consistent ─────────────── */}
      <div className="grid grid-cols-4 gap-1.5 px-4 sm:px-0">
        {gallerySlots.map((slot, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative aspect-square overflow-hidden rounded-xl transition-all duration-200 ${
              i === displayIndex
                ? "ring-2 ring-rose-deep ring-offset-1 opacity-100"
                : "ring-1 ring-border/60 opacity-75 hover:opacity-100 hover:ring-rose-soft"
            }`}
          >
            {slot.image ? (
              <Image
                src={slot.image}
                alt=""
                fill
                quality={55}
                sizes="(min-width: 640px) 80px, 22vw"
                className={slot.fit === "contain" ? "object-contain" : "object-cover"}
              />
            ) : slot.missing ? (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                <ImageOff className="h-3.5 w-3.5 text-slate-300" strokeWidth={1.4} />
              </div>
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${slot.bg} flex items-center justify-center`}>
                <Sparkles className="h-3.5 w-3.5 text-rose-deep/50" strokeWidth={1.4} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ── Trust badges ─────────────────────────────────────────────────────── */}
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

"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ShieldCheck, Sparkles } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface GallerySlot {
  image: string;
  label: string;
  fit: "cover" | "contain";
  bg?: string;
}

// ─── 4 hero images per product ────────────────────────────────────────────────
const HERO: Record<string, GallerySlot[]> = {
  "nura-balance": [
    { image: "/images/nura-balance-gallery-1.png",  label: "سيروم النياسيناميد",           fit: "cover" },
    { image: "/images/nura-balance-gallery-2.png",  label: "قوام خفيف ومرطب",              fit: "contain", bg: "from-amber-50 to-rose-50" },
    { image: "/images/nura-balance-gallery-3.png",  label: "مكونات النياسيناميد النقية",   fit: "contain", bg: "from-green-50 to-emerald-50" },
    { image: "/images/nura-balance-gallery-4.png",  label: "طريقة الاستخدام اليومية",      fit: "contain", bg: "from-rose-50 to-pink-100" },
  ],
  "nura-eye-revive": [
    { image: "/images/nura-eye-revive-gallery-1.png",       label: "سيروم محيط العين",                  fit: "cover" },
    { image: "/images/nura-eye-revive-lifestyle-model.png", label: "ثقة وإشراقة",                      fit: "cover" },
    { image: "/images/nura-eye-revive-clinical-65.png",     label: "مثبت سريرياً — يقلل الهالات 65%",  fit: "cover", bg: "from-pink-50 to-rose-100" },
    { image: "/images/nura-eye-revive-ingredients.png",     label: "كافيين + ببتيدات + هيالورونيك",    fit: "cover", bg: "from-amber-50 to-rose-50" },
  ],
  "nura-night-renewal": [
    { image: "/images/nura-night-renewal-gallery-1.png",  label: "كريم الريتينول الليلي",        fit: "cover" },
    { image: "/images/nura-night-renewal-gallery-2.png",  label: "إثبات سريري — فعالية مثبتة",  fit: "contain", bg: "from-amber-50 to-orange-50" },
    { image: "/images/nura-night-renewal-gallery-3.png",  label: "فوائد الريتينول والببتيدات",   fit: "contain", bg: "from-amber-50 to-orange-50" },
    { image: "/images/nura-night-renewal-gallery-4.png",  label: "تجربة عناية ليلية فاخرة",     fit: "contain", bg: "from-rose-50 to-pink-100" },
  ],
  "nura-spf-50": [
    { image: "/images/nura-spf-50-gallery-1.png",  label: "واقي الشمس SPF50",             fit: "cover",   bg: "from-amber-50 to-yellow-50" },
    { image: "/images/nura-spf-50-gallery-2.png",  label: "ملمس خفيف ومرطب",              fit: "contain", bg: "from-amber-50 to-orange-50" },
    { image: "/images/nura-spf-50-gallery-3.png",  label: "حماية UVA/UVB يومية",          fit: "contain", bg: "from-amber-50 to-yellow-50" },
    { image: "/images/nura-spf-50-gallery-4.png",  label: "طريقة الاستخدام الصباحية",     fit: "contain", bg: "from-amber-50 to-orange-50" },
  ],
};

// ─── 3 fixed routine images — identical on every product page ─────────────────
// Indices: 4 = complete, 5 = morning, 6 = night
const ROUTINE: GallerySlot[] = [
  {
    image: "/images/bundles/full-routine-hero.jpg",
    label: "روتين نورا الكامل — ٤ منتجات",
    fit: "cover",
  },
  {
    image: "/images/bundles/morning-routine-hero.jpg",
    label: "روتين الصباح — نياسيناميد + SPF",
    fit: "cover",
  },
  {
    image: "/images/bundles/night-renewal-hero.jpg",
    label: "روتين الليل — سيروم العين + ريتينول",
    fit: "cover",
  },
];

const ROUTINE_TAGS = ["الكامل", "الصباح", "الليل"] as const;

// ─── Bundle tier → gallery slot index ─────────────────────────────────────────
const TIER_INDEX: Record<string, number> = {
  single:   0,  // stay on hero
  duo:      6,  // night routine
  trio:     5,  // morning routine
  complete: 4,  // complete routine
};

// ─── Thumbnail button ─────────────────────────────────────────────────────────
function ThumbnailButton({
  slot,
  index,
  active,
  onSelect,
}: {
  slot: GallerySlot;
  index: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  const isActive = index === active;
  return (
    <button
      onClick={() => onSelect(index)}
      className={`relative aspect-square w-full overflow-hidden rounded-xl transition-all duration-200 ${
        isActive
          ? "scale-[1.03] opacity-100 ring-2 ring-rose-deep ring-offset-1"
          : "opacity-65 ring-1 ring-border/50 hover:opacity-100 hover:ring-rose-soft"
      } ${slot.bg ? `bg-gradient-to-br ${slot.bg}` : "bg-rose-blush"}`}
    >
      <Image
        src={slot.image}
        alt=""
        fill
        quality={50}
        sizes="(min-width: 640px) 80px, 22vw"
        className={slot.fit === "contain" ? "object-contain" : "object-cover"}
      />
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface Props {
  productName: string;
  productSlug: string;
  offerTier?: string;
  offerLabel?: string;
}

export function ProductGallery({ productName, productSlug, offerTier, offerLabel }: Props) {
  const heroImages = HERO[productSlug] ?? HERO["nura-balance"];
  const slots: GallerySlot[] = [...heroImages, ...ROUTINE]; // always 7

  const [active, setActive] = useState(0);
  const isInitial   = useRef(true);
  const prevTierRef = useRef<string | undefined>(undefined);

  // On bundle change: jump to matching routine image (skip on initial auto-select)
  useEffect(() => {
    if (isInitial.current) {
      isInitial.current  = false;
      prevTierRef.current = offerTier;
      return;
    }
    if (offerTier !== prevTierRef.current) {
      prevTierRef.current = offerTier;
      setActive(TIER_INDEX[offerTier ?? "single"] ?? 0);
    }
  }, [offerTier]);

  // Touch swipe
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchX.current === null || touchY.current === null) return;
    const dx = touchX.current - e.changedTouches[0].clientX;
    const dy = touchY.current - e.changedTouches[0].clientY;
    touchX.current = null;
    touchY.current = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    setActive(a => dx > 0 ? (a + 1) % slots.length : (a === 0 ? slots.length - 1 : a - 1));
  }, [slots.length]);

  const slot = slots[active];
  const showBadge = !!offerLabel && !!offerTier && offerTier !== "single";

  return (
    <div className="flex flex-col gap-3">

      {/* ── Main image ──────────────────────────────────────────────────────── */}
      <div
        className={`relative aspect-square -mx-4 overflow-hidden sm:mx-0 sm:rounded-[2rem] ${
          slot.bg ? `bg-gradient-to-br ${slot.bg}` : "bg-rose-blush"
        }`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        {/* Offer label badge */}
        <AnimatePresence>
          {showBadge && (
            <motion.div
              key={`badge-${offerTier}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute inset-x-0 top-4 z-20 flex justify-center"
            >
              <span className="rounded-full border border-white/40 bg-white/92 px-4 py-1.5 text-[11px] font-bold text-rose-deep shadow-sm backdrop-blur-sm">
                {offerLabel}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slot.image}
              alt={`${productName} — ${slot.label}`}
              fill
              quality={85}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={slot.fit === "contain" ? "object-contain" : "object-cover"}
              priority={active === 0}
            />
            {slot.fit === "cover" && (
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-transparent" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Label */}
        <div className="pointer-events-none absolute bottom-4 start-4 z-10">
          <span className="rounded-full border border-white/40 bg-white/82 px-3 py-1 text-[11px] font-semibold text-rose-deep shadow-sm backdrop-blur-sm">
            {slot.label}
          </span>
        </div>

        {/* Arrow nav */}
        <button
          onClick={() => setActive(a => a === 0 ? slots.length - 1 : a - 1)}
          className="absolute start-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
          aria-label="السابق"
        >
          <svg className="h-4 w-4 flip-ltr text-rose-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setActive(a => (a + 1) % slots.length)}
          className="absolute end-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
          aria-label="التالي"
        >
          <svg className="h-4 w-4 flip-ltr text-rose-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {slots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`صورة ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Thumbnails ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2.5 px-4 sm:px-0">

        {/* Row 1: 4 hero product images */}
        <div className="grid grid-cols-4 gap-2">
          {slots.slice(0, 4).map((s, i) => (
            <ThumbnailButton key={i} slot={s} index={i} active={active} onSelect={setActive} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-gradient-to-l from-border/50 to-transparent" />
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#9B8A8A]">الروتينات</span>
          <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent" />
        </div>

        {/* Row 2: 3 routine images with labels */}
        <div className="grid grid-cols-3 gap-2">
          {slots.slice(4).map((s, i) => (
            <div key={i + 4} className="flex flex-col items-center gap-1">
              <ThumbnailButton slot={s} index={i + 4} active={active} onSelect={setActive} />
              <span className={`text-[9px] font-semibold transition-colors duration-200 ${
                active === i + 4 ? "text-rose-deep" : "text-[#9B8A8A]"
              }`}>
                {ROUTINE_TAGS[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trust strip ─────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 px-4 sm:px-0">
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

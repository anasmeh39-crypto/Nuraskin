"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Crown, Moon, Sparkles, Sun, Truck } from "lucide-react";
import { getProductPageOffers, ProductPageOffer } from "@/config/products";
import { Product } from "@/types";

type Offer = ProductPageOffer;

// ─── Short product names ──────────────────────────────────────────────────────
const SHORT: Record<string, string> = {
  "nura-balance":        "النياسيناميد",
  "nura-eye-revive":    "سيروم العين",
  "nura-night-renewal":  "كريم الريتينول",
  "nura-spf-50":         "واقي الشمس",
};

// ─── Representative image per offer ──────────────────────────────────────────
// Single product → the product's own hero/lifestyle photo
// Duo/Trio → the matching routine hero
// Complete → full routine hero
const SINGLE_HERO: Record<string, string> = {
  "nura-balance":        "/images/nura-balance-gallery-1.png",
  "nura-eye-revive":    "/images/nura-eye-revive-lifestyle-model.png",
  "nura-night-renewal":  "/images/nura-night-renewal-ingredients.png",
  "nura-spf-50":         "/images/nura-spf-50-gallery-1.png",
};

function getOfferImage(offer: Offer): string {
  if (offer.tier === "complete") return "/images/bundles/full-routine-hero.jpg";

  if (offer.tier === "single") {
    const slug = offer.products[0]?.slug ?? "";
    return SINGLE_HERO[slug] ?? "/images/nura-balance-gallery-1.png";
  }

  // Duo / Trio: night routine when retinol is present without SPF
  const slugs = offer.products.map(p => p.slug);
  const isNightBundle =
    slugs.includes("nura-night-renewal") &&
    !slugs.includes("nura-spf-50");

  return isNightBundle
    ? "/images/bundles/night-renewal-hero.jpg"
    : "/images/bundles/morning-routine-hero.jpg";
}

// ─── Timing tags ──────────────────────────────────────────────────────────────
function getTimingTags(slugs: string[]) {
  const morning = slugs.some(s => s === "nura-balance" || s === "nura-spf-50");
  const night   = slugs.some(s => s === "nura-night-renewal");
  const eye     = slugs.some(s => s === "nura-eye-revive");
  if (morning && night)   return [{ icon: "sun", label: "صباح" }, { icon: "moon", label: "ليل" }];
  if (night)              return [{ icon: "moon", label: "ليلاً" }];
  if (morning)            return [{ icon: "sun",  label: "صباحاً" }];
  if (eye)                return [{ icon: "sun", label: "صباح" }, { icon: "moon", label: "ليل" }];
  return                        [{ icon: "sun", label: "يومياً" }];
}

// ─── Benefit line ─────────────────────────────────────────────────────────────
function getBenefit(offer: Offer): string {
  const slugs = offer.products.map(p => p.slug);
  if (offer.tier === "complete") return "أشمل نتائج + أكبر توفير";
  if (slugs.length === 1) return ({
    "nura-eye-revive":    "يخفف الهالات والبوفينيس",
    "nura-balance":        "يوازن البشرة ويحسن الإشراقة",
    "nura-night-renewal":  "يجدد البشرة أثناء النوم",
    "nura-spf-50":         "حماية يومية من الشمس",
  } as Record<string, string>)[slugs[0]] ?? "";
  if (slugs.includes("nura-night-renewal") && slugs.length === 2) return "عناية ليلية شاملة";
  if (slugs.includes("nura-spf-50") && !slugs.includes("nura-night-renewal")) return "روتين الصباح + حماية";
  return "روتين متكامل صباحاً ومساءً";
}

// ─── RoutineCard ─────────────────────────────────────────────────────────────
function RoutineCard({
  offer,
  isSelected,
  onSelect,
}: {
  offer: Offer;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const slugs   = offer.products.map(p => p.slug);
  const tags    = getTimingTags(slugs);
  const benefit = getBenefit(offer);
  const savings = offer.saving && offer.originalPrice
    ? Math.round((offer.saving / offer.originalPrice) * 100)
    : 0;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isSelected}
      className={`group relative flex w-full flex-col overflow-hidden rounded-[1.5rem] bg-white text-right transition-all duration-250 ${
        isSelected
          ? "ring-2 ring-[#8E5A68] shadow-[0_12px_40px_rgba(142,90,104,0.22)]"
          : "border border-[#EBE0E4] shadow-[0_4px_16px_rgba(61,44,50,0.08)] hover:shadow-[0_10px_32px_rgba(61,44,50,0.12)]"
      }`}
    >
      {/* ── Image — clean photo, only tag badges ── */}
      <div className="relative h-44 sm:h-40 w-full shrink-0 overflow-hidden rounded-t-[1.5rem]">
        <Image
          src={getOfferImage(offer)}
          alt={offer.label}
          fill
          quality={85}
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
          loading="eager"
        />

        {/* Soft vignette at bottom for tag legibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Top: savings + selected */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          {isSelected ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#3D2C32] px-3 py-1.5 text-[11px] font-black text-white shadow">
              <Check className="h-3 w-3" strokeWidth={3} /> محدد
            </span>
          ) : <span />}
          {savings > 0 && (
            <span className="rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-black text-white shadow">
              وفري {savings}%
            </span>
          )}
        </div>

        {/* Bottom-start: timing tags only */}
        <div className="absolute bottom-3 start-3 flex items-center gap-1">
          {tags.map(t => (
            <span key={t.label} className="flex items-center gap-1 rounded-full border border-white/30 bg-white/22 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
              {t.icon === "sun"
                ? <Sun  className="h-3 w-3 text-amber-300" strokeWidth={1.6} />
                : <Moon className="h-3 w-3 text-purple-200" strokeWidth={1.6} />}
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Content — all text here ── */}
      <div className="flex flex-1 flex-col gap-3 p-4">

        {/* Bundle name + benefit */}
        <div>
          <h3 className="text-[16px] font-black leading-tight text-[#3D2C32]">{offer.label}</h3>
          <p className="mt-1 text-[11px] leading-snug text-[#9B8585]">{benefit}</p>
        </div>

        {/* Product chips */}
        <div className="flex flex-wrap gap-1.5">
          {offer.products.map(p => (
            <span
              key={p.slug}
              className="flex items-center gap-1 rounded-full border border-[#DDD0D5] bg-[#FBF7F8] px-2.5 py-1 text-[11px] font-semibold text-[#5C3A47]"
            >
              <Check className="h-3 w-3 text-[#8E5A68]" strokeWidth={2.5} />
              {SHORT[p.slug] ?? p.name_ar}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mt-auto border-t border-[#F0E8E8] pt-3">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              {offer.originalPrice && (
                <p className="text-[11px] text-[#B0A0A0] line-through">{offer.originalPrice} درهم</p>
              )}
              <p className="text-[22px] font-black leading-none text-[#3D2C32]">
                {offer.price}
                <span className="mr-1 text-[11px] font-semibold text-[#9B8585]"> درهم</span>
              </p>
            </div>
            {offer.saving && offer.saving > 0 && (
              <span className="shrink-0 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-center">
                <p className="text-[15px] font-black leading-none text-emerald-700">-{offer.saving}</p>
                <p className="mt-0.5 text-[9px] text-emerald-600/70">درهم</p>
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className={`flex items-center justify-center gap-2 rounded-full py-3 text-[12px] font-medium tracking-wide transition-all duration-300 ${
          isSelected
            ? "bg-[#8E5A68] text-white shadow-[0_4px_16px_rgba(142,90,104,0.30)]"
            : "border border-[#8E5A68]/30 text-[#8E5A68]/80 group-hover:border-[#8E5A68]/60 group-hover:text-[#8E5A68]"
        }`}>
          {isSelected ? (
            <>
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              تم الاختيار
            </>
          ) : (
            <>
              {offer.tier === "single"
                ? `اختاري ${SHORT[offer.products[0]?.slug] ?? offer.products[0]?.name_ar}`
                : "اختاري هذا الروتين"}
              <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 shrink-0 opacity-60 rotate-180"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ─── FeaturedCard (complete routine) ─────────────────────────────────────────
function FeaturedCard({
  offer,
  isSelected,
  onSelect,
}: {
  offer: Offer;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const benefit = getBenefit(offer);
  const savings = offer.saving && offer.originalPrice
    ? Math.round((offer.saving / offer.originalPrice) * 100)
    : 0;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.99 }}
      aria-pressed={isSelected}
      className={`group relative w-full overflow-hidden rounded-[1.5rem] text-right transition-all duration-300 ${
        isSelected
          ? "ring-2 ring-[#C4788A]/70 shadow-[0_20px_56px_rgba(196,120,138,0.22)]"
          : "shadow-[0_12px_48px_rgba(20,8,16,0.22)] hover:shadow-[0_24px_64px_rgba(20,8,16,0.30)]"
      }`}
    >
      <div className="bg-[#1A0C12]">

        {/* ══ MOBILE: image top + content below ══ */}
        <div className="lg:hidden">
          <div className="relative w-full overflow-hidden rounded-t-[1.5rem] h-60">
            <Image
              src={getOfferImage(offer)}
              alt={offer.label}
              fill
              quality={85}
              sizes="100vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#1A0C12] to-transparent" />
            <div className="absolute inset-x-4 top-4 flex items-start justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] px-3.5 py-2 text-[11px] font-black text-[#3D2A00] shadow-lg">
                <Crown className="h-3.5 w-3.5" />
                الأكثر اختياراً
              </span>
              {savings > 0 && (
                <span className="rounded-full border border-[#86EFAC]/40 bg-[#14532D]/80 px-3 py-1.5 text-[11px] font-black text-[#86EFAC] backdrop-blur-sm">
                  وفري {savings}%
                </span>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  <Sun className="h-3 w-3 text-amber-300" strokeWidth={1.5} /> صباح
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  <Moon className="h-3 w-3 text-purple-300" strokeWidth={1.5} /> ليل
                </span>
              </div>
              <h3 className="text-[22px] font-black leading-tight text-white drop-shadow-md">{offer.label}</h3>
              <p className="mt-0.5 text-[12px] text-white/65">{benefit}</p>
            </div>
          </div>

          <div className="p-5">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {offer.products.map(p => (
                <span key={p.slug} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/85">
                  <Check className="h-3 w-3 text-[#F2B8C6]" strokeWidth={2.5} />
                  {SHORT[p.slug] ?? p.name_ar}
                </span>
              ))}
            </div>
            <div className="flex items-end justify-between border-t border-white/8 pt-4">
              <div>
                {offer.originalPrice && (
                  <p className="text-[12px] text-white/30 line-through">{offer.originalPrice} درهم</p>
                )}
                <p className="text-[2.2rem] font-black leading-none text-white">
                  {offer.price}<span className="mr-1 text-[12px] font-semibold text-white/45">درهم</span>
                </p>
                <p className="mt-1 text-[11px] text-white/35">≈ {offer.perUnit} درهم / منتج</p>
              </div>
              {offer.saving && offer.saving > 0 && (
                <div className="rounded-xl border border-[#86EFAC]/25 bg-[#86EFAC]/10 px-4 py-3 text-center">
                  <p className="text-[24px] font-black leading-none text-[#86EFAC]">{offer.saving}</p>
                  <p className="mt-0.5 text-[10px] text-[#86EFAC]/60">درهم وفّرتِ</p>
                </div>
              )}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={isSelected ? "selected" : "idle"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className={`mt-4 flex items-center justify-center gap-2.5 rounded-full py-3.5 text-[13px] font-medium tracking-wide transition-all duration-300 ${
                  isSelected
                    ? "bg-white text-[#3D2C32] shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                    : "border border-white/20 text-white/75 hover:border-white/40 hover:text-white"
                }`}
              >
                {isSelected ? (
                  <>
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    في السلة
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={1.5} />
                    اختاري الروتين الكامل
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ══ DESKTOP: true side-by-side — image right, content left (RTL) ══ */}
        <div className="hidden lg:flex min-h-[320px]">

          {/* Image — right side (first child in RTL flex) */}
          <div className="relative w-[45%] shrink-0 overflow-hidden rounded-l-[1.5rem]">
            <Image
              src={getOfferImage(offer)}
              alt={offer.label}
              fill
              quality={85}
              sizes="45vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              loading="eager"
            />
            {savings > 0 && (
              <div className="absolute right-4 top-4">
                <span className="rounded-full border border-[#86EFAC]/40 bg-[#14532D]/80 px-3 py-1.5 text-[11px] font-black text-[#86EFAC] backdrop-blur-sm">
                  وفري {savings}%
                </span>
              </div>
            )}
          </div>

          {/* Content — left side (second child in RTL flex) */}
          <div className="flex flex-1 flex-col justify-between p-7">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] px-3.5 py-2 text-[11px] font-black text-[#3D2A00] shadow-lg">
                <Crown className="h-3.5 w-3.5" />
                الأكثر اختياراً
              </span>
              <div className="mt-4 flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/70">
                  <Sun className="h-3 w-3 text-amber-300" strokeWidth={1.5} /> صباح
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/70">
                  <Moon className="h-3 w-3 text-purple-300" strokeWidth={1.5} /> ليل
                </span>
              </div>
              <h3 className="mt-3 text-[26px] font-black leading-tight text-white">{offer.label}</h3>
              <p className="mt-1 text-[13px] text-white/50">{benefit}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {offer.products.map(p => (
                  <span key={p.slug} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/85">
                    <Check className="h-3 w-3 text-[#F2B8C6]" strokeWidth={2.5} />
                    {SHORT[p.slug] ?? p.name_ar}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between border-t border-white/8 pt-4">
                <div>
                  {offer.originalPrice && (
                    <p className="text-[12px] text-white/30 line-through">{offer.originalPrice} درهم</p>
                  )}
                  <p className="text-[2.4rem] font-black leading-none text-white">
                    {offer.price}<span className="mr-1 text-[13px] font-semibold text-white/45">درهم</span>
                  </p>
                  <p className="mt-1 text-[11px] text-white/35">≈ {offer.perUnit} درهم / منتج</p>
                </div>
                {offer.saving && offer.saving > 0 && (
                  <div className="rounded-xl border border-[#86EFAC]/25 bg-[#86EFAC]/10 px-5 py-3 text-center">
                    <p className="text-[28px] font-black leading-none text-[#86EFAC]">{offer.saving}</p>
                    <p className="mt-0.5 text-[10px] text-[#86EFAC]/60">درهم وفّرتِ</p>
                  </div>
                )}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSelected ? "selected" : "idle"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`mt-4 flex items-center justify-center gap-2.5 rounded-full py-3.5 text-[13px] font-medium tracking-wide transition-all duration-300 ${
                    isSelected
                      ? "bg-white text-[#3D2C32] shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                      : "border border-white/20 text-white/75 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      تم الاختيار
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={1.5} />
                      اختاري الروتين الكامل
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </motion.button>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
interface Props {
  product: Product;
  onOfferChange: (offer: Offer) => void;
}

export function OfferSelector({ product, onOfferChange }: Props) {
  const offers       = useMemo(() => getProductPageOffers(product.slug), [product.slug]);
  const defaultOffer = offers.find(o => o.recommended) ?? offers[offers.length - 1] ?? offers[0];
  const [selected, setSelected] = useState(defaultOffer?.id);

  const announceOffer = React.useCallback(
    (offer: Offer) => {
      window.dispatchEvent(new CustomEvent("nura-offer-change", {
        detail: { productSlug: product.slug, offerId: offer.id },
      }));
    },
    [product.slug],
  );

  const select = (offer: Offer) => {
    setSelected(offer.id);
    onOfferChange(offer);
    announceOffer(offer);
  };

  React.useEffect(() => {
    if (defaultOffer) {
      onOfferChange(defaultOffer);
      setSelected(defaultOffer.id);
      announceOffer(defaultOffer);
    }
  }, [announceOffer, defaultOffer, onOfferChange]);

  if (!offers.length) return null;

  const completeOffer = offers.find(o => o.tier === "complete");
  const otherOffers   = offers.filter(o => o.tier !== "complete");

  // Grid: always stack vertically on mobile for readability,
  // side-by-side at sm+ breakpoint
  const gridClass =
    otherOffers.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
    otherOffers.length >= 3  ? "grid-cols-1 sm:grid-cols-3" :
    "grid-cols-1";

  return (
    <div className="space-y-3" dir="rtl" aria-label="اختيار روتين المنتج">

      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-1">
        <div>
          <p className="text-sm font-black text-[#3D2C32]">اختاري روتينك</p>
          <p className="mt-0.5 text-[11px] text-[#9B8585]">روتين متكامل = نتائج أسرع + توفير أكبر</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EBE0E4] bg-white px-2.5 py-1.5 text-[10px] font-semibold text-[#3D2C32] shadow-sm">
          <Truck className="h-3 w-3 text-[#8E5A68]" strokeWidth={1.6} />
          دفع عند الاستلام
        </span>
      </div>

      {/* Routine cards */}
      <div className={`grid gap-3 ${gridClass}`}>
        {otherOffers.map(offer => (
          <RoutineCard
            key={offer.id}
            offer={offer}
            isSelected={selected === offer.id}
            onSelect={() => select(offer)}
          />
        ))}
      </div>

      {/* Complete routine card */}
      {completeOffer && (
        <FeaturedCard
          offer={completeOffer}
          isSelected={selected === completeOffer.id}
          onSelect={() => select(completeOffer)}
        />
      )}
    </div>
  );
}

export type { Offer };

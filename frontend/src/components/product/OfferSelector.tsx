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
  "nura-night-renewal":  "/images/nura-night-renewal-gallery-1.png",
  "nura-spf-50":         "/images/nura-spf-50-gallery-1.png",
};

function getOfferImage(offer: Offer): string {
  if (offer.tier === "complete") return "/images/bundles/full-routine-hero.jpg";

  if (offer.tier === "single") {
    const slug = offer.products[0]?.slug ?? "";
    return SINGLE_HERO[slug] ?? "/images/nura-balance-gallery-1.png";
  }

  // Duo / Trio: night routine when retinol is present without SPF or niacinamide
  const slugs = offer.products.map(p => p.slug);
  const isNightBundle =
    slugs.includes("nura-night-renewal") &&
    !slugs.includes("nura-spf-50") &&
    !slugs.includes("nura-balance");

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
      className={`group relative flex w-full flex-col overflow-hidden rounded-[1.25rem] bg-white text-right transition-all duration-250 ${
        isSelected
          ? "ring-2 ring-[#8E5A68] shadow-[0_8px_32px_rgba(142,90,104,0.18)]"
          : "border border-[#EBE0E4] shadow-[0_2px_12px_rgba(61,44,50,0.06)] hover:border-[#D4BC9B]/60 hover:shadow-[0_8px_28px_rgba(61,44,50,0.10)]"
      }`}
    >
      {/* ── Image — full bleed, NO gradient ── */}
      <div className="relative w-full overflow-hidden rounded-t-[1.25rem] h-44 sm:h-36">
        <Image
          src={getOfferImage(offer)}
          alt={offer.label}
          fill
          quality={80}
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
          loading="eager"
        />

        {/* Floating badges — on top of clean image */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          {isSelected ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#3D2C32] px-2.5 py-1 text-[10px] font-black text-white shadow-sm">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
              محدد
            </span>
          ) : (
            <span /> /* spacer */
          )}
          {savings > 0 && (
            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-black text-white shadow-sm">
              وفري {savings}%
            </span>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col gap-0 p-3.5">

        {/* Timing */}
        <div className="flex items-center gap-1 mb-2">
          {tags.map(t => (
            <span key={t.label} className="flex items-center gap-0.5 rounded-full bg-[#F5F0EB] px-2 py-0.5 text-[10px] font-semibold text-[#8D7D82]">
              {t.icon === "sun"
                ? <Sun  className="h-2.5 w-2.5 text-amber-500" strokeWidth={1.6} />
                : <Moon className="h-2.5 w-2.5 text-purple-400" strokeWidth={1.6} />
              }
              {t.label}
            </span>
          ))}
        </div>

        {/* Name + benefit */}
        <h3 className="text-[13px] font-black leading-snug text-[#3D2C32]">{offer.label}</h3>
        <p className="mt-0.5 text-[10px] leading-snug text-[#9B8585]">{benefit}</p>

        {/* Product chips */}
        <div className="mt-2 flex flex-wrap gap-1">
          {offer.products.map(p => (
            <span
              key={p.slug}
              className="flex items-center gap-0.5 rounded-full border border-[#EBE0E4] bg-[#FFF9F6] px-2 py-0.5 text-[9px] font-semibold text-[#7B5565]"
            >
              <Check className="h-2 w-2 text-[#C4A882]" strokeWidth={2.5} />
              {SHORT[p.slug] ?? p.name_ar}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 mt-3 border-t border-[#F0E8E8]">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              {offer.originalPrice && (
                <p className="text-[9px] text-[#B0A0A0] line-through">{offer.originalPrice} درهم</p>
              )}
              <p className="text-[18px] font-black leading-none text-[#3D2C32]">
                {offer.price}
                <span className="mr-0.5 text-[10px] font-semibold text-[#9B8585]"> درهم</span>
              </p>
            </div>
            {offer.saving && offer.saving > 0 && (
              <span className="shrink-0 rounded-lg bg-emerald-50 px-2 py-1 text-center">
                <p className="text-[12px] font-black leading-none text-emerald-700">-{offer.saving}</p>
                <p className="text-[8px] text-emerald-600/70 mt-0.5">درهم</p>
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-3 rounded-full py-2 text-center text-[11px] font-black transition-colors duration-200 ${
          isSelected
            ? "bg-[#8E5A68] text-white"
            : "bg-[#F5ECF0] text-[#8E5A68] group-hover:bg-[#EDE4D7]"
        }`}>
          {isSelected ? "✓ تم الاختيار" : "اختاري"}
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

        {/* ── Image — full bleed, NO gradient overlay ── */}
        <div className="relative w-full overflow-hidden rounded-t-[1.5rem] h-52 lg:hidden">
          <Image
            src={getOfferImage(offer)}
            alt={offer.label}
            fill
            quality={80}
            sizes="100vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            loading="eager"
          />
          {/* Minimal bottom fade — only 20% height, very subtle */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-[#1A0C12] to-transparent" />

          {/* Badges on image */}
          <div className="absolute inset-x-4 top-4 flex items-start justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] px-3 py-1.5 text-[10px] font-black text-[#3D2A00] shadow-lg">
              <Crown className="h-3 w-3" />
              الأكثر اختياراً
            </span>
            {savings > 0 && (
              <span className="rounded-full border border-[#86EFAC]/40 bg-[#14532D]/70 px-2.5 py-1 text-[10px] font-bold text-[#86EFAC] backdrop-blur-sm">
                وفري {savings}%
              </span>
            )}
          </div>
        </div>

        {/* ── Desktop: image left, content right ── */}
        <div className="hidden lg:flex">
          <div className="relative w-[42%] min-h-[260px] overflow-hidden rounded-r-none rounded-l-[1.5rem]">
            <Image
              src={getOfferImage(offer)}
              alt={offer.label}
              fill
              quality={80}
              sizes="42vw"
              className="object-cover object-center"
              loading="eager"
            />
            {/* Badge on desktop image */}
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] px-3 py-1.5 text-[10px] font-black text-[#3D2A00] shadow-lg">
                <Crown className="h-3 w-3" />
                الأكثر اختياراً
              </span>
            </div>
          </div>
          <div className="flex-1 p-6" />
        </div>

        {/* ── Content panel ── */}
        <div className="p-5 pt-4">

          {/* Mobile top row already has badges on image */}
          {/* Desktop badge row */}
          <div className="hidden lg:flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] px-3.5 py-1.5 text-[11px] font-black text-[#3D2A00] shadow-lg">
              <Crown className="h-3.5 w-3.5" />
              الأكثر اختياراً
            </span>
            {savings > 0 && (
              <span className="rounded-full border border-[#86EFAC]/30 bg-[#86EFAC]/10 px-3 py-1.5 text-[11px] font-bold text-[#86EFAC]">
                وفري {savings}%
              </span>
            )}
          </div>

          {/* Timing */}
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/70">
              <Sun className="h-3 w-3 text-amber-300" strokeWidth={1.5} /> صباح
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/70">
              <Moon className="h-3 w-3 text-purple-300" strokeWidth={1.5} /> ليل
            </span>
          </div>

          {/* Name */}
          <h3 className="text-[22px] font-black leading-tight text-white">{offer.label}</h3>
          <p className="mt-1 text-[11px] text-white/45">{benefit}</p>

          {/* Products */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {offer.products.map(p => (
              <span
                key={p.slug}
                className="flex items-center gap-1 rounded-full border border-white/10 bg-white/7 px-3 py-1 text-[10px] font-semibold text-white/65"
              >
                <Check className="h-2.5 w-2.5 text-[#F2B8C6]" strokeWidth={2.5} />
                {SHORT[p.slug] ?? p.name_ar}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="mt-4 flex items-end justify-between border-t border-white/8 pt-4">
            <div>
              {offer.originalPrice && (
                <p className="text-[11px] text-white/25 line-through">{offer.originalPrice} درهم</p>
              )}
              <p className="text-[2rem] font-black leading-none text-white">
                {offer.price}
                <span className="mr-1 text-xs font-semibold text-white/45">درهم</span>
              </p>
              <p className="mt-1 text-[10px] text-white/30">≈ {offer.perUnit} درهم / منتج</p>
            </div>
            {offer.saving && offer.saving > 0 && (
              <div className="rounded-xl border border-[#86EFAC]/20 bg-[#86EFAC]/8 px-4 py-2.5 text-center">
                <p className="text-[22px] font-black leading-none text-[#86EFAC]">{offer.saving}</p>
                <p className="mt-0.5 text-[9px] text-[#86EFAC]/55">درهم وفّرتِ</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isSelected ? "selected" : "idle"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`mt-4 flex items-center justify-center gap-2 rounded-full py-3.5 text-[13px] font-black transition-colors duration-200 ${
                isSelected
                  ? "bg-white text-[#3D2C32]"
                  : "bg-white/10 text-white hover:bg-white/18"
              }`}
            >
              <Sparkles className="h-4 w-4" strokeWidth={1.5} />
              {isSelected ? "✓ تم الاختيار — روتين نورا الكامل" : "اختاري روتين نورا الكامل"}
            </motion.div>
          </AnimatePresence>
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

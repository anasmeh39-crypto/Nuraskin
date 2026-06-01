"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Moon, Sparkles, Sun, Truck } from "lucide-react";
import { getProductPageOffers, ProductPageOffer } from "@/config/products";
import { Product } from "@/types";

type Offer = ProductPageOffer;

const SHORT: Record<string, string> = {
  "nura-balance":       "النياسيناميد",
  "nura-eye-revive":   "سيروم العين",
  "nura-night-renewal": "كريم الريتينول",
  "nura-spf-50":        "واقي الشمس",
};

function getOfferImage(offer: Offer): string {
  const slugs = offer.products.map(p => p.slug);
  if (offer.tier === "complete" || slugs.length >= 4) {
    return "/images/bundles/full-routine-hero.jpg";
  }
  const hasNight  = slugs.includes("nura-night-renewal");
  const hasMorning = slugs.includes("nura-balance") || slugs.includes("nura-spf-50");
  if (hasNight && !hasMorning) return "/images/bundles/night-renewal-hero.jpg";
  if (hasMorning)              return "/images/bundles/morning-routine-hero.jpg";
  // single eye serum or fallback
  return "/images/bundles/night-renewal-hero.jpg";
}

function getTimingTags(slugs: string[]) {
  const morning = slugs.some(s => s === "nura-balance" || s === "nura-spf-50");
  const night   = slugs.some(s => s === "nura-night-renewal");
  const eye     = slugs.some(s => s === "nura-eye-revive");
  if (morning && night) return [{ icon: "sun", label: "صباح" }, { icon: "moon", label: "ليل" }];
  if (night)            return [{ icon: "moon", label: "ليلاً" }];
  if (morning)          return [{ icon: "sun",  label: "صباحاً" }];
  if (eye)              return [{ icon: "sun", label: "صباح" }, { icon: "moon", label: "ليل" }];
  return [{ icon: "sun", label: "يومياً" }];
}

function getBenefit(offer: Offer) {
  const slugs = offer.products.map(p => p.slug);
  if (offer.tier === "complete") return "أشمل نتائج + أكبر توفير";
  if (slugs.length === 1) {
    return {
      "nura-eye-revive":   "يخفف الهالات والبوفينيس",
      "nura-balance":       "يوازن البشرة ويحسن الإشراقة",
      "nura-night-renewal": "يجدد البشرة أثناء النوم",
      "nura-spf-50":        "حماية يومية من الشمس",
    }[slugs[0]] ?? "";
  }
  if (slugs.includes("nura-night-renewal") && slugs.length === 2) return "عناية ليلية شاملة";
  if (slugs.includes("nura-spf-50") && !slugs.includes("nura-night-renewal")) return "روتين الصباح + حماية";
  return "روتين متكامل صباحاً ومساءً";
}

// ─── Lifestyle photo card image ────────────────────────────────────────────

function OfferImage({
  offer,
  featured = false,
}: {
  offer: Offer;
  featured?: boolean;
}) {
  const src = getOfferImage(offer);
  return (
    <div
      className={`relative w-full overflow-hidden bg-cover bg-center bg-no-repeat ${featured ? "h-56 lg:h-full lg:min-h-[260px]" : "h-48"}`}
      style={{ backgroundImage: `url(${src})` }}
    >
      <img
        src={src}
        alt={offer.label}
        loading="eager"
        decoding="async"
        fetchPriority={featured ? "high" : "auto"}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.035]"
      />
      {/* Bottom fade into card content */}
      {!featured && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" style={{ top: "55%" }} />
      )}
      {/* Featured: gradient toward content side */}
      {featured && (
        <>
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-[#1E0F14]/80 via-[#1E0F14]/20 to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1E0F14]/85 via-[#1E0F14]/15 to-transparent lg:hidden" />
        </>
      )}
    </div>
  );
}

// ─── Individual routine card ───────────────────────────────────────────────

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
      whileTap={{ scale: 0.97 }}
      aria-pressed={isSelected}
      className={`group relative flex w-full flex-col overflow-hidden rounded-[1.35rem] bg-white text-right transition-all duration-300 ${
        isSelected
          ? "ring-2 ring-[#8E5A68]/55 shadow-[0_14px_44px_rgba(142,90,104,0.20)]"
          : "border border-[#EBE0E4] shadow-[0_8px_26px_rgba(61,44,50,0.06)] hover:shadow-[0_16px_40px_rgba(61,44,50,0.10)] hover:border-[#D4BC9B]/60"
      }`}
    >
      {/* ── Lifestyle photo ── */}
      <div className="relative overflow-hidden rounded-t-[1.35rem]">
        <OfferImage offer={offer} />

        {/* Top-left: selected badge */}
        {isSelected && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#8E5A68] px-2.5 py-1 text-[10px] font-black text-white">
            <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
            محدد
          </span>
        )}

        {/* Top-right: savings */}
        {savings > 0 && (
          <span className="absolute right-3 top-3 rounded-full border border-emerald-200 bg-white/90 px-2.5 py-1 text-[10px] font-bold text-emerald-700 backdrop-blur-sm">
            وفري {savings}%
          </span>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col p-4">
        {/* Timing tags */}
        <div className="mb-2 flex items-center gap-1.5">
          {tags.map(t => (
            <span key={t.label} className="flex items-center gap-1 rounded-full bg-[#FAF7F4] px-2 py-0.5 text-[10px] font-semibold text-[#8D7D82]">
              {t.icon === "sun"
                ? <Sun className="h-2.5 w-2.5 text-amber-500" strokeWidth={1.6} />
                : <Moon className="h-2.5 w-2.5 text-purple-400" strokeWidth={1.6} />
              }
              {t.label}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-[14px] font-black leading-tight text-[#3D2C32]">{offer.label}</h3>
        <p className="mt-0.5 text-[11px] text-[#8D7D82]">{benefit}</p>

        {/* Products */}
        <div className="mt-2.5 flex flex-wrap gap-1">
          {offer.products.map(p => (
            <span
              key={p.slug}
              className="flex items-center gap-0.5 rounded-full border border-[#EBE0E4] bg-[#FFF9F6] px-2 py-0.5 text-[10px] font-medium text-[#6B4E56]"
            >
              <Check className="h-2 w-2 text-[#D4BC9B]" strokeWidth={2.5} />
              {SHORT[p.slug] ?? p.name_ar}
            </span>
          ))}
        </div>

        {/* Price row */}
        <div className="mt-auto border-t border-[#EBE0E4]/60 pt-3 mt-3">
          <div className="flex items-end justify-between">
            <div>
              {offer.originalPrice && (
                <p className="text-[10px] text-[#8D7D82]/60 line-through">{offer.originalPrice} درهم</p>
              )}
              <p className="text-xl font-black text-[#3D2C32]">
                {offer.price}
                <span className="mr-0.5 text-xs font-semibold text-[#8D7D82]"> درهم</span>
              </p>
              <p className="text-[9px] text-[#8D7D82]/60">≈ {offer.perUnit} درهم / منتج</p>
            </div>
            {offer.saving && (
              <span className="rounded-xl bg-emerald-50 px-2.5 py-1.5 text-center">
                <p className="text-sm font-black text-emerald-700">-{offer.saving}</p>
                <p className="text-[8px] text-emerald-600">درهم</p>
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-3 rounded-full py-2.5 text-center text-xs font-extrabold transition-all duration-200 ${
            isSelected
              ? "bg-[#8E5A68] text-white"
              : "bg-[#F5E8EC] text-[#8E5A68] group-hover:bg-[#EDE4D7]"
          }`}
        >
          {isSelected ? "✓ تم الاختيار" : "اختاري"}
        </div>
      </div>
    </motion.button>
  );
}

// ─── Featured complete card ────────────────────────────────────────────────

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
      whileTap={{ scale: 0.98 }}
      aria-pressed={isSelected}
      className={`group relative w-full overflow-hidden rounded-[1.65rem] text-right transition-all duration-300 ${
        isSelected
          ? "ring-2 ring-[#C4788A]/60 shadow-[0_28px_70px_rgba(196,120,138,0.25)]"
          : "shadow-[0_20px_60px_rgba(20,8,16,0.28)] hover:shadow-[0_32px_80px_rgba(20,8,16,0.34)]"
      }`}
    >
      <div className="bg-gradient-to-br from-[#1E0F14] via-[#2D1525] to-[#3D2032]">

        {/* ── Top badge row ── */}
        <div className="flex items-center justify-between px-5 pt-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] px-3.5 py-1.5 text-[11px] font-black text-[#3D2A00] shadow-lg">
            <Crown className="h-3.5 w-3.5" />
            الأكثر اختياراً
          </span>
          {savings > 0 && (
            <span className="rounded-full border border-[#86EFAC]/30 bg-[#86EFAC]/12 px-3 py-1.5 text-[11px] font-bold text-[#86EFAC]">
              وفري {savings}%
            </span>
          )}
        </div>

        {/* ── Layout: stacked on mobile, side-by-side on desktop ── */}
        <div className="flex flex-col lg:flex-row">

          {/* Lifestyle photo */}
          <div className="relative lg:w-[44%] lg:min-h-[260px]">
            <div className="relative overflow-hidden rounded-t-[1.65rem] lg:rounded-r-none lg:rounded-l-[1.65rem] lg:h-full">
              <OfferImage offer={offer} featured />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-5 lg:py-6 lg:pl-6 lg:pr-5">

            {/* Timing */}
            <div className="mb-3 flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/70">
                <Sun className="h-3 w-3 text-amber-300" strokeWidth={1.5} />
                صباح
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/70">
                <Moon className="h-3 w-3 text-purple-300" strokeWidth={1.5} />
                ليل
              </span>
            </div>

            {/* Name + benefit */}
            <div>
              <h3 className="text-2xl font-black text-white lg:text-[1.6rem]">{offer.label}</h3>
              <p className="mt-1 text-[12px] text-white/50">{benefit}</p>
            </div>

            {/* Products */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {offer.products.map(p => (
                <span
                  key={p.slug}
                  className="flex items-center gap-1 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] font-semibold text-white/75"
                >
                  <Check className="h-2.5 w-2.5 text-[#F2B8C6]" strokeWidth={2.5} />
                  {SHORT[p.slug] ?? p.name_ar}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
              <div>
                {offer.originalPrice && (
                  <p className="text-xs text-white/30 line-through">{offer.originalPrice} درهم</p>
                )}
                <p className="text-[2.2rem] font-black leading-none text-white">
                  {offer.price}
                  <span className="mr-1 text-sm font-semibold text-white/55">درهم</span>
                </p>
                <p className="mt-1 text-[10px] text-white/35">≈ {offer.perUnit} درهم / منتج</p>
              </div>
              {offer.saving && (
                <div className="rounded-2xl border border-[#86EFAC]/25 bg-[#86EFAC]/10 px-4 py-2.5 text-center">
                  <p className="text-2xl font-black text-[#86EFAC]">{offer.saving}</p>
                  <p className="text-[9px] text-[#86EFAC]/65">درهم وفّرتِ</p>
                </div>
              )}
            </div>

            {/* CTA */}
            <motion.div
              className={`mt-4 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-extrabold transition-all duration-200 ${
                isSelected
                  ? "bg-white text-[#3D2C32]"
                  : "bg-white/12 text-white hover:bg-white/20"
              }`}
            >
              <Sparkles className="h-4 w-4" strokeWidth={1.5} />
              {isSelected ? "✓ تم الاختيار — روتين نورا الكامل" : "اختاري روتين نورا الكامل"}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────

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

  return (
    <div className="space-y-3" dir="rtl" aria-label="اختيار روتين المنتج">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-2 pb-1">
        <div>
          <p className="text-sm font-black text-[#3D2C32]">اختاري روتينك</p>
          <p className="mt-0.5 text-[11px] text-[#8D7D82]">روتين متكامل = نتائج أسرع + توفير أكبر</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EBE0E4] bg-white px-2.5 py-1.5 text-[10px] font-semibold text-[#3D2C32] shadow-sm">
          <Truck className="h-3 w-3 text-[#8E5A68]" strokeWidth={1.6} />
          دفع عند الاستلام
        </span>
      </div>

      {/* ── Smaller cards (single / duo / trio) ── */}
      <div className={`grid gap-3 ${
        otherOffers.length === 2 ? "grid-cols-2" :
        otherOffers.length === 3 ? "grid-cols-1 sm:grid-cols-3" :
        "grid-cols-1 sm:grid-cols-2"
      }`}>
        {otherOffers.map(offer => (
          <RoutineCard
            key={offer.id}
            offer={offer}
            isSelected={selected === offer.id}
            onSelect={() => select(offer)}
          />
        ))}
      </div>

      {/* ── Featured complete card ── */}
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

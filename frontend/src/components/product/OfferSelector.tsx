"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Crown, Moon, Sparkles, Sun, Truck } from "lucide-react";
import { getProductPageOffers, ProductPageOffer } from "@/config/products";
import { Product } from "@/types";

type Offer = ProductPageOffer;

const PACK_IMAGES: Record<string, string> = {
  "nura-balance":       "/images/products/serum-niacinamide-pack.png",
  "nura-eye-revive":   "/images/products/eye-serum-pack.png",
  "nura-night-renewal": "/images/products/retinol-cream-pack.png",
  "nura-spf-50":        "/images/products/sunscreen-spf50-pack.png",
};

const SHORT: Record<string, string> = {
  "nura-balance":       "النياسيناميد",
  "nura-eye-revive":   "سيروم العين",
  "nura-night-renewal": "كريم الريتينول",
  "nura-spf-50":        "واقي الشمس",
};

const IS_PUMP = new Set(["nura-spf-50", "nura-night-renewal"]);

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

// ─── Product stage ─────────────────────────────────────────────────────────

function ProductStage({ slugs, dark }: { slugs: string[]; dark?: boolean }) {
  const count = slugs.length;

  const itemH = (slug: string) => {
    const pump = IS_PUMP.has(slug);
    if (count === 1) return pump ? 136 : 122;
    if (count === 2) return pump ? 116 : 104;
    if (count === 3) return pump ? 108 : 96;
    return pump ? 100 : 88;
  };
  const itemW = (slug: string) => {
    const pump = IS_PUMP.has(slug);
    if (count === 1) return pump ? 58 : 50;
    if (count === 2) return pump ? 52 : 44;
    return pump ? 46 : 40;
  };

  return (
    <div
      className={`relative flex items-end justify-center overflow-hidden ${
        dark
          ? "bg-gradient-to-br from-[#2D1525] via-[#1E0F14] to-[#130A0E]"
          : "bg-gradient-to-br from-[#FFF9F4] via-white to-[#F9F0E8]"
      }`}
      style={{ height: 178 }}
    >
      {/* Radial glow under products */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: dark
            ? "radial-gradient(ellipse 80% 55% at 50% 115%, rgba(196,120,138,0.28) 0%, transparent 70%)"
            : "radial-gradient(ellipse 80% 55% at 50% 115%, rgba(212,188,155,0.55) 0%, transparent 70%)",
        }}
      />

      {/* Shadow beneath products */}
      <div
        className={`absolute rounded-full blur-lg ${dark ? "bg-black/40" : "bg-[#3D2C32]/14"}`}
        style={{ bottom: 14, left: "50%", transform: "translateX(-50%)", width: "70%", height: 14 }}
      />

      {/* Products */}
      <div className="relative flex items-end justify-center gap-2.5 pb-4">
        {slugs.map((slug, i) => {
          const isCenterOfThree = count === 3 && i === 1;
          return (
            <motion.img
              key={slug}
              src={PACK_IMAGES[slug]}
              alt={SHORT[slug]}
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              draggable={false}
              className="select-none object-contain"
              style={{
                height: itemH(slug),
                width: itemW(slug),
                transform: isCenterOfThree ? "scale(1.07) translateY(-5px)" : "none",
                filter: dark
                  ? "drop-shadow(0 10px 20px rgba(196,120,138,0.32)) brightness(1.06)"
                  : "drop-shadow(0 10px 22px rgba(92,45,62,0.22))",
              }}
            />
          );
        })}
      </div>
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
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.985 }}
      aria-pressed={isSelected}
      className={`group relative flex w-full flex-col overflow-hidden rounded-[1.35rem] bg-white text-right transition-all duration-300 ${
        isSelected
          ? "ring-2 ring-[#8E5A68]/55 shadow-[0_14px_44px_rgba(142,90,104,0.20)]"
          : "border border-[#EBE0E4] shadow-[0_8px_26px_rgba(61,44,50,0.06)] hover:shadow-[0_16px_40px_rgba(61,44,50,0.10)] hover:border-[#D4BC9B]/60"
      }`}
    >
      {/* ── Product stage ── */}
      <div className="relative overflow-hidden rounded-t-[1.35rem]">
        <ProductStage slugs={slugs} />

        {/* Top-left: selected badge */}
        <AnimatePresence>
          {isSelected && (
            <motion.span
              key="selected"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#8E5A68] px-2.5 py-1 text-[10px] font-black text-white"
            >
              <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
              محدد
            </motion.span>
          )}
        </AnimatePresence>

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
  const slugs   = offer.products.map(p => p.slug);
  const benefit = getBenefit(offer);
  const savings = offer.saving && offer.originalPrice
    ? Math.round((offer.saving / offer.originalPrice) * 100)
    : 0;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
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

          {/* Product stage */}
          <div className="relative lg:w-[42%] lg:min-h-[260px]">
            <div className="relative mx-4 mt-4 overflow-hidden rounded-2xl lg:mx-5 lg:my-5 lg:h-full">
              <ProductStage slugs={slugs} dark />
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

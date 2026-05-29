"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Layers3, Package, Star, Truck } from "lucide-react";
import { getProductPageOffers, ProductPageOffer } from "@/config/products";
import { Product } from "@/types";

type Offer = ProductPageOffer;

const tierConfig = {
  single: {
    Icon: Package,
    card: "bg-white border-nura-border/55",
    ring: "ring-nura-border/50",
    label: "text-nura-plum/65",
    badge: "border-nura-border bg-nura-cream text-nura-muted",
    radio: "border-nura-plum bg-nura-plum",
    dot: "bg-white",
    icon: "bg-nura-cream text-nura-muted",
    saving: "text-nura-muted",
    muted: "text-nura-muted",
    price: "text-nura-plum/75",
    detailBg: "border-nura-border/45 bg-nura-cream/35",
    detailText: "text-nura-plum/70",
    checkColor: "text-nura-champagne",
    perUnit: "text-nura-muted/70",
  },
  duo: {
    Icon: Layers3,
    card: "bg-white border-nura-champagne/55",
    ring: "ring-nura-champagne/45",
    label: "text-nura-plum",
    badge: "border-nura-champagne/45 bg-nura-champagne-light text-nura-plum",
    radio: "border-nura-rose-deep bg-nura-rose-deep",
    dot: "bg-white",
    icon: "bg-nura-champagne-light text-nura-rose-deep",
    saving: "text-emerald-600",
    muted: "text-nura-muted",
    price: "text-nura-plum",
    detailBg: "border-nura-border/45 bg-nura-cream/40",
    detailText: "text-nura-plum/75",
    checkColor: "text-nura-champagne",
    perUnit: "text-nura-muted",
  },
  trio: {
    Icon: Star,
    card: "bg-gradient-to-br from-white via-nura-cream/35 to-nura-blush/30 border-nura-rose-deep/45",
    ring: "ring-nura-rose-deep/25",
    label: "text-nura-plum",
    badge: "border-transparent bg-nura-rose-deep text-white",
    radio: "border-nura-rose-deep bg-nura-rose-deep",
    dot: "bg-white",
    icon: "bg-nura-rose-deep text-white",
    saving: "text-emerald-600",
    muted: "text-nura-muted",
    price: "text-nura-plum",
    detailBg: "border-nura-rose-deep/15 bg-nura-blush/35",
    detailText: "text-nura-plum/80",
    checkColor: "text-nura-rose-deep",
    perUnit: "text-nura-muted",
  },
  complete: {
    Icon: Crown,
    card: "bg-[linear-gradient(135deg,#1E0F14_0%,#5C2D3E_60%,#7B3F55_100%)] border-[#C4788A]/45",
    ring: "ring-[#C4788A]/40",
    label: "text-white",
    badge: "border-transparent bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] text-[#3D2A00]",
    radio: "border-[#F2B8C6] bg-[#F2B8C6]",
    dot: "bg-[#3D1A25]",
    icon: "bg-white/15 text-white",
    saving: "text-[#86EFAC]",
    muted: "text-white/55",
    price: "text-white",
    detailBg: "border-white/12 bg-white/8",
    detailText: "text-white/75",
    checkColor: "text-[#F2B8C6]",
    perUnit: "text-white/45",
  },
} as const;

const productShortNames: Record<string, string> = {
  "nura-balance": "نياسيناميد",
  "nura-eye-revive": "محيط العين",
  "nura-night-renewal": "ريتينول",
  "nura-spf-50": "واقي الشمس",
};

interface Props {
  product: Product;
  onOfferChange: (offer: Offer) => void;
}

export function OfferSelector({ product, onOfferChange }: Props) {
  const offers = useMemo(() => getProductPageOffers(product.slug), [product.slug]);
  const defaultOffer =
    offers.find((o) => o.recommended) ?? offers[offers.length - 1] ?? offers[0];
  const [selected, setSelected] = useState(defaultOffer?.id);

  const announceOffer = React.useCallback(
    (offer: Offer) => {
      window.dispatchEvent(
        new CustomEvent("nura-offer-change", {
          detail: { productSlug: product.slug, offerId: offer.id },
        })
      );
    },
    [product.slug]
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

  return (
    <section className="space-y-3" aria-label="اختيار طقس المنتج" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-0.5">
        <div>
          <p className="text-sm font-black text-nura-plum">اختاري طقسك</p>
          <p className="mt-0.5 text-[11px] text-nura-muted">
            روتين متكامل = نتائج أسرع + توفير أكبر
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-nura-champagne/40 bg-white px-2.5 py-1 text-[10px] font-semibold text-nura-plum shadow-ivory-sm">
          <Truck className="h-3 w-3 text-nura-rose-deep" strokeWidth={1.6} aria-hidden />
          دفع عند الاستلام
        </span>
      </div>

      {/* Cards */}
      <div className="grid gap-2">
        {offers.map((offer) => {
          const isOn = selected === offer.id;
          const cfg = tierConfig[offer.tier];
          const StepIcon = cfg.Icon;
          const isBundle = offer.products.length > 1;

          return (
            <button
              key={offer.id}
              type="button"
              onClick={() => select(offer)}
              aria-pressed={isOn}
              className={`group relative w-full overflow-hidden rounded-2xl border text-right transition-all duration-200 ${cfg.card} ${
                isOn
                  ? `ring-2 ${cfg.ring} shadow-sm`
                  : "hover:border-nura-rose-deep/30 hover:shadow-sm"
              } ${offer.tier === "single" ? "opacity-70 hover:opacity-90" : ""}`}
            >
              {/* Top banner — social proof / premium label */}
              {offer.tier === "trio" && (
                <div className="bg-nura-rose-deep px-3 py-[5px] text-center text-[10px] font-black tracking-wide text-white">
                  ✦ الأكثر طلباً — اختارته 1,247+ عميلة
                </div>
              )}
              {offer.tier === "complete" && (
                <div className="bg-[#C4788A]/55 px-3 py-[5px] text-center text-[10px] font-black tracking-wide text-white">
                  👑 أعلى توفير — روتين صباحي + ليلي متكامل
                </div>
              )}

              {/* Main row */}
              <div className="flex items-center gap-3 px-3.5 py-3">
                {/* Radio */}
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                    isOn
                      ? cfg.radio
                      : offer.tier === "complete"
                        ? "border-white/35 bg-transparent"
                        : "border-nura-border bg-white"
                  }`}
                  aria-hidden="true"
                >
                  {isOn && (
                    <motion.span
                      layoutId="offer-radio-dot"
                      className={`h-2 w-2 rounded-full ${cfg.dot}`}
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                </div>

                {/* Tier icon */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${cfg.icon}`}
                >
                  <StepIcon className="h-4 w-4" strokeWidth={1.6} aria-hidden />
                </div>

                {/* Label + product names */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[13px] font-black leading-tight ${cfg.label}`}>
                      {offer.label}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${cfg.badge}`}
                    >
                      {offer.badge}
                    </span>
                  </div>
                  <p className={`mt-0.5 truncate text-[11px] leading-4 ${cfg.muted}`}>
                    {offer.products
                      .map((p) => productShortNames[p.slug] ?? p.name_ar)
                      .join(" + ")}
                  </p>
                </div>

                {/* Price + saving */}
                <div className="shrink-0 min-w-[58px] text-left">
                  <p className={`text-[18px] font-black leading-none ${cfg.price}`}>
                    {offer.price}
                    <span className={`text-[10px] font-semibold ${cfg.muted}`}> درهم</span>
                  </p>
                  {offer.saving ? (
                    <p className={`mt-0.5 text-[10px] font-bold ${cfg.saving}`}>
                      وفري {offer.saving}
                    </p>
                  ) : (
                    <p className={`mt-0.5 text-[10px] ${cfg.muted}`}>سعر فردي</p>
                  )}
                </div>
              </div>

              {/* Expanded details when selected — only for bundles */}
              {isOn && isBundle && (
                <div className={`border-t px-3.5 py-2.5 ${cfg.detailBg}`}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {offer.products.map((p) => (
                      <span
                        key={p.slug}
                        className={`flex items-center gap-1 text-[10px] font-medium ${cfg.detailText}`}
                      >
                        <Check
                          className={`h-3 w-3 shrink-0 ${cfg.checkColor}`}
                          strokeWidth={2.4}
                          aria-hidden
                        />
                        {productShortNames[p.slug] ?? p.name_ar}
                      </span>
                    ))}
                    <span className={`mr-auto text-[10px] font-semibold ${cfg.perUnit}`}>
                      ≈ {offer.perUnit} درهم / منتج
                    </span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export type { Offer };

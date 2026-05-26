"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  Crown,
  Droplets,
  Eye,
  Layers3,
  Package,
  Shield,
  Sparkles,
  Star,
  Sun,
  Truck,
} from "lucide-react";
import { getProductPageOffers, ProductPageOffer } from "@/config/products";
import { Product } from "@/types";

type Offer = ProductPageOffer;

const tierStyles: Record<
  Offer["tier"],
  {
    Icon: typeof Package;
    shell: string;
    icon: string;
    badge: string;
    note: string;
    stage: string;
    imageGlow: string;
  }
> = {
  single: {
    Icon: Package,
    shell: "border-nura-border bg-white shadow-none",
    icon: "bg-nura-cream text-nura-plum",
    badge: "border-nura-border bg-nura-cream text-nura-muted",
    note: "للتجربة فقط",
    stage: "border-nura-border/70 bg-nura-cream/45",
    imageGlow: "bg-white/55",
  },
  duo: {
    Icon: Layers3,
    shell: "border-nura-champagne/50 bg-gradient-to-br from-white via-nura-cream/55 to-nura-blush/35 shadow-ivory-sm",
    icon: "bg-nura-champagne-light text-nura-rose-deep",
    badge: "border-nura-champagne/45 bg-nura-champagne-light text-nura-plum",
    note: "روتين ذكي",
    stage: "border-nura-champagne/35 bg-gradient-to-br from-white to-nura-cream",
    imageGlow: "bg-nura-champagne-light/60",
  },
  trio: {
    Icon: Star,
    shell: "border-nura-rose-deep/45 bg-gradient-to-br from-white via-nura-blush/50 to-nura-cream shadow-[0_14px_34px_rgba(92,45,62,0.10)]",
    icon: "bg-nura-rose-deep text-white",
    badge: "border-nura-rose-deep/25 bg-white/90 text-nura-rose-deep",
    note: "أفضل توازن",
    stage: "border-nura-rose-deep/20 bg-gradient-to-br from-white via-nura-cream to-nura-blush/60",
    imageGlow: "bg-nura-blush/80",
  },
  complete: {
    Icon: Crown,
    shell:
      "scale-[1.01] border-nura-rose-deep bg-gradient-to-br from-nura-cream via-white to-nura-blush shadow-[0_22px_60px_rgba(92,45,62,0.20)]",
    icon: "bg-nura-plum text-white",
    badge: "border-nura-champagne/50 bg-nura-plum text-white",
    note: "الأكثر توفيراً",
    stage: "border-nura-champagne/45 bg-[radial-gradient(circle_at_50%_15%,rgba(237,228,215,0.92),rgba(255,255,255,0.84)_48%,rgba(245,232,236,0.72))]",
    imageGlow: "bg-nura-champagne-light/80",
  },
};

const productPackImages: Record<string, string> = {
  "nura-balance": "/images/products/serum-niacinamide-pack.png",
  "nura-eye-revive": "/images/products/eye-serum-pack.png",
  "nura-night-renewal": "/images/products/retinol-cream-pack.png",
  "nura-spf-50": "/images/products/sunscreen-spf50-pack.png",
};

const productShortNames: Record<string, string> = {
  "nura-balance": "نياسيناميد",
  "nura-eye-revive": "محيط العين",
  "nura-night-renewal": "ريتينول",
  "nura-spf-50": "واقي الشمس",
};

const productBenefitIcons: Record<string, { Icon: typeof Sparkles; label: string }> = {
  "nura-balance": { Icon: Sparkles, label: "إشراقة" },
  "nura-eye-revive": { Icon: Eye, label: "محيط العين" },
  "nura-night-renewal": { Icon: Droplets, label: "تجديد" },
  "nura-spf-50": { Icon: Shield, label: "حماية" },
};

function ProductMiniLineup({ offer, selected }: { offer: Offer; selected: boolean }) {
  const compact = offer.products.length >= 3;

  return (
    <div
      className={`relative flex min-h-[92px] items-end justify-center overflow-hidden rounded-[1.15rem] border px-3 pt-3 ${
        tierStyles[offer.tier].stage
      } ${offer.tier === "complete" ? "min-h-[112px]" : ""}`}
      aria-label={`صور المنتجات داخل ${offer.label}`}
    >
      <div
        className={`absolute left-1/2 top-5 h-16 w-36 -translate-x-1/2 rounded-full blur-2xl ${
          tierStyles[offer.tier].imageGlow
        }`}
        aria-hidden="true"
      />
      <div className="absolute inset-x-8 bottom-3 h-3 rounded-full bg-nura-plum/10 blur-md" aria-hidden="true" />
      <div className="relative flex h-[86px] items-end justify-center">
        {offer.products.map((p, index) => {
          const count = offer.products.length;
          const offset = (index - (count - 1) / 2) * (compact ? 24 : 34);
          const scale = offer.tier === "complete" && index === 1 ? 1.08 : 1;
          const zIndex = count + index;

          return (
            <Image
              key={p.slug}
              src={productPackImages[p.slug] ?? p.image}
              alt={`صورة ${p.name_ar} داخل العرض`}
              width={126}
              height={126}
              className={`absolute bottom-0 h-[82px] w-auto object-contain drop-shadow-[0_16px_18px_rgba(61,44,50,0.16)] transition-transform duration-300 ${
                selected ? "translate-y-[-2px]" : ""
              } ${offer.tier === "single" ? "opacity-90" : ""}`}
              style={{
                transform: `translateX(${offset}px) scale(${scale})`,
                zIndex,
              }}
              loading="lazy"
            />
          );
        })}
      </div>
    </div>
  );
}

function BenefitChips({ offer }: { offer: Offer }) {
  const chips = offer.products
    .map((p) => productBenefitIcons[p.slug])
    .filter(Boolean)
    .slice(0, offer.tier === "complete" ? 4 : 3);

  return (
    <div className="flex flex-wrap gap-1.5" aria-label="فوائد الروتين">
      {chips.map(({ Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1 rounded-full border border-nura-champagne/35 bg-white/70 px-2 py-1 text-[10px] font-bold text-nura-plum"
        >
          <Icon className="h-3 w-3 text-nura-rose-deep" strokeWidth={1.6} aria-hidden />
          {label}
        </span>
      ))}
    </div>
  );
}

function RoutineFlow() {
  return (
    <div className="mt-3 grid gap-2 rounded-2xl border border-nura-champagne/35 bg-white/62 p-3 text-[11px] font-bold text-nura-plum">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full bg-nura-champagne-light px-2 py-1">
          <Sun className="h-3 w-3" strokeWidth={1.6} aria-hidden />
          الصباح
        </span>
        <span>نياسيناميد</span>
        <span className="text-nura-muted">←</span>
        <span>واقي الشمس</span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full bg-nura-blush px-2 py-1">
          <Sparkles className="h-3 w-3" strokeWidth={1.6} aria-hidden />
          الليل
        </span>
        <span>ريتينول</span>
        <span className="text-nura-muted">←</span>
        <span>سيروم محيط العين</span>
      </div>
    </div>
  );
}

interface Props {
  product: Product;
  onOfferChange: (offer: Offer) => void;
}

export function OfferSelector({ product, onOfferChange }: Props) {
  const offers = useMemo(() => getProductPageOffers(product.slug), [product.slug]);
  const defaultOffer = offers.find((offer) => offer.recommended) ?? offers[offers.length - 1] ?? offers[0];
  const [selected, setSelected] = useState(defaultOffer?.id);

  const announceOffer = React.useCallback((offer: Offer) => {
    window.dispatchEvent(
      new CustomEvent("nura-offer-change", {
        detail: { productSlug: product.slug, offerId: offer.id },
      })
    );
  }, [product.slug]);

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

  if (!offers.length) {
    return null;
  }

  return (
    <section className="space-y-4" aria-label="اختيار عرض المنتج">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-nura-plum text-white shadow-ivory-sm">
            <Sparkles className="h-4 w-4" strokeWidth={1.6} aria-hidden />
          </span>
          <div>
            <p className="text-sm font-bold text-nura-plum">اختاري العرض الأنسب</p>
            <p className="text-[11px] text-nura-muted">كلما كمل الروتين، كلما بان التوفير والقيمة</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-nura-champagne/40 bg-white px-3 py-1 text-[10px] font-semibold text-nura-plum shadow-ivory-sm">
          <Truck className="h-3 w-3 text-nura-rose-deep" strokeWidth={1.6} aria-hidden />
          الدفع عند الاستلام
        </span>
      </div>

      <div className="grid gap-3">
        {offers.map((offer) => {
          const isOn = selected === offer.id;
          const styles = tierStyles[offer.tier];
          const StepIcon = styles.Icon;
          const isBundle = offer.products.length > 1;

          return (
            <button
              key={offer.id}
              type="button"
              onClick={() => select(offer)}
              aria-pressed={isOn}
              className={`group relative w-full overflow-hidden rounded-[1.5rem] border p-[1px] text-right transition-all duration-300 ${
                styles.shell
              } ${
                isOn
                  ? "ring-2 ring-nura-rose-deep/20"
                  : "hover:-translate-y-0.5 hover:border-nura-rose-deep/40 hover:shadow-ivory-sm"
              }`}
            >
              {offer.tier === "complete" && (
                <>
                  <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-l from-transparent via-nura-champagne to-transparent" />
                  <div className="absolute -start-8 top-6 h-24 w-24 rounded-full bg-nura-champagne-light/50 blur-3xl" />
                </>
              )}

              <div className="relative rounded-[1.42rem] bg-white/74 p-3 backdrop-blur-sm md:p-4">
                <div className="grid gap-3 min-[430px]:grid-cols-[126px_1fr] min-[430px]:items-start">
                  <ProductMiniLineup offer={offer} selected={isOn} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 ${styles.icon} ${
                          isOn ? "scale-105" : ""
                        }`}
                      >
                        <StepIcon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[15px] font-black leading-tight text-nura-plum md:text-base">
                            {offer.label}
                          </span>
                          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${styles.badge}`}>
                            {offer.badge}
                          </span>
                          {offer.tier === "complete" && (
                            <span className="rounded-full border border-nura-champagne/50 bg-nura-champagne-light px-2.5 py-1 text-[10px] font-bold text-nura-plum">
                              مختار تلقائياً
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs font-medium leading-relaxed text-nura-muted">
                          {offer.tier === "complete" ? "روتين صباحي + ليلي متكامل" : offer.sublabel}
                        </p>
                      </div>

                      <div
                        className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          isOn ? "border-nura-plum bg-nura-plum" : "border-nura-border bg-white"
                        }`}
                        aria-hidden="true"
                      >
                        {isOn && <motion.span layoutId="offer-dot" className="h-2.5 w-2.5 rounded-full bg-white" />}
                      </div>
                    </div>

                    <div className="mt-3">
                      <BenefitChips offer={offer} />
                    </div>

                    {isBundle && (
                      <ul className="mt-3 grid gap-1.5 border-t border-nura-border/70 pt-3" role="list">
                        {offer.products.map((p) => (
                          <li key={p.slug} className="flex items-start gap-2 text-[11px] font-medium text-[#5C4A4A]">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-nura-champagne" strokeWidth={2.4} aria-hidden />
                            <span className="leading-snug">{productShortNames[p.slug] ?? p.name_ar}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {offer.tier === "complete" && <RoutineFlow />}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-end justify-between gap-3 rounded-[1.15rem] border border-nura-border/65 bg-white/72 px-3 py-3">
                  <div className="space-y-1">
                    <p className="flex items-baseline gap-1 text-nura-plum">
                      <span className="font-serif text-[36px] font-black leading-none md:text-[42px]">{offer.price}</span>
                      <span className="text-sm font-bold text-nura-muted">درهم</span>
                    </p>
                    {offer.originalPrice && offer.saving ? (
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="font-semibold text-nura-muted line-through">
                          بدل {offer.originalPrice} درهم
                        </span>
                        <span className={`rounded-full px-2.5 py-1 font-black ${
                          offer.tier === "complete"
                            ? "bg-nura-plum text-white"
                            : "bg-nura-champagne-light text-nura-plum"
                        }`}>
                          وفر {offer.saving} درهم
                        </span>
                      </div>
                    ) : (
                      <p className="text-[11px] font-semibold text-nura-muted">السعر الفردي بدون خصم روتين</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="rounded-full bg-nura-cream px-2.5 py-1 text-[10px] font-bold text-nura-muted">
                      {styles.note}
                    </span>
                    {isBundle && (
                      <span className="text-[10px] font-semibold text-nura-muted">
                        ≈ {offer.perUnit} درهم / منتج
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export type { Offer };

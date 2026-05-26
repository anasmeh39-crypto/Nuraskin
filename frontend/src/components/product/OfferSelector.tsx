"use client";

import React, { useMemo, useState } from "react";
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
      "scale-[1.01] border-[#C4788A] bg-[radial-gradient(circle_at_18%_0%,rgba(196,120,138,0.42)_0%,transparent_58%),linear-gradient(135deg,#1E0F14_0%,#5C2D3E_58%,#7B3F55_100%)] text-white shadow-[0_24px_70px_rgba(30,15,20,0.34)]",
    icon: "bg-[#F2B8C6] text-[#3D1A25]",
    badge: "border-transparent bg-[linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)] text-[#3D2A00]",
    note: "الأكثر توفيراً",
    stage: "border-white/15 bg-white/10",
    imageGlow: "bg-[#F2B8C6]/40",
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

const tierCtaText: Record<Offer["tier"], string> = {
  single: "جربيه لوحدو",
  duo: "ابدأي الروتين الأساسي",
  trio: "اختاري طقس الصباح",
  complete: "اختاري الطقس الكامل ✦",
};

function ProductMiniLineup({ offer, selected }: { offer: Offer; selected: boolean }) {
  const isComplete = offer.tier === "complete";

  return (
    <div
      className={`bundle-card__img-zone relative mx-auto flex h-[116px] min-h-[116px] w-full shrink-0 items-end justify-center overflow-visible rounded-[1.15rem] border px-3 pt-3 sm:h-[128px] ${
        tierStyles[offer.tier].stage
      } ${isComplete ? "sm:h-[140px]" : ""}`}
      aria-label={`صور المنتجات داخل ${offer.label}`}
    >
      <div
        className={`absolute left-1/2 top-4 h-16 w-36 -translate-x-1/2 rounded-full blur-2xl ${
          tierStyles[offer.tier].imageGlow
        }`}
        aria-hidden="true"
      />
      <div className={`absolute inset-x-7 bottom-3 h-3 rounded-full blur-md ${isComplete ? "bg-[#F2B8C6]/30" : "bg-nura-plum/10"}`} aria-hidden="true" />
      <div className="relative flex h-full w-full items-end justify-center">
        {offer.products.map((p, index) => {
          const count = offer.products.length;
          const middle = (count - 1) / 2;
          const offset = (index - middle) * (count >= 3 ? 30 : 42);
          const baseHeight = isComplete ? 116 : 96;
          const heroBoost = index === Math.round(middle) ? 10 : 0;
          const height = baseHeight + heroBoost;
          const rotate = count === 1 ? 0 : (index - middle) * 5;
          const lift = selected ? -6 : index === Math.round(middle) ? -4 : 0;

          return (
            <img
              key={p.slug}
              src={productPackImages[p.slug] ?? p.image}
              alt={`صورة ${p.name_ar} داخل العرض`}
              className={`absolute bottom-0 block object-contain bg-transparent transition-transform duration-300 ${
                isComplete
                  ? "drop-shadow-[0_8px_20px_rgba(196,120,138,0.45)] brightness-[1.05]"
                  : "drop-shadow-[0_6px_16px_rgba(92,45,62,0.18)]"
              } ${offer.tier === "single" ? "opacity-90" : ""}`}
              style={{
                left: `calc(50% + ${offset}px)`,
                height: `${height}px`,
                width: "auto",
                transform: `translateX(-50%) translateY(${lift}px) rotate(${rotate}deg)`,
                zIndex: index === Math.round(middle) ? count + 2 : count + index,
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
  const isComplete = offer.tier === "complete";
  const chips = offer.products
    .map((p) => productBenefitIcons[p.slug])
    .filter(Boolean)
    .slice(0, offer.tier === "complete" ? 4 : 3);

  return (
    <div className="flex flex-wrap gap-1.5" aria-label="فوائد الروتين">
      {chips.map(({ Icon, label }) => (
        <span
          key={label}
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold ${
            isComplete
              ? "border-white/15 bg-white/10 text-white/90"
              : "border-nura-champagne/35 bg-white/70 text-nura-plum"
          }`}
        >
          <Icon className={`h-3 w-3 ${isComplete ? "text-[#F2B8C6]" : "text-nura-rose-deep"}`} strokeWidth={1.6} aria-hidden />
          {label}
        </span>
      ))}
    </div>
  );
}

function RoutineFlow({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`mt-3 grid gap-2 rounded-2xl border p-3 text-[11px] font-bold ${
      dark ? "border-white/15 bg-white/10 text-white/80" : "border-nura-champagne/35 bg-white/62 text-nura-plum"
    }`}>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${dark ? "bg-white/12 text-white" : "bg-nura-champagne-light"}`}>
          <Sun className="h-3 w-3" strokeWidth={1.6} aria-hidden />
          الصباح
        </span>
        <span>نياسيناميد</span>
        <span className={dark ? "text-white/45" : "text-nura-muted"}>←</span>
        <span>واقي الشمس</span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${dark ? "bg-white/12 text-white" : "bg-nura-blush"}`}>
          <Sparkles className="h-3 w-3" strokeWidth={1.6} aria-hidden />
          الليل
        </span>
        <span>ريتينول</span>
        <span className={dark ? "text-white/45" : "text-nura-muted"}>←</span>
        <span>سيروم محيط العين</span>
      </div>
    </div>
  );
}

interface Props {
  product: Product;
  onOfferChange: (offer: Offer) => void;
  layout?: "auto" | "ritual";
}

export function OfferSelector({ product, onOfferChange, layout = "auto" }: Props) {
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
    <section className="space-y-4" aria-label="اختيار طقس المنتج" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-nura-plum text-white shadow-ivory-sm">
            <Sparkles className="h-4 w-4" strokeWidth={1.6} aria-hidden />
          </span>
          <div>
            <p className="text-sm font-bold text-nura-plum">اختاري طقسك</p>
            <p className="text-[11px] text-nura-muted">كلما كمل الروتين، كلما بان التوفير والقيمة</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-nura-champagne/40 bg-white px-3 py-1 text-[10px] font-semibold text-nura-plum shadow-ivory-sm">
          <Truck className="h-3 w-3 text-nura-rose-deep" strokeWidth={1.6} aria-hidden />
          الدفع عند الاستلام
        </span>
      </div>

      <div
        className={`flex snap-x items-start gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden ${
          layout === "ritual"
            ? "lg:grid-cols-2"
            : "sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
        }`}
      >
        {offers.map((offer) => {
          const isOn = selected === offer.id;
          const styles = tierStyles[offer.tier];
          const StepIcon = styles.Icon;
          const isBundle = offer.products.length > 1;
          const isComplete = offer.tier === "complete";

          return (
            <button
              key={offer.id}
              type="button"
              onClick={() => select(offer)}
              aria-pressed={isOn}
              className={`group relative flex min-w-[85vw] snap-start overflow-visible rounded-[1.5rem] border p-[1px] text-right transition-all duration-300 sm:min-w-0 ${
                styles.shell
              } ${
                isOn
                  ? "ring-2 ring-nura-rose-deep/20"
                  : "hover:-translate-y-0.5 hover:border-nura-rose-deep/40 hover:shadow-ivory-sm"
              }`}
            >
              {offer.tier === "complete" && (
                <>
                  <span className="absolute right-0 top-0 z-20 rounded-bl-xl rounded-tr-[1.45rem] bg-[#C4788A] px-4 py-1 text-[11px] font-black text-white shadow-lg">
                    الأكثر توفيراً
                  </span>
                  <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-l from-transparent via-nura-champagne to-transparent" />
                  <div className="absolute -start-8 top-6 h-24 w-24 rounded-full bg-nura-champagne-light/50 blur-3xl" />
                </>
              )}

              <div className={`relative flex h-full w-full flex-col rounded-[1.42rem] p-3 backdrop-blur-sm md:p-4 ${
                isComplete ? "bg-transparent pt-7 text-white" : "bg-white/74"
              }`}>
                <div className="grid flex-1 gap-3">
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
                          <span className={`text-[15px] font-black leading-tight md:text-base ${isComplete ? "text-white" : "text-nura-plum"}`}>
                            {offer.label}
                          </span>
                          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${styles.badge}`}>
                            {offer.badge}
                          </span>
                          {offer.tier === "complete" && (
                            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/80">
                              روتين كامل
                            </span>
                          )}
                          {offer.tier === "trio" && (
                            <span className="rounded-full border border-nura-rose-deep/20 bg-nura-rose-deep px-2.5 py-1 text-[10px] font-bold text-white">
                              مختار تلقائياً
                            </span>
                          )}
                        </div>
                        <p className={`mt-1 text-xs font-medium leading-relaxed ${isComplete ? "text-white/70" : "text-nura-muted"}`}>
                          {offer.tier === "complete" ? "روتين صباحي + ليلي متكامل" : offer.sublabel}
                        </p>
                      </div>

                      <div
                        className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          isOn
                            ? isComplete
                              ? "border-[#F2B8C6] bg-[#F2B8C6]"
                              : "border-nura-plum bg-nura-plum"
                            : isComplete
                              ? "border-white/35 bg-transparent"
                              : "border-nura-border bg-white"
                        }`}
                        aria-hidden="true"
                      >
                        {isOn && <motion.span layoutId="offer-dot" className={`h-2.5 w-2.5 rounded-full ${isComplete ? "bg-[#3D1A25]" : "bg-white"}`} />}
                      </div>
                    </div>

                    <div className="mt-3">
                      <BenefitChips offer={offer} />
                    </div>

                    {isBundle && (
                      <ul className="mt-3 grid gap-1.5 border-t border-nura-border/70 pt-3" role="list">
                        {offer.products.map((p) => (
                          <li key={p.slug} className={`flex items-start gap-2 text-[11px] font-medium ${isComplete ? "text-white/80" : "text-[#5C4A4A]"}`}>
                            <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isComplete ? "text-[#F2B8C6]" : "text-nura-champagne"}`} strokeWidth={2.4} aria-hidden />
                            <span className="leading-snug">{productShortNames[p.slug] ?? p.name_ar}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {offer.tier === "complete" && <RoutineFlow dark />}
                  </div>
                </div>

                <div className={`mt-3 flex flex-wrap items-end justify-between gap-3 rounded-[1.15rem] border px-3 py-3 ${
                  isComplete ? "border-white/15 bg-white/10" : "border-nura-border/65 bg-white/72"
                }`}>
                  <div className="space-y-1">
                    <p className={`flex items-baseline gap-1 ${isComplete ? "text-white" : "text-nura-plum"}`}>
                      <span className="font-serif text-[30px] font-black leading-none md:text-[34px]">{offer.price}</span>
                      <span className={`text-sm font-bold ${isComplete ? "text-white/70" : "text-nura-muted"}`}>درهم</span>
                    </p>
                    {offer.originalPrice && offer.saving ? (
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span className={`font-semibold line-through ${isComplete ? "text-white/60" : "text-nura-muted"}`}>
                          بدل {offer.originalPrice} درهم
                        </span>
                        <span className={`rounded-full px-2.5 py-1 font-black ${
                          offer.tier === "complete"
                            ? "bg-[#EAF3DE] text-[#27500A]"
                            : "bg-nura-champagne-light text-nura-plum"
                        }`}>
                          وفر {offer.saving} درهم
                        </span>
                      </div>
                    ) : (
                      <p className={`text-[11px] font-semibold ${isComplete ? "text-white/60" : "text-nura-muted"}`}>السعر الفردي بدون خصم روتين</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${isComplete ? "bg-white/10 text-white/80" : "bg-nura-cream text-nura-muted"}`}>
                      {styles.note}
                    </span>
                    {isBundle && (
                      <span className={`text-[10px] font-semibold ${isComplete ? "text-white/60" : "text-nura-muted"}`}>
                        ≈ {offer.perUnit} درهم / منتج
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <span className="flex min-h-[52px] w-full items-center justify-center rounded-[18px] bg-[#5C2D3E] px-4 text-center text-sm font-bold leading-snug text-white shadow-[0_12px_28px_rgba(92,45,62,0.18)] md:text-[15px]">
                    {tierCtaText[offer.tier]}
                  </span>
                  <p className={`mt-2 text-center text-[11px] ${isComplete ? "text-white/62" : "text-nura-muted"}`}>
                    الدفع عند الاستلام · توصيل سريع
                  </p>
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

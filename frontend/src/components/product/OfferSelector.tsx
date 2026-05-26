"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Crown,
  Layers3,
  Package,
  Sparkles,
  Star,
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
  }
> = {
  single: {
    Icon: Package,
    shell: "border-nura-border bg-white",
    icon: "bg-nura-cream text-nura-plum",
    badge: "border-nura-border bg-nura-cream text-nura-muted",
    note: "للتجربة فقط",
  },
  duo: {
    Icon: Layers3,
    shell: "border-nura-champagne/45 bg-gradient-to-br from-white to-nura-cream/55",
    icon: "bg-nura-champagne-light text-nura-rose-deep",
    badge: "border-nura-champagne/45 bg-nura-champagne-light text-nura-plum",
    note: "روتين ذكي",
  },
  trio: {
    Icon: Star,
    shell: "border-nura-rose-deep/45 bg-gradient-to-br from-white via-nura-blush/45 to-nura-cream shadow-ivory-sm",
    icon: "bg-nura-rose-deep text-white",
    badge: "border-nura-rose-deep/25 bg-white text-nura-rose-deep",
    note: "أفضل توازن",
  },
  complete: {
    Icon: Crown,
    shell:
      "border-nura-rose-deep bg-gradient-to-br from-nura-cream via-white to-nura-blush shadow-[0_18px_44px_rgba(92,45,62,0.16)]",
    icon: "bg-nura-plum text-white",
    badge: "border-nura-champagne/50 bg-nura-plum text-white",
    note: "الأكثر توفيراً",
  },
};

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
              className={`group relative w-full overflow-hidden rounded-[1.35rem] border p-[1px] text-right transition-all duration-300 ${
                styles.shell
              } ${
                isOn
                  ? "ring-2 ring-nura-rose-deep/20"
                  : "hover:-translate-y-0.5 hover:border-nura-rose-deep/40 hover:shadow-ivory-sm"
              }`}
            >
              {offer.tier === "complete" && (
                <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-l from-transparent via-nura-champagne to-transparent" />
              )}

              <div className="rounded-[1.28rem] bg-white/72 px-4 py-4 backdrop-blur-sm md:px-5">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 ${styles.icon} ${
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
                      {offer.sublabel}
                    </p>

                    {isBundle && (
                      <ul className="mt-3 grid gap-1.5 border-t border-nura-border/70 pt-3" role="list">
                        {offer.products.map((p) => (
                          <li key={p.slug} className="flex items-start gap-2 text-[11px] font-medium text-[#5C4A4A]">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-nura-champagne" strokeWidth={2.4} aria-hidden />
                            <span className="leading-snug">{p.name_ar}</span>
                          </li>
                        ))}
                      </ul>
                    )}
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

                <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                  <div className="space-y-1">
                    <p className="flex items-baseline gap-1 text-nura-plum">
                      <span className="font-serif text-[34px] font-black leading-none md:text-[40px]">{offer.price}</span>
                      <span className="text-sm font-bold text-nura-muted">درهم</span>
                    </p>
                    {offer.originalPrice && offer.saving ? (
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="font-semibold text-nura-muted line-through">
                          بدل {offer.originalPrice} درهم
                        </span>
                        <span className="rounded-full bg-nura-champagne-light px-2.5 py-1 font-black text-nura-plum">
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

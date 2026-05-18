"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Crown,
  Layers,
  Package,
  Percent,
  Sparkles,
  Truck,
} from "lucide-react";
import { PRODUCTS_MAP } from "@/config/products";
import { Product } from "@/types";

interface Offer {
  id: string;
  label: string;
  sublabel: string;
  products: Product[];
  price: number;
  originalPrice?: number;
  saving?: number;
  badge?: string;
  popular?: boolean;
  perUnit?: number;
}

function buildOffers(product: Product): Offer[] {
  const companions = product.crossSells.map((s) => PRODUCTS_MAP[s]).filter(Boolean);

  const offers: Offer[] = [
    {
      id: "single",
      label: "قطعة واحدة",
      sublabel: "للبداية أو التجديد",
      products: [product],
      price: product.price,
      perUnit: product.price,
    },
  ];

  if (companions.length >= 1) {
    const duo = companions[0];
    const duoPrice = Math.round((product.price + duo.price) * 0.92);
    offers.push({
      id: "duo",
      label: "ثنائي الروتين",
      sublabel: "خطوتان متناغمتان",
      products: [product, duo],
      price: duoPrice,
      originalPrice: product.price + duo.price,
      saving: product.price + duo.price - duoPrice,
      perUnit: Math.round(duoPrice / 2),
      badge: "توصيل مجاني",
    });
  }

  if (companions.length >= 2) {
    const [c1, c2] = companions;
    const fullPrice = product.price + c1.price + c2.price;
    const bundlePrice = Math.round(fullPrice * 0.87);
    offers.push({
      id: "ritual",
      label: "الطقم الكامل",
      sublabel: "التجربة الأشمل — ثلاث خطوات",
      products: [product, c1, c2],
      price: bundlePrice,
      originalPrice: fullPrice,
      saving: fullPrice - bundlePrice,
      perUnit: Math.round(bundlePrice / 3),
      badge: "أقوى قيمة",
      popular: true,
    });
  }

  return offers;
}

const offerAccent: Record<string, { Icon: typeof Package; accent: string }> = {
  single: { Icon: Package, accent: "from-rose-blush/90 to-white" },
  duo: { Icon: Layers, accent: "from-gold-light/80 to-white" },
  ritual: { Icon: Crown, accent: "from-brand-deep/[0.06] via-rose-blush/60 to-gold-light/40" },
};

interface Props {
  product: Product;
  onOfferChange: (offer: Offer) => void;
}

export function OfferSelector({ product, onOfferChange }: Props) {
  const offers = buildOffers(product);
  const defaultIdx = offers.length > 1 ? offers.length - 1 : 0;
  const [selected, setSelected] = useState(offers[defaultIdx].id);

  const select = (offer: Offer) => {
    setSelected(offer.id);
    onOfferChange(offer);
  };

  React.useEffect(() => {
    onOfferChange(offers[defaultIdx]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-deep text-white shadow-md">
            <Sparkles className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          </span>
          <div>
            <p className="text-sm font-bold text-[#2C1810]">اختاري عرضك</p>
            <p className="text-[11px] text-[#9B8A8A]">كلما اكتمل الطقم، كلما كانت القيمة أوضح</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold-light/60 px-3 py-1 text-[10px] font-semibold text-brand-deep">
          <Truck className="h-3 w-3 text-gold" strokeWidth={1.5} aria-hidden />
          الدفع عند الاستلام
        </span>
      </div>

      <div className="space-y-3">
        {offers.map((offer) => {
          const isOn = selected === offer.id;
          const pct =
            offer.saving && offer.originalPrice
              ? Math.round((offer.saving / offer.originalPrice) * 100)
              : 0;
          const { Icon: StepIcon, accent } = offerAccent[offer.id] ?? offerAccent.single;

          return (
            <button
              key={offer.id}
              type="button"
              onClick={() => select(offer)}
              className={`relative w-full overflow-hidden rounded-[1.35rem] border text-right transition-all duration-300 ${
                isOn
                  ? "border-rose-deep shadow-[0_16px_40px_rgba(139,74,90,0.14)] ring-2 ring-rose-deep/15"
                  : "border-border bg-white hover:border-rose-soft/70 hover:shadow-rose-sm"
              }`}
            >
              {offer.popular && (
                <div className="absolute start-0 top-0 z-10 rounded-br-2xl bg-gradient-to-l from-gold to-[#C9A84C] px-3 py-1 text-[10px] font-bold text-white shadow-sm">
                  الأكثر اختياراً
                </div>
              )}

              <div className={`bg-gradient-to-br ${accent} p-[1px]`}>
                <div className={`rounded-[1.3rem] px-4 py-4 md:px-5 md:py-5 ${isOn ? "bg-white" : "bg-white/92"}`}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-1 items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                          isOn ? "bg-rose-deep text-white" : "bg-ivory text-rose-deep"
                        }`}
                      >
                        <StepIcon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                      </div>

                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-[#2C1810] md:text-base">{offer.label}</span>
                          <span className="text-xs text-[#9B8A8A]">{offer.sublabel}</span>
                          {offer.badge && (
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                offer.popular
                                  ? "bg-gold-light text-brand-deep border border-gold/35"
                                  : "bg-emerald-50 text-emerald-800"
                              }`}
                            >
                              {offer.popular && <Percent className="h-3 w-3" strokeWidth={2} aria-hidden />}
                              {offer.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          {offer.originalPrice != null && offer.saving != null && (
                            <>
                              <span className="text-[#9B8A8A] line-through">{offer.originalPrice} درهم</span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-bold text-emerald-800">
                                وفري {offer.saving} درهم
                                {pct > 0 ? ` (${pct}٪)` : ""}
                              </span>
                            </>
                          )}
                          <span className="rounded-full bg-rose-blush px-2 py-0.5 font-semibold text-rose-deep">
                            ≈ {offer.perUnit} درهم / قطعة
                          </span>
                        </div>

                        {offer.products.length > 1 && (
                          <ul className="flex flex-col gap-1.5 border-t border-border/60 pt-3 mt-1">
                            {offer.products.map((p) => (
                              <li key={p.slug} className="flex items-start gap-2 text-[11px] text-[#5C4A4A]">
                                <Check
                                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                                  strokeWidth={2.5}
                                  aria-hidden
                                />
                                <span className="leading-snug font-medium">{p.name_ar}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-row items-end justify-between gap-4 border-t border-border/50 pt-3 md:flex-col md:border-t-0 md:pt-0 md:text-end">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 md:ms-auto ${
                          isOn ? "border-rose-deep bg-rose-deep" : "border-border bg-white"
                        }`}
                      >
                        {isOn && (
                          <motion.span layoutId="offer-dot" className="h-2.5 w-2.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <div className="text-2xl font-black leading-none text-rose-deep md:text-3xl">
                          {offer.price}
                          <span className="me-1 text-sm font-semibold text-rose-mid">درهم</span>
                        </div>
                        {offer.products.length > 1 && (
                          <p className="mt-1 text-[10px] font-medium text-[#9B8A8A]">سعر العرض — لا يُجمع مع كوبونات أخرى</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { Offer };

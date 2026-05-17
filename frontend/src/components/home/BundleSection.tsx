"use client";

import React from "react";
import { BUNDLES, PRODUCTS_MAP } from "@/config/products";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/Button";
import { generateEventId, trackAddToCart } from "@/lib/tracking";
import { CartItem } from "@/types";

export function BundleSection() {
  const { addItem, items, getTotal } = useCartStore();

  const handleBundleAdd = (productSlugs: string[]) => {
    productSlugs.forEach((slug) => {
      const p = PRODUCTS_MAP[slug];
      if (p) {
        addItem({ slug: p.slug, name_ar: p.name_ar, price: p.price, image: p.image });
      }
    });

    const updatedItems: CartItem[] = productSlugs.map((slug) => {
      const p = PRODUCTS_MAP[slug];
      return { slug, name_ar: p?.name_ar || slug, price: p?.price || 0, image: "", quantity: 1 };
    });
    const total = updatedItems.reduce((s, i) => s + i.price, 0);
    trackAddToCart(updatedItems, total, generateEventId());
  };

  return (
    <section className="py-16 md:py-24 bg-brand-deep">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">
            عروض خاصة
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            ابني روتينك الكامل
          </h2>
          <p className="text-white/70 text-lg mt-3 max-w-xl mx-auto">
            الطقم الكامل أوفر — ووفري على الشحن مع أي طلبية فوق 300 درهم.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BUNDLES.map((bundle, idx) => {
            const products = bundle.products.map((s) => PRODUCTS_MAP[s]).filter(Boolean);
            const isMain = idx === 0;

            return (
              <div
                key={bundle.id}
                className={`rounded-3xl p-6 relative ${
                  isMain
                    ? "bg-gold border-2 border-gold/30"
                    : "bg-white/10 border border-white/20"
                }`}
              >
                {bundle.tag && (
                  <div className={`absolute -top-3 start-6 text-xs font-bold px-3 py-1 rounded-full ${
                    isMain ? "bg-brand-deep text-white" : "bg-gold text-white"
                  }`}>
                    {bundle.tag}
                  </div>
                )}

                <h3 className={`font-bold text-xl mb-1 ${isMain ? "text-white" : "text-white"}`}>
                  {bundle.name_ar}
                </h3>

                <div className="my-4 space-y-1.5">
                  {products.map((p) => (
                    <div key={p!.slug} className="flex items-center gap-2">
                      <span className={`text-xs ${isMain ? "text-white/80" : "text-white/70"}`}>
                        ✓ {p!.name_ar}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-end gap-2 mb-4">
                  <span className={`text-3xl font-bold ${isMain ? "text-white" : "text-white"}`}>
                    {bundle.price} درهم
                  </span>
                  {bundle.saving > 0 && (
                    <span className={`text-sm ${isMain ? "text-white/80" : "text-gold"} mb-1`}>
                      وفري {bundle.saving} درهم
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleBundleAdd(bundle.products)}
                  className={`w-full py-4 rounded-full font-bold text-base transition-all active:scale-95 ${
                    isMain
                      ? "bg-white text-gold hover:bg-white/90"
                      : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
                  }`}
                >
                  اطلبي هاد الطقم
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <p className="text-white/60 text-sm">
            الدفع عند الاستلام • توصيل 2–4 أيام • إرجاع مجاني
          </p>
        </div>
      </div>
    </section>
  );
}

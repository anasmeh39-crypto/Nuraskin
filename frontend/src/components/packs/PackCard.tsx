"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";
import { Bundle, CartItem } from "@/types";
import { PRODUCTS_MAP } from "@/config/products";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart } from "@/lib/tracking";

interface PackCardProps {
  bundle: Bundle;
  cta: string;
  positioning?: string;
  featured?: boolean;
}

export function addBundleToCart(bundle: Bundle, addItem: (item: Omit<CartItem, "quantity">) => void) {
  const unitPrice = Math.floor(bundle.price / bundle.products.length);
  const remainder = bundle.price - unitPrice * bundle.products.length;

  const cartItems: CartItem[] = bundle.products.map((slug, index) => {
    const product = PRODUCTS_MAP[slug];
    const allocatedPrice = unitPrice + (index === 0 ? remainder : 0);
    const item = {
      cartKey: `${bundle.id}:${slug}`,
      slug,
      name_ar: product?.name_ar || slug,
      price: allocatedPrice,
      image: product?.image || "",
      quantity: 1,
      compareAtPrice: product?.price,
      bundleName: bundle.name_ar,
      discountAmount: Math.max((product?.price ?? 0) - allocatedPrice, 0),
    };

    if (product) {
      addItem({
        cartKey: item.cartKey,
        slug: product.slug,
        name_ar: product.name_ar,
        price: allocatedPrice,
        image: product.image,
        compareAtPrice: product.price,
        bundleName: bundle.name_ar,
        discountAmount: item.discountAmount,
      });
    }

    return item;
  });

  trackAddToCart(cartItems, bundle.price, generateEventId());
}

export function PackCard({ bundle, cta, positioning, featured = false }: PackCardProps) {
  const { addItem } = useCartStore();
  const products = bundle.products.map((slug) => PRODUCTS_MAP[slug]).filter(Boolean);

  return (
    <article
      className={`relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 hover:-translate-y-1 ${
        featured
          ? "border-gold/40 bg-gradient-to-br from-[#3D2C32] via-[#46313A] to-[#7B5260] text-white shadow-[0_28px_80px_rgba(61,44,50,0.28)]"
          : "border-rose-soft/25 bg-white text-[#3A222C] shadow-rose-sm"
      }`}
    >
      <div className={`absolute start-6 top-0 rounded-b-2xl px-4 py-1.5 text-[11px] font-bold ${featured ? "bg-gold text-[#3A222C]" : "bg-rose-blush text-rose-deep"}`}>
        {bundle.tag}
      </div>

      <div className={`mb-5 mt-6 flex aspect-[4/3] items-center justify-center rounded-[1.6rem] border ${
        featured ? "border-white/15 bg-white/8" : "border-rose-soft/20 bg-ivory"
      }`}>
        <div className="relative grid grid-cols-4 items-end gap-2">
          {products.map((product, index) => (
            <div
              key={product!.slug}
              className={`w-11 rounded-[1rem] border shadow-ivory-sm sm:w-14 ${
                featured ? "border-white/20 bg-white/16" : "border-rose-soft/30 bg-white/80"
              }`}
              style={{ height: `${86 + ((index % 3) * 16)}px` }}
              aria-label={product!.name_ar}
            >
              <div className={`mx-auto mt-4 h-7 w-7 rounded-full border ${featured ? "border-gold/45 bg-white/10" : "border-rose-deep/20 bg-rose-blush/60"}`} />
              <div className={`mx-auto mt-4 h-1.5 w-7 rounded-full ${featured ? "bg-white/25" : "bg-rose-soft/30"}`} />
              <div className={`mx-auto mt-1.5 h-1.5 w-8 rounded-full ${featured ? "bg-white/18" : "bg-rose-soft/20"}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className={`text-2xl font-black leading-tight ${featured ? "text-white" : "text-[#3A222C]"}`}>
            {bundle.name_ar}
          </h2>
          {positioning && (
            <p className={`mt-2 text-sm leading-7 ${featured ? "text-white/78" : "text-[#6B5555]"}`}>
              {positioning}
            </p>
          )}
        </div>

        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product!.slug} className={`flex items-start gap-2 text-sm leading-6 ${featured ? "text-white/86" : "text-[#5C4A4A]"}`}>
              <Check className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={2.1} />
              <span>{product!.name_ar}</span>
            </li>
          ))}
        </ul>

        <div className={`rounded-3xl border p-4 ${featured ? "border-white/15 bg-white/8" : "border-rose-soft/20 bg-ivory"}`}>
          <p className={`text-sm ${featured ? "text-white/72" : "text-[#7A6560]"}`}>
            القيمة الكاملة: <span className="line-through">{bundle.compareAtPrice} درهم</span>
          </p>
          <div className="mt-1 flex items-end justify-between gap-3">
            <p className={`text-3xl font-black ${featured ? "text-white" : "text-rose-deep"}`}>
              {bundle.price} <span className="text-sm font-bold">درهم</span>
            </p>
            <p className={`rounded-full px-3 py-1 text-xs font-bold ${featured ? "bg-white/12 text-gold-light" : "bg-emerald-50 text-emerald-800"}`}>
              وفّري {bundle.saving} درهم
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => addBundleToCart(bundle, addItem)}
          className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-extrabold transition active:scale-[0.98] ${
            featured
              ? "bg-white text-[#3D2C32] shadow-lg hover:bg-gold-light"
              : "bg-rose-deep text-white shadow-rose-md hover:bg-[#774956]"
          }`}
        >
          <Sparkles className="h-4 w-4" strokeWidth={1.5} />
          {cta}
        </button>
      </div>
    </article>
  );
}

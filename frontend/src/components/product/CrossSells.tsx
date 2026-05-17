"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS_MAP } from "@/config/products";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart } from "@/lib/tracking";
import { CartItem } from "@/types";

interface CrossSellsProps {
  currentSlug: string;
  slugs: string[];
}

export function CrossSells({ currentSlug, slugs }: CrossSellsProps) {
  const { addItem, items } = useCartStore();

  const products = slugs
    .map((s) => PRODUCTS_MAP[s])
    .filter((p) => p && p.slug !== currentSlug);

  if (products.length === 0) return null;

  const handleAdd = (p: NonNullable<typeof products[0]>) => {
    addItem({ slug: p.slug, name_ar: p.name_ar, price: p.price, image: p.image });
    const newItems: CartItem[] = [...items, { slug: p.slug, name_ar: p.name_ar, price: p.price, image: p.image, quantity: 1 }];
    const total = newItems.reduce((s, i) => s + i.price * i.quantity, 0);
    trackAddToCart(newItems, total, generateEventId());
  };

  return (
    <section className="py-12 border-t border-border">
      <div className="container-wide">
        <h2 className="text-xl font-bold text-brand-deep mb-6">
          أكملي روتينك معه
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {products.map((p) => (
            <div
              key={p!.slug}
              className="flex gap-4 bg-cream rounded-3xl p-4 items-center"
            >
              <Link href={`/products/${p!.slug}`} className="shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden">
                  <PlaceholderImage label={p!.name_ar} className="w-full h-full" />
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${p!.slug}`}>
                  <h3 className="font-bold text-brand-deep text-sm leading-snug">
                    {p!.name_ar}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{p!.tagline_ar}</p>
                  <p className="font-bold text-brand-deep mt-1">
                    {p!.formattedPrice}
                  </p>
                </Link>
              </div>
              <button
                onClick={() => handleAdd(p!)}
                className="shrink-0 text-sm bg-brand-deep text-white px-4 py-2 rounded-full hover:bg-brand-mid transition-colors"
              >
                + أضيفي
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

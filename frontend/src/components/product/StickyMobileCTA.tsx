"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import { Product } from "@/types";
import { generateEventId, trackAddToCart } from "@/lib/tracking";

interface StickyMobileCTAProps {
  product: Product;
}

export function StickyMobileCTA({ product }: StickyMobileCTAProps) {
  const { addItem, items, isDrawerOpen } = useCartStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdd = () => {
    addItem({
      slug: product.slug,
      name_ar: product.name_ar,
      price: product.price,
      image: product.image,
    });

    const newItems = [...items, { slug: product.slug, name_ar: product.name_ar, price: product.price, image: product.image, quantity: 1 }];
    const total = newItems.reduce((s, i) => s + i.price * i.quantity, 0);
    trackAddToCart(newItems, total, generateEventId());
  };

  if (!visible || isDrawerOpen) return null;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-border px-4 py-3 safe-area-pb">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-brand-deep font-bold text-sm truncate">
            {product.name_ar}
          </p>
          <p className="text-gray-500 text-xs">{product.tagline_ar}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-bold text-brand-deep text-lg">
            {product.formattedPrice}
          </span>
          <button
            onClick={handleAdd}
            className="btn-primary text-sm px-5 py-3"
          >
            أضيفي للسلة
          </button>
        </div>
      </div>
    </div>
  );
}

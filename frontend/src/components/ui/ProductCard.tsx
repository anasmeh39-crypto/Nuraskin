"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { PlaceholderImage } from "./PlaceholderImage";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart } from "@/lib/tracking";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
  badge?: string;
}

export function ProductCard({ product, showBadge, badge }: ProductCardProps) {
  const { addItem, items, getTotal } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      slug: product.slug,
      name_ar: product.name_ar,
      price: product.price,
      image: product.image,
    });

    const updatedItems = [...items, { slug: product.slug, name_ar: product.name_ar, price: product.price, image: product.image, quantity: 1 }];
    const total = updatedItems.reduce((s, i) => s + i.price * i.quantity, 0);
    trackAddToCart(updatedItems, total, generateEventId());
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white border border-border rounded-3xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="relative">
          <PlaceholderImage
            label={product.name_ar}
            aspectRatio="square"
            className="w-full"
          />
          {showBadge && badge && (
            <span className="absolute top-3 start-3 badge-gold text-xs font-semibold">
              {badge}
            </span>
          )}
          <div className="absolute top-3 end-3 badge-green text-xs">
            <span>COD</span>
          </div>
        </div>

        <div className="p-5">
          <p className="text-xs text-gray-500 mb-1">{product.heroIngredient}</p>
          <h3 className="font-bold text-brand-deep text-lg leading-snug">
            {product.name_ar}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{product.tagline_ar}</p>

          <div className="flex items-center justify-between mt-4 gap-3">
            <span className="text-xl font-bold text-brand-deep">
              {product.formattedPrice}
            </span>
            <button
              onClick={handleAddToCart}
              className="btn-primary text-sm px-5 py-2.5 shrink-0"
            >
              أضيفي للسلة
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

"use client";

import React from "react";
import { Product } from "@/types";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart, trackViewContent } from "@/lib/tracking";
import { useEffect } from "react";
import { calculateShipping } from "@/config/products";

interface Props {
  product: Product;
}

export function ProductHeroSection({ product }: Props) {
  const { addItem, items } = useCartStore();

  useEffect(() => {
    trackViewContent(product, generateEventId());
  }, [product]);

  const handleAddToCart = () => {
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

  const avgRating =
    product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;

  return (
    <section className="bg-cream py-10 md:py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="md:sticky md:top-24">
            <div className="rounded-4xl overflow-hidden max-w-md mx-auto">
              <PlaceholderImage
                label={product.name_ar}
                aspectRatio="square"
                className="w-full"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-light text-brand-deep text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              {product.heroIngredient}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-brand-deep leading-tight mb-2">
              {product.name_ar}
            </h1>
            <p className="text-lg text-gray-500 mb-4">{product.tagline_ar}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <StarRating rating={Math.round(avgRating)} size="md" />
              <span className="text-sm text-gray-500">
                {avgRating.toFixed(1)} ({product.reviews.length} تقييم)
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description_ar}
            </p>

            {/* Format info */}
            <div className="flex gap-4 mb-6">
              <div className="bg-white border border-border rounded-xl px-4 py-2 text-sm text-center">
                <div className="text-xs text-gray-400">النوع</div>
                <div className="font-medium text-brand-deep">{product.format}</div>
              </div>
              <div className="bg-white border border-border rounded-xl px-4 py-2 text-sm text-center">
                <div className="text-xs text-gray-400">الحجم</div>
                <div className="font-medium text-brand-deep font-sans">{product.volume}</div>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="bg-white border border-border rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-brand-deep">
                    {product.formattedPrice}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {calculateShipping(product.price) === 0
                      ? "الشحن مجاني"
                      : "الشحن 30 درهم — مجاني عند 300+"}
                  </div>
                </div>
                <span className="badge-green text-sm">COD</span>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={handleAddToCart}
              >
                أضيفي للسلة
              </Button>

              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <span>🔒 الدفع عند الاستلام</span>
                <span>•</span>
                <span>🔄 إرجاع مجاني</span>
                <span>•</span>
                <span>🚚 توصيل 2–4 أيام</span>
              </div>
            </div>

            {/* Problem framing */}
            <div className="mt-6 p-5 bg-amber-50 border border-amber-100 rounded-3xl">
              <p className="text-sm font-semibold text-amber-900 mb-2">
                واش عندك هاد المشاكل؟
              </p>
              <div className="flex flex-wrap gap-2">
                {product.concerns.map((c) => (
                  <span
                    key={c}
                    className="text-xs bg-white text-amber-800 px-3 py-1 rounded-full border border-amber-100"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

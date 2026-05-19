"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, FlaskConical, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Product } from "@/types";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart, trackViewContent } from "@/lib/tracking";
import { useEffect } from "react";

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
      compareAtPrice: product.compareAtPrice,
      discountAmount: product.compareAtPrice - product.price,
    });
    const newItems = [...items, { slug: product.slug, name_ar: product.name_ar, price: product.price, image: product.image, quantity: 1 }];
    const total = newItems.reduce((s, i) => s + i.price * i.quantity, 0);
    trackAddToCart(newItems, total, generateEventId());
  };

  const avgRating =
    product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;

  return (
    <section className="bg-[linear-gradient(135deg,#fffaf1_0%,#f7dde4_55%,#fffdf9_100%)] py-10 md:py-18">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="md:sticky md:top-24"
          >
            <div className="relative mx-auto max-w-md rounded-[2.5rem] border border-white/70 bg-white/60 p-3 soft-shadow">
              <PlaceholderImage
                label={product.name_ar}
                aspectRatio="square"
                className="w-full rounded-[2rem]"
              />
              <div className="absolute -bottom-4 start-6 rounded-2xl border border-border bg-white/90 px-4 py-3 text-xs text-brand-deep soft-shadow">
                تغليف أنيق · تجربة فاخرة
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          >
            <div className="luxury-kicker mb-4">
              <FlaskConical className="h-4 w-4 text-gold" strokeWidth={1.5} />
              {product.heroIngredient}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-brand-deep leading-tight mb-3">
              {product.name_ar}
            </h1>
            <p className="text-xl text-brand-mid mb-4">{product.tagline_ar}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <StarRating rating={Math.round(avgRating)} size="md" />
              <span className="text-sm text-gray-500">
                {avgRating.toFixed(1)} ({product.reviews.length} تقييم)
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-8 mb-6 max-w-xl">
              {product.description_ar}
            </p>

            <div className="flex gap-4 mb-6">
              <div className="premium-card rounded-2xl px-5 py-3 text-sm text-center">
                <div className="text-xs text-gray-400">النوع</div>
                <div className="font-medium text-brand-deep">{product.format}</div>
              </div>
              <div className="premium-card rounded-2xl px-5 py-3 text-sm text-center">
                <div className="text-xs text-gray-400">الحجم</div>
                <div className="font-medium text-brand-deep font-sans">{product.volume}</div>
              </div>
            </div>

            <div className="premium-card rounded-[2rem] p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <button className="rounded-2xl border border-brand-mid bg-brand-light px-4 py-3 text-sm font-semibold text-brand-deep">
                  عبوة واحدة
                </button>
                <button className="rounded-2xl border border-border bg-white px-4 py-3 text-sm font-semibold text-gray-500">
                  ضمن الروتين الكامل
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-brand-deep">
                    {product.formattedPrice}
                  </div>
                  <div className="text-xs font-semibold text-gray-400 line-through">
                    بدل {product.formattedCompareAtPrice}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    توصيل مجاني لجميع أنحاء المغرب
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-sm font-semibold text-brand-deep">
                  <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden />
                  الدفع عند الاستلام
                </span>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={handleAddToCart}
              >
                أضيفي للسلة
              </Button>

              <div className="grid gap-2 text-xs text-gray-500 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, text: "الدفع عند الاستلام" },
                  { icon: PackageCheck, text: "تغليف آمن" },
                  { icon: Truck, text: "توصيل مجاني لجميع أنحاء المغرب" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <span key={item.text} className="flex items-center justify-center gap-1.5 rounded-full bg-cream px-3 py-2">
                      <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                      {item.text}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Problem framing */}
            <div className="mt-6 p-5 bg-white/60 border border-border rounded-3xl">
              <p className="text-sm font-semibold text-amber-900 mb-2">
                هل تعانين من هذه المشاكل؟
              </p>
              <div className="flex flex-wrap gap-2">
                {product.concerns.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 text-xs bg-white text-brand-deep px-3 py-1 rounded-full border border-border"
                  >
                    <Check className="h-3 w-3 text-gold" strokeWidth={1.8} />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

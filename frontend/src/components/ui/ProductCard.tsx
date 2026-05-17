"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Star } from "lucide-react";
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
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="overflow-hidden rounded-[2rem] border border-rose-soft/25 bg-white p-3 shadow-rose-sm"
      >
        <div className="relative overflow-hidden rounded-[1.6rem]">
          <PlaceholderImage
            label={product.name_ar}
            aspectRatio="square"
            className="w-full"
          />
          {showBadge && badge && (
            <span className="absolute top-4 start-4 badge-gold text-xs font-semibold">
              {badge}
            </span>
          )}
          <div className="absolute top-4 end-4 inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/85 px-3 py-1 text-xs font-semibold text-rose-deep backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-rose-mid" strokeWidth={1.5} />
            <span>الدفع عند الاستلام</span>
          </div>
        </div>

        <div className="p-4 md:p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold text-rose-mid">{product.heroIngredient}</p>
            <div className="flex items-center gap-1 text-xs text-gold">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-3 w-3 fill-current" strokeWidth={1.2} />
              ))}
            </div>
          </div>
          <h3 className="font-bold text-[#3A222C] text-xl leading-snug">
            {product.name_ar}
          </h3>
          <p className="mt-2 min-h-[42px] text-sm leading-7 text-gray-500">{product.tagline_ar}</p>

          <div className="mt-5 rounded-2xl bg-rose-blush p-3">
            <p className="text-xs text-[#6B5555]">توصيل داخل المغرب مع تأكيد هاتفي قبل الإرسال</p>
          </div>

          <div className="flex items-center justify-between mt-4 gap-3">
            <span className="text-2xl font-bold text-rose-deep">
              {product.formattedPrice}
            </span>
            <button
              onClick={handleAddToCart}
              className="rounded-full bg-rose-deep px-5 py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 shrink-0"
            >
              أضيفي للسلة
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { BRAND_ASSETS } from "@/config/brand";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart } from "@/lib/tracking";

interface Props {
  product: Product;
}

export function StickyMobileCTAElite({ product }: Props) {
  const [visible, setVisible] = useState(false);
  const { addItem } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdd = () => {
    addItem({ slug: product.slug, name_ar: product.name_ar, price: product.price, image: product.image });
    trackAddToCart(
      [{ slug: product.slug, name_ar: product.name_ar, price: product.price, image: product.image, quantity: 1 }],
      product.price,
      generateEventId()
    );
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="fixed bottom-0 inset-x-0 z-40 md:hidden"
        >
          <div className="border-t border-nura-border bg-nura-cream/95 px-4 pb-safe-area-bottom pt-4 backdrop-blur-md shadow-luxury">
            <div className="flex items-center gap-3">
              <Link href="/" className="dir-ltr shrink-0 rounded-2xl border border-nura-border bg-white p-1.5 shadow-ivory-sm" aria-label="NURA SKIN">
                <img src={BRAND_ASSETS.icon} alt="" width={32} height={32} className="h-8 w-8" />
              </Link>
              {/* Product info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#2C1810] truncate">{product.name_ar}</p>
                <p className="text-[10px] text-[#9B8A8A]">الدفع عند الاستلام</p>
              </div>

              {/* Price */}
              <div className="text-center shrink-0">
                <p className="font-bold text-rose-deep text-lg">{product.price}</p>
                <p className="text-[10px] text-rose-mid">درهم</p>
              </div>

              {/* CTA */}
              <button
                onClick={handleAdd}
                className="bg-rose-deep text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-rose-md hover:opacity-90 active:scale-95 transition-all shrink-0"
              >
                أضيفي للسلة
              </button>
            </div>

            {/* Trust microcopy */}
            <p className="text-center text-[10px] text-[#9B8A8A] mt-2">
              توصيل 2–4 أيام — إرجاع مجاني 14 يوم
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

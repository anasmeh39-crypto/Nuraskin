"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { PRODUCTS_MAP } from "@/config/products";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart } from "@/lib/tracking";
import { StarRating } from "@/components/ui/StarRating";
import { Sparkles } from "lucide-react";

interface Props { product: Product }

export function CrossSellsElite({ product }: Props) {
  const { addItem } = useCartStore();

  const crossSellProducts = product.crossSells
    .map((slug) => PRODUCTS_MAP[slug])
    .filter(Boolean);

  if (!crossSellProducts.length) return null;

  const handleAdd = (p: Product) => {
    addItem({
      slug: p.slug,
      name_ar: p.name_ar,
      price: p.price,
      image: p.image,
      compareAtPrice: p.compareAtPrice,
      discountAmount: p.compareAtPrice - p.price,
    });
    trackAddToCart(
      [{ slug: p.slug, name_ar: p.name_ar, price: p.price, image: p.image, quantity: 1 }],
      p.price,
      generateEventId()
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs text-rose-mid font-semibold tracking-wider uppercase mb-3">
            الروتين الكامل
          </p>
          <h2 className="section-heading text-[#2C1810]">أكملي روتينك</h2>
          <p className="text-[#6B5555] mt-3 max-w-md mx-auto text-sm leading-relaxed">
            {product.name_ar} خطوة مهمة وحدها، ومع المنتجات المكملة يصبح روتين العناية أكثر اكتمالًا وتوازنًا.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {crossSellProducts.map((p, i) => {
            if (!p) return null;
            const avgRating = p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length;

            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-ivory border border-border rounded-4xl p-6 flex gap-5 hover:shadow-rose-sm transition-all group"
              >
                {/* Image placeholder */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-rose-blush to-rose-light flex items-center justify-center shrink-0">
                  <Sparkles className="h-7 w-7 text-rose-deep/65" strokeWidth={1.35} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-[#2C1810] text-sm leading-tight">{p.name_ar}</h3>
                    <span className="badge-rose text-[10px] shrink-0">{p.heroIngredient}</span>
                  </div>

                  <StarRating rating={Math.round(avgRating)} />

                  <div className="mt-2 space-y-0.5">
                    {p.benefits.slice(0, 2).map((b, j) => (
                      <p key={j} className="text-xs text-[#6B5555] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-rose-soft shrink-0" />
                        {b}
                      </p>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-rose-deep">{p.price} درهم</span>
                    <span className="text-xs font-semibold text-[#9B8A8A] line-through">بدل {p.compareAtPrice} درهم</span>
                    <button
                      onClick={() => handleAdd(p)}
                      className="text-xs font-bold text-white bg-rose-deep px-3 py-1.5 rounded-full hover:opacity-90 active:scale-95 transition-all"
                    >
                      أضيفي
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

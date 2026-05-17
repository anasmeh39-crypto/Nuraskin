import React from "react";
import { Product } from "@/types";
import { StarRating } from "@/components/ui/StarRating";

interface Props {
  product: Product;
}

export function ProductTestimonialsSection({ product }: Props) {
  const avgRating =
    product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;

  return (
    <section className="py-12 bg-white">
      <div className="container-wide">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-brand-deep">
            تقييمات العملاء
          </h2>
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(avgRating)} size="md" />
            <span className="font-bold text-brand-deep">{avgRating.toFixed(1)}</span>
            <span className="text-gray-400 text-sm">({product.reviews.length})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {product.reviews.map((review, i) => (
            <div key={i} className="p-5 bg-cream rounded-3xl">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-brand-deep">{review.name}</div>
                  <div className="text-xs text-gray-400">{review.city} · {review.date}</div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-brand-light rounded-3xl text-center">
          <p className="text-brand-deep text-sm font-semibold">
            تجارب واقعية لنتائج ملموسة — تُعبّر هذه التقييمات عن تجارب حقيقية لعميلات نورا سكين.
          </p>
        </div>
      </div>
    </section>
  );
}

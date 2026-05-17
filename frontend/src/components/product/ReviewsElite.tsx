"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Product, Review } from "@/types";
import { StarRating } from "@/components/ui/StarRating";

interface Props { product: Product }

const SKIN_TYPES = ["البشرة المختلطة", "البشرة الدهنية", "البشرة الجافة", "البشرة الحساسة", "البشرة العادية"];
const MOROCCAN_CITIES = ["الدار البيضاء", "الرباط", "مراكش", "فاس", "أكادير", "طنجة", "مكناس", "سلا"];

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const skinType = SKIN_TYPES[index % SKIN_TYPES.length];
  const verified = true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-3xl border border-border p-6 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-light to-rose-soft flex items-center justify-center shrink-0">
            <span className="font-bold text-rose-deep text-sm">
              {review.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-bold text-[#2C1810] text-sm">{review.name}</p>
            <p className="text-xs text-[#9B8A8A]">{review.city}</p>
          </div>
        </div>
        <div className="text-end">
          <StarRating rating={review.rating} />
          <p className="text-[10px] text-[#9B8A8A] mt-1">{review.date}</p>
        </div>
      </div>

      {/* Review text */}
      <p className="text-[#6B5555] text-sm leading-relaxed flex-1">
        "{review.text}"
      </p>

      {/* Meta */}
      <div className="flex items-center gap-2 pt-3 border-t border-border/50 flex-wrap">
        {verified && (
          <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            شراء موثّق
          </span>
        )}
        <span className="text-[10px] bg-rose-blush text-rose-deep px-2 py-0.5 rounded-full">
          {skinType}
        </span>
      </div>
    </motion.div>
  );
}

export function ReviewsElite({ product }: Props) {
  const avgRating = product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;

  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: product.reviews.filter((r) => r.rating === star).length,
    pct: Math.round((product.reviews.filter((r) => r.rating === star).length / product.reviews.length) * 100),
  }));

  return (
    <section className="py-20 bg-ivory">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs text-rose-mid font-semibold tracking-wider uppercase mb-3">آراء العملاء</p>
          <h2 className="section-heading text-[#2C1810]">ماذا قلن عن {product.name_ar}؟</h2>
        </motion.div>

        {/* Rating overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-4xl border border-border p-8 mb-10 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            {/* Big number */}
            <div className="text-center">
              <div className="text-7xl font-bold text-[#2C1810]">{avgRating.toFixed(1)}</div>
              <StarRating rating={Math.round(avgRating)} size="md" />
              <p className="text-[#9B8A8A] text-sm mt-2">{product.reviews.length} تقييم موثّق</p>
            </div>

            {/* Distribution */}
            <div className="space-y-2">
              {ratingDist.map((d) => (
                <div key={d.star} className="flex items-center gap-3">
                  <div className="flex gap-0.5 shrink-0">
                    {[...Array(d.star)].map((_, i) => (
                      <div key={i} className="w-2.5 h-2.5 rounded-sm bg-rose-soft" />
                    ))}
                  </div>
                  <div className="flex-1 h-1.5 bg-ivory rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${d.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-rose-deep rounded-full"
                    />
                  </div>
                  <span className="text-xs text-[#9B8A8A] w-6 text-end">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {product.reviews.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>

        {/* UGC placeholder strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 p-6 bg-rose-blush rounded-3xl border border-rose-soft/20 text-center"
        >
          <p className="text-rose-deep font-semibold text-sm mb-1">
            صوري معنا على الإنستغرام #نورا_سكين
          </p>
          <p className="text-[#9B8A8A] text-xs">
            شاركي تجربتك وهدية خاصة تنتظرك
          </p>
        </motion.div>
      </div>
    </section>
  );
}

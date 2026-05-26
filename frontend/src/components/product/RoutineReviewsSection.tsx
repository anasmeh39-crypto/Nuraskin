"use client";

import React from "react";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    stars: "★★★★★",
    name: "سلمى — الرباط",
    badge: "روتين الصباح الكامل",
    badgeClass: "bg-[#F2E0E5] text-[#5C2D3E]",
    quote: "بعد ثلاث أسابيع على الروتين الصباحي، وجهي بدا أكثر إشراقاً وتوازناً. مو غير النياسيناميد لوحدو — الروتين كله كيخدم.",
  },
  {
    stars: "★★★★★",
    name: "مريم — الدار البيضاء",
    badge: "الروتين الكامل",
    badgeClass: "bg-[#5C2D3E] text-white",
    quote: "كنت مترددة نشري الروتين الكامل. ولكن بعد أسبوعين، بشرتي ما كانتش هكذا من قبل. الليل والصباح — الفرق واضح.",
  },
  {
    stars: "★★★★☆",
    name: "نجوى — مراكش",
    badge: "روتين الليل",
    badgeClass: "bg-[#2D1525] text-white",
    quote: "السيروم محيط العين مع كريم الريتينول — الزوج المثالي. بدأت نشوف نتيجة بعد 10 أيام فقط. البشرة أنعم وهالات العين بدات تخف.",
  },
];

export function RoutineReviewsSection() {
  return (
    <section className="bg-[#F5F0EA] py-20" dir="rtl">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="luxury-kicker mx-auto mb-3 w-fit">تجارب حقيقية</p>
          <h2 className="section-heading text-[#5C2D3E]">شنو قالو اللي جربو الروتين</h2>
        </motion.div>

        <div className="flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="min-w-[84vw] snap-start rounded-[16px] border border-[#5C2D3E]/12 border-l-[3px] border-l-[#C4788A] bg-[#FEFCF9] p-5 shadow-[0_14px_38px_rgba(92,45,62,0.06)] md:min-w-0"
            >
              <div className="text-base tracking-wide text-[#E8A838]" aria-label={`${review.stars} نجوم`}>{review.stars}</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <p className="text-[13px] font-medium text-[#5C2D3E]">{review.name}</p>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${review.badgeClass}`}>{review.badge}</span>
              </div>
              <p className="mt-4 text-sm italic leading-8 text-[#3B2428]">"{review.quote}"</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

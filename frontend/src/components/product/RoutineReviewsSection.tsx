"use client";

import React from "react";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    stars: "★★★★★",
    name: "سلمى — الرباط",
    badge: "روتين الصباح الكامل",
    badgeClass: "bg-[#F2E0E5] text-[#5C2D3E]",
    quote: "من بعد 3 أسابيع على روتين الصباح، وجهي ولا منور ومتوازن بزاف. الصراحة ماشي غير النياسيناميد بوحدو اللي زوين — الروتين كامل كيكمّل بعضياتو وكيعطي إشراقة باينة.",
  },
  {
    stars: "★★★★★",
    name: "مريم — الدار البيضاء",
    badge: "الروتين الكامل",
    badgeClass: "bg-[#5C2D3E] text-white",
    quote: "فالأول كنت مترددة نزعم على الروتين الكامل. ولكن من بعد جوج سيمانات، بشرتي ولات فيها واحد النضارة عمري شفتها. فاش كتتبعي روتين الليل والصباح بجوج، الفرق كيكون باين بزاف.",
  },
  {
    stars: "★★★★☆",
    name: "نجوى — مراكش",
    badge: "روتين الليل",
    badgeClass: "bg-[#2D1525] text-white",
    quote: "سيروم محيط العين مع كريم الريتينول — أحسن كومبو جربت. بانت ليا النتيجة فـ 10 أيام الأولى! لابو ديالي ولات رطبة، والهالات بداو كيخفافو ومابقاش وجهي كايبان عيان.",
  },
];

export function RoutineReviewsSection() {
  return (
    <section className="bg-[#F5F0EA] py-12 sm:py-20" dir="rtl">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 sm:mb-10 max-w-2xl text-center"
        >
          <p className="luxury-kicker mx-auto mb-3 w-fit">تجارب حقيقية</p>
          <h2 className="section-heading text-[#5C2D3E]">شنو قالو اللي جربو الروتين</h2>
        </motion.div>

        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:gap-4">
          {REVIEWS.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="min-w-[88vw] shrink-0 snap-start rounded-[20px] border border-[#5C2D3E]/10 border-r-[3px] border-r-[#C4788A] bg-[#FEFCF9] p-5 shadow-[0_8px_32px_rgba(92,45,62,0.08)] md:min-w-0"
            >
              {/* Stars */}
              <div className="text-[18px] tracking-wide text-[#E8A838]" aria-label={`${review.stars} نجوم`}>
                {review.stars}
              </div>
              {/* Name + badge */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-[#2C1810]">{review.name}</p>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${review.badgeClass}`}>{review.badge}</span>
              </div>
              {/* Quote */}
              <p className="mt-3 text-[13px] italic leading-7 text-[#3B2428]">
                &ldquo;{review.quote}&rdquo;
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const REVIEWS = [
  {
    rating: 5,
    name: "سلمى",
    city: "الرباط",
    badge: "روتين الصباح الكامل",
    badgeClass: "bg-[#F2E0E5] text-[#5C2D3E]",
    quote:
      "من بعد 3 أسابيع على روتين الصباح، وجهي ولا منور ومتوازن بزاف. الصراحة ماشي غير النياسيناميد بوحدو اللي زوين — الروتين كامل كيكمّل بعضياتو وكيعطي إشراقة باينة.",
  },
  {
    rating: 5,
    name: "مريم",
    city: "الدار البيضاء",
    badge: "الروتين الكامل",
    badgeClass: "bg-[#5C2D3E] text-white",
    quote:
      "فالأول كنت مترددة نزعم على الروتين الكامل. ولكن من بعد جوج سيمانات، بشرتي ولات فيها واحد النضارة عمري شفتها. فاش كتتبعي روتين الليل والصباح بجوج، الفرق كيكون باين بزاف.",
  },
  {
    rating: 4,
    name: "نجوى",
    city: "مراكش",
    badge: "روتين الليل",
    badgeClass: "bg-[#2D1525] text-white",
    quote:
      "سيروم محيط العين مع كريم الريتينول — أحسن كومبو جربت. بانت ليا النتيجة فـ 10 أيام الأولى! لابو ديالي ولات رطبة، والهالات بداو كيخفافو ومابقاش وجهي كايبان عيان.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} من 5 نجوم`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`h-3.5 w-3.5 ${s <= rating ? "text-[#E8A838]" : "text-[#E8A838]/22"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function RoutineReviewsSection() {
  return (
    <section className="bg-[#F5F0EA] py-12 sm:py-16" dir="rtl">
      <div className="container-wide">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <p className="luxury-kicker mx-auto mb-3 w-fit">تجارب حقيقية</p>
          <h2 className="section-heading text-[#5C2D3E]">شنو قالو اللي جربو الروتين</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[#8C6E73]">
            آراء حقيقية من بشرة حقيقية — بدون تعديل.
          </p>
        </motion.div>

        {/* ── Cards — stacked on mobile, 3-col on desktop ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="flex flex-col rounded-[1.25rem] border border-[#EBE0E4] bg-white p-5 shadow-sm"
            >
              {/* Top row: stars + badge */}
              <div className="flex items-center justify-between gap-2">
                <Stars rating={review.rating} />
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${review.badgeClass}`}>
                  {review.badge}
                </span>
              </div>

              {/* Decorative open-quote */}
              <p className="mt-3 text-[2.8rem] leading-none text-[#C4788A]/18 font-black" aria-hidden>
                ❝
              </p>

              {/* Quote body */}
              <p className="mt-0.5 flex-1 text-[13px] leading-[1.85] text-[#3B2428]">
                {review.quote}
              </p>

              {/* Reviewer */}
              <div className="mt-4 flex items-center gap-3 border-t border-[#F0E8EA] pt-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F2E0E5] text-sm font-black text-[#5C2D3E]">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-[#2C1810]">{review.name}</p>
                  <p className="text-[11px] text-[#9B8A8A]">{review.city}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── Social proof footnote ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-7 text-center text-xs text-[#9B8A8A]"
        >
          +2,341 تقييم موثق &nbsp;·&nbsp; متوسط التقييم 4.8 / 5
        </motion.p>

      </div>
    </section>
  );
}

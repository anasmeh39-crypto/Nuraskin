"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product, KeyResult } from "@/types";

// ── Icons ─────────────────────────────────────────────────────────────────────

const ResultIcon = ({ type }: { type: KeyResult["icon"] }) => {
  const icons: Record<KeyResult["icon"], React.ReactNode> = {
    smooth: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    glow: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    firm: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    hydrate: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918" />
      </svg>
    ),
    calm: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    tone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  };
  return <>{icons[type]}</>;
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1}
    className="w-4 h-4"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function avgRating(reviews: Product["reviews"]) {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

function scrollToOffer() {
  const el = document.getElementById("ritual-selector");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Main section ──────────────────────────────────────────────────────────────

interface Props {
  product: Product;
  bundlePrice?: number;
  bundleOriginalPrice?: number;
  bundleLabel?: string;
}

export function WhyNuraSkinSection({
  product,
  bundlePrice = 649,
  bundleOriginalPrice = 1046,
  bundleLabel = "الروتين الكامل — 4 منتجات",
}: Props) {
  const rating = avgRating(product.reviews);
  const displayReviews = product.reviews.slice(0, 3);

  return (
    <section className="bg-[#1E0F14] py-20 overflow-hidden" dir="rtl">
      <div className="container-wide space-y-16">

        {/* ── 1. Heading ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs text-rose-soft font-semibold tracking-wider uppercase mb-3">
            فلسفة التركيبة
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            علاش نوراسكين؟
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto">
            ما كنخبيوش شي — كل مكوّن عندو اسمو ودوره. شفافية كاملة باش تعرفي
            بالضبط شنو كتحطي على بشرتك.
          </p>
        </motion.div>

        {/* ── 2. Ingredients grid ───────────────────────────────────────── */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white font-semibold text-base mb-5 text-center sm:text-right"
          >
            المكونات الفعّالة
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.ingredients.map((ing, i) => (
              <motion.div
                key={ing.name_en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-rose-deep/20 flex flex-col items-center justify-center text-center">
                  <span className="text-rose-soft font-bold text-xs leading-tight">
                    {ing.percent ?? "—"}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm">{ing.name_ar}</p>
                  <p className="text-white/35 text-[10px] mb-1">{ing.name_en}</p>
                  <p className="text-white/55 text-xs leading-relaxed">{ing.description_ar}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-white/25 text-[11px] text-center mt-4">
            التركيبة الكاملة متاحة عند الطلب — ما عندنا ما نخبيوه.
          </p>
        </div>

        {/* ── 3. Results row ────────────────────────────────────────────── */}
        {product.keyResults && product.keyResults.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-semibold text-base mb-5 text-center sm:text-right"
            >
              النتائج اللي كتتوقعيها
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {product.keyResults.map((result, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-rose-deep/25 text-rose-soft flex items-center justify-center">
                    <ResultIcon type={result.icon} />
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{result.text}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-white/25 text-[11px] text-center mt-4">
              النتائج كتختلف من شخص لآخر. نوراسكين منتجات تجميلية، ليست أدوية.
            </p>
          </div>
        )}

        {/* ── 4. Reviews block ──────────────────────────────────────────── */}
        {displayReviews.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6"
            >
              <div>
                <h3 className="text-white font-semibold text-base mb-1">
                  آراء الزبائن
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex text-rose-soft">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon key={s} filled={s <= Math.round(rating)} />
                    ))}
                  </div>
                  <span className="text-white/60 text-xs">
                    {rating.toFixed(1)} / 5 — {product.reviews.length} تقييم
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {displayReviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-3 bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                  <div className="flex text-rose-soft">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon key={s} filled={s <= review.rating} />
                    ))}
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed flex-1">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                    <div>
                      <p className="text-white text-xs font-semibold">{review.name}</p>
                      <p className="text-white/40 text-[10px]">{review.city}</p>
                    </div>
                    <span className="text-[10px] text-rose-soft bg-rose-deep/20 rounded-full px-2 py-0.5">
                      مشتري حقيقي ✓
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── 5. Bundle card ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-rose-deep/40 bg-gradient-to-br from-rose-deep/20 to-white/5 p-7 sm:p-9 text-center"
        >
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-rose-soft bg-rose-deep/30 rounded-full px-3 py-1 mb-4">
            أكبر توفير
          </span>
          <h3 className="text-white text-xl font-bold mb-2">{bundleLabel}</h3>
          <p className="text-white/50 text-sm mb-5">
            روتين الصباح والليل مجموعين — سيروم، كريم ليلي، واقي شمس، وسيروم العين
          </p>
          <div className="flex items-baseline justify-center gap-3 mb-6">
            <span className="text-4xl font-bold text-white">{bundlePrice} درهم</span>
            <span className="text-white/35 text-lg line-through">{bundleOriginalPrice} درهم</span>
          </div>
          <button
            onClick={scrollToOffer}
            className="w-full sm:w-auto bg-rose-deep hover:opacity-90 active:scale-95 transition-all text-white font-bold text-base px-10 py-4 rounded-2xl shadow-rose-md"
          >
            اختاري الروتين ديالك
          </button>
        </motion.div>

        {/* ── 6. CTA + trust badges ─────────────────────────────────────── */}
        <div className="space-y-5">
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={scrollToOffer}
            className="w-full bg-rose-deep hover:opacity-90 active:scale-[0.98] transition-all text-white font-bold text-lg py-5 rounded-2xl shadow-rose-lg"
          >
            اطلب دابا
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-3 text-center"
          >
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 mx-auto mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                ),
                label: "الدفع عند الاستلام",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 mx-auto mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                ),
                label: "توصيل 24–48 ساعة",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 mx-auto mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                label: "ضمان الرضا",
              },
            ].map(({ icon, label }, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl py-4 px-2">
                <div className="text-rose-soft">{icon}</div>
                <p className="text-white/70 text-[11px] font-medium">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

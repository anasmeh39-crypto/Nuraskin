"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product, KeyResult } from "@/types";
import { getProductPageOffers } from "@/config/products";
import { useCartStore } from "@/store/cart";

// ── Premium ingredient icons ───────────────────────────────────────────────────

const IngredientIcon = ({ slug }: { slug: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Bakuchiol: (
      // Leaf / botanical
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M16 28C16 28 6 22 6 13C6 8 10.5 4 16 4C21.5 4 26 8 26 13C26 22 16 28 16 28Z" stroke="#DEBEC6" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M16 28V14" stroke="#DEBEC6" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 18C16 18 11 15 10 10" stroke="#DEBEC6" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M16 14C16 14 20 12 22 8" stroke="#DEBEC6" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    Peptides: (
      // Chain / molecule links
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <circle cx="8" cy="16" r="3.5" stroke="#DEBEC6" strokeWidth="1.5"/>
        <circle cx="16" cy="10" r="3.5" stroke="#DEBEC6" strokeWidth="1.5"/>
        <circle cx="24" cy="16" r="3.5" stroke="#DEBEC6" strokeWidth="1.5"/>
        <circle cx="16" cy="22" r="3.5" stroke="#DEBEC6" strokeWidth="1.5"/>
        <line x1="11" y1="14.5" x2="13" y2="12" stroke="#DEBEC6" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="19" y1="12" x2="21" y2="14.5" stroke="#DEBEC6" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="21" y1="18" x2="19" y2="20" stroke="#DEBEC6" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="13" y1="20" x2="11" y2="17.5" stroke="#DEBEC6" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    "Shea Butter": (
      // Cream drop / butter
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M16 5L22 14C24.5 17.5 24 22 20.5 24.5C17 27 12 26 10 22.5C8 19 9.5 14.5 12 12L16 5Z" stroke="#DEBEC6" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 20C12 20 14 22 18 21" stroke="#DEBEC6" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    Squalane: (
      // Oil droplet with ripple
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M16 6L21 14.5C22.8 17.5 22 21.5 19 23.5C16 25.5 12 24.5 10.5 21.5C9 18.5 10.2 14.5 13 12.5L16 6Z" stroke="#DEBEC6" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 27C10 27 13 28.5 16 27.5" stroke="#DEBEC6" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M8 29C8 29 12 31 16 29.5" stroke="#DEBEC6" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  };

  return (
    <>{icons[slug] ?? (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <circle cx="16" cy="16" r="10" stroke="#DEBEC6" strokeWidth="1.5"/>
        <path d="M16 11V17M16 20V21" stroke="#DEBEC6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )}</>
  );
};

// ── Result icon (small, used as accent) ───────────────────────────────────────

const ResultAccentIcon = ({ type }: { type: KeyResult["icon"] }) => {
  const paths: Record<KeyResult["icon"], React.ReactNode> = {
    smooth: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />,
    glow: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />,
    firm: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />,
    hydrate: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-13v4m0 4h.01" />,
    calm: <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />,
    tone: <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
      {paths[type]}
    </svg>
  );
};

// ── Star ──────────────────────────────────────────────────────────────────────

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={0.8} className="w-4 h-4 text-yellow-400">
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

// ── Component ─────────────────────────────────────────────────────────────────

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
  const { addItem, openDrawer } = useCartStore();

  const addCompleteBundle = useCallback(() => {
    const offers = getProductPageOffers(product.slug);
    const completeOffer = offers.find((o) => o.tier === "complete");
    if (!completeOffer) { openDrawer(); return; }

    const unitPrice = Math.floor(completeOffer.price / completeOffer.products.length);
    const remainder = completeOffer.price - unitPrice * completeOffer.products.length;
    completeOffer.products.forEach((p, idx) => {
      addItem({
        slug: p.slug,
        name_ar: p.name_ar,
        price: unitPrice + (idx === 0 ? remainder : 0),
        image: p.image,
        compareAtPrice: p.compareAtPrice,
        bundleName: completeOffer.bundleName,
        discountAmount: Math.max(p.compareAtPrice - (unitPrice + (idx === 0 ? remainder : 0)), 0),
      });
    });
    openDrawer();
  }, [product.slug, addItem, openDrawer]);

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
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-rose-deep/40 transition-colors"
              >
                {/* Premium icon badge */}
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-deep/30 to-rose-deep/10 border border-rose-deep/20 flex flex-col items-center justify-center gap-0.5">
                  <IngredientIcon slug={ing.name_en} />
                  {ing.percent && (
                    <span className="text-rose-soft/70 font-mono text-[9px] leading-none">
                      {ing.percent}
                    </span>
                  )}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <p className="text-white font-semibold text-sm">{ing.name_ar}</p>
                  </div>
                  <p className="text-white/30 text-[10px] mb-2 font-mono tracking-wide">{ing.name_en}</p>
                  <p className="text-white/55 text-xs leading-relaxed">{ing.description_ar}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-white/25 text-[11px] text-center mt-4">
            التركيبة الكاملة متاحة عند الطلب — ما عندنا ما نخبيوه.
          </p>
        </div>

        {/* ── 3. Results — image-led cards ──────────────────────────────── */}
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
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  {/* Image */}
                  {result.image && (
                    <div className="relative w-full h-72 sm:h-64 overflow-hidden">
                      <Image
                        src={result.image}
                        alt={result.text}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Text */}
                  <div className="flex items-start gap-3 p-5">
                    <div className="shrink-0 w-8 h-8 rounded-xl bg-rose-deep/25 text-rose-soft flex items-center justify-center mt-0.5">
                      <ResultAccentIcon type={result.icon} />
                    </div>
                    <p className="text-white/85 text-sm leading-relaxed">{result.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-white/25 text-[11px] text-center mt-4">
              النتائج كتختلف من شخص لآخر. نوراسكين منتجات تجميلية، ليست أدوية.
            </p>
          </div>
        )}


        {/* ── 5. Bundle card ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-rose-deep/40 overflow-hidden bg-gradient-to-br from-rose-deep/20 to-white/5"
        >
          {/* Product lifestyle image — full width, taller on desktop */}
          <div className="relative w-full h-64 sm:h-80">
            <Image
              src="/images/bundles/complete-routine.jpg"
              alt="روتين نورا سكين الكامل — 4 منتجات"
              fill
              sizes="(max-width: 640px) 100vw, 900px"
              className="object-cover object-center"
              priority
            />
            {/* Subtle bottom fade into card content */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#2a1019]/80 to-transparent" />
            <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-rose-soft bg-[#1E0F14]/70 backdrop-blur-sm rounded-full px-3 py-1">
              أكبر توفير
            </span>
          </div>

          {/* Card content */}
          <div className="p-7 sm:p-9 text-center">
            <h3 className="text-white text-xl font-bold mb-2">{bundleLabel}</h3>
            <p className="text-white/50 text-sm mb-5">
              روتين الصباح والليل مجموعين — سيروم، كريم ليلي، واقي شمس، وسيروم العين
            </p>
            <div className="flex items-baseline justify-center gap-3">
              <span className="text-4xl font-bold text-white">{bundlePrice} درهم</span>
              <span className="text-white/35 text-lg line-through">{bundleOriginalPrice} درهم</span>
            </div>
          </div>
        </motion.div>

        {/* ── 6. CTA + trust badges ─────────────────────────────────────── */}
        <div className="space-y-5">
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={addCompleteBundle}
            className="w-full bg-rose-deep hover:opacity-90 active:scale-[0.98] transition-all text-white font-bold text-lg py-5 rounded-2xl shadow-rose-lg"
          >
            أريد روتين نورا سكين كامل
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

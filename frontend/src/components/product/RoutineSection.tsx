"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { Check, Droplets, Eye, Moon, Sparkles, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCTS, BUNDLES, PRODUCTS_MAP } from "@/config/products";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart } from "@/lib/tracking";
import { CartItem } from "@/types";

interface Props {
  currentSlug: string;
}

type RoutineStep = {
  time: string;
  label: string;
  desc: string;
  slug: string;
  Icon: LucideIcon;
};

const ROUTINE_STEPS: Record<string, RoutineStep[]> = {
  morning: [
    {
      time: "01",
      label: "المنظّف اللطيف",
      desc: "نظّفي البشرة بلطف لتجهيزها تماماً لاستقبال الخطوات التالية.",
      slug: "",
      Icon: Droplets,
    },
    {
      time: "02",
      label: "سيروم توازن وإشراقة البشرة بالنياسيناميد",
      desc: "قطرتان إلى الوجه بعد التنظيف — وزّعي بلطف على كامل الوجه.",
      slug: "nura-balance",
      Icon: Sparkles,
    },
    {
      time: "03",
      label: "سيروم نضارة محيط العين",
      desc: "كمية صغيرة حول محيط العين — بدون فرك؛ استخدمي الطرف الدائري للإصبع.",
      slug: "nura-eye-revive",
      Icon: Eye,
    },
    {
      time: "04",
      label: "واقي الشمس اليومي SPF 50",
      desc: "يوضع صباحًا كآخر خطوة في روتين العناية بالبشرة، قبل الخروج أو قبل المكياج.",
      slug: "nura-spf-50",
      Icon: Sun,
    },
  ],
  night: [
    {
      time: "01",
      label: "التنظيف المزدوج",
      desc: "أزيلي المكياج والشوائب خطوة بخطوة — البشرة النظيفة تستقبل المنتجات أفضل.",
      slug: "",
      Icon: Droplets,
    },
    {
      time: "02",
      label: "سيروم نضارة محيط العين",
      desc: "كمية صغيرة حول محيط العين — برفق ودون فرك.",
      slug: "nura-eye-revive",
      Icon: Eye,
    },
    {
      time: "03",
      label: "كريم التجديد الليلي للبشرة",
      desc: "طبقة أخيرة على الوجه والرقبة — استخدميه بعد السيروم إن وُجد.",
      slug: "nura-night-renewal",
      Icon: Moon,
    },
  ],
};

export function RoutineSection({ currentSlug }: Props) {
  const { addItem } = useCartStore();

  const handleBundleAdd = (slugs: string[], bundlePrice: number) => {
    const unitPrice = Math.floor(bundlePrice / slugs.length);
    const remainder = bundlePrice - unitPrice * slugs.length;

    slugs.forEach((slug, index) => {
      const p = PRODUCTS_MAP[slug];
      if (p) {
        addItem({
          slug: p.slug,
          name_ar: p.name_ar,
          price: unitPrice + (index === 0 ? remainder : 0),
          image: p.image,
        });
      }
    });
    const cartItems: CartItem[] = slugs.map((slug, index) => {
      const p = PRODUCTS_MAP[slug];
      return {
        slug,
        name_ar: p?.name_ar || slug,
        price: unitPrice + (index === 0 ? remainder : 0),
        image: "",
        quantity: 1,
      };
    });
    const total = cartItems.reduce((s, i) => s + i.price, 0);
    trackAddToCart(cartItems, total, generateEventId());
  };

  return (
    <section className="relative overflow-hidden bg-ivory py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-rose-soft/40 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-gold-light/25 blur-3xl" />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-rose-mid">روتين متكامل</p>
          <h2 className="section-heading text-[#2C1810]">أكملي روتينك — صباحاً وليلاً</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6B5555]">
            المنتجات مكمّلة لبعضها؛ الترتيب الصحيح والانتظام يعزّزان مظهر البشرة دون مبالغة.
          </p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {(["morning", "night"] as const).map((time) => (
            <motion.div
              key={time}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: time === "morning" ? 0 : 0.08 }}
              className={`relative rounded-[1.75rem] border bg-white p-6 shadow-[0_18px_50px_rgba(58,34,44,0.06)] md:p-8 ${
                time === "morning"
                  ? "border-amber-100/80 ring-1 ring-amber-50"
                  : "border-rose-soft/35 ring-1 ring-rose-blush/40"
              }`}
            >
              <div className="mb-8 flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-inner ${
                    time === "morning"
                      ? "bg-gradient-to-br from-amber-50 to-white text-amber-700"
                      : "bg-gradient-to-br from-rose-blush to-white text-rose-deep"
                  }`}
                >
                  {time === "morning" ? (
                    <Sun className="h-6 w-6" strokeWidth={1.35} aria-hidden />
                  ) : (
                    <Moon className="h-6 w-6" strokeWidth={1.35} aria-hidden />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2C1810]">
                    {time === "morning" ? "روتين الصباح" : "روتين الليل"}
                  </h3>
                  <p className="text-xs text-[#9B8A8A]">
                    {time === "morning" ? "حماية، إشراقة، استعداد للنهار" : "تنظيف عميق، تجديد، راحة قبل النوم"}
                  </p>
                </div>
              </div>

              <div className="relative space-y-0 ps-1">
                {ROUTINE_STEPS[time].map((step, i) => {
                  const StepIcon = step.Icon;
                  const isHere = step.slug === currentSlug;
                  const isLinked = Boolean(step.slug);
                  const isLast = i === ROUTINE_STEPS[time].length - 1;

                  return (
                    <div key={step.time} className="relative flex gap-4 pb-8 last:pb-0">
                      {!isLast && (
                        <span
                          className={`absolute end-[1.15rem] top-12 bottom-0 w-px ${
                            isLinked ? "bg-rose-soft/50" : "bg-border/90"
                          }`}
                          aria-hidden
                        />
                      )}

                      <div className="relative z-[1] flex shrink-0 flex-col items-center gap-1">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl border shadow-sm transition-colors ${
                            isHere
                              ? "border-rose-deep bg-rose-deep text-white"
                              : isLinked
                                ? "border-rose-soft/50 bg-rose-blush/70 text-rose-deep"
                                : "border-border bg-white text-[#9B8A8A]"
                          }`}
                        >
                          <StepIcon className="h-5 w-5" strokeWidth={1.35} aria-hidden />
                        </div>
                        <span
                          className={`text-[10px] font-black tabular-nums ${
                            isHere ? "text-rose-deep" : "text-[#9B8A8A]"
                          }`}
                        >
                          {step.time}
                        </span>
                      </div>

                      <div
                        className={`min-w-0 flex-1 rounded-2xl border px-4 py-3 transition-colors ${
                          isHere
                            ? "border-rose-deep/35 bg-gradient-to-br from-rose-blush to-white"
                            : isLinked
                              ? "border-transparent bg-ivory/90"
                              : "border-border/60 bg-white/60 opacity-75"
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <p className={`text-sm font-bold leading-snug ${isLinked ? "text-[#2C1810]" : "text-[#8A7878]"}`}>
                            {step.label}
                          </p>
                          {isHere && (
                            <span className="rounded-full bg-rose-deep px-2 py-0.5 text-[10px] font-bold text-white">
                              خطوتك الحالية
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#7A6560]">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bundles */}
        <div>
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">عروض الطقم</p>
            <h3 className="text-2xl font-bold text-[#2C1810] md:text-3xl">اكتملي روتينك — بقيمة أوضح</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#6B5555]">
              سعرة مقارنة بشراء القطع منفردة؛ مناسب إذا كنتِ تبنين نظاماً كاملاً.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {BUNDLES.map((bundle, idx) => {
              const bundleProducts = bundle.products.map((s) => PRODUCTS_MAP[s]).filter(Boolean);
              const isPopular = idx === 0;
              const listTotal = bundle.products.reduce((sum, slug) => {
                const p = PRODUCTS.find((x) => x.slug === slug);
                return sum + (p?.price ?? 0);
              }, 0);

              return (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`relative flex flex-col overflow-hidden rounded-[1.75rem] border p-6 transition-all hover:-translate-y-0.5 ${
                    isPopular
                      ? "border-gold/45 bg-gradient-to-b from-white via-rose-blush/25 to-gold-light/20 shadow-[0_22px_55px_rgba(139,74,90,0.12)] ring-2 ring-gold/25"
                      : "border-border bg-white shadow-[0_14px_40px_rgba(58,34,44,0.05)] hover:border-rose-soft/50"
                  }`}
                >
                  {bundle.tag && (
                    <div
                      className={`absolute -top-px start-6 rounded-b-xl px-4 py-1.5 text-[10px] font-bold tracking-wide text-white shadow-md ${
                        isPopular ? "bg-gradient-to-l from-brand-deep to-rose-deep" : "bg-brand-deep"
                      }`}
                    >
                      {bundle.tag}
                    </div>
                  )}

                  <h4 className={`mb-5 mt-4 text-lg font-bold ${isPopular ? "text-brand-deep" : "text-[#2C1810]"}`}>
                    {bundle.name_ar}
                  </h4>

                  <ul className="mb-6 flex-1 space-y-2.5">
                    {bundleProducts.map((p) => (
                      <li key={p!.slug} className="flex gap-2 text-sm text-[#5C4A4A]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2.2} aria-hidden />
                        <span className="leading-snug">
                          {p!.name_ar}
                          {p!.slug === currentSlug && (
                            <span className="me-2 rounded-md bg-rose-blush px-1.5 py-0.5 text-[10px] font-bold text-rose-deep">
                              مختارة
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto border-t border-border/60 pt-5">
                    <div className="mb-1 flex flex-wrap items-end gap-2">
                      <span className="text-3xl font-black text-rose-deep">{bundle.price}</span>
                      <span className="mb-1 text-sm font-semibold text-rose-mid">درهم</span>
                      {bundle.saving > 0 && listTotal > bundle.price && (
                        <>
                          <span className="mb-1 text-sm text-[#9B8A8A] line-through">{listTotal} درهم</span>
                          <span className="mb-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                            وفري {bundle.saving} درهم
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBundleAdd(bundle.products, bundle.price)}
                      className={`mt-4 w-full rounded-2xl py-3.5 text-sm font-bold transition-all active:scale-[0.99] ${
                        isPopular
                          ? "bg-brand-deep text-white shadow-lg shadow-brand-deep/20 hover:bg-brand-mid"
                          : "border border-rose-soft/40 bg-ivory text-rose-deep hover:bg-rose-blush"
                      }`}
                    >
                      أضيفي الطقم للسلة
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

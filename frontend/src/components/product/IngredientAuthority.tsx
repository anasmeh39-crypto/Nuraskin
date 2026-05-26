"use client";

import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Droplets,
  FlaskConical,
  Leaf,
  MoonStar,
  ScanEye,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";

type VisualTone = "hydration" | "gold" | "cream" | "green" | "shield" | "coffee" | "molecule" | "mineral" | "rose";

interface IngredientVisualSpec {
  tone: VisualTone;
  title: string;
  detail: string;
  highlight: string;
}

const INGREDIENT_ICON: Record<string, LucideIcon> = {
  "Niacinamide 10%": Sparkles,
  "Niacinamide 5%": Sparkles,
  "Zinc PCA": Shield,
  "Hyaluronic Acid": Droplets,
  Bakuchiol: Leaf,
  "Shea Butter": MoonStar,
  Squalane: Droplets,
  Peptides: BadgeCheck,
  Caffeine: Zap,
  "Vitamin K2": ScanEye,
};

function iconForIngredient(nameEn: string): LucideIcon {
  const direct = INGREDIENT_ICON[nameEn];
  if (direct) return direct;
  if (nameEn.includes("Niacinamide")) return Sparkles;
  if (nameEn.includes("Zinc")) return Shield;
  if (nameEn.includes("Hyaluronic")) return Droplets;
  if (nameEn.includes("Bakuchiol")) return Leaf;
  if (nameEn.includes("Shea")) return MoonStar;
  if (nameEn.includes("Squalane")) return Droplets;
  if (nameEn.includes("Peptide")) return BadgeCheck;
  if (nameEn.includes("Caffeine")) return Zap;
  if (nameEn.includes("Vitamin K")) return ScanEye;
  return FlaskConical;
}

function ingredientVisualFor(nameEn: string): IngredientVisualSpec {
  if (nameEn.includes("Tinosorb") || nameEn.includes("Uvinul") || nameEn.includes("Mexoryl") || nameEn.includes("SPF")) {
    return {
      tone: "shield",
      title: "UV Shield",
      detail: "broad spectrum",
      highlight: "from-[#F5E8C8]/85 via-white/35 to-[#D8A86D]/30",
    };
  }
  if (nameEn.includes("Caffeine")) {
    return {
      tone: "coffee",
      title: "Caffeine Extract",
      detail: "energizing eye care",
      highlight: "from-[#B98258]/55 via-[#F7DFCA]/30 to-white/30",
    };
  }
  if (nameEn.includes("Peptide")) {
    return {
      tone: "molecule",
      title: "Peptide Matrix",
      detail: "skin support",
      highlight: "from-[#E7D6F4]/55 via-white/35 to-[#C8A7D8]/25",
    };
  }
  if (nameEn.includes("Shea") || nameEn.includes("Panthenol")) {
    return {
      tone: "cream",
      title: "Cream Comfort",
      detail: "barrier care",
      highlight: "from-[#F6E8D9]/80 via-white/30 to-[#E0B98F]/25",
    };
  }
  if (nameEn.includes("Aloe")) {
    return {
      tone: "green",
      title: "Aloe Gel",
      detail: "calming hydration",
      highlight: "from-[#DDEEDB]/65 via-white/35 to-[#BFD8B8]/30",
    };
  }
  if (nameEn.includes("Hyaluronic") || nameEn.includes("Squalane")) {
    return {
      tone: "hydration",
      title: "Moisture Veil",
      detail: "soft hydration",
      highlight: "from-[#DDEAF4]/65 via-white/35 to-[#F7DECF]/30",
    };
  }
  if (nameEn.includes("Vitamin")) {
    return {
      tone: "gold",
      title: "Vitamin Glow",
      detail: "antioxidant care",
      highlight: "from-[#F7E3AE]/70 via-white/35 to-[#D7A86D]/30",
    };
  }
  if (nameEn.includes("Zinc")) {
    return {
      tone: "mineral",
      title: "Mineral Balance",
      detail: "clarifying support",
      highlight: "from-[#E6E2D8]/70 via-white/35 to-[#BFAE9A]/30",
    };
  }
  if (nameEn.includes("Bakuchiol") || nameEn.includes("Retinol")) {
    return {
      tone: "gold",
      title: "Night Renewal",
      detail: "soft glow",
      highlight: "from-[#F2D8A8]/70 via-white/30 to-[#D89776]/28",
    };
  }
  return {
    tone: "rose",
    title: "Active Blend",
    detail: "balanced formula",
    highlight: "from-rose-blush/75 via-white/35 to-gold-light/30",
  };
}

function IngredientVisual({ spec }: { spec: IngredientVisualSpec }) {
  const isMolecule = spec.tone === "molecule" || spec.tone === "shield";
  const isCream = spec.tone === "cream" || spec.tone === "gold";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className={`absolute -left-10 -top-12 h-72 w-72 rounded-full bg-gradient-to-br ${spec.highlight} blur-2xl`} />
      <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-rose-blush/40 blur-3xl" />
      <div className="absolute left-6 top-8 h-44 w-44 rounded-full border border-white/55 bg-white/20 shadow-[inset_0_1px_18px_rgba(255,255,255,0.65),0_22px_60px_rgba(139,74,90,0.08)] backdrop-blur-[2px]" />
      <div className="absolute left-14 top-16 h-16 w-16 rounded-full bg-white/55 shadow-[inset_0_1px_12px_rgba(255,255,255,0.9),0_16px_35px_rgba(139,74,90,0.08)]" />

      {isCream ? (
        <>
          <div className="absolute -left-4 bottom-14 h-20 w-60 rotate-[-9deg] rounded-[999px] bg-gradient-to-r from-white/85 via-[#F1D7C4]/65 to-white/35 shadow-[inset_0_2px_16px_rgba(255,255,255,0.75),0_22px_50px_rgba(168,112,83,0.12)]" />
          <div className="absolute left-28 bottom-24 h-8 w-24 rotate-[8deg] rounded-[999px] bg-white/55 blur-[1px]" />
        </>
      ) : (
        <>
          <div className="absolute left-12 bottom-16 h-24 w-24 rounded-full bg-white/50 shadow-[inset_0_2px_16px_rgba(255,255,255,0.8),0_20px_40px_rgba(139,74,90,0.08)]" />
          <div className="absolute left-32 bottom-24 h-9 w-9 rounded-full bg-white/45 shadow-[inset_0_1px_10px_rgba(255,255,255,0.85)]" />
        </>
      )}

      {isMolecule && (
        <div className="absolute left-16 top-24 h-32 w-36 opacity-45">
          <span className="absolute left-0 top-12 h-px w-32 rotate-12 bg-rose-deep/20" />
          <span className="absolute left-8 top-4 h-px w-28 rotate-[58deg] bg-rose-deep/16" />
          <span className="absolute left-16 top-20 h-px w-24 -rotate-[38deg] bg-rose-deep/18" />
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="absolute h-4 w-4 rounded-full border border-rose-deep/18 bg-white/60 shadow-sm"
              style={{
                left: `${[0, 42, 86, 118][i]}px`,
                top: `${[46, 2, 70, 30][i]}px`,
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute left-8 bottom-8 hidden rounded-2xl border border-white/60 bg-white/45 px-4 py-3 text-left shadow-[0_18px_45px_rgba(139,74,90,0.08)] backdrop-blur-md sm:block">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-mid/70">{spec.title}</p>
        <p className="mt-1 font-sans text-[11px] text-[#6B5555]/65">{spec.detail}</p>
      </div>
    </div>
  );
}

interface Props {
  product: Product;
}

export function IngredientAuthority({ product }: Props) {
  const [active, setActive] = useState(0);
  const ing = product.ingredients[active];
  const ActiveIcon = iconForIngredient(ing.name_en);
  const visualSpec = ingredientVisualFor(ing.name_en);

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="pointer-events-none absolute -right-24 top-32 h-80 w-80 rounded-full bg-rose-blush/35 blur-3xl" />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="mx-auto mb-5 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-soft/40 bg-rose-blush/60 px-3 py-1.5 text-[11px] font-semibold text-rose-deep shadow-sm">
              <FlaskConical className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} aria-hidden />
              تركيبة مدروسة
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold-light/70 px-3 py-1.5 text-[11px] font-semibold text-brand-deep">
              <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} aria-hidden />
              شفافية في المكوّنات
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-[#6B5555] shadow-sm">
              <BadgeCheck className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} aria-hidden />
              مناسبة للاستخدام اليومي
            </span>
          </div>

          <h2 className="section-heading text-[#2C1810]">ما الذي تحتويه التركيبة — ولماذا</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6B5555]">
            كل مكوّن اختير بعناية، ونقدمه بوضوح لأن معرفة ما تضعينه على بشرتك جزء من الثقة — دون مبالغة أو ادعاءات طبّية.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            {product.ingredients.map((ingredient, i) => {
              const RowIcon = iconForIngredient(ingredient.name_en);
              const on = active === i;
              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-[1.25rem] border p-5 text-right transition-all duration-200 ${
                    on
                      ? "border-rose-soft/80 bg-gradient-to-br from-rose-blush via-white to-gold-light/35 shadow-[0_18px_34px_rgba(139,74,90,0.11)]"
                      : "border-border bg-white shadow-[0_10px_25px_rgba(44,24,16,0.03)] hover:border-rose-soft/50 hover:bg-ivory hover:shadow-[0_16px_32px_rgba(139,74,90,0.07)]"
                  }`}
                >
                  <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-l from-transparent via-white/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 transition-all ${
                      on
                        ? "bg-white text-rose-deep shadow-[inset_0_1px_10px_rgba(255,255,255,0.85),0_10px_22px_rgba(139,74,90,0.12)] ring-rose-soft/25"
                        : "bg-gradient-to-br from-ivory to-white text-[#9B8A8A] ring-border/70 group-hover:text-rose-deep"
                    }`}
                  >
                    <RowIcon className="h-5 w-5" strokeWidth={1.4} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-base font-bold transition-colors ${on ? "text-rose-deep" : "text-[#2C1810]"}`}>
                        {ingredient.name_ar}
                      </span>
                      <span className="font-sans text-xs text-[#9B8A8A]">{ingredient.name_en}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-[#9B8A8A]">{ingredient.description_ar}</p>
                  </div>
                  <div className={`h-8 w-1 shrink-0 rounded-full transition-all ${on ? "bg-gradient-to-b from-rose-deep to-gold" : "bg-border"}`} />
                </motion.button>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                className="relative overflow-hidden rounded-[1.75rem] border border-rose-soft/25 bg-gradient-to-br from-rose-blush via-white to-gold-light/25 p-8 shadow-[0_24px_60px_rgba(139,74,90,0.1)]"
              >
                <IngredientVisual spec={visualSpec} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/88 via-white/62 to-white/16" aria-hidden />
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-white/90 to-transparent" aria-hidden />

                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/88 shadow-[inset_0_1px_10px_rgba(255,255,255,0.85),0_18px_38px_rgba(139,74,90,0.12)] ring-1 ring-rose-soft/20 backdrop-blur-md">
                  <ActiveIcon className="h-9 w-9 text-rose-deep" strokeWidth={1.35} aria-hidden />
                </div>

                <div className="relative mb-2">
                  <h3 className="text-2xl font-bold text-rose-deep">{ing.name_ar}</h3>
                  <p className="mt-0.5 font-sans text-sm font-medium text-rose-mid">{ing.name_en}</p>
                </div>

                <p className="relative mt-4 text-base leading-relaxed text-[#6B5555]">{ing.description_ar}</p>

                <div className="relative mt-6 rounded-2xl border border-white/80 bg-white/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_35px_rgba(139,74,90,0.06)] backdrop-blur-md">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-rose-mid">ماذا يفعل بالضبط؟</p>
                  <p className="text-sm leading-relaxed text-[#6B5555]">
                    {ing.name_en.includes("Niacinamide") &&
                      "يعمل على مستوى الخلايا لتنظيم إنتاج الميلانين والزهم — فيساعد على توحيد مظهر البشرة وتلطيف اللمعان."}
                    {ing.name_en.includes("Bakuchiol") &&
                      "مستخلص نباتي معروف في العناية الليلية، يدعم مظهر التجدد والنعومة بطريقة لطيفة."}
                    {ing.name_en.includes("Caffeine") &&
                      "مكوّن شائع في عناية محيط العين، يساعد على منح المنطقة مظهرًا أكثر انتعاشًا."}
                    {ing.name_en.includes("Hyaluronic") &&
                      "يجذب الرطوبة ويحبسها في أعلى طبقات الجلد — ترطيب عميق دون ملمس دهني ثقيل."}
                    {ing.name_en.includes("Peptides") &&
                      "سلاسل أحماض أمينية صغيرة تشارك في دعم مظهر تماسك البشرة ونعومتها."}
                    {ing.name_en.includes("Squalane") &&
                      "زيت نباتي خفيف يشبه الزيوت الطبيعية للبشرة — يرطب دون انسداد المسام."}
                    {ing.name_en.includes("Shea") &&
                      "غني بالأحماض الدهنية والفيتامينات — يغذي البشرة ويساعد على دعم الحاجز الرطوبي."}
                    {ing.name_en.includes("Zinc") &&
                      "معدن يساعد على موازنة إفراز الزهم وتضييق مظهر المسام — حليف البشرة الدهنية."}
                    {ing.name_en.includes("Vitamin K") &&
                      "يساهم في دعم مظهر المنطقة الرقيقة تحت العين ضمن روتين عناية لطيف."}
                    {!["Niacinamide", "Bakuchiol", "Caffeine", "Hyaluronic", "Peptides", "Squalane", "Shea", "Zinc", "Vitamin K"].some(
                      (k) => ing.name_en.includes(k)
                    ) &&
                      "مكوّن مختار بعناية لتكملة الفعالية العامة للتركيبة — يعمل بتناسق مع باقي المكونات."}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
          <p className="text-xs text-[#9B8A8A]">
            جميع المكونات ضمن أطر صناعة مستحضرات التجميل المعتادة — استخدمي المنتج حسب التوجيهات وتجنبي ملامسة العين المباشرة.
          </p>
          <p className="mx-auto mt-5 max-w-[600px] px-4 py-5 text-center text-sm leading-7 text-[#8C6E73]">
            هاد التركيب الخفيف مصمم خصيصاً باش يشتغل مع باقي منتجات الروتين — دون تعارض أو ثقل.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

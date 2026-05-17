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

interface Props {
  product: Product;
}

export function IngredientAuthority({ product }: Props) {
  const [active, setActive] = useState(0);
  const ing = product.ingredients[active];
  const ActiveIcon = iconForIngredient(ing.name_en);

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
                  className={`flex w-full items-center gap-4 rounded-[1.25rem] border p-5 text-right transition-all duration-200 ${
                    on
                      ? "border-rose-soft bg-rose-blush shadow-md shadow-rose-soft/15"
                      : "border-border bg-white hover:border-rose-soft/50 hover:bg-ivory"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${
                      on ? "bg-white text-rose-deep shadow-inner" : "bg-ivory text-[#9B8A8A]"
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
                  <div className={`h-8 w-1 shrink-0 rounded-full transition-all ${on ? "bg-rose-deep" : "bg-border"}`} />
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
                className="rounded-[1.75rem] border border-rose-soft/25 bg-gradient-to-br from-rose-blush via-white to-gold-light/25 p-8 shadow-[0_20px_50px_rgba(139,74,90,0.08)]"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-md shadow-rose-soft/10 ring-1 ring-rose-soft/20">
                  <ActiveIcon className="h-9 w-9 text-rose-deep" strokeWidth={1.35} aria-hidden />
                </div>

                <div className="mb-2">
                  <h3 className="text-2xl font-bold text-rose-deep">{ing.name_ar}</h3>
                  <p className="mt-0.5 font-sans text-sm font-medium text-rose-mid">{ing.name_en}</p>
                </div>

                <p className="mt-4 text-base leading-relaxed text-[#6B5555]">{ing.description_ar}</p>

                <div className="mt-6 rounded-2xl border border-white/80 bg-white/85 p-4 backdrop-blur-sm">
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
        </motion.div>
      </div>
    </section>
  );
}

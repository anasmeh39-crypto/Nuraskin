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

// ─── Types ───────────────────────────────────────────────────────────────────

type VisualKind = "rings" | "drops" | "leaf" | "crystal" | "shield" | "glow";

interface IngDetail {
  role: string;
  benefit: string;
  confidence: string;
  accentHex: string;
  bgStart: string; // inline-style gradient start (hex)
  bgEnd: string;   // inline-style gradient end (hex)
  visual: VisualKind;
}

// ─── Icon resolver ────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  "Niacinamide 10%": Sparkles,
  "Niacinamide 5%":  Sparkles,
  "Niacinamide 4%":  Sparkles,
  "Zinc PCA":        Shield,
  "Hyaluronic Acid": Droplets,
  "Hyaluronic Acid 0.5%": Droplets,
  Bakuchiol:         Leaf,
  "Shea Butter":     MoonStar,
  Squalane:          Droplets,
  Peptides:          BadgeCheck,
  "Caffeine 5%":     Zap,
  Caffeine:          Zap,
  "Vitamin K2":      ScanEye,
  "Vitamin E 1%":    Sparkles,
};

function iconFor(nameEn: string): LucideIcon {
  if (ICON_MAP[nameEn]) return ICON_MAP[nameEn];
  const map: Array<[string, LucideIcon]> = [
    ["Niacinamide", Sparkles], ["Zinc", Shield],    ["Hyaluronic", Droplets],
    ["Bakuchiol", Leaf],       ["Shea", MoonStar],  ["Squalane", Droplets],
    ["Peptide", BadgeCheck],   ["Caffeine", Zap],   ["Vitamin K", ScanEye],
    ["Panthenol", BadgeCheck], ["Aloe", Leaf],      ["Vitamin", Sparkles],
    ["Tinosorb", Shield],      ["Uvinul", Shield],
  ];
  for (const [k, v] of map) if (nameEn.includes(k)) return v;
  return FlaskConical;
}

function extractPercent(nameEn: string): string | null {
  const m = nameEn.match(/(\d+(?:\.\d+)?%)/);
  return m ? m[1] : null;
}

// ─── Per-ingredient detail data ───────────────────────────────────────────────

function getDetail(nameEn: string): IngDetail {
  if (nameEn.includes("Caffeine")) return {
    role: "مكوّن منشط لمحيط العين",
    benefit: "ينقص من مظهر الانتفاخ وآثار العيا",
    confidence: "✓ مكوّن معتمد في منتجات عناية محيط العين العالمية",
    accentHex: "#A07040",
    bgStart: "#FFF8F0", bgEnd: "#F5DFB8",
    visual: "rings",
  };
  if (nameEn.includes("Niacinamide")) return {
    role: "موحّد لون البشرة وموازن اللمعان",
    benefit: "يوحد المظهر وينقص من اللمعان الزايد",
    confidence: "✓ مكوّن مدروس لتحسين مظهر لون البشرة",
    accentHex: "#B8617A",
    bgStart: "#FEF0F3", bgEnd: "#F8D8DF",
    visual: "glow",
  };
  if (nameEn.includes("Hyaluronic")) return {
    role: "مرطب عميق بدون ملمس دهني",
    benefit: "يرطب البشرة من العمق بلا إحساس ثقيل",
    confidence: "✓ معروف بقدرته على جذب الرطوبة وحبسها",
    accentHex: "#4A90C4",
    bgStart: "#EDF7FF", bgEnd: "#C8E8F8",
    visual: "drops",
  };
  if (nameEn.includes("Bakuchiol")) return {
    role: "مكوّن التجديد الليلي النباتي",
    benefit: "يدعم مظهر التجدد والنعومة بالليل",
    confidence: "✓ بديل نباتي لطيف في الروتين الليلي",
    accentHex: "#C49A5A",
    bgStart: "#FEF6E8", bgEnd: "#F5DFB0",
    visual: "leaf",
  };
  if (nameEn.includes("Shea")) return {
    role: "مغذي ومرطب من الأعماق",
    benefit: "يرطب البشرة ويدعم حاجزها الطبيعي",
    confidence: "✓ مكوّن كلاسيكي في العناية الليلية الفاخرة",
    accentHex: "#C4944A",
    bgStart: "#FFF4E8", bgEnd: "#F0DECA",
    visual: "crystal",
  };
  if (nameEn.includes("Squalane")) return {
    role: "زيت نباتي خفيف للترطيب",
    benefit: "يرطب بلا انسداد المسام",
    confidence: "✓ مشتق من الزيتون — خفيف ومناسب لكل البشرة",
    accentHex: "#6BA8C9",
    bgStart: "#EDF5FC", bgEnd: "#C8DFF0",
    visual: "drops",
  };
  if (nameEn.includes("Peptide")) return {
    role: "داعم لمظهر تماسك البشرة",
    benefit: "يعاون على نعومة وحيوية البشرة",
    confidence: "✓ سلاسل أحماض أمينية معروفة في تركيبات العناية",
    accentHex: "#9B72B8",
    bgStart: "#F5EEFF", bgEnd: "#E0CCF5",
    visual: "crystal",
  };
  if (nameEn.includes("Zinc")) return {
    role: "معدن موازن للإفرازات",
    benefit: "يوازن الزهم ويحسن مظهر المسام",
    confidence: "✓ معدن طبيعي يستخدم في تركيبات البشرة الدهنية",
    accentHex: "#8A7A6A",
    bgStart: "#F5F2EC", bgEnd: "#E4DDD0",
    visual: "shield",
  };
  if (nameEn.includes("Tinosorb") || nameEn.includes("Uvinul")) return {
    role: "فلتر شمسي واسع الطيف UVA/UVB",
    benefit: "يحمي البشرة من الأشعة الضارة",
    confidence: "✓ مكوّنات حماية شمسية معتمدة دولياً",
    accentHex: "#D4A830",
    bgStart: "#FFFBE8", bgEnd: "#F8E8A8",
    visual: "shield",
  };
  if (nameEn.includes("Aloe")) return {
    role: "مكوّن مهدئ ومرطب",
    benefit: "يهدي البشرة ويعطيها إحساس راحة",
    confidence: "✓ الألوفيرا مكوّن مهدئ مستخدم منذ قرون",
    accentHex: "#5A9A5A",
    bgStart: "#EDFAE8", bgEnd: "#C8E8C0",
    visual: "leaf",
  };
  if (nameEn.includes("Panthenol")) return {
    role: "بروفيتامين B5 مهدئ",
    benefit: "يقوي الحاجز الطبيعي للبشرة",
    confidence: "✓ بروفيتامين B5 — مكوّن أساسي في تركيبات الحاجز",
    accentHex: "#C4A07A",
    bgStart: "#FFF0E8", bgEnd: "#EDD8C0",
    visual: "crystal",
  };
  if (nameEn.includes("Vitamin E")) return {
    role: "مضاد أكسدة طبيعي",
    benefit: "يحمي البشرة من العوامل الخارجية",
    confidence: "✓ مضاد أكسدة مستخدم على نطاق واسع في الصناعة",
    accentHex: "#C4A040",
    bgStart: "#FFFBE0", bgEnd: "#F8E888",
    visual: "glow",
  };
  if (nameEn.includes("Vitamin K")) return {
    role: "داعم لمظهر محيط العين",
    benefit: "يوحد لون البشرة الرقيقة حول العين",
    confidence: "✓ فيتامين K — مكوّن في تركيبات عناية محيط العين",
    accentHex: "#8A6A30",
    bgStart: "#FFF8E0", bgEnd: "#EAD870",
    visual: "glow",
  };
  return {
    role: "مكوّن فعّال في التركيبة",
    benefit: "يشتغل مع باقي المكونات لنتيجة أفضل",
    confidence: "✓ مكوّن مختار بعناية",
    accentHex: "#B8617A",
    bgStart: "#FEF0F3", bgEnd: "#F8D8DF",
    visual: "glow",
  };
}

// ─── Abstract visual backgrounds ─────────────────────────────────────────────

function IngVisualBg({ visual, accentHex }: { visual: VisualKind; accentHex: string }) {
  if (visual === "rings") return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[180, 250, 330].map((s, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: s, height: s, right: -s / 2.8, top: -s / 2.8,
          border: `1px solid ${accentHex}`, opacity: 0.09 - i * 0.02,
        }} />
      ))}
      <div className="absolute bottom-6 left-6 flex gap-2">
        {[0.3, 0.18, 0.1].map((op, i) => (
          <div key={i} className="rounded-full" style={{ width: 6, height: 6, background: accentHex, opacity: op }} />
        ))}
      </div>
    </div>
  );

  if (visual === "drops") return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[{ w: 80, h: 100, r: "12%", t: "8%", op: 0.12 }, { w: 48, h: 60, r: "5%", t: "40%", op: 0.07 }].map((d, i) => (
        <div key={i} style={{
          position: "absolute", width: d.w, height: d.h, right: d.r, top: d.t,
          background: `radial-gradient(circle at 35% 30%, white, ${accentHex})`,
          opacity: d.op, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        }} />
      ))}
    </div>
  );

  if (visual === "leaf") return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[{ s: 110, r: "6%", t: "-8%", rot: 30 }, { s: 65, r: "28%", t: "45%", rot: -20 }].map((l, i) => (
        <div key={i} style={{
          position: "absolute", width: l.s, height: l.s, right: l.r, top: l.t,
          background: accentHex, opacity: 0.08,
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", transform: `rotate(${l.rot}deg)`,
        }} />
      ))}
    </div>
  );

  if (visual === "crystal") return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[{ s: 80, r: "8%", t: "6%", rot: 15 }, { s: 48, r: "3%", t: "42%", rot: -10 }].map((c, i) => (
        <div key={i} style={{
          position: "absolute", width: c.s, height: c.s, right: c.r, top: c.t,
          background: `linear-gradient(135deg, white, ${accentHex})`, opacity: 0.1,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          transform: `rotate(${c.rot}deg)`,
        }} />
      ))}
    </div>
  );

  if (visual === "shield") return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute right-[6%] top-[5%]" width="80" height="90" viewBox="0 0 80 90" style={{ opacity: 0.08 }}>
        <path d="M40 0L0 18v31c0 22 17 40 40 45 23-5 40-23 40-45V18L40 0z" fill={accentHex} />
      </svg>
    </div>
  );

  // glow
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl"
        style={{ background: accentHex, opacity: 0.10 }} />
      <div className="absolute right-8 bottom-8 h-28 w-28 rounded-full blur-2xl"
        style={{ background: accentHex, opacity: 0.06 }} />
    </div>
  );
}

// ─── Per-ingredient macro images ─────────────────────────────────────────────
// Keyed by nameEn substring. Takes priority over the product-level showcase.

const INGREDIENT_IMAGES: Array<{ match: string; src: string }> = [
  { match: "Caffeine",    src: "/images/ingredients/ingredient-caffeine.png"    },
  { match: "Niacinamide", src: "/images/ingredients/ingredient-niacinamide.png" },
  { match: "Hyaluronic",  src: "/images/ingredients/ingredient-hyaluronic.png"  },
  { match: "Bakuchiol",   src: "/images/nura-night-renewal-ingredients.png"     },
  { match: "Peptide",     src: "/images/nura-night-renewal-ingredients.png"     },
  { match: "Shea",        src: "/images/nura-night-renewal-ingredients.png"     },
  { match: "Squalane",    src: "/images/nura-night-renewal-ingredients.png"     },
];

function ingredientImage(nameEn: string): string | null {
  return INGREDIENT_IMAGES.find((r) => nameEn.includes(r.match))?.src ?? null;
}

// ─── Per-product fallback showcase image ─────────────────────────────────────
// Used when no per-ingredient macro is defined.

const PRODUCT_SHOWCASE: Record<string, string> = {
  "nura-eye-revive":    "/images/nura-eye-revive-showcase.png",
  "nura-spf-50":        "/images/products/sunscreen-spf50-pack.png",
  "nura-balance":       "/images/products/serum-niacinamide-pack.png",
  "nura-night-renewal": "/images/nura-night-renewal-ingredients.png",
};

// ─── Stagger animation variants ───────────────────────────────────────────────

const cardVariants = {
  enter: { opacity: 0, y: 16, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 },
};

const stagger = (i: number) => ({ delay: i * 0.065 });

// ─── Main component ───────────────────────────────────────────────────────────

interface Props { product: Product }

export function IngredientAuthority({ product }: Props) {
  const [active, setActive] = useState(0);
  const ing = product.ingredients[active];
  const Icon = iconFor(ing.name_en);
  const detail = getDetail(ing.name_en);
  const percent = extractPercent(ing.name_en);

  return (
    <section className="relative overflow-hidden bg-[#FDFAF7] py-20" dir="rtl">

      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-rose-blush/18 blur-[100px]" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-gold-light/18 blur-[80px]" />
        <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-rose-soft/12 to-transparent" />
      </div>

      <div className="container-wide relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-5 inline-flex items-center gap-2.5 rounded-full border border-rose-soft/35 bg-white/80 px-4 py-1.5 shadow-[0_2px_12px_rgba(139,74,90,0.08)] backdrop-blur-sm"
          >
            <FlaskConical className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} aria-hidden />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-rose-mid">
              التركيبة العلمية
            </span>
          </motion.div>

          <h2 className="section-heading text-[#2C1810]">
            ما الذي تحتويه التركيبة — ولماذا
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#6B5555]">
            كل مكوّن اختير بعناية — نشرحه بوضوح لأن بشرتك تستحق الشفافية الكاملة.
          </p>

          {/* Step indicators */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {product.ingredients.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-2 bg-rose-deep"
                    : "w-2 h-2 bg-rose-soft/50 hover:bg-rose-soft"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_460px] lg:items-start">

          {/* ──────────────────────────── LEFT — Selector list */}
          <div className="space-y-2.5">
            {product.ingredients.map((ingredient, i) => {
              const RowIcon = iconFor(ingredient.name_en);
              const isOn = active === i;
              const pct = extractPercent(ingredient.name_en);
              const d = getDetail(ingredient.name_en);
              const num = String(i + 1).padStart(2, "0");

              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  className={`group relative w-full overflow-hidden rounded-2xl border text-right transition-all duration-250 ${
                    isOn
                      ? "border-transparent shadow-[0_8px_32px_rgba(139,74,90,0.14)]"
                      : "border-[#EDE8E3] bg-white shadow-[0_2px_8px_rgba(44,24,16,0.04)] hover:border-rose-soft/40 hover:shadow-[0_8px_24px_rgba(139,74,90,0.08)]"
                  }`}
                >
                  {/* Active gradient bg */}
                  {isOn && (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${d.bgStart} 0%, ${d.bgEnd} 100%)`,
                      }}
                    />
                  )}

                  {/* Active left accent bar */}
                  {isOn && (
                    <motion.div
                      layoutId="accentBar"
                      className="absolute inset-y-0 right-0 w-[3px] rounded-l-full"
                      style={{ background: `linear-gradient(to bottom, ${d.accentHex}, ${d.accentHex}88)` }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Top shimmer */}
                  {isOn && (
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
                  )}

                  <div className="relative flex items-center gap-4 p-4 sm:p-5">

                    {/* Step number */}
                    <span
                      className={`hidden shrink-0 font-sans text-[11px] font-bold tabular-nums sm:block transition-colors ${
                        isOn ? "opacity-40" : "text-[#C8BEB5]"
                      }`}
                      style={isOn ? { color: d.accentHex } : {}}
                    >
                      {num}
                    </span>

                    {/* Icon container */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                        isOn
                          ? "shadow-[0_4px_16px_rgba(139,74,90,0.15)] ring-1 ring-white/60"
                          : "bg-[#F5F2EE] group-hover:bg-white group-hover:shadow-sm"
                      }`}
                      style={isOn ? { background: "white" } : {}}
                    >
                      <RowIcon
                        className="h-5 w-5 transition-colors duration-200"
                        style={{ color: isOn ? d.accentHex : "#9B8A8A" }}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-[#2C1810] transition-colors">
                          {ingredient.name_ar}
                        </span>
                        {pct && (
                          <motion.span
                            className="rounded-full px-2 py-0.5 font-sans text-[10px] font-bold transition-all"
                            style={
                              isOn
                                ? { background: d.accentHex, color: "white" }
                                : { background: "#EDE8E3", color: "#9B8A8A" }
                            }
                          >
                            {pct}
                          </motion.span>
                        )}
                      </div>
                      <p
                        className={`mt-0.5 text-xs leading-relaxed transition-all duration-200 ${
                          isOn ? "text-[#6B5555]" : "truncate text-[#B0A098]"
                        }`}
                      >
                        {isOn ? d.role : ingredient.description_ar}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div
                      className={`shrink-0 transition-all duration-200 ${
                        isOn ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                      }`}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M6 12L10 8L6 4"
                          stroke={isOn ? d.accentHex : "#9B8A8A"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* ──────────────────────────── RIGHT — Detail showcase card */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] as const }}
                className="relative overflow-hidden rounded-[1.75rem] border border-white/50 shadow-[0_32px_80px_rgba(139,74,90,0.13)]"
                style={{
                  background: `linear-gradient(155deg, ${detail.bgStart} 0%, white 55%, ${detail.bgEnd} 100%)`,
                }}
              >
                {/* Abstract ingredient visual */}
                <IngVisualBg visual={detail.visual} accentHex={detail.accentHex} />

                {/* Premium shimmer lines */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" aria-hidden />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/60 via-transparent to-transparent" aria-hidden />

                <div className="relative p-7">

                  {/* ── HEADER: icon + name + % ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={stagger(0)}
                    className="mb-5 flex items-center gap-4"
                  >
                    {/* Icon with subtle rotation entrance */}
                    <motion.div
                      initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/90 shadow-[0_8px_24px_rgba(44,24,16,0.10)] ring-1 ring-white/70"
                    >
                      <Icon
                        className="h-7 w-7"
                        style={{ color: detail.accentHex }}
                        strokeWidth={1.4}
                        aria-hidden
                      />
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-xl font-bold leading-snug text-[#2C1810]">
                          {ing.name_ar}
                        </h3>
                        {percent && (
                          <motion.span
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                            className="rounded-full px-2.5 py-0.5 font-sans text-xs font-black shadow-sm"
                            style={{ background: detail.accentHex, color: "white" }}
                          >
                            {percent}
                          </motion.span>
                        )}
                      </div>
                      <p className="mt-0.5 font-sans text-[11px] font-medium text-[#A89898] tracking-wide">
                        {ing.name_en}
                      </p>
                    </div>
                  </motion.div>

                  {/* ── DIVIDER ── */}
                  <div className="mb-5 h-px bg-gradient-to-r from-transparent via-black/8 to-transparent" />

                  {/* ── ROLE + BENEFIT badges ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={stagger(1)}
                    className="mb-5 grid grid-cols-2 gap-2.5"
                  >
                    <div
                      className="rounded-xl border border-white/70 bg-white/60 p-3.5 backdrop-blur-sm"
                      style={{ boxShadow: "0 2px 12px rgba(44,24,16,0.05)" }}
                    >
                      <p
                        className="mb-1.5 font-sans text-[9px] font-black uppercase tracking-[0.22em]"
                        style={{ color: detail.accentHex }}
                      >
                        الدور
                      </p>
                      <p className="text-[12px] font-semibold leading-snug text-[#2C1810]">
                        {detail.role}
                      </p>
                    </div>
                    <div
                      className="rounded-xl border border-white/70 bg-white/60 p-3.5 backdrop-blur-sm"
                      style={{ boxShadow: "0 2px 12px rgba(44,24,16,0.05)" }}
                    >
                      <p
                        className="mb-1.5 font-sans text-[9px] font-black uppercase tracking-[0.22em]"
                        style={{ color: detail.accentHex }}
                      >
                        الفائدة
                      </p>
                      <p className="text-[12px] leading-snug text-[#4A3838]">
                        {detail.benefit}
                      </p>
                    </div>
                  </motion.div>

                  {/* ── FULL DESCRIPTION ── */}
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={stagger(2)}
                    className="mb-5 text-sm leading-[1.75] text-[#6B5555]"
                  >
                    {ing.description_ar}
                  </motion.p>

                  {/* ── CONFIDENCE INDICATOR ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={stagger(3)}
                    className="mb-6 flex items-center gap-2 rounded-xl border border-white/60 bg-white/50 px-3.5 py-2.5 backdrop-blur-sm"
                  >
                    <div
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: detail.accentHex + "22" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5l2 2 4-4"
                          stroke={detail.accentHex}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-[11px] font-medium text-[#6B5555]">
                      {detail.confidence}
                    </p>
                  </motion.div>

                  {/* ── DIVIDER ── */}
                  <div className="mb-5 h-px bg-gradient-to-r from-transparent via-black/6 to-transparent" />

                  {/* ── BOTTOM: product chip + image ── */}
                  {/* ── Image area: per-ingredient macro → product showcase → bottle ── */}
                  {(() => {
                    const macroSrc = ingredientImage(ing.name_en);
                    const fallbackSrc = PRODUCT_SHOWCASE[product.slug];
                    const imageSrc = macroSrc ?? fallbackSrc;

                    if (imageSrc) {
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={stagger(4)}
                        >
                          {/* Product chip */}
                          <div className="mb-3">
                            <div
                              className="inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 backdrop-blur-sm"
                              style={{ boxShadow: "0 2px 12px rgba(44,24,16,0.05)" }}
                            >
                              <div className="h-1.5 w-1.5 rounded-full" style={{ background: detail.accentHex }} />
                              <p className="font-sans text-[9px] font-black uppercase tracking-[0.2em] text-[#A89898]">
                                موجود في
                              </p>
                              <span className="font-sans text-[10px] text-[#C8BEB5]">·</span>
                              <p className="text-xs font-bold text-[#2C1810]">{product.name_ar}</p>
                              <span className="font-sans text-[10px] text-[#C8BEB5]">·</span>
                              <span className="font-sans text-[10px] text-[#A89898]">{product.volume}</span>
                            </div>
                          </div>

                          {/* Macro / showcase image */}
                          <motion.div
                            whileHover={{ scale: 1.015 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                            className="relative overflow-hidden"
                            style={{
                              borderRadius: "1.15rem",
                              boxShadow: `0 20px 56px rgba(139,74,90,0.18), 0 4px 12px rgba(44,24,16,0.08), inset 0 1px 0 rgba(255,255,255,0.6)`,
                              border: "1px solid rgba(255,255,255,0.55)",
                            }}
                          >
                            {/* Top shimmer */}
                            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                            {/* Image — macro ingredients fill, pack shots use contain on a tinted bg */}
                            <div
                              className="relative flex items-center justify-center"
                              style={{
                                height: macroSrc ? "11rem" : "13rem",
                                background: macroSrc
                                  ? undefined
                                  : `radial-gradient(circle at 50% 35%, white 0%, ${detail.bgStart} 55%, ${detail.bgEnd} 100%)`,
                              }}
                            >
                              <img
                                src={imageSrc}
                                alt={ing.name_ar}
                                className={`block w-full ${macroSrc ? "h-full object-cover" : "h-full object-contain p-4"}`}
                                draggable={false}
                                loading="lazy"
                              />
                            </div>

                            {/* Bottom gradient fade */}
                            <div
                              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-10"
                              style={{ background: `linear-gradient(to top, ${detail.bgEnd}EE 0%, ${detail.bgEnd}88 50%, transparent 100%)` }}
                            />

                            {/* Ingredient name pill */}
                            <div className="absolute bottom-3 right-3 z-20">
                              <span
                                className="rounded-full px-3 py-1 font-sans text-[11px] font-bold text-white backdrop-blur-md shadow-sm"
                                style={{ background: `${detail.accentHex}DD` }}
                              >
                                {ing.name_ar}
                              </span>
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    }

                    // Fallback: floating pack-shot bottle
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={stagger(4)}
                        className="flex items-end justify-between gap-4"
                      >
                        <div
                          className="rounded-xl border border-white/70 bg-white/60 px-4 py-3 backdrop-blur-sm"
                          style={{ boxShadow: "0 2px 12px rgba(44,24,16,0.05)" }}
                        >
                          <p className="font-sans text-[9px] font-black uppercase tracking-[0.2em] text-[#A89898]">موجود في</p>
                          <p className="mt-0.5 text-xs font-bold leading-snug text-[#2C1810]">{product.name_ar}</p>
                          <div className="mt-1.5 flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full" style={{ background: detail.accentHex }} />
                            <span className="font-sans text-[10px] text-[#A89898]">{product.volume}</span>
                            <span className="font-sans text-[10px] text-[#C8BEB5]">·</span>
                            <span className="font-sans text-[10px] text-[#A89898]">{product.format}</span>
                          </div>
                        </div>
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 -m-4 rounded-full blur-2xl" style={{ background: detail.accentHex, opacity: 0.12 }} />
                          <motion.div
                            animate={{ y: [0, -7, 0] }}
                            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                            whileHover={{ scale: 1.06 }}
                            className="relative cursor-pointer"
                          >
                            <img
                              src={product.image}
                              alt={product.name_ar}
                              className="relative h-28 w-auto object-contain"
                              loading="lazy"
                              style={{ filter: `drop-shadow(0 12px 28px rgba(139,74,90,0.20)) drop-shadow(0 4px 8px rgba(44,24,16,0.10))` }}
                              draggable={false}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="mt-4 flex items-center justify-between px-1">
              <button
                onClick={() => setActive((a) => Math.max(0, a - 1))}
                disabled={active === 0}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EDE8E3] bg-white text-[#9B8A8A] shadow-sm transition-all hover:border-rose-soft/50 hover:text-rose-deep disabled:opacity-30"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <span className="font-sans text-[11px] text-[#B0A098]">
                {String(active + 1).padStart(2, "0")} / {String(product.ingredients.length).padStart(2, "0")}
              </span>

              <button
                onClick={() => setActive((a) => Math.min(product.ingredients.length - 1, a + 1))}
                disabled={active === product.ingredients.length - 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EDE8E3] bg-white text-[#9B8A8A] shadow-sm transition-all hover:border-rose-soft/50 hover:text-rose-deep disabled:opacity-30"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Footer disclaimer ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-[10px] text-[#C0B4B4]"
        >
          جميع المكونات ضمن أطر صناعة مستحضرات التجميل — استخدمي المنتج حسب التوجيهات.
        </motion.p>
      </div>
    </section>
  );
}

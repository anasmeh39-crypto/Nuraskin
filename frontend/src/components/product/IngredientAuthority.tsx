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
  cardBg: string;   // Tailwind gradient classes for the card
  accentHex: string;
  visual: VisualKind;
}

// ─── Icon resolver ────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  "Niacinamide 10%": Sparkles,
  "Niacinamide 5%": Sparkles,
  "Niacinamide 4%": Sparkles,
  "Zinc PCA": Shield,
  "Hyaluronic Acid": Droplets,
  "Hyaluronic Acid 0.5%": Droplets,
  Bakuchiol: Leaf,
  "Shea Butter": MoonStar,
  Squalane: Droplets,
  Peptides: BadgeCheck,
  "Caffeine 5%": Zap,
  "Caffeine": Zap,
  "Vitamin K2": ScanEye,
  "Vitamin E 1%": Sparkles,
};

function iconFor(nameEn: string): LucideIcon {
  if (ICON_MAP[nameEn]) return ICON_MAP[nameEn];
  const matchers: Array<[string, LucideIcon]> = [
    ["Niacinamide", Sparkles], ["Zinc", Shield], ["Hyaluronic", Droplets],
    ["Bakuchiol", Leaf], ["Shea", MoonStar], ["Squalane", Droplets],
    ["Peptide", BadgeCheck], ["Caffeine", Zap], ["Vitamin K", ScanEye],
    ["Panthenol", BadgeCheck], ["Aloe", Leaf], ["Vitamin", Sparkles],
    ["Tinosorb", Shield], ["Uvinul", Shield],
  ];
  for (const [k, v] of matchers) if (nameEn.includes(k)) return v;
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
    benefit: "كيعاون ينقص من مظهر الانتفاخ (البوفينيس) وآثار العيا",
    cardBg: "from-[#FFF4E8]/90 via-[#FDF0DC]/70 to-[#F5D9B0]/30",
    accentHex: "#A07040",
    visual: "rings",
  };
  if (nameEn.includes("Niacinamide")) return {
    role: "موحّد لون البشرة وموازن اللمعان",
    benefit: "كيوحد مظهر لون البشرة وكينقص من اللمعان الزايد",
    cardBg: "from-[#FDEEF1]/90 via-white/70 to-[#FBE4E8]/40",
    accentHex: "#B8617A",
    visual: "glow",
  };
  if (nameEn.includes("Hyaluronic")) return {
    role: "مرطب عميق بدون ملمس دهني",
    benefit: "كيرطب البشرة من العمق بلا ما يخلي أي إحساس ثقيل",
    cardBg: "from-[#DFF0FA]/85 via-white/65 to-[#EAF6FF]/50",
    accentHex: "#4A90C4",
    visual: "drops",
  };
  if (nameEn.includes("Bakuchiol")) return {
    role: "مكوّن التجديد الليلي النباتي",
    benefit: "كيعاون يدعم مظهر التجدد والنعومة بالليل بطريقة لطيفة",
    cardBg: "from-[#F5E8C8]/80 via-white/60 to-[#FAF0E0]/50",
    accentHex: "#C49A5A",
    visual: "leaf",
  };
  if (nameEn.includes("Shea")) return {
    role: "مغذي ومرطب من الأعماق",
    benefit: "كيرطب البشرة ويدعم حاجزها الطبيعي طول الليل",
    cardBg: "from-[#F8EAD8]/85 via-white/60 to-[#F0DECA]/40",
    accentHex: "#C4944A",
    visual: "crystal",
  };
  if (nameEn.includes("Squalane")) return {
    role: "زيت نباتي خفيف للترطيب اليومي",
    benefit: "كيرطب بلا انسداد المسام — مناسب لكل أنواع البشرة",
    cardBg: "from-[#DFF0FA]/80 via-white/60 to-[#E8F4FF]/45",
    accentHex: "#6BA8C9",
    visual: "drops",
  };
  if (nameEn.includes("Peptide")) return {
    role: "داعم لمظهر تماسك البشرة",
    benefit: "كيعاون على مظهر نعومة وحيوية البشرة مع الاستعمال المنتظم",
    cardBg: "from-[#EDE0F8]/75 via-white/60 to-[#F5EEFF]/45",
    accentHex: "#9B72B8",
    visual: "crystal",
  };
  if (nameEn.includes("Zinc")) return {
    role: "معدن موازن للإفرازات الدهنية",
    benefit: "كيوازن الزهم وكيحسن مظهر المسام الواسعة",
    cardBg: "from-[#ECEAE0]/80 via-white/65 to-[#E4E0D4]/35",
    accentHex: "#8A7A6A",
    visual: "shield",
  };
  if (nameEn.includes("Tinosorb") || nameEn.includes("Uvinul")) return {
    role: "فلتر شمسي واسع الطيف UVA/UVB",
    benefit: "كيعاون يحمي البشرة من الأشعة الضارة طول النهار",
    cardBg: "from-[#FFF8E0]/90 via-white/65 to-[#F8EAB0]/30",
    accentHex: "#D4A830",
    visual: "shield",
  };
  if (nameEn.includes("Aloe")) return {
    role: "مكوّن مهدئ ومرطب طبيعي",
    benefit: "كيهدي البشرة ويعطيها إحساس راحة بعد التعرض للشمس",
    cardBg: "from-[#DDEEDB]/80 via-white/60 to-[#D0E8CE]/40",
    accentHex: "#5A9A5A",
    visual: "leaf",
  };
  if (nameEn.includes("Panthenol")) return {
    role: "بروفيتامين B5 مهدئ وداعم للحاجز",
    benefit: "كيهدي البشرة ويقوي حاجزها الواقي الطبيعي",
    cardBg: "from-[#F6E8D9]/80 via-white/60 to-[#EDD8C0]/35",
    accentHex: "#C4A07A",
    visual: "crystal",
  };
  if (nameEn.includes("Vitamin E")) return {
    role: "مضاد أكسدة طبيعي",
    benefit: "كيعاون يحمي البشرة من تأثير العوامل الخارجية اليومية",
    cardBg: "from-[#FDF0C0]/75 via-white/60 to-[#F8E880]/25",
    accentHex: "#C4A040",
    visual: "glow",
  };
  if (nameEn.includes("Vitamin K")) return {
    role: "داعم لمظهر منطقة محيط العين",
    benefit: "كيعاون يوحد لون البشرة الرقيقة حول العين",
    cardBg: "from-[#FDF0C0]/65 via-white/55 to-[#EAD870]/20",
    accentHex: "#8A6A30",
    visual: "glow",
  };
  return {
    role: "مكوّن فعّال في التركيبة",
    benefit: "كيشتغل مع باقي المكونات لنتيجة أفضل",
    cardBg: "from-rose-blush/70 via-white/60 to-gold-light/25",
    accentHex: "#B8617A",
    visual: "glow",
  };
}

// ─── Abstract ingredient visuals (CSS-only) ───────────────────────────────────

function IngVisualBg({ visual, accentHex }: { visual: VisualKind; accentHex: string }) {
  if (visual === "rings") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[160, 220, 290, 360].map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: s, height: s,
              left: -s / 2.5, bottom: -s / 2.5,
              border: `1.5px solid ${accentHex}`,
              opacity: Math.max(0, 0.09 - i * 0.018),
            }}
          />
        ))}
        <div className="absolute top-5 right-5 flex gap-2">
          {[1, 0.55, 0.3].map((op, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: accentHex, opacity: op * 0.28 }} />
          ))}
        </div>
      </div>
    );
  }
  if (visual === "drops") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[
          { w: 88, h: 108, left: "8%", top: "5%", op: 0.10 },
          { w: 52, h: 64,  left: "54%", top: "14%", op: 0.07 },
          { w: 32, h: 40,  left: "72%", top: "4%", op: 0.05 },
        ].map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: d.w, height: d.h,
              left: d.left, top: d.top,
              background: `radial-gradient(circle at 35% 30%, white, ${accentHex})`,
              opacity: d.op,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            }}
          />
        ))}
      </div>
    );
  }
  if (visual === "leaf") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[
          { s: 120, left: "4%", top: "-12%", rotate: 30, op: 0.09 },
          { s: 72,  left: "58%", top: "12%", rotate: -22, op: 0.06 },
        ].map((l, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: l.s, height: l.s,
              left: l.left, top: l.top,
              background: accentHex,
              opacity: l.op,
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              transform: `rotate(${l.rotate}deg)`,
            }}
          />
        ))}
      </div>
    );
  }
  if (visual === "crystal") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[
          { w: 88, h: 88, left: "6%", top: "5%", rotate: 15, op: 0.08 },
          { w: 54, h: 54, left: "60%", top: "10%", rotate: -12, op: 0.06 },
          { w: 32, h: 32, left: "76%", top: "2%", rotate: 28, op: 0.05 },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: c.w, height: c.h,
              left: c.left, top: c.top,
              background: `linear-gradient(135deg, white, ${accentHex})`,
              opacity: c.op,
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              transform: `rotate(${c.rotate}deg)`,
            }}
          />
        ))}
      </div>
    );
  }
  if (visual === "shield") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <svg className="absolute left-[4%] top-[4%] h-[90px] w-[80px]" viewBox="0 0 80 90" style={{ opacity: 0.07 }}>
          <path d="M40 0L0 18v31c0 22 17 40 40 45 23-5 40-23 40-45V18L40 0z" fill={accentHex} />
        </svg>
        <svg className="absolute right-[8%] top-[8%] h-[52px] w-[46px]" viewBox="0 0 80 90" style={{ opacity: 0.04 }}>
          <path d="M40 0L0 18v31c0 22 17 40 40 45 23-5 40-23 40-45V18L40 0z" fill={accentHex} />
        </svg>
      </div>
    );
  }
  // glow
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -left-10 -top-10 h-52 w-52 rounded-full blur-3xl"
        style={{ background: accentHex, opacity: 0.08 }}
      />
      <div
        className="absolute right-4 top-4 h-28 w-28 rounded-full blur-2xl"
        style={{ background: accentHex, opacity: 0.05 }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  product: Product;
}

export function IngredientAuthority({ product }: Props) {
  const [active, setActive] = useState(0);
  const ing = product.ingredients[active];
  const Icon = iconFor(ing.name_en);
  const detail = getDetail(ing.name_en);
  const percent = extractPercent(ing.name_en);

  return (
    <section className="relative overflow-hidden bg-[#FDFAF7] py-20" dir="rtl">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-rose-blush/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-gold-light/20 blur-3xl" />

      <div className="container-wide relative">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-soft/40 bg-rose-blush/60 px-3 py-1 text-[11px] font-semibold text-rose-deep">
              <FlaskConical className="h-3 w-3 text-gold" strokeWidth={1.5} aria-hidden />
              تركيبة مدروسة
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold-light/60 px-3 py-1 text-[11px] font-semibold text-brand-deep">
              <Sparkles className="h-3 w-3 text-gold" strokeWidth={1.5} aria-hidden />
              شفافية في المكوّنات
            </span>
          </div>
          <h2 className="section-heading text-[#2C1810]">ما الذي تحتويه التركيبة — ولماذا</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#6B5555]">
            كل مكوّن اختير بعناية — نشرحه بوضوح لأن بشرتك تستحق الشفافية الكاملة.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">

          {/* LEFT — Ingredient selectors */}
          <div className="space-y-2.5">
            {product.ingredients.map((ingredient, i) => {
              const RowIcon = iconFor(ingredient.name_en);
              const isOn = active === i;
              const pct = extractPercent(ingredient.name_en);
              const d = getDetail(ingredient.name_en);

              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.055 }}
                  className={`group relative w-full overflow-hidden rounded-2xl border text-right transition-all duration-200 ${
                    isOn
                      ? "border-rose-soft/60 shadow-[0_8px_28px_rgba(139,74,90,0.11)]"
                      : "border-[#EDE8E3] bg-white shadow-[0_2px_8px_rgba(44,24,16,0.04)] hover:border-rose-soft/35 hover:shadow-[0_6px_20px_rgba(139,74,90,0.07)]"
                  }`}
                >
                  {/* Active gradient fill */}
                  {isOn && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${d.cardBg}`} />
                  )}

                  {/* Shimmer top */}
                  {isOn && (
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
                  )}

                  <div className="relative flex items-center gap-4 p-4">
                    {/* Icon badge */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                        isOn
                          ? "bg-white shadow-[0_4px_14px_rgba(139,74,90,0.13)] ring-1 ring-white/60"
                          : "bg-[#F5F2EE] group-hover:bg-white group-hover:shadow-sm"
                      }`}
                    >
                      <RowIcon
                        className={`h-5 w-5 transition-colors ${
                          isOn ? "text-rose-deep" : "text-[#9B8A8A] group-hover:text-rose-mid"
                        }`}
                        strokeWidth={1.4}
                        aria-hidden
                      />
                    </div>

                    {/* Text content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-[#2C1810]">{ingredient.name_ar}</span>
                        {pct && (
                          <span
                            className={`rounded-full px-2 py-0.5 font-sans text-[10px] font-bold transition-all ${
                              isOn ? "bg-rose-deep text-white" : "bg-[#EDE8E3] text-[#9B8A8A]"
                            }`}
                          >
                            {pct}
                          </span>
                        )}
                      </div>
                      <p
                        className={`mt-0.5 text-xs leading-relaxed transition-all ${
                          isOn ? "text-[#6B5555]" : "truncate text-[#B0A098]"
                        }`}
                      >
                        {ingredient.description_ar}
                      </p>
                    </div>

                    {/* Active accent bar */}
                    <div
                      className={`h-full w-[3px] shrink-0 self-stretch rounded-full transition-all ${
                        isOn ? "bg-gradient-to-b from-rose-deep to-gold opacity-100" : "bg-[#EDE8E3] opacity-0"
                      }`}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT — Active ingredient detail card */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.985 }}
                transition={{ duration: 0.30, ease: [0.16, 1, 0.3, 1] as const }}
                className={`relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-gradient-to-br ${detail.cardBg} shadow-[0_28px_64px_rgba(139,74,90,0.11)]`}
              >
                {/* Ingredient abstract visual */}
                <IngVisualBg visual={detail.visual} accentHex={detail.accentHex} />

                {/* Glass shimmer lines */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/85 to-transparent" aria-hidden />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-white/50 via-transparent to-transparent" aria-hidden />

                <div className="relative p-7">

                  {/* Icon + Name + % */}
                  <div className="mb-5 flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/90 shadow-[0_8px_24px_rgba(44,24,16,0.10)] ring-1 ring-white/70"
                    >
                      <Icon
                        className="h-7 w-7"
                        style={{ color: detail.accentHex }}
                        strokeWidth={1.35}
                        aria-hidden
                      />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-[1.25rem] font-bold leading-snug text-[#2C1810]">
                          {ing.name_ar}
                        </h3>
                        {percent && (
                          <span
                            className="rounded-full px-2.5 py-0.5 font-sans text-xs font-bold shadow-sm"
                            style={{ background: detail.accentHex, color: "white" }}
                          >
                            {percent}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 font-sans text-xs font-medium text-[#9B8A8A]">
                        {ing.name_en}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mb-5 h-px bg-gradient-to-r from-transparent via-white/75 to-transparent" />

                  {/* Role + Benefit boxes */}
                  <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/65 bg-white/55 p-3.5 backdrop-blur-sm">
                      <p
                        className="mb-1.5 font-sans text-[9px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: detail.accentHex }}
                      >
                        الدور
                      </p>
                      <p className="text-sm font-semibold leading-snug text-[#2C1810]">
                        {detail.role}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/65 bg-white/55 p-3.5 backdrop-blur-sm">
                      <p
                        className="mb-1.5 font-sans text-[9px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: detail.accentHex }}
                      >
                        الفائدة
                      </p>
                      <p className="text-sm leading-snug text-[#4A3838]">
                        {detail.benefit}
                      </p>
                    </div>
                  </div>

                  {/* Description (full Darija text from product config) */}
                  <p className="mb-6 text-sm leading-relaxed text-[#6B5555]">
                    {ing.description_ar}
                  </p>

                  {/* Bottom row: product association + bottle image */}
                  <div className="flex items-end justify-between gap-3">
                    <div className="rounded-xl border border-white/70 bg-white/55 px-3.5 py-2.5 backdrop-blur-sm">
                      <p className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-[#9B8A8A]">
                        موجود في
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-[#2C1810] leading-snug">
                        {product.name_ar}
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        <div className="h-1 w-1 rounded-full" style={{ background: detail.accentHex }} />
                        <p className="font-sans text-[10px] text-[#9B8A8A]">{product.volume}</p>
                      </div>
                    </div>

                    {/* Product bottle — small, elegant */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.35 }}
                      className="shrink-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name_ar}
                        className="h-28 w-auto object-contain"
                        style={{ filter: `drop-shadow(0 10px 22px rgba(139,74,90,0.18))` }}
                        draggable={false}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-[10px] text-[#B0A098]"
        >
          جميع المكونات ضمن أطر صناعة مستحضرات التجميل — استخدمي المنتج حسب التوجيهات وتجنبي ملامسة العين المباشرة.
        </motion.p>
      </div>
    </section>
  );
}

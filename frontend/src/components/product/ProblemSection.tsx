"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Droplets, Leaf, RefreshCw, Shield, Sparkles, Sun, XCircle } from "lucide-react";
import { Product } from "@/types";

// Real editorial/concern photos — shown instead of pack shots
const PROBLEM_IMAGES: Record<string, string> = {
  "nura-balance":       "/images/problem-niacinamide-skin.png",
  "nura-night-renewal": "/images/products/retinol-problem-morning-tired.png",
  "nura-eye-revive":    "/images/eye-concern-visual.png",
};

// Fallback pack shots for products without an editorial image
const PRODUCT_PACK_IMAGES: Record<string, string> = {
  "nura-night-renewal": "/images/products/retinol-cream-pack.png",
  "nura-spf-50":        "/images/products/sunscreen-spf50-pack.png",
};

// Per-paragraph icons with accent colors
type ParagraphItem = { icon: React.ElementType; text: string; accent: string; bg: string };

const PROBLEM_COPY: Record<string, {
  headline: string;
  items: ParagraphItem[];
  moment: string;
}> = {
  "nura-balance": {
    headline: "بشرتك تلمع، المسام واسعة، واللون ما موحدش؟",
    items: [
      {
        icon: Droplets,
        text: "البشرة الدهنية واللمعان الزايد — وجهك كيلمع من نص النهار حتى بعد الغسيل. المسامات واسعة باينة، وما كاين مانتج يحلها بصح.",
        accent: "#B8617A",
        bg: "#FEF0F3",
      },
      {
        icon: RefreshCw,
        text: "لون البشرة ما موحدش — بقع، تفاوت، ولا إشراقة موحدة حتى مع الكريمات الغالية. السبب أن البشرة كتحتاج مكون يعاون يوازنها من الداخل.",
        accent: "#C49A5A",
        bg: "#FFF8E8",
      },
      {
        icon: Sparkles,
        text: "النياسيناميد 10% هو الجواب — صفى باش يوازن البشرة، ينقص اللمعان، يوحد اللون، ويحسن مظهر المسام — كل هادشي مع الاستعمال المنتظم.",
        accent: "#5A9A5A",
        bg: "#EDFAE8",
      },
    ],
    moment: "لحظة كتشوفي فيها وجهك فالمراية وبشرتك باينة أكثر صفاءً، أقل لمعاناً، ومسامها ما يبانوش كما قبل.",
  },
  "nura-night-renewal": {
    headline: "كتنامي وتفيقي بنفس الوجه — حتى النوم ما كيعاونكش",
    items: [
      {
        icon: AlertCircle,
        text: "البشرة كتفقد نضارتها مع الوقت — وحتى نوم كافي ما كيوقفش هاد الحال. السبب أن البشرة كتحتاج مكونات تساعدها تتجدد بالليل، مو غير ترطيب.",
        accent: "#B8617A",
        bg: "#FEF0F3",
      },
      {
        icon: RefreshCw,
        text: "الكريمات العادية كترطب فقط وما كتغلغلش للتجديد الحقيقي — وجهك كيبقى باهت الصباح حتى مع أغلى المنتجات. مو غلطتك، المشكل فالمكونات.",
        accent: "#C49A5A",
        bg: "#FFF8E8",
      },
      {
        icon: Leaf,
        text: "الباكوتشيول والببتيدات مع بعضياتهم كيخدموا بالليل — كيدعموا مظهر النعومة والحيوية باش تفيقي الصباح ببشرة مختلفة.",
        accent: "#5A9A5A",
        bg: "#EDFAE8",
      },
    ],
    moment: "تفيقي الصباح وكتلمسي وجهك — وتحسي أن بشرتك أنعم وفيها نضارة ما كانتش هناك قبل.",
  },
  "nura-eye-revive": {
    headline: "وجهك كيبان عيان — حتى ملي رقدتي بزاف",
    items: [
      {
        icon: XCircle,
        text: "الهالات السوداء والبوفينيس تحت العينين — وجهك كيبان متعب حتى بعد نوم كافي. والستريس كيزيد الحال سوأ.",
        accent: "#B8617A",
        bg: "#FEF0F3",
      },
      {
        icon: AlertCircle,
        text: "الكونسيلر مكيخدمش بصح لأن محيط العين جاف — كيبان ناشف وكيبان أسوأ بدل ما يغطي. المشكل مكاينش في الكونسيلر.",
        accent: "#C49A5A",
        bg: "#FFF8E8",
      },
      {
        icon: CheckCircle2,
        text: "الكافيين 5% هو الجواب — ينشط محيط العين، يخفف البوفينيس من الصباح، ومع النياسيناميد يضوي الهالات بشكل واضح مع الانتظام.",
        accent: "#5A9A5A",
        bg: "#EDFAE8",
      },
    ],
    moment: "تفيقي الصباح وكتشوفي راسك فالمراية — وتلاحظي أن عينيك كتبانو أكثر انتعاشاً. هاد اللحظة ممكنة.",
  },
  "nura-spf-50": {
    headline: "الشمس كتزيد البقع — وإيكرانك الحالي كيثقل عليك",
    items: [
      {
        icon: Sun,
        text: "كل يوم بلا واقي شمس كتوسّع البقع الداكنة وكتسرّع مظهر الشيخوخة — حتى فالأيام الغيمة. البشرة كتحتاج الحماية يومياً، مو غير فالصيف.",
        accent: "#D4A830",
        bg: "#FFFBE8",
      },
      {
        icon: AlertCircle,
        text: "معظم الإيكرانات كتخلي الوجه زيتوني، كيبان الأثر الأبيض تحت المكياج، وكيثقل التقطير — هادا اللي كيخلي الناس يتخلاو على الحماية.",
        accent: "#B8617A",
        bg: "#FEF0F3",
      },
      {
        icon: Shield,
        text: "إيكران الشمس ديالنا بمرشحات أوروبية — خفيف، بلا أثر أبيض، وكيشربو الجلد دغيا. آخر خطوة فالروتين الصباحي باش تكوني محمية طول النهار.",
        accent: "#5A9A5A",
        bg: "#EDFAE8",
      },
    ],
    moment: "تخرجي الصباح وتحسي أن روتينك اكتمل — بلا ثقل، بلا أثر أبيض، وبلا قلق من الشمس.",
  },
};

interface Props { product: Product }

export function ProblemSection({ product }: Props) {
  const copy = PROBLEM_COPY[product.slug] ?? PROBLEM_COPY["nura-balance"];
  const editorialImage = PROBLEM_IMAGES[product.slug];
  const packImage = PRODUCT_PACK_IMAGES[product.slug] ?? product.image;

  return (
    <section className="py-12 sm:py-20 bg-white overflow-hidden" dir="rtl">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">

          {/* ── Visual — leads on mobile ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-1"
          >
            {editorialImage ? (
              /* Editorial / concern photo */
              <div className="relative">
                <div className="overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_28px_72px_rgba(92,45,62,0.16)] border border-rose-soft/15">
                  <img
                    src={editorialImage}
                    alt={copy.headline}
                    className="w-full h-auto block object-cover aspect-[4/5] sm:aspect-[3/4]"
                    style={{ objectPosition: "center top" }}
                    loading="lazy"
                  />
                  {/* Subtle bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#2C1810]/20 to-transparent pointer-events-none" />
                </div>

              </div>
            ) : (
              /* Floating product pack-shot for other products */
              <div className="relative">
                <div className="aspect-[4/5] rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.96),rgba(242,224,229,0.72)_46%,rgba(245,240,234,0.95)_100%)] flex items-center justify-center overflow-visible border border-rose-soft/20 shadow-[0_24px_70px_rgba(92,45,62,0.10)]">
                  <motion.img
                    src={packImage}
                    alt={`صورة ${product.name_ar} من نورا سكين`}
                    className="block h-auto w-[200px] sm:w-[220px] object-contain"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    loading="lazy"
                    style={{ filter: "drop-shadow(0 12px 32px rgba(92,45,62,0.22))" }}
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 space-y-5 sm:space-y-6"
          >
            {/* Kicker + headline */}
            <div>
              <p className="text-xs text-rose-mid font-semibold tracking-wider uppercase mb-3">نفهمك</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1810] leading-tight">
                {copy.headline}
              </h2>
            </div>

            {/* Icon paragraphs */}
            <div className="space-y-3">
              {copy.items.map(({ icon: Icon, text, accent, bg }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex items-start gap-3.5 rounded-2xl border border-transparent p-3.5 sm:p-4 transition-colors"
                  style={{ background: bg, borderColor: accent + "22" }}
                >
                  {/* Icon container */}
                  <div
                    className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl shadow-sm mt-0.5"
                    style={{ background: accent + "18", border: `1px solid ${accent}30` }}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: accent }} strokeWidth={1.6} aria-hidden />
                  </div>
                  {/* Text */}
                  <p className="text-[13px] sm:text-sm leading-relaxed text-[#6B5555] flex-1">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Emotional moment */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="border-r-[3px] border-rose-soft bg-rose-blush/60 pr-4 py-3 rounded-r-xl rounded-l-2xl"
            >
              <p className="text-rose-deep font-semibold text-sm italic leading-relaxed">
                &ldquo;{copy.moment}&rdquo;
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

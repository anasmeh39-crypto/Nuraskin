"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";

const PRODUCT_PACK_IMAGES: Record<string, string> = {
  "nura-balance": "/images/products/serum-niacinamide-pack.png",
  "nura-eye-revive": "/images/products/eye-serum-pack.png",
  "nura-night-renewal": "/images/products/retinol-cream-pack.png",
  "nura-spf-50": "/images/products/sunscreen-spf50-pack.png",
};

const PROBLEM_COPY: Record<string, { headline: string; paragraphs: string[]; moment: string }> = {
  "nura-balance": {
    headline: "عندما يبدو اللمعان واضحًا أكثر مما تريدين",
    paragraphs: [
      "عندما تبدو البشرة لامعة أو غير متوازنة، يصبح الروتين اليومي أكثر صعوبة وتشعرين أنك تحاولين إخفاء المشكلة بدل العناية بها.",
      "الكثير من المنتجات تعطي إحساسًا قويًا في البداية، ثم تترك البشرة إما جافة أو لامعة من جديد.",
      "سيروم توازن وإشراقة البشرة بالنياسيناميد صُمم كخطوة يومية لطيفة تدعم مظهر التوازن والصفاء دون قسوة.",
    ],
    moment: "لحظة تنظرين فيها إلى المرآة قبل الخروج وتشعرين براحة أكبر مع مظهر بشرتك.",
  },
  "nura-night-renewal": {
    headline: "لما تنامي تعبانة وتستيقظي تعبانة",
    paragraphs: [
      "الليل هو الوقت الذي تحتاج فيه البشرة إلى الراحة والترطيب، خصوصًا بعد يوم طويل من التعب والعوامل الخارجية.",
      "عندما تستيقظين على بشرة باهتة أو أقل نعومة، يكون الروتين الليلي بحاجة إلى خطوة أكثر عناية.",
      "كريم التجديد الليلي للبشرة صُمم كخطوة ليلية فاخرة تدعم مظهر النعومة والنضارة مع الاستخدام المنتظم.",
    ],
    moment: "لحظة تستيقظين فيها وتشعرين أن بشرتك تبدو أكثر راحة ونعومة.",
  },
  "nura-eye-revive": {
    headline: "واش عندك هاد المشكل؟",
    paragraphs: [
      "ستريس وقلة النعاس باينين تحت عينيك ومخلينك تباني كبر من عمرك؟",
      "الكونسيلر كيبان ناشف ومكيغطيش مزيان حيت محيط العين جاف؟",
      "جربتي بزاف دالبرودويات اللي وعدوك يحيدو الهالات، وما بانتش النتيجة؟",
    ],
    moment: "نيورا سكين صاوبات هاد السيروم باش يعاونك ترجعي النظرة المرتاحة والضو لوجهك، بتركيبة فعالة وبدون إدعاءات زائفة.",
  },
  "nura-spf-50": {
    headline: "حين تحتاجين حماية قوية دون ثقل أو لمعان",
    paragraphs: [
      "الكثير من الواقيات الشمسية تشعرك باللزوجة أو تترك طبقة دهنية تجعل الاستخدام اليومي صعبًا.",
      "التعرض المتكرر للشمس قد يساهم في مظهر البقع الداكنة والجفاف والاحمرار، خصوصًا للبشرة الحساسة أو الجافة.",
      "واقي الشمس اليومي SPF 50 صُمم ليجمع بين الحماية والترطيب والراحة، بتركيبة خفيفة تمتص بسرعة وتكمل روتين الصباح.",
    ],
    moment: "لحظة تخرجين فيها صباحًا وأنتِ مطمئنة أن روتينك اكتمل بخطوة الحماية.",
  },
};

interface Props { product: Product }

export function ProblemSection({ product }: Props) {
  const copy = PROBLEM_COPY[product.slug] || PROBLEM_COPY["nura-balance"];
  const productImage = PRODUCT_PACK_IMAGES[product.slug] ?? product.image;

  return (
    <section className="py-20 bg-white overflow-hidden" dir="rtl">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 md:order-1"
          >
            {product.slug === "nura-eye-revive" ? (
              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-[0_24px_70px_rgba(92,45,62,0.18)] border border-rose-soft/20">
                  <img
                    src="/images/eye-concern-visual.png"
                    alt="علامات التعب حول العين — هالات داكنة، انتفاخ، خطوط دقيقة"
                    className="w-full h-auto block object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Floating review card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute -bottom-5 -end-5 bg-white rounded-2xl shadow-ivory-md p-4 max-w-[190px]"
                >
                  <div className="flex gap-0.5 mb-1.5">
                    {[1,2,3,4,5].map(s => <div key={s} className="w-2.5 h-2.5 rounded-sm bg-rose-soft" />)}
                  </div>
                  <p className="text-[11px] text-[#6B5555] leading-snug">
                    "خفت الهالات بشكل ملحوظ وبدت نظرتي أكثر حيوية"
                  </p>
                  <p className="text-[10px] text-[#9B8A8A] mt-1 font-semibold">أسماء، الرباط</p>
                </motion.div>
              </div>
            ) : (
              <div className="relative">
                <div className="aspect-[4/5] rounded-4xl bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.96),rgba(242,224,229,0.72)_46%,rgba(245,240,234,0.95)_100%)] flex items-center justify-center overflow-visible border border-rose-soft/20 shadow-[0_24px_70px_rgba(92,45,62,0.10)]">
                  <motion.img
                    src={productImage}
                    alt={`صورة ${product.name_ar} من نورا سكين`}
                    className="hero-product-img block h-auto w-[220px] object-contain bg-transparent"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    loading="lazy"
                    style={{ filter: "drop-shadow(0 12px 32px rgba(92,45,62,0.22))" }}
                  />
                </div>
                {/* Floating quote card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute -bottom-5 -end-5 bg-white rounded-2xl shadow-ivory-md p-4 max-w-[180px]"
                >
                  <div className="flex gap-0.5 mb-1.5">
                    {[1,2,3,4,5].map(s => <div key={s} className="w-2.5 h-2.5 rounded-sm bg-rose-soft" />)}
                  </div>
                  <p className="text-[11px] text-[#6B5555] leading-snug">
                    "منتج لطيف يناسب روتيني اليومي"
                  </p>
                  <p className="text-[10px] text-[#9B8A8A] mt-1 font-semibold">مريم، الدار البيضاء</p>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2 space-y-6"
          >
            <div>
              <p className="text-xs text-rose-mid font-semibold tracking-wider uppercase mb-3">
                نفهمك
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810] leading-tight">
                {copy.headline}
              </h2>
            </div>

            <div className="space-y-4">
              {copy.paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-[#6B5555] leading-relaxed text-base"
                >
                  {para}
                </motion.p>
              ))}
              <p className="text-[15px] italic leading-relaxed text-[#8C6E73]">
                "هاد المنتج يشتغل — وكيشتغل بقوة أكثر ضمن روتين متكامل."
              </p>
            </div>

            {/* Emotional moment */}
            <div className="bg-rose-blush border-r-4 border-rose-soft pr-4 py-3 rounded-r-xl rounded-l-2xl">
              <p className="text-rose-deep font-semibold text-sm italic leading-relaxed">
                "{copy.moment}"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { Droplets } from "lucide-react";

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
    headline: "عيونك تحكي قبل ما تتكلمي",
    paragraphs: [
      "محيط العين منطقة دقيقة، وأي مظهر للتعب أو الانتفاخ قد يؤثر على نضارة الوجه بالكامل.",
      "الإخفاء بالمكياج ليس دائمًا كافيًا، لأن هذه المنطقة تحتاج إلى عناية خفيفة ومركزة.",
      "سيروم نضارة محيط العين صُمم بملمس لطيف يدعم مظهر الانتعاش حول العين مع الاستخدام المنتظم.",
    ],
    moment: "لحظة تنظرين إلى عينيك وتلاحظين مظهرًا أكثر هدوءًا وانتعاشًا.",
  },
  "nura-spf-50": {
    headline: "الحماية اليومية هي ما يحافظ على إشراقة الروتين",
    paragraphs: [
      "أشعة الشمس اليومية قد تجعل مظهر البشرة أقل صفاءً، حتى عندما يكون روتين العناية منتظمًا.",
      "واقي الشمس ليس خطوة إضافية ثقيلة؛ بل آخر لمسة صباحية تساعدك على الحفاظ على مظهر البشرة المشرق.",
      "واقي الشمس اليومي SPF 50 صُمم كخطوة خفيفة تكمل روتين الصباح، وخاصة مع العناية الليلية.",
    ],
    moment: "لحظة تخرجين فيها صباحًا وأنتِ مطمئنة أن روتينك اكتمل بخطوة الحماية.",
  },
};

interface Props { product: Product }

export function ProblemSection({ product }: Props) {
  const copy = PROBLEM_COPY[product.slug] || PROBLEM_COPY["nura-balance"];

  return (
    <section className="py-20 bg-white overflow-hidden">
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
            <div className="relative">
              {/* Abstract skin texture placeholder */}
              <div className="aspect-[4/5] rounded-4xl bg-gradient-to-br from-rose-blush to-rose-light flex items-center justify-center overflow-hidden">
                <div className="text-center space-y-4 p-8">
                  <div className="w-24 h-24 rounded-full bg-white/60 backdrop-blur-sm mx-auto flex items-center justify-center">
                    <Droplets className="h-10 w-10 text-rose-deep/65" strokeWidth={1.25} />
                  </div>
                  <p className="text-rose-mid/60 text-xs">صورة البشرة</p>
                </div>
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

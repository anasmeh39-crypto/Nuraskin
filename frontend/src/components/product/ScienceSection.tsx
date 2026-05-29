"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";

const DEFAULT_STATS = [
  { value: "10%", label: "تركيز النياسيناميد", sub: "الحد الأمثل الموثق" },
  { value: "3–4", label: "أسابيع للنتيجة الأولى", sub: "مع الاستخدام المنتظم" },
  { value: "0", label: "مواد ضارة", sub: "بارابين، سيليكون، ألوان صناعية" },
  { value: "100%", label: "شفافية المكونات", sub: "نعلن عن كل ما في التركيبة" },
  { value: "4", label: "منتجات مكملة", sub: "كل وحدة مصممة باش تشتغل مع الأخرى" },
];

const EYE_STATS = [
  { value: "5%", label: "نياسيناميد محيط العين", sub: "نسبة لطيفة لمنطقة حساسة" },
  { value: "1–2", label: "أسابيع للنتيجة الأولى", sub: "مع الاستخدام المنتظم" },
  { value: "0", label: "مواد ضارة", sub: "بارابين، سيليكون، ألوان صناعية" },
  { value: "100%", label: "شفافية المكونات", sub: "نعلن عن كل ما في التركيبة" },
  { value: "4", label: "منتجات مكملة", sub: "كل وحدة مصممة باش تشتغل مع الأخرى" },
];

const NIGHT_STATS = [
  { value: "باكوتشيول", label: "مكوّن التجديد الليلي", sub: "بديل نباتي لطيف ومدروس" },
  { value: "2–3", label: "أسابيع للنتيجة الأولى", sub: "مع الاستخدام المنتظم" },
  { value: "0", label: "مواد ضارة", sub: "بارابين، سيليكون، ألوان صناعية" },
  { value: "100%", label: "شفافية المكونات", sub: "نعلن عن كل ما في التركيبة" },
  { value: "4", label: "منتجات مكملة", sub: "كل وحدة مصممة باش تشتغل مع الأخرى" },
];

const SPF_STATS = [
  { value: "SPF 50", label: "حماية يومية عالية", sub: "ضمن روتين الصباح" },
  { value: "UVA/UVB", label: "حماية واسعة", sub: "فلاتر متعددة الاتجاه" },
  { value: "10%", label: "ألوفيرا", sub: "تهدئة وترطيب" },
  { value: "0%", label: "ملمس دهني ثقيل", sub: "تركيبة خفيفة وسريعة الامتصاص" },
  { value: "4", label: "منتجات مكملة", sub: "كل وحدة مصممة باش تشتغل مع الأخرى" },
];

const FORMULATION_POINTS = [
  {
    title: "تركيبة مدروسة",
    description: "نعتمد على مكونات معروفة في العناية بالبشرة، ونقدمها ضمن روتين واضح وسهل الاستخدام.",
  },
  {
    title: "توازن لطيف",
    description: "نركز على تجربة استخدام مريحة تساعدكِ على الالتزام بالروتين دون ثقل أو تعقيد.",
  },
  {
    title: "بداية تدريجية",
    description: "ننصح دائماً بالبدء تدريجياً وتجربة المنتج على منطقة صغيرة إذا كانت البشرة حساسة.",
  },
  {
    title: "شفافية المكونات",
    description: "نوضح المكونات الرئيسية ودورها حتى تعرفي ما يدخل في روتينكِ اليومي.",
  },
];

interface Props {
  product?: Product;
}

export function ScienceSection({ product }: Props) {
  const isSpf = product?.slug === "nura-spf-50";
  const isEye = product?.slug === "nura-eye-revive";
  const isNight = product?.slug === "nura-night-renewal";
  const stats = isSpf ? SPF_STATS : isEye ? EYE_STATS : isNight ? NIGHT_STATS : DEFAULT_STATS;

  return (
    <section className="py-20 bg-[#1E0F14] overflow-hidden" dir="rtl">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs text-rose-soft font-semibold tracking-wider uppercase mb-3">فلسفة التركيبة</p>
          <h2 className="section-heading text-white">تركيبة صُممت للروتين — مو للاستخدام المنفرد</h2>
          <p className="text-white/60 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            {isSpf
              ? "حماية يومية واضحة، مرطبات مريحة، ولمسة خفيفة تناسب الالتزام الصباحي."
              : "لا ادعاءات طبية — فقط شفافية كاملة في كل ما نضعه ونقوله."}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-14">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-rose-soft mb-2">{stat.value}</div>
              <div className="text-white text-sm font-semibold mb-1">{stat.label}</div>
              <div className="text-white/40 text-xs">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Formulation grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FORMULATION_POINTS.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 bg-white/5 border border-white/10 rounded-3xl p-6"
            >
              <div className="w-10 h-10 rounded-2xl bg-rose-deep/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-rose-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">{point.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-xs mt-10"
        >
          نورا سكين هي منتجات تجميلية — ليست أدوية. النتائج تختلف من شخص لآخر.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-2xl text-center text-[13px] leading-6 text-white/50"
        >
          كل منتج في النظام اختير بعناية باش يكمل الآخر — مو يكرر دوره.
        </motion.p>
      </div>
    </section>
  );
}

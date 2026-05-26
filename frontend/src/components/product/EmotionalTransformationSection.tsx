"use client";

import React from "react";
import { motion } from "framer-motion";

const MOMENTS = [
  {
    icon: "🌙",
    title: "قبل النوم",
    text: "تحسي براحة وأنتي داخلة للنوم — عارفة أنك خدمتي على بشرتك. مو توتر، مو ندم. غير طقس هادئ قبل الراحة.",
  },
  {
    icon: "☀️",
    title: "فاشيا في الصباح",
    text: "تلمسي وجهك وتحسي بملمس أنعم. البشرة أكثر توازناً — حتى قبل ما تشوفي نفسك في المرآة.",
  },
  {
    icon: "✨",
    title: "وأنتي خارجة",
    text: "تخرجي بدون ما تفكري كثير في ماكياج. مو لأن بشرتك كاملة — لأنك بدأتي تثقي فيها.",
  },
];

export function EmotionalTransformationSection() {
  return (
    <section className="bg-[#F5F0EA] py-20" dir="rtl">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="luxury-kicker mx-auto mb-3 w-fit">تخيلي</p>
          <h2 className="section-heading text-[#5C2D3E]">كيف تحسي بجلدتك بعد روتين ثابت</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {MOMENTS.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[20px] border border-[#5C2D3E]/12 bg-[#FEFCF9] p-7 text-right shadow-[0_16px_45px_rgba(92,45,62,0.06)]"
            >
              <div className="mb-5 text-center text-5xl text-[#C4788A]" aria-hidden>{item.icon}</div>
              <h3 className="text-lg font-medium text-[#5C2D3E]">{item.title}</h3>
              <p className="mt-3 text-sm leading-[1.9] text-[#8C6E73]">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";

const TRUST_PILLARS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10.5c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
      </svg>
    ),
    title: "الدفع عند الاستلام",
    description: "لا يوجد دفع مسبق. تستلمين طلبك أولًا، ثم تدفعين قيمته عند الاستلام.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "توصيل مجاني لجميع أنحاء المغرب",
    description: "نوصل لجميع مدن المغرب دون رسوم توصيل إضافية. سائق التوصيل يتصل بك قبل الوصول لتأكيد الموعد.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: "إرجاع مجاني 14 يوم",
    description: "إذا لم يعجبك المنتج لأي سبب — تواصلي معنا ونرتب الإرجاع مجاناً. بدون أسئلة معقدة.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "مكونات شفافية 100%",
    description: "نُعلن عن كل مكوّن رئيسي بتركيزه الدقيق. لا مكونات مخفية، لا ادعاءات مبالغ فيها.",
  },
];

const BRAND_VALUES = [
  { title: "مناسب لروتينك اليومي", desc: "خطوات واضحة وتوقعات واقعية" },
  { title: "معرفة واضحة", desc: "كل مكوّن له دور مفهوم داخل التركيبة" },
  { title: "شفافية كاملة", desc: "نشرح الاستخدام والنتائج بلغة واقعية" },
];

export function TrustAuthoritySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs text-rose-mid font-semibold tracking-wider uppercase mb-3">لماذا نورا سكين</p>
          <h2 className="section-heading text-[#2C1810]">ثقتك أهم من أي بيع</h2>
          <p className="text-[#6B5555] mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            بنينا كل خطوة في رحلتك معنا على أساس الثقة — من الطلب إلى الاستلام إلى الاستخدام.
          </p>
        </motion.div>

        {/* Trust pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {TRUST_PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 p-6 bg-ivory rounded-3xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-light flex items-center justify-center text-rose-deep shrink-0">
                {pillar.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#2C1810] mb-2">{pillar.title}</h3>
                <p className="text-[#6B5555] text-sm leading-relaxed">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-rose-blush rounded-4xl p-8 border border-rose-soft/20"
        >
          <h3 className="text-center font-bold text-rose-deep text-xl mb-8">
            لماذا نورا سكين مختلفة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRAND_VALUES.map((v, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 rounded-full border border-rose-soft bg-white" />
                <h4 className="font-bold text-[#2C1810] mb-1">{v.title}</h4>
                <p className="text-[#6B5555] text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

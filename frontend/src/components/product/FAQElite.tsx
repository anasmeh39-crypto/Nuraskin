"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";

const BASE_FAQS = [
  {
    q: "هل المنتج مناسب لبشرتي الحساسة؟",
    a: "نعم — صُممت التركيبة لتكون لطيفة بما يكفي لمعظم أنواع البشرة بما فيها الحساسة. نوصي بتجربة كمية صغيرة على منطقة صغيرة أولاً خلال 24 ساعة.",
  },
  {
    q: "كيف أستخدم المنتج بشكل صحيح؟",
    a: "بعد التنظيف، ضعي كمية صغيرة من المنتج على وجهك وانشريها برفق. يُستخدم صباحاً و/أو مساءً حسب توجيهات كل منتج. الانتظام هو المفتاح.",
  },
  {
    q: "متى سأبدأ في ملاحظة فارق؟",
    a: "معظم المستخدمات يلاحظن تحسناً في مظهر البشرة خلال 2–4 أسابيع من الاستخدام المنتظم. الفارق الكامل يتطلب شهراً إلى شهرين من الاستخدام المستمر.",
  },
  {
    q: "هل يمكنني استخدام المنتج مع منتجاتي الحالية؟",
    a: "نعم في الغالب — المنتجات مصممة لتكون متوافقة مع معظم الروتينات. تجنبي الجمع مع AHA/BHA بنسب عالية في نفس الوقت إذا كانت بشرتك حساسة.",
  },
  {
    q: "ما هو نظام الدفع والتوصيل؟",
    a: "الدفع يتم عند الاستلام فقط، دون أي دفع مسبق. التوصيل مجاني لجميع أنحاء المغرب، ويتواصل فريقنا معك لتأكيد الطلب قبل الإرسال.",
  },
  {
    q: "ماذا لو لم يناسبني المنتج؟",
    a: "لدينا سياسة إرجاع مجانية 14 يوماً. إذا لم يعجبك المنتج لأي سبب، تواصلي معنا وسنرتب الإرجاع بدون تعقيدات.",
  },
];

const PRODUCT_FAQS: Record<string, { q: string; a: string }[]> = {
  "nura-balance": [
    {
      q: "هل سيروم توازن وإشراقة البشرة بالنياسيناميد يُجفف البشرة؟",
      a: "لا — على العكس تماماً. تركيبة الناياسيناميد 10% مُوازَنة مع مرطبات خفيفة لضمان أن بشرتك تبقى ناعمة وليست جافة.",
    },
    {
      q: "هل يمكن استخدامه صباحاً ومساءً؟",
      a: "نعم يمكن — لكن نوصي البدء باستخدامه مرة يومياً أولاً ثم زيادة التكرار حسب تحمّل بشرتك.",
    },
  ],
  "nura-night-renewal": [
    {
      q: "هل كريم التجديد الليلي للبشرة ثقيل على البشرة؟",
      a: "لا — تركيبته خفيفة وتُمتَص بسرعة. الشعور يكون بالنعومة لا بالدهنية.",
    },
    {
      q: "هل يمكنني استخدامه مع الريتينول؟",
      a: "نوصي بعدم الجمع مع الريتينول في نفس الوقت. يمكنك استخدامهما في أيام متناوبة إذا أردتِ.",
    },
  ],
  "nura-eye-revive": [
    {
      q: "هل سيروم العين آمن على الجفون؟",
      a: "نعم — صُمِّم خصيصاً للمنطقة الحساسة حول العين. تجنبي الدخول المباشر في العين.",
    },
    {
      q: "هل يساعد على الهالات الداكنة العميقة؟",
      a: "يساعد على تحسين مظهر المنطقة حول العين مع الاستخدام المنتظم — لكن الهالات العميقة جداً قد تحتاج وقتاً أطول.",
    },
  ],
};

interface FAQItemProps {
  q: string;
  a: string;
  idx: number;
}

function FAQItem({ q, a, idx }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.06 }}
      className="border-b border-border last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right flex items-center justify-between gap-4 py-5 hover:text-rose-deep transition-colors"
      >
        <span className="font-semibold text-[#2C1810] text-sm leading-snug">{q}</span>
        <div className={`w-6 h-6 rounded-full border border-border flex items-center justify-center shrink-0 transition-all duration-200 ${
          open ? "bg-rose-deep border-rose-deep rotate-45" : "bg-white"
        }`}>
          <svg className={`w-3 h-3 transition-colors ${open ? "text-white" : "text-[#9B8A8A]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-[#6B5555] text-sm leading-relaxed pb-5">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface Props { product: Product }

export function FAQElite({ product }: Props) {
  const productFAQs = PRODUCT_FAQS[product.slug] || [];
  const allFAQs = [...productFAQs, ...BASE_FAQS];

  return (
    <section className="py-20 bg-ivory">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs text-rose-mid font-semibold tracking-wider uppercase mb-3">أسئلة شائعة</p>
          <h2 className="section-heading text-[#2C1810]">كل ما تريدين معرفته</h2>
          <p className="text-[#6B5555] mt-3 max-w-md mx-auto text-sm leading-relaxed">
            نجيب على أسئلتك بصدق وشفافية — لأن ثقتك أهم من إقناعك بالشراء.
          </p>
        </motion.div>

        <div className="bg-white rounded-4xl border border-border p-6 md:p-8">
          {allFAQs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} idx={i} />
          ))}
        </div>

        {/* Contact prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-[#9B8A8A] text-sm">
            سؤال آخر؟{" "}
            <a href="/contact" className="text-rose-deep font-semibold hover:underline">
              تواصلي معنا
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

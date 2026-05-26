"use client";

import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const PRODUCT_PACK_IMAGES: Record<string, string> = {
  "nura-balance": "/images/products/serum-niacinamide-pack.png",
  "nura-eye-revive": "/images/products/eye-serum-pack.png",
  "nura-night-renewal": "/images/products/retinol-cream-pack.png",
  "nura-spf-50": "/images/products/sunscreen-spf50-pack.png",
};

function StepProduct({
  src,
  alt,
  label,
  text,
  dark = false,
}: {
  src: string;
  alt: string;
  label: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 rounded-[18px] border p-4 ${dark ? "border-white/12 bg-white/8" : "border-[#5C2D3E]/10 bg-white/70"}`}>
      <div className="relative flex h-20 w-16 shrink-0 items-end justify-center overflow-visible">
        <img
          src={src}
          alt={alt}
          className="block h-auto w-[58px] object-contain bg-transparent"
          style={{ filter: dark ? "drop-shadow(0 8px 18px rgba(196,120,138,0.34))" : "drop-shadow(0 6px 14px rgba(92,45,62,0.16))" }}
          loading="lazy"
        />
      </div>
      <div>
        <h3 className={`text-base font-bold ${dark ? "text-white" : "text-[#5C2D3E]"}`}>{label}</h3>
        <p className={`mt-1 text-sm leading-7 ${dark ? "text-white/70" : "text-[#8C6E73]"}`}>{text}</p>
      </div>
    </div>
  );
}

export function RoutineEducationSection() {
  return (
    <section className="bg-[#F5F0EA] py-20" dir="rtl">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="luxury-kicker mx-auto mb-3 w-fit">روتين متكامل</p>
          <h2 className="section-heading text-[#5C2D3E]">بشرتك ما كتحتاجش منتج واحد — كتحتاج نظام</h2>
          <p className="mt-3 text-sm leading-7 text-[#8C6E73]">كل منتج عنده دور محدد. كيلاقيو مع بعضياتهم، النتيجة كتبان.</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[24px] border border-[#5C2D3E]/10 bg-[linear-gradient(135deg,#FDF8F2_0%,#F9F0E8_100%)] p-5 shadow-[0_20px_55px_rgba(92,45,62,0.08)] md:p-7"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C4788A] shadow-sm">
                <Sun className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#5C2D3E]">روتين الصباح</h3>
                <p className="text-sm text-[#8C6E73]">حماية، إشراقة، استعداد للنهار</p>
              </div>
            </div>

            <div className="space-y-3">
              <StepProduct
                src={PRODUCT_PACK_IMAGES["nura-balance"]}
                alt="سيروم النياسيناميد في روتين الصباح"
                label="النياسيناميد"
                text="يوازن البشرة ويمنحها إشراقة طبيعية قبل ما تخرجي"
              />
              <div className="text-center text-2xl font-bold text-[#C4788A]" aria-hidden>↓</div>
              <StepProduct
                src={PRODUCT_PACK_IMAGES["nura-spf-50"]}
                alt="واقي الشمس SPF 50 في روتين الصباح"
                label="واقي الشمس SPF 50"
                text="يحمي هاد الإشراقة من الشمس طول النهار"
              />
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,#1E1018_0%,#2D1525_100%)] p-5 shadow-[0_24px_65px_rgba(30,15,20,0.22)] md:p-7"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#F2E0E5] shadow-sm">
                <Moon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">روتين الليل</h3>
                <p className="text-sm text-white/62">تجديد، راحة، إصلاح أثناء النوم</p>
              </div>
            </div>

            <div className="space-y-3">
              <StepProduct
                src={PRODUCT_PACK_IMAGES["nura-eye-revive"]}
                alt="سيروم محيط العين في روتين الليل"
                label="سيروم محيط العين"
                text="قبل النوم مباشرة — المنطقة الأكثر حساسية كتحتاج عناية خاصة"
                dark
              />
              <div className="text-center text-2xl font-bold text-[#F2E0E5]" aria-hidden>↓</div>
              <StepProduct
                src={PRODUCT_PACK_IMAGES["nura-night-renewal"]}
                alt="كريم الريتينول في روتين الليل"
                label="كريم الريتينول"
                text="يجدد الخلايا وأنت نايمة — الليل هو وقت الإصلاح الحقيقي"
                dark
              />
            </div>
          </motion.article>
        </div>

        <div className="mt-8 rounded-[22px] border border-[#5C2D3E]/10 bg-[#FEFCF9] px-5 py-8 text-center shadow-[0_16px_45px_rgba(92,45,62,0.06)]">
          <h3 className="font-serif text-2xl font-bold text-[#5C2D3E] md:text-3xl">الاتساق هو السر — مو المنتج الواحد</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-[#8C6E73]">
            بشرة متوازنة ومشرقة مو نتيجة يوم واحد. هي نتيجة روتين منتظم.
          </p>
        </div>
      </div>
    </section>
  );
}

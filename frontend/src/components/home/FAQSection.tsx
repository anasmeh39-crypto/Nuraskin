"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    q: "كيفاش يتم الدفع؟",
    a: 'الدفع عند الاستلام فقط — ما تدفعي حتى درهم حتى يوصلك الطلب بأمان. هاد الطريقة نختارها لأننا نوثق فيك.',
  },
  {
    q: "كم من الوقت يستغرق التوصيل؟",
    a: 'عادةً 2–4 أيام عمل في جميع أنحاء المغرب. غادي يتصل بيك السائق قبل التوصيل لتأكيد الموعد.',
  },
  {
    q: "واش يمكنني إرجاع المنتج إذا ما عجبنيش؟",
    a: 'نعم — الإرجاع مجاني وسهل خلال 14 يوم من تاريخ الاستلام. تواصلي معنا وغادي نرتبوا معك.',
  },
  {
    q: "علاش الناياسيناميد مزيان للبشرة؟",
    a: 'الناياسيناميد (فيتامين B3) مكوّن مدروس علمياً يساعد على توحيد مظهر البشرة، تخفيف اللمعان، وتضييق مظهر المسام. نستخدمه بتركيز 10% في نيورا بالانس.',
  },
  {
    q: "واش المنتجات مناسبة لجميع أنواع البشرة؟",
    a: 'نعم — صممنا كل منتج يكون مناسباً لأكثر أنواع البشرة. إذا عندك حساسية خاصة، اقرأي قائمة المكونات قبل الاستخدام.',
  },
  {
    q: "هل يمكن استخدام المنتجات مع منتجات أخرى؟",
    a: 'نعم، المنتجات مصممة لتتناسب مع روتينك الحالي. نيورا بالانس يُستخدم بعد التنظيف، ثم كريم الترطيب، ثم واقي الشمس صباحاً.',
  },
  {
    q: "واش الشحن مجاني؟",
    a: 'الشحن مجاني للطلبيات فوق 300 درهم. للطلبيات الأصغر، الشحن يكلف 30 درهم فقط.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-wide max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="section-heading">أسئلة شائعة</h2>
          <p className="section-subheading">
            إذا كان عندك سؤال آخر، تواصلي معنا مباشرة.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-border rounded-2xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-right bg-white hover:bg-cream transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-brand-deep text-base">
                  {faq.q}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === i && (
                <div className="px-5 pb-5 bg-white">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

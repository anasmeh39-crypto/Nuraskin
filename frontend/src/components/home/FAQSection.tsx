"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    q: "كيف تتم عملية الدفع؟",
    a: "راحتكِ وثقتكِ أولويتنا، لذلك نوفر خدمة الدفع عند الاستلام فقط. لن تدفعي شيئاً حتى تتأكدي من استلام طلبكِ بيدكِ.",
  },
  {
    q: "كم يستغرق توصيل الطلب؟",
    a: "نحرص على وصول منتجاتكِ بوضوح وراحة. التوصيل مجاني لجميع أنحاء المغرب، وسيتواصل معكِ مندوب التوصيل لتأكيد الموعد المناسب لكِ.",
  },
  {
    q: "هل يمكنني إرجاع المنتج؟",
    a: "بكل تأكيد. نقدم لكِ سياسة إرجاع مجانية وميسّرة خلال 14 يوماً من الاستلام، شرط أن يكون المنتج في حالته الأصلية.",
  },
  {
    q: "ما الذي يُميز النياسيناميد في منتجاتكم؟",
    a: "نستخدم النياسيناميد (فيتامين B3) بتركيز علمي دقيق 10%. هذا المكوّن الفعّال يعمل بلطف على توحيد لون البشرة، تلطيف مظهر اللمعان، وتحسين قوام المسام لتنعمي ببشرة صافية.",
  },
  {
    q: "هل تناسب منتجات نورا سكين جميع أنواع البشرة؟",
    a: "نعم، صُممت تركيباتنا بعناية لتتلاءم مع معظم أنواع البشرة بما فيها الحساسة. مع ذلك، ننصح دائماً بقراءة قائمة المكونات قبل الاستخدام.",
  },
  {
    q: "كيف يمكنني دمج المنتجات في روتيني الحالي؟",
    a: "بسهولة تامة. يُستخدم سيروم سيروم توازن وإشراقة البشرة بالنياسيناميد بعد تنظيف البشرة مباشرة، ثم يُتبع بكريم الترطيب. ولا تنسي واقي الشمس في روتينكِ الصباحي لحماية مضاعفة.",
  },
  {
    q: "هل التوصيل مجاني؟",
    a: "نعم، التوصيل مجاني لجميع أنحاء المغرب مع الدفع عند الاستلام.",
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

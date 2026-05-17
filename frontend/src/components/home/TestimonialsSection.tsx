import React from "react";
import { StarRating } from "@/components/ui/StarRating";

const testimonials = [
  {
    name: "ياسمين ب.",
    city: "الدار البيضاء",
    rating: 5,
    text: "جربت منتجات كثيرة وما خدمات معايا — نيورا بالانس هو الأول اللي شفت فارقاً حقيقياً في لمعان بشرتي.",
    product: "نيورا بالانس",
  },
  {
    name: "سارة م.",
    city: "الرباط",
    rating: 5,
    text: "كريم الليل هدا غيّر روتيني كلياً. بشرتي في الصباح ولات أنعم وأكثر إشراقاً — بفرق ملحوظ.",
    product: "نيورا رينيو الليلي",
  },
  {
    name: "أسماء ح.",
    city: "مراكش",
    rating: 5,
    text: "الهالات تحت عيني كانت تضايقني بزاف — بعد ثلاثة أسابيع بدا الفرق واضح. عيوني ولات تبان أكثر حياة.",
    product: "نيورا آي ريفايف",
  },
  {
    name: "مريم ق.",
    city: "أكادير",
    rating: 5,
    text: "الطقم الكامل هو أحسن استثمار في بشرتي. صباحاً وليلاً — فارق واضح بعد شهر.",
    product: "الروتين الذهبي",
  },
  {
    name: "خديجة أ.",
    city: "فاس",
    rating: 4,
    text: "منتج مصري محلي بجودة عالية — ما كنت نتوقع الفارق يكون هكدا بسرعة.",
    product: "نيورا بالانس",
  },
  {
    name: "إيمان ف.",
    city: "طنجة",
    rating: 5,
    text: "الدفع عند الاستلام كان ضروري ليا نجرب — ووصل في 3 أيام. المنتج كيخدم وكيبان فارقه.",
    product: "نيورا رينيو الليلي",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="section-heading">قالوا عن نيورا</h2>
          <p className="section-subheading max-w-xl mx-auto">
            مش إعلانات — تجارب حقيقية من نساء مغربيات جربن المنتج.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <StarRating rating={5} size="md" />
            <span className="text-gray-600 text-sm">4.9 من 5 • +312 تقييم</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-bold text-brand-deep">{t.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{t.city}</div>
                </div>
                <StarRating rating={t.rating} />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">"{t.text}"</p>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs text-gold font-medium">{t.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { StarRating } from "@/components/ui/StarRating";

const testimonials = [
  {
    name: "ياسمين ب.",
    city: "الدار البيضاء",
    rating: 5,
    text: "أحببت نعومة التركيبة. أصبحت بشرتي تبدو أكثر توازناً وأقل لمعاناً مع الاستعمال المنتظم.",
    product: "سيروم توازن وإشراقة البشرة بالنياسيناميد",
  },
  {
    name: "سارة م.",
    city: "الرباط",
    rating: 5,
    text: "كريم الليل أصبح خطوة ثابتة في روتيني. أستيقظ ببشرة أكثر راحة ونعومة.",
    product: "كريم ريتينول الليلي لتجديد البشرة",
  },
  {
    name: "أسماء ح.",
    city: "مراكش",
    rating: 5,
    text: "سيروم العين خفيف وسريع الامتصاص، ومنح نظرتي مظهراً أكثر انتعاشاً.",
    product: "سيروم نضارة محيط العين",
  },
  {
    name: "مريم ق.",
    city: "أكادير",
    rating: 5,
    text: "المجموعة الكاملة جعلت روتيني أسهل وأكثر انتظاماً. أشعر أن بشرتي تبدو أكثر صفاءً.",
    product: "الروتين الذهبي",
  },
  {
    name: "خديجة أ.",
    city: "فاس",
    rating: 4,
    text: "علامة راقية وتفاصيلها توحي بالثقة. أحببت وضوح المكونات وطريقة الشرح.",
    product: "سيروم توازن وإشراقة البشرة بالنياسيناميد",
  },
  {
    name: "إيمان ف.",
    city: "طنجة",
    rating: 5,
    text: "خدمة الدفع عند الاستلام جعلت التجربة مريحة. وصل الطلب بسرعة وبشكل أنيق.",
    product: "كريم ريتينول الليلي لتجديد البشرة",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="luxury-kicker mx-auto mb-4 w-fit">ثقة وتجارب</p>
          <h2 className="section-heading">انطباعات من عميلات نورا سكين</h2>
          <p className="section-subheading max-w-xl mx-auto">
            مراجعات طبيعية وهادئة، تركز على الإحساس، الانتظام، ومظهر البشرة مع الوقت.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <StarRating rating={5} size="md" />
            <span className="text-gray-600 text-sm">4.9 من 5 • +312 تقييم</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="premium-card rounded-[2rem] p-6">
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

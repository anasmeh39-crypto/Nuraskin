import React from "react";

const pillars = [
  {
    icon: "🔬",
    title: "تركيبة مدروسة",
    description: "كل مكوّن في منتجاتنا اخترناه بعناية — نعرف شنو يدير ولماذا.",
  },
  {
    icon: "🌿",
    title: "شفافية كاملة",
    description: "نعلن عن كل مكوّن رئيسي بتركيزه — بدون أسرار، بدون ادعاءات.",
  },
  {
    icon: "🇲🇦",
    title: "للبشرة المغربية",
    description: "صممناها لمناخ المغرب وأنواع البشرة المغربية — مش ترجمة لمنتج أجنبي.",
  },
  {
    icon: "💬",
    title: "بدون وعود زائفة",
    description: "نتكلم بصدق — عناية جيدة تبيّن فارقها بالوقت، مش بليلة وضحاها.",
  },
];

export function AuthoritySection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">
            Nama Beauty
          </p>
          <h2 className="section-heading">علاش نيورا سكين؟</h2>
          <p className="section-subheading max-w-xl mx-auto">
            مش كل المنتجات المستوردة صممت للبشرة المغربية. نيورا مختلفة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="p-6 bg-cream rounded-3xl flex flex-col gap-3"
            >
              <span className="text-3xl">{p.icon}</span>
              <h3 className="font-bold text-brand-deep text-lg">{p.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

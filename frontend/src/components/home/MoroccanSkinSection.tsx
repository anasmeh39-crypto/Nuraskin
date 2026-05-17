import React from "react";

const concerns = [
  {
    emoji: "☀️",
    title: "الشمس المغربية",
    description: "الشمس القوية، خاصة في الصيف والمناطق الجنوبية، تؤثر على مظهر البشرة وتوحيدها.",
    solution: "نيورا بالانس",
    solutionSlug: "nura-balance",
  },
  {
    emoji: "😴",
    title: "التعب والنوم القليل",
    description: "الحياة المغربية مليانة التزامات — البشرة تحكي ما بقاش فيك من طاقة.",
    solution: "نيورا رينيو الليلي",
    solutionSlug: "nura-night-renewal",
  },
  {
    emoji: "👁️",
    title: "الهالات والانتفاخ",
    description: "هالات الصبح، انتفاخ العين — مشكلة يشاركها الكثير من النساء المغربيات.",
    solution: "نيورا آي ريفايف",
    solutionSlug: "nura-eye-revive",
  },
  {
    emoji: "💧",
    title: "المسام والدهنية",
    description: "المناخ الرطب، خاصة في الساحل، يزيد من اللمعان واتساع مظهر المسام.",
    solution: "نيورا بالانس",
    solutionSlug: "nura-balance",
  },
];

export function MoroccanSkinSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="section-heading">مشاكل تعرفيها كويس</h2>
          <p className="section-subheading max-w-xl mx-auto">
            صممنا نيورا لأن البشرة المغربية لها احتياجات خاصة — مش مجرد ترجمة لمنتج أوروبي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {concerns.map((c) => (
            <div
              key={c.title}
              className="flex gap-5 p-6 bg-cream rounded-3xl items-start"
            >
              <div className="text-4xl shrink-0">{c.emoji}</div>
              <div>
                <h3 className="font-bold text-brand-deep text-lg mb-1">
                  {c.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {c.description}
                </p>
                <a
                  href={`/products/${c.solutionSlug}`}
                  className="text-brand-deep text-sm font-semibold underline underline-offset-2 hover:text-brand-mid transition-colors"
                >
                  الحل: {c.solution} ←
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

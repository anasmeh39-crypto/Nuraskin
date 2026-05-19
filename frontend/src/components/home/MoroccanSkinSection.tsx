import React from "react";
import { Eye, Moon, Sparkles } from "lucide-react";

const concerns = [
  {
    icon: Sparkles,
    title: "بهتان البشرة وتفاوت اللون",
    description: "حين تفقد البشرة صفاءها الطبيعي، يصبح الروتين الذكي هو الطريق الأقصر لاستعادة الإشراقة الهادئة.",
    solution: "سيروم توازن وإشراقة البشرة بالنياسيناميد",
    solutionSlug: "nura-balance",
  },
  {
    icon: Eye,
    title: "مظهر متعب تحت العين",
    description: "محيط العينين يكشف التعب بسرعة. لذلك يحتاج إلى عناية لطيفة ومركّزة تمنح النظرة انتعاشاً واضحاً.",
    solution: "سيروم نضارة محيط العين",
    solutionSlug: "nura-eye-revive",
  },
  {
    icon: Moon,
    title: "بشرة ليلية فاقدة للحيوية",
    description: "بعد يوم طويل، تحتاج البشرة إلى لحظة تجديد ناعمة تدعم مظهرها الصحي عند الاستيقاظ.",
    solution: "كريم التجديد الليلي للبشرة",
    solutionSlug: "nura-night-renewal",
  },
];

export function MoroccanSkinSection() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="section-heading">نصغي لاحتياجات بشرتكِ</h2>
          <p className="section-subheading max-w-xl mx-auto">
            نختار خطوات عناية واضحة تساعد بشرتكِ على الحفاظ على توازنها وإشراقتها دون تعقيد.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concerns.map((c) => {
            const Icon = c.icon;
            return (
            <div
              key={c.title}
              className="premium-card rounded-[2rem] p-7"
            >
              <div>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-light text-brand-mid">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-brand-deep text-xl mb-2">
                  {c.title}
                </h3>
                <p className="text-gray-600 text-sm leading-7 mb-5">
                  {c.description}
                </p>
                <a
                  href={`/products/${c.solutionSlug}`}
                  className="text-brand-deep text-sm font-semibold underline underline-offset-2 hover:text-brand-mid transition-colors"
                >
                  الروتين المناسب: {c.solution} ←
                </a>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

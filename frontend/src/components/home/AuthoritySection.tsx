import React from "react";
import { Droplets, FlaskConical, Leaf, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: FlaskConical,
    title: "صياغة علمية دقيقة",
    description: "نختار كل مكوّن بناءً على دراسات علمية مثبتة، لنضمن لكِ الفعالية والأمان المطلق.",
  },
  {
    icon: Leaf,
    title: "شفافية مطلقة",
    description: "نشارككِ تفاصيل مكوناتنا وتراكيزها بوضوح، لتكوني على دراية تامة بما يلامس بشرتكِ.",
  },
  {
    icon: Droplets,
    title: "لخصوصية بشرتكِ",
    description: "تركيباتنا صُممت خصيصاً لتتلاءم مع طبيعة مناخ المغرب واحتياجات بشرتكِ اليومية.",
  },
  {
    icon: ShieldCheck,
    title: "نتائج حقيقية",
    description: "لا نعد بالمعجزات، بل نقدم لكِ عناية مدروسة تبرز إشراقتكِ وجمالكِ بمرور الوقت.",
  },
];

export function AuthoritySection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-gold font-semibold text-sm tracking-wider uppercase mb-3">NURA SKIN</p>
          <h2 className="section-heading">لماذا نورا سكين؟</h2>
          <p className="section-subheading max-w-xl mx-auto">
            نؤمن بأن بشرتكِ تستحق الأفضل. لذلك، نقدم لكِ عناية تتجاوز الوعود لتمنحكِ تجربة فاخرة ونتائج ملموسة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="premium-card p-7 rounded-[2rem] flex flex-col gap-4"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-mid">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="font-bold text-brand-deep text-xl">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

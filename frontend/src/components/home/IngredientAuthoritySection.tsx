import React from "react";
import { Beaker, Moon, Sparkles } from "lucide-react";

const ingredients = [
  {
    icon: Beaker,
    name: "Niacinamide 10%",
    title: "لتوازن البشرة وصفاء المسام",
    text: "مكوّن معروف في العناية الحديثة بالبشرة، يساعد على تحسين مظهر اللون واللمعان بطريقة لطيفة ومتدرجة.",
  },
  {
    icon: Moon,
    name: "Retinol-style Renewal + Peptides",
    title: "لتجديد مظهر البشرة ليلاً",
    text: "ثنائي ناعم يدعم روتين المساء، ويمنح البشرة إحساساً أكثر راحة وملمساً أكثر نعومة مع الاستعمال المنتظم.",
  },
  {
    icon: Sparkles,
    name: "Caffeine + Vitamin K2",
    title: "لإشراقة محيط العينين",
    text: "تركيبة خفيفة صُممت لمظهر الهالات والانتفاخات، مع امتصاص سريع يناسب روتين الصباح والمساء.",
  },
];

export function IngredientAuthoritySection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-wide">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="luxury-kicker mx-auto mb-4 w-fit">ثقة قائمة على المكونات</p>
          <h2 className="section-heading">علم واضح، عناية ناعمة</h2>
          <p className="section-subheading">
            لا نعتمد على الوعود الكبيرة. نختار مكونات مفهومة وفعّالة ونشرح لكِ دورها ببساطة.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {ingredients.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="premium-card rounded-[2rem] p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-light text-brand-mid">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <p className="mb-2 text-sm font-semibold text-gold">{item.name}</p>
                <h3 className="mb-3 text-xl font-bold text-brand-deep">{item.title}</h3>
                <p className="text-sm leading-7 text-gray-600">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

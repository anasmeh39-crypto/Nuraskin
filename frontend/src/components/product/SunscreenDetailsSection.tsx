"use client";

import { AlertTriangle, CheckCircle2, Leaf, ShieldCheck, Sparkles, SunMedium } from "lucide-react";
import { motion } from "framer-motion";

const INGREDIENT_ROWS = [
  {
    phase: "فلاتر شمسية",
    ingredient: "Tinosorb S",
    concentration: "5%",
    functionAr: "واقي من أشعة UVA + UVB",
  },
  {
    phase: "فلاتر شمسية",
    ingredient: "Uvinul A Plus",
    concentration: "3%",
    functionAr: "واقي من أشعة UVA طويلة المدى",
  },
  {
    phase: "فلاتر شمسية",
    ingredient: "Uvinul T150",
    concentration: "4%",
    functionAr: "واقي من أشعة UVB",
  },
  {
    phase: "فلاتر شمسية",
    ingredient: "Mexoryl SX",
    concentration: "2%",
    functionAr: "واقي من أشعة UVA",
  },
  {
    phase: "المرحلة الزيتية",
    ingredient: "Caprylic/Capric Triglyceride",
    concentration: "5%",
    functionAr: "زيت خفيف مشتق من جوز الهند",
  },
  {
    phase: "المرحلة الزيتية",
    ingredient: "Shea Butter",
    concentration: "3%",
    functionAr: "تغذية وترطيب",
  },
  {
    phase: "المرحلة الزيتية",
    ingredient: "Vegetal Squalane",
    concentration: "2%",
    functionAr: "ملطف غير مسبب لانسداد المسام",
  },
  {
    phase: "مرطبات وعوامل مهدئة",
    ingredient: "Aloe Vera Extract",
    concentration: "10%",
    functionAr: "مهدئ ومرطب للبشرة",
  },
  {
    phase: "مرطبات وعوامل مهدئة",
    ingredient: "Niacinamide",
    concentration: "4%",
    functionAr: "يدعم توحيد لون البشرة وتقليل مظهر البقع",
  },
  {
    phase: "مرطبات وعوامل مهدئة",
    ingredient: "Panthenol",
    concentration: "2%",
    functionAr: "مهدئ ومجدد للبشرة",
  },
  {
    phase: "مرطبات وعوامل مهدئة",
    ingredient: "Glycerin",
    concentration: "4%",
    functionAr: "مرطب طبيعي",
  },
  {
    phase: "مرطبات وعوامل مهدئة",
    ingredient: "Hyaluronic Acid",
    concentration: "0.5%",
    functionAr: "ترطيب عميق للبشرة",
  },
  {
    phase: "أخرى",
    ingredient: "Vitamin E",
    concentration: "1%",
    functionAr: "مضاد للأكسدة",
  },
];

const TARGETS = [
  "البشرة الحساسة أو الجافة",
  "من يتعرضون للشمس لفترات طويلة مثل السفر، الشاطئ، أو الرياضة",
  "من تبحث عن واقٍ خفيف غير دهني لا يسد المسام",
];

const SELLING_POINTS = [
  "يحمي، يرطب، ويمنح لمسة ناعمة غير لامعة",
  "مدعّم بمضادات أكسدة ومكونات مرطبة ومهدئة",
  "مناسب للاستخدام اليومي وللبشرة الحساسة عند استعماله حسب التوجيهات",
];

const PROBLEMS = [
  "تهيج الجلد بسبب بعض الواقيات الثقيلة أو غير المناسبة",
  "ظهور مظهر البقع الداكنة أو الاحمرار بعد التعرض للشمس",
  "الشعور باللزوجة أو الدهنية بعد الاستخدام",
];

const SAFETY_NOTES = [
  "للاستعمال الخارجي فقط، ويُمنع ابتلاعه.",
  "تجنبي ملامسة العينين مباشرة. في حال حدوث ذلك، اشطفي جيدًا بالماء النقي.",
  "لا يطبق على بشرة متهيجة، مصابة، أو ملتهبة.",
  "لا يستخدم في حال وجود حساسية معروفة تجاه أحد مكونات التركيبة.",
  "في حال ظهور احمرار، حكة، أو تهيج غير معتاد، توقفي عن الاستعمال واستشيري مختصًا.",
  "يحفظ بعيدًا عن متناول الأطفال.",
];

export function SunscreenDetailsSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFF9F6] py-16 md:py-24">
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-gold-light/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-rose-blush/55 blur-3xl" />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="luxury-kicker mb-3">تفاصيل واقي الشمس</p>
          <h2 className="section-heading text-[#3A222C]">حماية عالية بتركيبة خفيفة ومدروسة</h2>
          <p className="mt-4 text-sm leading-7 text-[#6B5555] md:text-base">
            كريم واقي شمس يوفر حماية فعّالة ضد أشعة UVA/UVB، مع مكونات مرطبة ومضادة للأكسدة تساعد البشرة على الشعور بالراحة والنعومة طوال اليوم.
          </p>
        </motion.div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {[
            { Icon: ShieldCheck, title: "حماية UVA/UVB", text: "مزيج فلاتر شمسية للحماية اليومية من أشعة الشمس." },
            { Icon: Sparkles, title: "لمسة غير دهنية", text: "امتصاص سريع ومظهر مريح يناسب الروتين الصباحي." },
            { Icon: Leaf, title: "ترطيب وراحة", text: "ألوفيرا، بانثينول، جلسرين، وهيالورونيك أسيد لدعم نعومة البشرة." },
          ].map((item, index) => {
            const Icon = item.Icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[1.5rem] border border-rose-soft/25 bg-white/80 p-6 shadow-[0_16px_40px_rgba(61,44,50,0.06)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-blush text-rose-deep">
                  <Icon className="h-5 w-5" strokeWidth={1.4} />
                </div>
                <h3 className="text-lg font-bold text-[#3A222C]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#6B5555]">{item.text}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[1.8rem] border border-rose-soft/25 bg-white shadow-[0_18px_50px_rgba(61,44,50,0.07)]"
          >
            <div className="border-b border-rose-soft/20 bg-ivory px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-rose-deep shadow-sm">
                  <SunMedium className="h-5 w-5" strokeWidth={1.4} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3A222C]">تركيبة المكونات الأساسية</h3>
                  <p className="text-xs font-semibold text-[#8D7D82]">منظمة حسب الدور داخل التركيبة</p>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-[#FFF9F6] text-[#6B5555]">
                  <tr>
                    <th className="border-b border-rose-soft/20 px-4 py-3 text-right font-bold">الفئة</th>
                    <th className="border-b border-rose-soft/20 px-4 py-3 text-right font-bold">المكوّن</th>
                    <th className="border-b border-rose-soft/20 px-4 py-3 text-center font-bold">التركيز</th>
                    <th className="border-b border-rose-soft/20 px-4 py-3 text-right font-bold">الدور</th>
                  </tr>
                </thead>
                <tbody>
                  {INGREDIENT_ROWS.map((row) => (
                    <tr key={`${row.ingredient}-${row.concentration}`} className="odd:bg-white even:bg-[#FFFDFC]">
                      <td className="border-b border-rose-soft/10 px-4 py-3 font-semibold text-[#8E5A68]">{row.phase}</td>
                      <td className="border-b border-rose-soft/10 px-4 py-3 font-sans text-[#3A222C]" dir="ltr">{row.ingredient}</td>
                      <td className="border-b border-rose-soft/10 px-4 py-3 text-center font-bold text-[#3A222C]">{row.concentration}</td>
                      <td className="border-b border-rose-soft/10 px-4 py-3 text-[#6B5555]">{row.functionAr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 p-4 md:hidden">
              {INGREDIENT_ROWS.map((row) => (
                <div key={`${row.ingredient}-${row.concentration}`} className="rounded-2xl border border-rose-soft/20 bg-[#FFFDFC] p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-rose-blush px-3 py-1 text-[11px] font-bold text-rose-deep">{row.phase}</span>
                    <span className="font-bold text-[#3A222C]">{row.concentration}</span>
                  </div>
                  <p className="font-sans text-sm font-bold text-[#3A222C]" dir="ltr">{row.ingredient}</p>
                  <p className="mt-2 text-sm leading-6 text-[#6B5555]">{row.functionAr}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-5">
            {[
              { title: "الهدف المثالي", items: TARGETS, Icon: CheckCircle2 },
              { title: "زوايا البيع", items: SELLING_POINTS, Icon: Sparkles },
              { title: "مشاكل يساعد على تفاديها", items: PROBLEMS, Icon: ShieldCheck },
            ].map((block, index) => {
              const Icon = block.Icon;
              return (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-[1.5rem] border border-rose-soft/25 bg-white/85 p-6 shadow-[0_14px_40px_rgba(61,44,50,0.05)]"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-light/70 text-rose-deep">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-[#3A222C]">{block.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-7 text-[#6B5555]">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#C8A24A]" strokeWidth={1.8} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-[1.6rem] border border-amber-200/70 bg-amber-50/70 p-5 md:p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-amber-700">
              <AlertTriangle className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold text-[#3A222C]">موانع الاستعمال والتنبيه</h3>
              <p className="text-xs font-semibold text-[#8D7D82]">للحفاظ على تجربة آمنة وواضحة</p>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {SAFETY_NOTES.map((note) => (
              <p key={note} className="rounded-2xl bg-white/70 px-4 py-3 text-sm leading-7 text-[#6B5555]">
                {note}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

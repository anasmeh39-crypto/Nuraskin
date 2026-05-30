import { CalendarDays, Droplets, Sparkles } from "lucide-react";
import { Product } from "@/types";

interface Props {
  product: Product;
}

// Per-product, per-step visual images (optional — minimal thumbnails)
const STEP_IMAGES: Record<string, (string | null)[]> = {
  "nura-eye-revive": [
    "/images/usage/eye-revive-step-1.png",
    "/images/usage/eye-revive-step-2.png",
    "/images/usage/eye-revive-step-3.png",
  ],
};

function usageCopy(product: Product) {
  if (product.slug === "nura-eye-revive") {
    return [
      ["01", "على بشرة نظيفة", "استخدميه بعد تنظيف الوجه وقبل الكريمات الثقيلة."],
      ["02", "كمية صغيرة", "ضعي نقطة صغيرة حول محيط العين ووزعيها بلطف دون فرك."],
      ["03", "صباحًا أو مساءً", "يمكن استخدامه يوميًا، ويفضل الالتزام بنفس الوقت للحصول على روتين ثابت."],
    ];
  }

  if (product.slug === "nura-night-renewal") {
    return [
      ["01", "بعد التنظيف", "استخدميه مساءً على بشرة نظيفة وجافة."],
      ["02", "طبقة لطيفة", "ضعي كمية مناسبة على الوجه والرقبة مع تجنب محيط العين."],
      ["03", "كآخر خطوة", "استخدميه كآخر خطوة في الروتين الليلي لدعم مظهر النعومة."],
    ];
  }

  if (product.slug === "nura-spf-50") {
    return [
      ["01", "قبل الشمس بـ15 إلى 20 دقيقة", "يوضع على بشرة نظيفة وجافة قبل التعرض للشمس أو قبل المكياج."],
      ["02", "تغطية متساوية", "وزعيه على الوجه ومناطق الجلد المعرضة للشمس مع الانتباه للرقبة، الأذنين، وظهر اليدين."],
      ["03", "إعادة التطبيق", "يُعاد تطبيقه كل ساعتين، وبعد السباحة، التعرق، أو التجفيف بالمنشفة."],
    ];
  }

  return [
    ["01", "بعد التنظيف", "ضعيه على بشرة نظيفة قبل المرطب أو كريم الحماية."],
    ["02", "قطرتان فقط", "وزعي كمية صغيرة على الوجه والرقبة بلطف."],
    ["03", "روتين يومي", "روتين يومي — واللي كيخليه يشتغل أحسن هو الاتساق مع بقية الروتين."],
  ];
}

export function UsageAndTimeline({ product }: Props) {
  const steps = usageCopy(product);
  const stepImages = STEP_IMAGES[product.slug] ?? [];

  return (
    <section className="bg-white py-14 md:py-20" dir="rtl">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="luxury-kicker mb-3">طريقة الاستخدام</p>
            <h2 className="section-heading text-[#3A222C]">ثلاث خطوات بسيطة داخل روتينك</h2>
            <div className="mt-8 space-y-3">
              {steps.map(([number, title, text], i) => {
                const img = stepImages[i];
                return (
                  <div key={number} className="flex items-center gap-4 rounded-3xl border border-rose-soft/20 bg-ivory p-4 sm:p-5">
                    {/* Step number */}
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-light text-sm font-bold text-rose-deep">
                      {number}
                    </span>
                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-[#3A222C]">{title}</h3>
                      <p className="mt-1 text-sm leading-[1.65] text-[#6B5555]">{text}</p>
                    </div>
                    {/* Minimal step image — only when provided */}
                    {img && (
                      <div className="h-16 w-20 shrink-0 overflow-hidden rounded-2xl border border-rose-soft/20 shadow-[0_4px_14px_rgba(139,74,90,0.10)]">
                        <img
                          src={img}
                          alt={title}
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="luxury-kicker mb-3">مع الاستعمال المنتظم</p>
            <h2 className="section-heading text-[#3A222C]">توقعات واقعية دون مبالغة</h2>
            <div className="mt-8 space-y-3">
              {[
                { icon: Droplets, title: "الأيام الأولى", text: "ملمس ألطف وإحساس أكثر راحة داخل الروتين." },
                { icon: CalendarDays, title: "مع الانتظام", text: "مظهر البشرة يبدأ في الظهور أكثر توازنًا ونضارة حسب طبيعتها." },
                { icon: Sparkles, title: "على المدى الطويل", text: "روتين ثابت يدعم مظهرًا صحيًا وأكثر صفاءً مع الاستخدام المستمر." },
                { icon: Sparkles, title: "مع الروتين الكامل", text: "النتائج كتجي أسرع لما كل منتج كيدعم الآخر — الصباح يحمي، الليل يصلح.", featured: true },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className={`flex gap-4 rounded-3xl border p-5 ${
                    item.featured ? "border-[#C4788A] bg-[#FDF4F7]" : "border-rose-soft/20 bg-rose-blush"
                  }`}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-rose-deep">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#3A222C]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-[#6B5555]">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#9B8A8A]">
              النتائج تختلف من شخص لآخر. المنتجات تجميلية وليست علاجًا طبيًا.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

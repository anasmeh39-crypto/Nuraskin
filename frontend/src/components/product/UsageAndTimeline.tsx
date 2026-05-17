import { CalendarDays, Droplets, Sparkles } from "lucide-react";
import { Product } from "@/types";

interface Props {
  product: Product;
}

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

  return [
    ["01", "بعد التنظيف", "ضعيه على بشرة نظيفة قبل المرطب أو كريم الحماية."],
    ["02", "قطرتان فقط", "وزعي كمية صغيرة على الوجه والرقبة بلطف."],
    ["03", "روتين يومي", "استخدميه صباحًا أو مساءً حسب احتياج بشرتك."],
  ];
}

export function UsageAndTimeline({ product }: Props) {
  const steps = usageCopy(product);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="luxury-kicker mb-3">طريقة الاستخدام</p>
            <h2 className="section-heading text-[#3A222C]">ثلاث خطوات بسيطة داخل روتينك</h2>
            <div className="mt-8 space-y-3">
              {steps.map(([number, title, text]) => (
                <div key={number} className="flex gap-4 rounded-3xl border border-rose-soft/20 bg-ivory p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-light text-sm font-bold text-rose-deep">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-bold text-[#3A222C]">{title}</h3>
                    <p className="mt-1 text-sm leading-7 text-[#6B5555]">{text}</p>
                  </div>
                </div>
              ))}
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
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 rounded-3xl border border-rose-soft/20 bg-rose-blush p-5">
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

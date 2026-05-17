import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الإرجاع — نورا سكين",
  description: "سياسة الإرجاع والاستبدال لمنتجات نورا سكين — إرجاع مجاني خلال 14 يوم.",
};

export default function ReturnsPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#3A222C,#8B4A5A)] py-12 text-center">
        <div className="container-wide">
          <h1 className="text-3xl font-bold text-white">سياسة الإرجاع</h1>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="container-wide max-w-2xl space-y-8">
          {[
            {
              title: "مدة الإرجاع",
              content: "يمكنكِ إرجاع المنتج خلال 14 يوماً من تاريخ استلامه. يجب أن يكون المنتج في حالته الأصلية وغير مستخدم بشكل كامل.",
            },
            {
              title: "كيف يتم الإرجاع؟",
              content: "تواصلي معنا عبر صفحة الاتصال أو البريد الإلكتروني مع رقم طلبك، وسنقوم بترتيب خطوات الإرجاع معك بكل سهولة.",
            },
            {
              title: "المبلغ المسترد",
              content: "سنسترد لك المبلغ الكامل خلال 5–7 أيام عمل بعد استلام المنتج. التوصيل الأولي غير قابل للاسترداد إذا كانت الطلبية استُلمت بشكل صحيح.",
            },
            {
              title: "استثناءات",
              content: "المنتجات المستخدمة جزئياً أو التالفة من طرف العميل لا يمكن إرجاعها. إذا كان المنتج تالفاً عند الاستلام، تواصلي معنا فوراً مع صورة.",
            },
            {
              title: "الدفع عند الاستلام",
              content: "إذا رفضتِ استلام الطلب لدى التوصيل، لا يوجد أي التزام مالي. يمكنك رفض الاستلام بدون أي غرامة.",
            },
          ].map((section) => (
            <div key={section.title} className="premium-card rounded-3xl p-6">
              <h2 className="font-bold text-brand-deep text-lg mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

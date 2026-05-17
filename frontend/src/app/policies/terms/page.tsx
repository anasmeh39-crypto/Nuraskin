import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الاستخدام — نورا سكين",
  description: "شروط وأحكام استخدام موقع نورا سكين والشراء منه.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-brand-deep py-12 text-center">
        <div className="container-wide">
          <h1 className="text-3xl font-bold text-white">شروط الاستخدام</h1>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="container-wide max-w-2xl space-y-8">
          {[
            {
              title: "القبول بالشروط",
              content: "باستخدام موقع nuraskin.cc وإتمام أي طلب، فإنك توافقين على هذه الشروط.",
            },
            {
              title: "الطلبات والأسعار",
              content: "الأسعار المعروضة بالدرهم المغربي شاملة الضريبة. نحتفظ بحق تعديل الأسعار في أي وقت دون إشعار مسبق، مع الحفاظ على الأسعار المؤكدة للطلبات الموجودة.",
            },
            {
              title: "الدفع عند الاستلام",
              content: "جميع طلباتنا تتم عبر الدفع عند الاستلام (COD). أنتِ ملزمة بالدفع عند استلام الطلب. رفض الاستلام المتكرر بدون سبب وجيه قد يؤدي إلى تقييد الطلبات المستقبلية.",
            },
            {
              title: "المنتجات والادعاءات",
              content: "منتجاتنا هي منتجات تجميلية وليست أدوية. النتائج المذكورة هي تجارب فردية وقد تختلف من شخص لآخر. لا نضمن نتائج طبية محددة.",
            },
            {
              title: "المسؤولية",
              content: "لسنا مسؤولين عن أي ردود فعل تحسسية نادرة. يُنصح باختبار المنتج على منطقة صغيرة من الجلد قبل الاستخدام الكامل.",
            },
            {
              title: "الملكية الفكرية",
              content: "جميع محتويات الموقع (نصوص، صور، شعار) محمية بحقوق الملكية الفكرية لنورا سكين (NURA SKIN).",
            },
          ].map((section) => (
            <div key={section.title} className="bg-white rounded-3xl border border-border p-6">
              <h2 className="font-bold text-brand-deep text-lg mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية — نيورا سكين",
  description: "سياسة الخصوصية لموقع نيورا سكين — كيف نتعامل مع بياناتك الشخصية.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-brand-deep py-12 text-center">
        <div className="container-wide">
          <h1 className="text-3xl font-bold text-white">سياسة الخصوصية</h1>
          <p className="text-white/60 mt-2 text-sm">آخر تحديث: 2024</p>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="container-wide max-w-2xl space-y-8">
          {[
            {
              title: "ما البيانات التي نجمعها؟",
              content: "نجمع فقط المعلومات الضرورية لإتمام طلبك: الاسم الكامل ورقم الهاتف. لا نطلب بريدك الإلكتروني أو معلومات بنكية.",
            },
            {
              title: "كيف نستخدم بياناتك؟",
              content: "نستخدم رقم هاتفك فقط للتواصل بخصوص طلبك (التأكيد والتوصيل). لا نبيع بياناتك لأطراف ثالثة.",
            },
            {
              title: "بيانات التتبع الإعلاني",
              content: "نستخدم أدوات تتبع إعلانية (Meta Pixel، TikTok) لتحسين إعلاناتنا. هذه الأدوات قد تجمع بيانات مجهولة الهوية. البيانات الشخصية (كالهاتف) يتم تشفيرها قبل الإرسال.",
            },
            {
              title: "حفظ البيانات",
              content: "نحتفظ ببيانات الطلبات لمدة تصل إلى 3 سنوات لأغراض محاسبية وقانونية.",
            },
            {
              title: "حقوقك",
              content: "يحق لك طلب حذف بياناتك أو الاطلاع عليها في أي وقت. تواصلي معنا عبر البريد الإلكتروني.",
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

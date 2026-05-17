import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصلي معنا — نيورا سكين",
  description: "تواصلي مع فريق نيورا سكين لأي سؤال أو مشكلة — نحن هنا للمساعدة.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-deep py-16 text-center">
        <div className="container-wide max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            تواصلي معنا
          </h1>
          <p className="text-white/70 text-lg">
            سؤال؟ مشكلة؟ فضول؟ — نحن هنا وغادي نجاوبك بسرعة.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container-wide max-w-xl">
          <div className="space-y-6">
            {[
              {
                icon: "📱",
                title: "واتساب",
                desc: "الأسرع للرد على أسئلتك",
                link: "https://wa.me/212600000000",
                label: "تحدثي معنا على واتساب",
              },
              {
                icon: "📧",
                title: "البريد الإلكتروني",
                desc: "للاستفسارات التفصيلية",
                link: "mailto:hello@nuraskin.cc",
                label: "hello@nuraskin.cc",
              },
              {
                icon: "📦",
                title: "تتبع الطلب",
                desc: "للاطمئنان على حالة طلبك",
                link: "/policies/returns",
                label: "سياسة الإرجاع والتتبع",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-3xl border border-border p-6 flex gap-5 items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center text-2xl shrink-0">
                  {c.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-brand-deep">{c.title}</h3>
                  <p className="text-gray-500 text-sm">{c.desc}</p>
                </div>
                <a
                  href={c.link}
                  className="text-brand-deep text-sm font-semibold underline underline-offset-2 hover:text-brand-mid transition-colors"
                >
                  {c.label}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-brand-light rounded-3xl p-6 text-center">
            <p className="text-brand-deep font-semibold mb-1">وقت الرد</p>
            <p className="text-gray-600 text-sm">
              يوم عمل — السبت والأحد ممكن تأخير بسيط
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

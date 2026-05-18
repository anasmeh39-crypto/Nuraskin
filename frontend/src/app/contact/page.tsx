import type { Metadata } from "next";
import { Mail, PackageSearch, PhoneCall } from "lucide-react";
import { BRAND_ASSETS } from "@/config/brand";

export const metadata: Metadata = {
  title: "تواصلي معنا — نورا سكين",
  description: "تواصلي مع فريق نورا سكين لأي سؤال أو مشكلة — نحن هنا للمساعدة.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#3A222C,#8B4A5A)] py-16 text-center">
        <div className="container-wide max-w-xl">
          <div className="mx-auto mb-7 inline-flex dir-ltr">
            <img
              src={BRAND_ASSETS.horizontal}
              alt="NURA SKIN نورا سكين"
              width={710}
              height={210}
              className="h-12 w-auto max-w-[260px] object-contain [filter:invert(1)_brightness(1.85)_grayscale(0.2)] mix-blend-screen md:h-14 md:max-w-[320px]"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            تواصلي معنا
          </h1>
          <p className="text-white/70 text-lg">
            لأي سؤال حول المنتجات أو الطلب، فريقنا هنا لمساعدتكِ بكل عناية.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container-wide max-w-xl">
          <div className="space-y-6">
            {[
              {
                icon: PhoneCall,
                title: "تأكيد الطلبات",
                desc: "لأي سؤال حول مكالمة التأكيد أو التوصيل",
                link: "tel:+212600000000",
                label: "+212 600 000 000",
              },
              {
                icon: Mail,
                title: "البريد الإلكتروني",
                desc: "للاستفسارات التفصيلية",
                link: "mailto:hello@nuraskin.cc",
                label: "hello@nuraskin.cc",
              },
              {
                icon: PackageSearch,
                title: "تتبع الطلب",
                desc: "للاطمئنان على حالة طلبك",
                link: "/policies/returns",
                label: "سياسة الإرجاع والتتبع",
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
              <div
                key={c.title}
                className="premium-card rounded-3xl p-6 flex gap-5 items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-light flex items-center justify-center text-2xl shrink-0">
                  <Icon className="h-6 w-6 text-brand-mid" strokeWidth={1.5} />
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
              );
            })}
          </div>

          <div className="mt-10 bg-brand-light rounded-3xl p-6 text-center">
            <p className="text-brand-deep font-semibold mb-1">وقت الرد</p>
            <p className="text-gray-600 text-sm">
              خلال يوم عمل — قد يتأخر الرد قليلاً في عطلة نهاية الأسبوع
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

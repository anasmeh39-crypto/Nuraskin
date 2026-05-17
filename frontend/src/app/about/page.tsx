import type { Metadata } from "next";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { TrustBadges } from "@/components/ui/TrustBadges";

export const metadata: Metadata = {
  title: "عن نيورا سكين",
  description: "قصة نيورا سكين — Nama Beauty. لماذا أسسنا هذه العلامة وما الذي يجعلها مختلفة.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-deep py-16 text-center">
        <div className="container-wide max-w-2xl">
          <p className="text-gold text-sm font-semibold tracking-wider uppercase mb-3">
            قصتنا
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            عن نيورا سكين
          </h1>
          <p className="text-white/70 text-lg">
            بشرتك تستاهل عناية تفهمها — صنعناها لأجل المرأة المغربية.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container-wide max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="rounded-4xl overflow-hidden">
              <PlaceholderImage
                label="Nama Beauty Studio"
                aspectRatio="portrait"
                className="w-full"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-deep mb-4">
                ليش أسسنا نيورا؟
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                لاحظنا فراغاً كبيراً في سوق العناية بالبشرة المغربي: منتجات إما رخيصة
                وبدون جودة، أو فاخرة لكنها مصممة لمناخ أوروبي ولون بشرة مختلف.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                المرأة المغربية تواجه تحديات خاصة — الشمس القوية، المناخ الجاف أو الرطب،
                البشرة المتوسطة التي تحتاج توازناً — وما عندها منتج يفهم هاد الاحتياجات.
              </p>
              <p className="text-gray-600 leading-relaxed">
                نيورا سكين جاءت لتملأ هاد الفراغ: منتجات مدروسة علمياً، بمكونات نعلن
                عنها بصدق، ولغة تتكلم مباشرة للمرأة المغربية.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "الصدق قبل كل شيء",
                desc: "ما عندنا مكونات سرية ولا ادعاءات مبالغ فيها. نشرح شنو في المنتج ولماذا.",
              },
              {
                title: "العلم كأساس",
                desc: "كل مكوّن نستخدمه مدروس — نعرف آلية عمله والتركيز الصحيح.",
              },
              {
                title: "المغرب أولاً",
                desc: "لسنا نسخة عربية من علامة غربية — نفكر في البشرة المغربية من البداية.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-3xl border border-border p-6">
                <h3 className="font-bold text-brand-deep text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          <TrustBadges />
        </div>
      </section>
    </>
  );
}

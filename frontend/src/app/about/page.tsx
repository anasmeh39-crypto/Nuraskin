import type { Metadata } from "next";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { TrustBadges } from "@/components/ui/TrustBadges";

export const metadata: Metadata = {
  title: "عن نورا سكين",
  description: "قصة علامة نورا سكين — عناية بشرة مختارة وتجربة تليق بكِ.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#3A222C,#8B4A5A)] py-16 text-center">
        <div className="container-wide max-w-2xl">
          <p className="text-gold text-sm font-semibold tracking-wider uppercase mb-3">
            قصتنا
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            عن نورا سكين
          </h1>
          <p className="text-white/70 text-lg">
                بشرتك تستحق عناية تدرك طبيعتها — صُممت للمرأة المغربية.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container-wide max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="rounded-4xl overflow-hidden">
              <PlaceholderImage
                label="نورا سكين"
                aspectRatio="portrait"
                className="w-full"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-deep mb-4">
                لماذا أسسنا نورا سكين؟
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                لاحظنا فراغاً كبيراً في سوق العناية بالبشرة المغربي: منتجات إما تجارية
                تفتقر إلى الجودة، أو فاخرة لكنها مصممة لمناخ أوروبي مختلف.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                المرأة المغربية تواجه تحديات خاصة — كأشعة الشمس القوية، وتغيرات الرطوبة،
                والبشرة التي تحتاج إلى توازن دائم — وتفتقر إلى المنتجات التي تلبي هذه الاحتياجات بدقة.
              </p>
              <p className="text-gray-600 leading-relaxed">
                هكذا وُلدت نورا سكين: مجموعة مختارة بعناية، بمكونات نُعلن
                عنها بشفافية تامة، لتقدم عناية حقيقية للمرأة المغربية.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "الشفافية قبل كل شيء",
                desc: "لا نستخدم مكونات سرية ولا ادعاءات مبالغ فيها. نشارك تفاصيل كل تركيبة ودورها بوضوح.",
              },
              {
                title: "العلم كأساس",
                desc: "نختار مكونات معروفة في عالم العناية بالبشرة، ونشرح دورها بطريقة بسيطة وشفافة.",
              },
              {
                title: "الخصوصية المغربية",
                desc: "لسنا نسخة معربة من علامة غربية — لقد وضعنا احتياجات البشرة المغربية في صميم تصميمنا.",
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

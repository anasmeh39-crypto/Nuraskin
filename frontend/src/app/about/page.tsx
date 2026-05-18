import type { Metadata } from "next";
import { HeartHandshake, PackageCheck, Sparkles, UsersRound } from "lucide-react";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { BRAND_ASSETS } from "@/config/brand";

export const metadata: Metadata = {
  title: "عن نورا سكين",
  description: "قصة علامة نورا سكين — عناية بشرة مختارة وتجربة تليق بكِ.",
};

export default function AboutPage() {
  const storyImages = [
    {
      src: "/brand/about-team-main.jpeg",
      alt: "فريق نورا سكين داخل المكتب",
      label: "فريق حقيقي",
      className: "md:col-span-6 md:row-span-2",
      imageClass: "aspect-[4/5] md:aspect-[5/6] object-center",
    },
    {
      src: "/brand/about-packaging-moment.jpeg",
      alt: "تفاصيل تغليف طلبات نورا سكين",
      label: "تحضير الطلبات",
      className: "md:col-span-6",
      imageClass: "aspect-[4/3] object-[70%_72%]",
    },
    {
      src: "/brand/about-team-moment.jpeg",
      alt: "لحظة دافئة من فريق نورا سكين",
      label: "طاقة نسائية",
      className: "md:col-span-3",
      imageClass: "aspect-[3/4] object-[38%_35%]",
    },
    {
      src: "/brand/about-brand-atmosphere.jpeg",
      alt: "منتجات وعلب نورا سكين داخل مساحة العمل",
      label: "تفاصيل العلامة",
      className: "md:col-span-3",
      imageClass: "aspect-[3/4] object-[68%_74%]",
    },
  ];

  return (
    <>
      <section className="bg-[linear-gradient(135deg,#3A222C,#8B4A5A)] py-16 text-center">
        <div className="container-wide max-w-2xl">
          <div className="mx-auto mb-7 inline-flex dir-ltr">
            <img
              src={BRAND_ASSETS.horizontal}
              alt="NURA SKIN نورا سكين"
              width={710}
              height={210}
              className="h-12 w-auto max-w-[260px] object-contain [filter:invert(1)_brightness(1.85)_grayscale(0.2)] mix-blend-screen md:h-14 md:max-w-[320px]"
            />
          </div>
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

      <section className="overflow-hidden bg-cream py-16 md:py-24">
        <div className="container-wide">
          <div className="mb-18 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-10 top-12 h-52 w-52 rounded-full bg-rose-soft/20 blur-3xl" aria-hidden />
              <div className="absolute -right-8 bottom-10 h-60 w-60 rounded-full bg-white/75 blur-3xl" aria-hidden />
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-12 md:auto-rows-fr">
                {storyImages.map((image, idx) => (
                  <div
                    key={image.src}
                    className={`${image.className} group animate-premium-rise relative overflow-hidden rounded-[1.55rem] border border-white/75 bg-white p-2 shadow-[0_18px_55px_rgba(61,44,50,0.09)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(142,90,104,0.15)]`}
                    style={{ animationDelay: `${idx * 110}ms` }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={idx === 0 ? 980 : 720}
                      height={idx === 0 ? 860 : 560}
                      className={`${image.imageClass} h-full w-full rounded-[1.2rem] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]`}
                    />
                    <div className="pointer-events-none absolute inset-2 rounded-[1.2rem] ring-1 ring-white/55" />
                    <div className="absolute bottom-5 right-5 rounded-full border border-white/75 bg-white/80 px-4 py-2 text-xs font-bold text-brand-deep shadow-ivory-sm backdrop-blur-md">
                      {image.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="luxury-kicker mb-4">من داخل نورا سكين</p>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-brand-deep md:text-4xl">
                لماذا أسسنا نورا سكين؟
              </h2>
              <p className="mb-5 text-base leading-8 text-[#6B5555]">
                لاحظنا فراغاً كبيراً في سوق العناية بالبشرة المغربي: منتجات إما تجارية
                تفتقر إلى الجودة، أو فاخرة لكنها مصممة لمناخ أوروبي مختلف.
              </p>
              <p className="mb-5 text-base leading-8 text-[#6B5555]">
                المرأة المغربية تواجه تحديات خاصة — كأشعة الشمس القوية، وتغيرات الرطوبة،
                والبشرة التي تحتاج إلى توازن دائم — وتفتقر إلى المنتجات التي تلبي هذه الاحتياجات بدقة.
              </p>
              <p className="text-base leading-8 text-[#6B5555]">
                هكذا وُلدت نورا سكين: مجموعة مختارة بعناية، بمكونات نُعلن
                عنها بشفافية تامة، لتقدم عناية حقيقية للمرأة المغربية.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: UsersRound, text: "فريق نسائي قريب من احتياجاتك" },
                  { icon: PackageCheck, text: "تحضير دقيق لكل طلب" },
                  { icon: HeartHandshake, text: "تجربة مبنية على الثقة" },
                  { icon: Sparkles, text: "تفاصيل ناعمة وهوية راقية" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-3 rounded-2xl border border-rose-soft/20 bg-white/72 px-4 py-3 shadow-ivory-sm">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-blush text-rose-deep">
                        <Icon className="h-4 w-4" strokeWidth={1.45} />
                      </span>
                      <span className="text-sm font-semibold leading-6 text-brand-deep">{item.text}</span>
                    </div>
                  );
                })}
              </div>
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

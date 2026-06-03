import type { Metadata } from "next";
import { HeartHandshake, PackageCheck, Sparkles, UsersRound } from "lucide-react";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { BRAND_ASSETS } from "@/config/brand";

export const metadata: Metadata = {
  title: "عن نورا سكين",
  description: "قصة علامة نورا سكين — عناية بشرة مختارة وتجربة تليق بكِ.",
};

export default function AboutPage() {
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
                بشرتك تستحق عناية واضحة، ناعمة، وسهلة الالتزام.
          </p>
        </div>
      </section>

      <section className="overflow-hidden bg-cream py-16 md:py-24">
        <div className="container-wide">
          <div className="mb-18 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            {/* ── Two-image layout: team + fulfillment ─────────── */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-10 top-12 h-48 w-48 rounded-full bg-rose-soft/20 blur-3xl" aria-hidden />
              <div className="absolute -right-8 bottom-10 h-52 w-52 rounded-full bg-white/75 blur-3xl" aria-hidden />
              <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-[1.1fr_0.9fr] sm:gap-5">

                {/* Image 1 — Team celebration */}
                <div className="group animate-premium-rise relative overflow-hidden rounded-[1.75rem] border border-white/75 bg-white p-2 shadow-[0_20px_60px_rgba(61,44,50,0.11)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_72px_rgba(142,90,104,0.16)]">
                  <img
                    src="/brand/nura-team-about.jpeg"
                    alt="فريق نورا سكين داخل المكتب"
                    width={920}
                    height={1150}
                    className="h-full w-full rounded-[1.35rem] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ aspectRatio: "4/5" }}
                  />
                  <div className="pointer-events-none absolute inset-2 rounded-[1.35rem] ring-1 ring-white/55" />
                  <div className="absolute bottom-5 right-5 rounded-full border border-white/75 bg-white/85 px-4 py-2 text-xs font-bold text-brand-deep shadow-ivory-sm backdrop-blur-md">
                    فريق نورا سكين
                  </div>
                </div>

                {/* Image 2 — Fulfillment / packaging */}
                <div
                  className="group animate-premium-rise relative overflow-hidden rounded-[1.75rem] border border-white/75 bg-white p-2 shadow-[0_20px_60px_rgba(61,44,50,0.11)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_72px_rgba(142,90,104,0.16)] sm:self-center"
                  style={{ animationDelay: "110ms" }}
                >
                  <img
                    src="/brand/about-fulfillment.png"
                    alt="تحضير وتغليف طلبات نورا سكين"
                    width={880}
                    height={660}
                    className="h-full w-full rounded-[1.35rem] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ aspectRatio: "4/3" }}
                  />
                  <div className="pointer-events-none absolute inset-2 rounded-[1.35rem] ring-1 ring-white/55" />
                  <div className="absolute bottom-5 right-5 rounded-full border border-white/75 bg-white/85 px-4 py-2 text-xs font-bold text-brand-deep shadow-ivory-sm backdrop-blur-md">
                    تحضير طلباتك
                  </div>
                </div>

              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="luxury-kicker mb-4">من داخل نورا سكين</p>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-brand-deep md:text-4xl">
                لماذا أسسنا نورا سكين؟
              </h2>
              <p className="mb-5 text-base leading-8 text-[#6B5555]">
                لاحظنا أن الكثير من روتينات العناية تبدو معقدة أو مليئة بوعود مبالغ فيها،
                بينما تحتاج البشرة غالباً إلى خطوات واضحة ومكونات مفهومة.
              </p>
              <p className="mb-5 text-base leading-8 text-[#6B5555]">
                في المغرب، يتغير الروتين اليومي بين الشمس، الرطوبة، ونمط الحياة السريع؛
                لذلك أردنا تجربة عناية أبسط وأكثر وضوحاً.
              </p>
              <p className="text-base leading-8 text-[#6B5555]">
                هكذا وُلدت نورا سكين: مجموعة مختارة بعناية، بمكونات نُعلن
                عنها بشفافية تامة، لتقدم روتيناً ناعماً يسهل الالتزام به.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: UsersRound, text: "تجربة قريبة من احتياجاتك" },
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
                title: "واقعية الروتين",
                desc: "نركز على خطوات عملية ومكونات واضحة تناسب إيقاع العناية اليومي.",
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

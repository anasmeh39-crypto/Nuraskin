import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Eye,
  FlaskConical,
  Moon,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Truck,
} from "lucide-react";
import { HomeIngredientShowcase } from "@/components/home/HomeIngredientShowcase";
import { PRODUCTS, BUNDLES } from "@/config/products";
import { ProductCard } from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "نورا سكين | عناية متكاملة للبشرة المغربية",
  description:
    "منتجات عناية بشرة مختارة بعناية للمرأة المغربية. سيروم النياسيناميد، كريم التجديد الليلي، وسيروم محيط العين. الدفع عند الاستلام.",
  openGraph: {
    title: "نورا سكين | NURA SKIN",
    description: "عناية بشرة مدروسة للمرأة المغربية",
    url: "https://nuraskin.cc",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://nuraskin.cc" },
};

export default function HomePage() {
  const routineBundle = BUNDLES[0];

  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#FDFAF6_0%,#FDF5F7_55%,#FAF0F2_100%)]">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-rose-soft/25 blur-3xl" />
        <div className="container-wide relative grid items-center gap-10 py-14 md:grid-cols-2 md:py-24">
          <div className="text-center md:text-right">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-rose-mid">NURA SKIN — نورا سكين</p>
            <h1 className="text-4xl font-bold leading-tight text-[#3A222C] md:text-6xl">
              روتين عناية ناعم لبشرة أكثر توازنًا وإشراقًا
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#6B5555] md:mx-0 md:text-lg">
              ثلاث تركيبات أساسية مختارة بعناية لتدعم احتياجات البشرة اليومية، دون تعقيد أو وعود مبالغ فيها.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
              <Link href="/products" className="rounded-full bg-rose-deep px-8 py-4 text-center font-bold text-white shadow-rose-md transition hover:opacity-90">
                اكتشفي المجموعة
              </Link>
              <Link href="/about" className="rounded-full border border-rose-soft bg-white/70 px-8 py-4 text-center font-bold text-rose-deep transition hover:bg-white">
                لماذا نورا؟
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, text: "الدفع عند الاستلام" },
                { icon: Truck, text: "توصيل داخل المغرب" },
                { icon: FlaskConical, text: "تركيبات مختارة بعناية" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center justify-center gap-2 rounded-2xl border border-rose-soft/30 bg-white/75 px-4 py-3 text-sm font-semibold text-[#3A222C]">
                    <Icon className="h-4 w-4 text-rose-mid" strokeWidth={1.5} />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-[2.5rem] border border-white/80 bg-white/60 p-4 shadow-rose-lg backdrop-blur">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[2rem] bg-[linear-gradient(145deg,#FDF5F7,#F7F2EC)]">
                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-rose-sm">
                    <span className="font-display text-5xl italic text-rose-deep">N</span>
                  </div>
                  <p className="font-bold text-[#3A222C]">Nura Skin Routine</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-rose-mid">NURA SKIN</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-3xl border border-rose-soft/30 bg-white px-5 py-4 shadow-rose-sm">
              <p className="text-sm font-bold text-[#3A222C]">روتين من 3 خطوات</p>
              <p className="text-xs text-[#9B8A8A]">صباحًا، ليلًا، ومحيط العين</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-wide grid gap-8 md:grid-cols-3">
          {[
            { icon: Sparkles, title: "روتين بسيط", text: "منتجات أساسية يمكن إدخالها بسهولة في عنايتك اليومية دون خطوات معقدة." },
            { icon: BadgeCheck, title: "تركيبات مختارة", text: "مكونات معروفة في عالم العناية بالبشرة، مقدمة بطريقة شفافة ومفهومة." },
            { icon: PackageCheck, title: "تجربة موثوقة", text: "دفع عند الاستلام، تأكيد هاتفي، وتوصيل داخل المغرب." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-3xl border border-rose-soft/20 bg-ivory p-7">
                <Icon className="mb-5 h-6 w-6 text-rose-mid" strokeWidth={1.5} />
                <h2 className="text-xl font-bold text-[#3A222C]">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#6B5555]">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="luxury-kicker mb-3">مشاكل يومية، حلول واضحة</p>
            <h2 className="section-heading text-[#3A222C]">عناية تُلبّي ما تحتاجه بشرتك على حقيقته</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: SunMedium, title: "بهتان وعدم توازن", text: "عندما تبدو البشرة مرهقة أو غير متجانسة، تحتاج إلى خطوة يومية لطيفة تدعم صفاءها.", product: PRODUCTS[0] },
              { icon: Moon, title: "بشرة متعبة ليلًا", text: "بعد يوم طويل، تحتاج البشرة إلى كريم ليلي مريح يدعم مظهر النعومة والنضارة.", product: PRODUCTS[1] },
              { icon: Eye, title: "محيط عين مرهق", text: "المنطقة حول العين تحتاج عناية خفيفة ومركزة لمظهر أكثر انتعاشًا.", product: PRODUCTS[2] },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-[2rem] border border-rose-soft/25 bg-white p-6 shadow-rose-sm">
                  <Icon className="mb-5 h-6 w-6 text-rose-mid" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#3A222C]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6B5555]">{card.text}</p>
                  <Link href={`/products/${card.product.slug}`} className="mt-5 inline-flex font-bold text-rose-deep hover:underline">
                    {card.product.name_en}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="luxury-kicker mb-3">مجموعة نورا سكين</p>
            <h2 className="section-heading text-[#3A222C]">ثلاثة منتجات أساسية لروتين متكامل</h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, idx) => (
              <ProductCard key={product.slug} product={product} showBadge={idx === 0} badge="الأكثر اختيارًا" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-rose-blush py-16 md:py-20">
        <div className="container-wide grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="luxury-kicker mb-3">روتين متكامل</p>
            <h2 className="section-heading text-[#3A222C]">روتين متكامل لبشرة أكثر توازنًا وإشراقًا</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B5555]">
              اجمعي سيروم التوازن، كريم الليل، وسيروم محيط العين في نظام واحد يدعم العناية اليومية والليلية.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-rose-sm">
            <div className="space-y-3">
              {["العناية الصباحية", "العناية الليلية", "عناية محيط العين"].map((step, idx) => (
                <div key={step} className="flex items-center gap-3 rounded-2xl bg-ivory p-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-light text-xs font-bold text-rose-deep">0{idx + 1}</span>
                  <span className="font-semibold text-[#3A222C]">{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
              <div>
                <p className="text-sm text-[#9B8A8A]">{routineBundle.name_ar}</p>
                <p className="text-2xl font-bold text-rose-deep">{routineBundle.price} درهم</p>
              </div>
              <Link href="/products" className="rounded-full bg-rose-deep px-5 py-3 text-sm font-bold text-white">
                اختاري الروتين
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HomeIngredientShowcase />

      <section className="bg-ivory py-16 md:py-20">
        <div className="container-wide">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="luxury-kicker mb-3">آراء العميلات</p>
            <h2 className="section-heading text-[#3A222C]">تجارب هادئة وواقعية</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["مريم، الدار البيضاء", "أحببت أن المنتجات خفيفة وسهلة داخل الروتين. شعرت أن بشرتي تبدو أكثر توازنًا مع الاستعمال."],
              ["هدى، الرباط", "التجربة أنيقة من أول طلب. التوصيل كان واضحًا، والمنتجات تبدو راقية على البشرة."],
              ["ليلى، طنجة", "سيروم محيط العين أصبح خطوة يومية عندي. ملمسه خفيف ومناسب قبل المكياج."],
            ].map(([name, text]) => (
              <div key={name} className="rounded-3xl border border-rose-soft/20 bg-white p-6 shadow-rose-sm">
                <div className="mb-4 flex gap-1 text-gold">{"★★★★★"}</div>
                <p className="text-sm leading-7 text-[#6B5555]">"{text}"</p>
                <p className="mt-5 font-bold text-[#3A222C]">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-wide grid gap-5 md:grid-cols-3">
          {[
            "تركيبات مختارة بعناية",
            "مناسبة لاحتياجات البشرة في المغرب",
            "روتين بسيط وواضح",
            "الدفع عند الاستلام",
            "مصادر مكونات تركّز على الجودة",
            "تثقيف شفاف حول طريقة الاستخدام",
          ].map((item) => (
            <div key={item} className="rounded-3xl border border-rose-soft/20 bg-ivory p-6">
              <BadgeCheck className="mb-4 h-5 w-5 text-rose-mid" strokeWidth={1.5} />
              <p className="font-bold text-[#3A222C]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="container-wide rounded-[2rem] bg-rose-blush p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold text-[#3A222C]">ابدئي روتين نورا سكين اليوم</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#6B5555]">
            عناية ناعمة، تجربة موثوقة، ودفع عند الاستلام داخل المغرب.
          </p>
          <Link href="/products" className="mt-7 inline-flex rounded-full bg-rose-deep px-8 py-4 font-bold text-white shadow-rose-md">
            تسوقي المنتجات
          </Link>
        </div>
      </section>
    </>
  );
}

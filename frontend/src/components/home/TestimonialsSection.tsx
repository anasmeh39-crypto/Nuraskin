import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const TESTIMONIAL_EYEBROW = "آراء زبوناتنا";
const TESTIMONIAL_HEADLINE = "بشرة متجددة، ثقة متزايدة";
const TESTIMONIAL_SUBHEADLINE = "أكثر من 2,000 امرأة مغربية اختارت نوراسكين. هذه قصصهن.";

/* Use real customer photos with explicit written consent.
   For stock placeholders, source diverse North African /
   Moroccan models only — generic stock photos break trust. */
const SHORT_TESTIMONIALS = [
  {
    photo: "/images/testimonials/fatima-zahra.jpg",
    name: "فاطمة الزهراء",
    city: "الدار البيضاء",
    quote: "بشرتي تغيرت تماماً في 3 أسابيع، أنصح به بقوة",
    product: "روتين الصباح",
    rating: 5,
  },
  {
    photo: "/images/testimonials/khadija.jpg",
    name: "خديجة",
    city: "فاس",
    quote: "أول مرة نحس أن روتيني واضح ومناسب لبشرتي اليومية",
    product: "Nura Balance",
    rating: 5,
  },
  {
    photo: "/images/testimonials/salma.jpg",
    name: "سلمى",
    city: "الرباط",
    quote: "كريم الليل خفيف وكيخلي البشرة ناعمة ومريحة فالصباح",
    product: "روتين الليل",
    rating: 5,
  },
  {
    photo: "/images/testimonials/amina.jpg",
    name: "أمينة",
    city: "مراكش",
    quote: "التجربة كلها راقية من الموقع حتى التوصيل والدفع عند الاستلام",
    product: "الروتين الكامل",
    rating: 5,
  },
  {
    photo: "/images/testimonials/leila.jpg",
    name: "ليلى",
    city: "طنجة",
    quote: "سيروم العين ولى ضروري عندي، خصوصاً قبل المكياج والخروج",
    product: "Nura Eye Revive",
    rating: 5,
  },
  {
    photo: "/images/testimonials/noura.jpg",
    name: "نورا",
    city: "أكادير",
    quote: "حسيت بالبشرة أكثر هدوءاً وتوازن، بلا خطوات كثيرة",
    product: "روتين التوازن",
    rating: 5,
  },
  {
    photo: "/images/testimonials/hajar.jpg",
    name: "هاجر",
    city: "مكناس",
    quote: "الشرح واضح والمنتجات كتبان بريميوم بزاف، عطاوني ثقة فالطلب",
    product: "Nura Skin",
    rating: 5,
  },
  {
    photo: "/images/testimonials/rim.jpg",
    name: "ريم",
    city: "وجدة",
    quote: "وصلني الطلب مرتب ومغلف مزيان، والإحساس على البشرة ناعم",
    product: "روتين النعومة",
    rating: 5,
  },
  {
    photo: "/images/testimonials/yasmine.jpg",
    name: "ياسمين",
    city: "تطوان",
    quote: "أعجبني أنه ما كايناش وعود مبالغ فيها، غير روتين واضح وراقي",
    product: "روتين يومي",
    rating: 5,
  },
  {
    photo: "/images/testimonials/sara.jpg",
    name: "سارة",
    city: "القنيطرة",
    quote: "بعد أسابيع الاستعمال بان لي فرق فالنضارة وتنظيم الروتين",
    product: "روتين الإشراقة",
    rating: 5,
  },
] as const;

const FEATURED_TESTIMONIALS = [
  {
    photo: "/images/testimonials/featured-1.jpg",
    productShot: "/images/testimonials/featured-1-product.jpg",
    name: "سلمى ب.",
    city: "الرباط",
    age: 32,
    story:
      "كنت أعاني من البقع الداكنة لسنوات، وكل مرة كنبدل الروتين بلا نتيجة واضحة. مع نوراسكين عجبني أن الخطوات بسيطة والشرح مفهوم، وبعد أسابيع حسيت أن البشرة ولات أهدأ وأكثر إشراقاً.",
    result: "بعد 6 أسابيع: بشرة موحدة ومشرقة",
    product: "روتين نورا الكامل",
    rating: 5,
  },
  {
    photo: "/images/testimonials/featured-2.jpg",
    productShot: "/images/testimonials/featured-2-product.jpg",
    name: "مريم أ.",
    city: "الدار البيضاء",
    age: 28,
    story:
      "مشكلتي كانت اللمعان والمسام، وكنت كنحس البشرة ديالي كتحتاج توازن أكثر من منتجات قوية. Nura Balance دخل بسهولة فالروتين، ومع الوقت ولى مظهر البشرة أنقى وأريح.",
    result: "بعد 4 أسابيع: لمعان أقل ومظهر أصفى",
    product: "Nura Balance",
    rating: 5,
  },
  {
    photo: "/images/testimonials/featured-3.jpg",
    productShot: "/images/testimonials/featured-3-product.jpg",
    name: "ليلى ر.",
    city: "طنجة",
    age: 35,
    story:
      "كنت كنفيق ووجهي باين عيان، خصوصاً محيط العين. روتين الليل مع سيروم العين عطاني إحساس بالعناية والانتظام، وبان لي الوجه أكثر راحة قبل الخدمة.",
    result: "بعد 5 أسابيع: ملامح مرتاحة ونظرة أفتح",
    product: "روتين الليل والعين",
    rating: 5,
  },
] as const;

function StarRatingSvg({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-gold" role="img" aria-label={`${rating} من 5 نجوم`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          aria-hidden="true"
          className={`h-3.5 w-3.5 ${star <= rating ? "text-gold" : "text-border"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ShortTestimonialCard({
  testimonial,
  isDuplicate = false,
}: {
  testimonial: (typeof SHORT_TESTIMONIALS)[number];
  isDuplicate?: boolean;
}) {
  return (
    <article
      tabIndex={isDuplicate ? -1 : 0}
      className="min-h-[140px] w-80 shrink-0 rounded-2xl border border-brand-deep/[0.08] bg-cream px-5 py-[18px] outline-none transition focus-visible:ring-2 focus-visible:ring-brand-mid/35"
    >
      <div className="flex items-start gap-3">
        <Image
          src={testimonial.photo}
          alt={`صورة الزبونة ${testimonial.name} من ${testimonial.city}`}
          width={40}
          height={40}
          loading="lazy"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1 text-right">
          <h3 className="text-sm font-bold leading-5 text-brand-deep">{testimonial.name}</h3>
          <p className="text-xs leading-5 text-brand-deep/50">{testimonial.city}</p>
        </div>
        <StarRatingSvg rating={testimonial.rating} />
      </div>

      <p className="nura-line-clamp-3 mt-4 text-sm font-normal leading-[1.6] text-brand-deep">
        &quot;{testimonial.quote}&quot;
      </p>

      <div className="mt-4">
        <span className="rounded-full bg-brand-deep/10 px-2.5 py-1 text-[11px] font-medium text-brand-deep/75">
          {testimonial.product}
        </span>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-ivory py-16 md:pb-16 md:pt-20" dir="rtl" aria-labelledby="testimonials-heading">
      <div className="container-wide">
        <div className="mx-auto mb-7 max-w-[520px] text-center md:mb-9">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-deep/60">{TESTIMONIAL_EYEBROW}</p>
          <h2 id="testimonials-heading" className="text-2xl font-semibold text-brand-deep md:text-[32px]">
            {TESTIMONIAL_HEADLINE}
          </h2>
          <p className="mt-4 text-base leading-8 text-brand-deep/65">{TESTIMONIAL_SUBHEADLINE}</p>
        </div>

        <div className="relative mx-auto mb-4 max-w-6xl overflow-hidden rounded-[1.7rem] border border-white/70 bg-cream shadow-[0_22px_70px_rgba(61,44,50,0.09)] md:mb-5 md:rounded-[2rem]">
          <Image
            src="/images/testimonials/social-proof-hero.png"
            alt="آراء زبونات نورا سكين مع منتجات العناية وتقييم 4.8 من 5"
            width={1536}
            height={1024}
            sizes="(min-width: 1280px) 1120px, (min-width: 768px) 92vw, 92vw"
            className="h-auto w-full"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,246,0.035)_0%,rgba(255,250,246,0.01)_52%,rgba(255,250,246,0.10)_100%)]"
            aria-hidden
          />
        </div>
      </div>

      <div className="nura-marquee-viewport" role="region" aria-label="آراء قصيرة من زبونات نوراسكين">
        <div className="nura-marquee-track nura-marquee-track--testimonials">
          {/* Two identical sets — animation shifts by -50% for seamless infinite loop */}
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              className={`nura-marquee-set gap-5 px-2 md:gap-6 md:px-3${setIndex === 1 ? " nura-marquee-set--duplicate" : ""}`}
              aria-hidden={setIndex > 0}
            >
              {SHORT_TESTIMONIALS.map((testimonial) => (
                <ShortTestimonialCard
                  key={`${setIndex}-${testimonial.name}`}
                  testimonial={testimonial}
                  isDuplicate={setIndex === 1}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container-wide mt-10 md:mt-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURED_TESTIMONIALS.map((testimonial, index) => (
            <article
              key={testimonial.name}
              tabIndex={0}
              className="overflow-hidden rounded-[20px] border border-brand-deep/10 bg-white shadow-rose-sm outline-none transition duration-[250ms] hover:scale-[1.01] hover:border-brand-deep/20 focus-visible:ring-2 focus-visible:ring-brand-mid/35"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                <Image
                  src={testimonial.photo}
                  alt={`صورة الزبونة ${testimonial.name} من ${testimonial.city} بعد تجربة ${testimonial.product}`}
                  width={520}
                  height={650}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6">
                <StarRatingSvg rating={testimonial.rating} />
                <p className="mt-4 min-h-40 text-[15px] leading-[1.7] text-brand-deep/80">
                  &quot;{testimonial.story}&quot;
                </p>

                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-900/15 px-3 py-1.5 text-xs font-semibold text-emerald-900">
                  <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  <span>{testimonial.result}</span>
                </div>

                <p className="mt-4 text-[13px] font-medium text-brand-deep/55">
                  {testimonial.name} • {testimonial.age} سنة • {testimonial.city}
                </p>

                <div className="mt-4">
                  <span className="rounded-full bg-brand-deep/10 px-3 py-1 text-xs font-medium text-brand-deep/75">
                    {testimonial.product}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

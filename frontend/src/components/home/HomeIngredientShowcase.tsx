"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const INGREDIENTS = [
  {
    titleEn: "Niacinamide",
    titleAr: "النياسيناميد",
    productLabel: "سيروم التوازن النهاري",
    copy:
      "فيتامين B3 يُعرَف بتأثيره المُوازِن على مظهر البشرة؛ يساعد على دعم صفائها ومظهرها المتوازن مع الالتزام بالروتين.",
    image: "/images/ingredients/ingredient-niacinamide.png",
    bgColor: "#FDF3F6",
    accentColor: "#C07080",
    delay: 0,
  },
  {
    titleEn: "Bakuchiol & Peptides",
    titleAr: "الباكوتشيول والببتيدات",
    productLabel: "كريم الريتينول الليلي",
    copy:
      "مزيج ليلي مركَّز يجمع بين الباكوتشيول النباتي اللطيف والببتيدات ليدعم مظهر النعومة دون إرهاق الصباح.",
    image: "/images/nura-night-renewal-ingredients.png",
    bgColor: "#F4EEF9",
    accentColor: "#8A60A0",
    delay: 0.08,
  },
  {
    titleEn: "Caffeine & Vitamin K2",
    titleAr: "الكافيين وفيتامين K2",
    productLabel: "سيروم محيط العين",
    copy:
      "عناية دقيقة بمحيط العين تجمع بين الكافيين وفيتامين K2 لدعم مظهر الإشراقة والراحة في منطقة تتطلّب لطافة فائقة.",
    image: "/images/ingredients/ingredient-caffeine.png",
    bgColor: "#FFF6E6",
    accentColor: "#9A7020",
    delay: 0.16,
  },
  {
    titleEn: "SPF 50",
    titleAr: "الحماية اليومية",
    productLabel: "إيكران الشمس SPF 50",
    copy:
      "خطوة صباحية خفيفة تساعد على حماية البشرة من أشعة الشمس وتحافظ على إشراقة الروتين اليومي دون ثقل.",
    image: "/images/ingredients/ingredient-hyaluronic.png",
    bgColor: "#EFF8F0",
    accentColor: "#5A8A60",
    delay: 0.24,
  },
];

export function HomeIngredientShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#FDFAF8] py-12 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8D5DA]/60 to-transparent" />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 max-w-2xl text-center"
        >
          <p className="luxury-kicker mb-3">لبّ التركيبة</p>
          <h2 className="section-heading text-[#3A222C]">مكونات بلغة واضحة… وهوية أنيقة</h2>
          <p className="mt-3 text-sm leading-7 text-[#6B5555] md:text-base">
            أربعة محاور أساسية تُبرز فلسفتنا: توازن نهاري، حماية صباحية، تجديد ليلي، ومظهر راحة حول العين — دون مبالغة أو ادعاءات طبّية.
          </p>
        </motion.div>

        {/* 2 cols on mobile, 4 on desktop */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {INGREDIENTS.map((item, index) => (
            <motion.article
              key={item.titleEn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: item.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#EDE4E8]/70 bg-white shadow-[0_3px_16px_rgba(61,44,50,0.07)] transition-shadow duration-300 hover:shadow-[0_10px_32px_rgba(61,44,50,0.12)] md:rounded-[1.6rem]"
            >
              {/* Ingredient image */}
              <div
                className="relative h-36 overflow-hidden sm:h-44 md:h-52"
                style={{ backgroundColor: item.bgColor }}
              >
                <Image
                  src={item.image}
                  alt={item.titleAr}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 48vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Subtle bottom fade into card body */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))" }}
                  aria-hidden
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-3.5 sm:p-5">
                <p
                  className="text-[9px] font-semibold uppercase tracking-[0.15em] sm:text-[10px] sm:tracking-[0.18em]"
                  style={{ color: item.accentColor }}
                >
                  {item.titleEn}
                </p>
                <h3 className="mt-1 text-sm font-bold leading-snug text-[#3A222C] sm:text-base md:text-lg">
                  {item.titleAr}
                </h3>
                <div
                  className="mt-2 h-[1.5px] w-7 rounded-full"
                  style={{ background: `linear-gradient(to left, transparent, ${item.accentColor}70)` }}
                />
                <p className="mt-2 text-[11px] leading-[1.75] text-[#6B5555] sm:text-[13px] sm:leading-[1.8]">
                  {item.copy}
                </p>
                <p
                  className="mt-auto pt-3 text-[10px] font-semibold sm:text-[11px]"
                  style={{ color: item.accentColor }}
                >
                  {item.productLabel}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

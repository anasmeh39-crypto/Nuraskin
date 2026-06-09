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
    image: "/images/products/product-niacinamide.png",
    bgFrom: "#FDF3F6",
    bgTo: "#FFF7F9",
    accentColor: "#C07080",
    delay: 0,
  },
  {
    titleEn: "Bakuchiol & Peptides",
    titleAr: "الباكوتشيول والببتيدات",
    productLabel: "كريم الريتينول الليلي",
    copy:
      "مزيج ليلي مركَّز يجمع بين الباكوتشيول النباتي اللطيف والببتيدات ليدعم مظهر النعومة دون إرهاق الصباح.",
    image: "/images/products/product-retinol.png",
    bgFrom: "#F4EEF9",
    bgTo: "#FAF5FF",
    accentColor: "#8A60A0",
    delay: 0.1,
  },
  {
    titleEn: "Caffeine & Vitamin K2",
    titleAr: "الكافيين وفيتامين K2",
    productLabel: "سيروم محيط العين",
    copy:
      "عناية دقيقة بمحيط العين تجمع بين الكافيين وفيتامين K2 لدعم مظهر الإشراقة والراحة في منطقة تتطلّب لطافة فائقة.",
    image: "/images/products/product-anti-cernes.png",
    bgFrom: "#FFF6E6",
    bgTo: "#FFFBF2",
    accentColor: "#9A7020",
    delay: 0.2,
  },
  {
    titleEn: "SPF 50",
    titleAr: "الحماية اليومية",
    productLabel: "إيكران الشمس SPF 50",
    copy:
      "خطوة صباحية خفيفة تساعد على حماية البشرة من أشعة الشمس وتحافظ على إشراقة الروتين اليومي دون ثقل.",
    image: "/images/products/product-sunscreen.png",
    bgFrom: "#F0F8F0",
    bgTo: "#F8FBF5",
    accentColor: "#5A8A60",
    delay: 0.3,
  },
];

export function HomeIngredientShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#FDFAF8] py-14 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8D5DA]/60 to-transparent" />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="luxury-kicker mb-3">لبّ التركيبة</p>
          <h2 className="section-heading text-[#3A222C]">مكونات بلغة واضحة… وهوية أنيقة</h2>
          <p className="mt-3 text-sm leading-7 text-[#6B5555] md:text-base">
            أربعة محاور أساسية تُبرز فلسفتنا: توازن نهاري، حماية صباحية، تجديد ليلي، ومظهر راحة حول العين — دون مبالغة أو ادعاءات طبّية.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INGREDIENTS.map((item, index) => (
            <motion.article
              key={item.titleEn}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: item.delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
              className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-[#EDE4E8]/70 bg-white shadow-[0_4px_20px_rgba(61,44,50,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(61,44,50,0.11)]"
            >
              {/* Product image area */}
              <div
                className="relative flex h-52 items-end justify-center overflow-hidden"
                style={{ background: `linear-gradient(160deg, ${item.bgFrom} 0%, ${item.bgTo} 100%)` }}
              >
                {/* Soft inner glow */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 50% 30%, ${item.bgFrom}CC 0%, transparent 65%)`,
                  }}
                  aria-hidden
                />
                <div className="relative z-10 h-40 w-28 translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
                  <Image
                    src={item.image}
                    alt={item.productLabel}
                    fill
                    sizes="(min-width: 1024px) 140px, 160px"
                    className="object-contain object-bottom drop-shadow-[0_8px_18px_rgba(0,0,0,0.10)]"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5 pt-4">
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: item.accentColor }}
                >
                  {item.titleEn}
                </p>
                <h3 className="mt-1 text-lg font-bold leading-snug text-[#3A222C]">
                  {item.titleAr}
                </h3>
                <div
                  className="mt-3 h-[1.5px] w-8 rounded-full"
                  style={{ background: `linear-gradient(to left, transparent, ${item.accentColor}80)` }}
                />
                <p className="mt-3 text-[13px] leading-[1.8] text-[#6B5555]">{item.copy}</p>
                <p
                  className="mt-auto pt-4 text-[11px] font-semibold"
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

"use client";

import { motion } from "framer-motion";
import { Droplets, MoonStar, ScanEye } from "lucide-react";

const INGREDIENTS = [
  {
    Icon: Droplets,
    titleEn: "Niacinamide",
    titleAr: "النياسيناميد",
    copy:
      "فيتامين B3 يُعرَف بتأثيره المُوازِن على مظهر البشرة؛ يساعد على دعم صفائها ومظهرها المتوازن مع الالتزام بالروتين.",
    accent: "from-rose-100/90 to-[#fdeef2]",
    ring: "ring-rose-200/60",
    iconBg: "bg-[#FDF5F7] text-rose-deep",
    delay: 0,
  },
  {
    Icon: MoonStar,
    titleEn: "Bakuchiol & Peptides",
    titleAr: "الباكوتشيول والببتيدات",
    copy:
      "مزيج ليلي مركَّز يجمع بين الباكوتشيول النباتي اللطيف والببتيدات ليدعم مظهر النعومة ولُطفًا على البشرة دون إرهاق الصباح.",
    accent: "from-[#f5eef2] to-ivory",
    ring: "ring-purple-100/70",
    iconBg: "bg-[#F3EDF8] text-[#6B4D7A]",
    delay: 0.12,
  },
  {
    Icon: ScanEye,
    titleEn: "Caffeine & Vitamin K2",
    titleAr: "الكافيين وفيتامين K2",
    copy:
      "فِقرة عناية دقيقة بمحيط العين تجمع بين الكافيين وفيتامين K2 لدعم مظهر الإشراقة والراحة في منطقة تتطلّب لطافة فائقة.",
    accent: "from-amber-50/90 to-rose-blush/80",
    ring: "ring-amber-100/70",
    iconBg: "bg-[#FFF8F0] text-[#8B6914]",
    delay: 0.24,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: INGREDIENTS[i].delay,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function HomeIngredientShowcase() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-rose-soft/40 to-transparent" />
      <div className="pointer-events-none absolute -right-24 top-24 h-64 w-64 rounded-full bg-rose-blush/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-amber-100/25 blur-3xl" />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="luxury-kicker mb-3">لبّ التركيبة</p>
          <h2 className="section-heading text-[#3A222C]">مكونات بلغة واضحة… وهوية أنيقة</h2>
          <p className="mt-3 text-sm leading-7 text-[#6B5555] md:text-base">
            ثلاثة محاور أساسية تُبرز فلسفتنا: توازن نهاري، تجديد ليلي، ومظهر راحة حول العين — دون مبالغة أو ادعاءات طبّية.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {INGREDIENTS.map((item, index) => {
            const Icon = item.Icon;
            return (
              <motion.article
                key={item.titleEn}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
                }}
                className="group relative"
              >
                <div
                  className={`relative overflow-hidden rounded-[1.85rem] border border-white/80 bg-gradient-to-br ${item.accent} p-[1px] shadow-rose-sm ring-1 ${item.ring} transition-shadow duration-300 group-hover:shadow-rose-md`}
                >
                  <div className="relative rounded-[1.78rem] bg-white/80 p-7 backdrop-blur-sm md:p-8">
                    <motion.div
                      className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg} shadow-inner`}
                      initial={{ scale: 0.85, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: item.delay + 0.15,
                        type: "spring",
                        stiffness: 380,
                        damping: 22,
                      }}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.35} aria-hidden />
                    </motion.div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-mid">{item.titleEn}</p>
                    <h3 className="mt-2 text-xl font-bold text-[#3A222C]">{item.titleAr}</h3>
                    <motion.div
                      className="mt-4 h-px w-12 rounded-full bg-gradient-to-l from-rose-deep/50 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: item.delay + 0.35, duration: 0.45 }}
                    />
                    <p className="mt-4 text-sm leading-7 text-[#6B5555]">{item.copy}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CARDS = [
  {
    image: "/images/nura-morning-products-hero.png",
    objectPosition: "object-center",
    kicker: "الصباح",
    title: "كتبداي نهارك مرتاحة",
    copy: "كتفيقي وما كتحتاجيش تخبي بشرتك.\nأول حاجة كتشوفيها فالمراية هي بشرة مرتاحة ومتوازنة.",
    gradient: "from-[#2C1408]/90 via-[#2C1408]/50 to-transparent",
    kickerColor: "text-amber-300",
  },
  {
    image: "/images/emotion-confidence-day.png",
    objectPosition: "object-top",
    kicker: "النهار",
    title: "الثقة كتولي طبيعية",
    copy: "ما كتبقايش تفكري واش البشرة باهتة ولا مرهقة.\nكتعيشي نهارك عادي... والبشرة كتدير خدمتها بوحدها.",
    gradient: "from-[#1A0810]/90 via-[#1A0810]/50 to-transparent",
    kickerColor: "text-rose-300",
  },
  {
    image: "/images/emotion-evening-peace.png",
    objectPosition: "object-top",
    kicker: "المساء",
    title: "كتسالي نهارك بنفس الإحساس",
    copy: "ماشي إحساس مؤقت.\nروتين منظم كيخليك تحسي براسك مرتاحة من الصباح حتى للمساء.",
    gradient: "from-[#0E0818]/90 via-[#0E0818]/50 to-transparent",
    kickerColor: "text-purple-300",
  },
];

export function EmotionalTransformationSection() {
  return (
    <section className="overflow-hidden bg-[#0C0608] py-12 md:py-20" dir="rtl">
      <div className="container-wide">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#C4788A]/80">
            تخيلي
          </p>
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
            تخيلي الإحساس ملي بشرتك
            <br />
            <span className="text-[#C4788A]">تولّي جزء من ثقتك</span>
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/38">
            ماشي غير روتين — إحساس كيبقى معاك طول النهار.
          </p>
        </motion.div>

        {/* ── CARDS — horizontal filmstrip on mobile, grid on sm+ ── */}
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 sm:gap-4">
          {CARDS.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative min-w-[82vw] shrink-0 snap-start overflow-hidden rounded-[1.6rem] sm:min-w-0"
              style={{ aspectRatio: "3 / 4.2" }}
            >
              {/* Photography */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className={`object-cover ${card.objectPosition} transition-transform duration-500 ease-out sm:group-hover:scale-[1.03]`}
                loading="lazy"
                quality={80}
              />

              {/* Bottom gradient overlay */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${card.gradient}`}
              />

              {/* Top vignette — very subtle */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

              {/* Text block */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className={`text-[10px] font-black uppercase tracking-[0.22em] ${card.kickerColor}`}>
                  {card.kicker}
                </span>
                <h3 className="mt-2 text-[1.25rem] font-black leading-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-2 whitespace-pre-line text-[12px] leading-[1.7] text-white/65">
                  {card.copy}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── BOTTOM QUOTE ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center text-sm italic leading-relaxed text-white/25"
        >
          "الفرق الحقيقي ماشي فالمراية — الفرق فكيفاش كتحسي براسك."
        </motion.p>
      </div>
    </section>
  );
}

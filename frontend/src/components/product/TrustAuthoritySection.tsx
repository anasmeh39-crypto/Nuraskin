"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Droplets, Leaf, ShieldCheck, Sun } from "lucide-react";

const TRUST_ITEMS = [
  {
    Icon: Leaf,
    label: "صنع في المغرب",
    sub: "تركيبة محلية فاخرة",
    iconBg: "#F0F7ED",
    iconColor: "#5A9A5A",
    borderColor: "#BFD8B8",
  },
  {
    Icon: Sun,
    label: "حماية SPF 50",
    sub: "UVA · UVB",
    iconBg: "#FFF8E8",
    iconColor: "#C49A30",
    borderColor: "#F0D880",
  },
  {
    Icon: Droplets,
    label: "ترطيب عميق",
    sub: "بدون ملمس دهني",
    iconBg: "#EDF5FC",
    iconColor: "#4A90C4",
    borderColor: "#C8DFF0",
  },
  {
    Icon: BadgeCheck,
    label: "طبيعي 100%",
    sub: "مكونات مختارة",
    iconBg: "#FEF0F3",
    iconColor: "#B8617A",
    borderColor: "#F8D8DF",
  },
];

export function TrustAuthoritySection() {
  return (
    <section
      className="relative overflow-hidden border-t border-[#EDE8E3] bg-[#FDFAF7] py-8"
      dir="rtl"
      aria-label="ثقة نورا سكين"
    >
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-20 top-0 h-40 w-40 rounded-full bg-rose-blush/15 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-gold-light/15 blur-3xl" />
      </div>

      <div className="container-wide relative">
        <div className="grid grid-cols-2 gap-px md:grid-cols-4">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col items-center gap-3 px-4 py-5 text-center ${
                i < TRUST_ITEMS.length - 1 ? "md:border-l md:border-[#EDE8E3]" : ""
              }`}
            >
              {/* Icon container */}
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-[0_2px_10px_rgba(44,24,16,0.07)] ring-1"
                style={{
                  background: item.iconBg,
                  border: `1px solid ${item.borderColor}`,
                }}
              >
                <item.Icon
                  className="h-5 w-5"
                  style={{ color: item.iconColor }}
                  strokeWidth={1.6}
                  aria-hidden
                />
              </div>

              {/* Text */}
              <div>
                <p className="text-sm font-bold text-[#2C1810]">{item.label}</p>
                <p className="mt-0.5 font-sans text-[11px] text-[#A89898]">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

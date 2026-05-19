"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FlaskConical, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#fffaf1_0%,#f7dde4_50%,#fffdf9_100%)]">
      <div className="absolute -top-28 -left-24 h-72 w-72 rounded-full bg-white/45 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-64 w-64 rounded-full bg-[#fff1c9]/70 blur-3xl" />
      <div className="container-wide relative">
        <div className="grid grid-cols-1 items-center gap-10 py-12 md:grid-cols-2 md:gap-14 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 text-center md:order-1 md:text-right"
          >
            <div className="luxury-kicker mb-6">
              <FlaskConical className="h-4 w-4 text-gold" strokeWidth={1.5} />
              عناية علمية ناعمة لبشرة أكثر توازنًا
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-[1.18] text-brand-deep md:text-6xl lg:text-7xl">
              عناية ذكية ببشرتكِ
              <br />
              <span className="text-brand-mid">بلمسة ناعمة ونتائج تُلاحظينها</span>
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-lg leading-9 text-gray-600 md:mx-0">
              روتين فاخر من خطوات صباحية وليلية، يجمع بين مكونات مختارة بعناية وحماية يومية لبشرة أكثر توازناً وإشراقاً يوماً بعد يوم.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
              <Link href="/products" className="group">
                <Button variant="primary" size="lg" className="min-h-[60px] px-9 text-[17px]">
                  <Sparkles className="relative z-10 h-5 w-5 text-gold-light" strokeWidth={1.6} />
                  <span className="relative z-10">ابدئي روتينك الآن</span>
                  <ArrowLeft className="relative z-10 h-5 w-5 transition-transform group-hover:-translate-x-1" strokeWidth={1.7} />
                </Button>
              </Link>
              <Link href="/about" className="group">
                <Button variant="secondary" size="lg" className="min-h-[60px] px-9 text-[17px]">
                  <span>لماذا نورا سكين؟</span>
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" strokeWidth={1.7} />
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, text: "الدفع عند الاستلام" },
                { icon: FlaskConical, text: "تركيبات مختارة بعناية" },
                { icon: Truck, text: "توصيل مجاني لجميع أنحاء المغرب" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="premium-card flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm text-brand-deep md:justify-start">
                    <Icon className="h-4 w-4 text-gold" strokeWidth={1.6} />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="order-1 md:order-2"
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-white/40 blur-xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/60 p-3 soft-shadow">
                <PlaceholderImage
                  label="NURA SKIN Routine"
                  aspectRatio="portrait"
                  className="w-full rounded-[2rem]"
                />
              </div>
              <div className="absolute -bottom-5 -start-3 rounded-3xl border border-border bg-white/90 p-5 soft-shadow backdrop-blur">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-deep">+847</div>
                  <div className="text-xs text-gray-500">سيدة اختارتنا هذا الشهر</div>
                </div>
              </div>
              <div className="absolute -top-4 -end-2 rounded-full border border-border bg-white/90 p-4 text-brand-mid soft-shadow">
                <PackageCheck className="h-6 w-6" strokeWidth={1.4} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

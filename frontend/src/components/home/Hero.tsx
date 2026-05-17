"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function Hero() {
  return (
    <section className="bg-cream overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-12 md:py-20 items-center">
          {/* Text — first in RTL */}
          <div className="order-2 md:order-1 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-brand-light text-brand-deep text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-brand-mid rounded-full" />
              صنعناها للبشرة المغربية
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-deep leading-tight mb-5">
              بشرتك تستاهل
              <br />
              <span className="text-gold">عناية تفهمها</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              ثلاثة منتجات مدروسة علمياً، مصممة لاحتياجات البشرة المغربية —
              صباحاً وليلاً. بدون ادعاءات زائفة، بدون تعقيد.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/products">
                <Button variant="primary" size="lg">
                  اكتشفي المنتجات
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg">
                  عن نيورا سكين
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-4 mt-8 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-600 font-bold text-base">✓</span>
                الدفع عند الاستلام
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-600 font-bold text-base">✓</span>
                توصيل سريع
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-600 font-bold text-base">✓</span>
                إرجاع مجاني
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2">
            <div className="relative max-w-md mx-auto">
              <div className="rounded-4xl overflow-hidden">
                <PlaceholderImage
                  label="نيورا سكين"
                  aspectRatio="portrait"
                  className="w-full"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -start-4 bg-white border border-border rounded-2xl p-4 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-deep">+847</div>
                  <div className="text-xs text-gray-500">اختارتها هاد الشهر</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

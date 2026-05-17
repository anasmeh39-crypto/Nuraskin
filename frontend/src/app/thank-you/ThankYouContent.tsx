"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/config/products";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { trackThankYouViewed } from "@/lib/tracking";

export function ThankYouContent() {
  const params = useSearchParams();
  const orderNumber = params.get("order") || "";

  useEffect(() => {
    if (orderNumber) trackThankYouViewed(orderNumber);
  }, [orderNumber]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-brand-deep py-16 text-center">
        <div className="container-wide max-w-xl">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            شكراً! طلبك وصل
          </h1>
          <p className="text-white/80 text-lg">
            استلمنا طلبك وغادي نبدأو التجهيز
          </p>
          {orderNumber && (
            <div className="mt-6 inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-3">
              <span className="text-white/60 text-sm">رقم الطلب:</span>
              <span className="text-white font-bold font-sans">{orderNumber}</span>
            </div>
          )}
        </div>
      </section>

      <div className="container-wide max-w-2xl py-12 space-y-8">
        {/* What happens next */}
        <div className="bg-white rounded-3xl border border-border p-6">
          <h2 className="text-xl font-bold text-brand-deep mb-5">
            شنو غادي يوقع دابا؟
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "تأكيد الطلب",
                desc: "غادي يتصل بيك فريق التوصيل لتأكيد عنوانك خلال 24–48 ساعة.",
              },
              {
                step: "02",
                title: "التجهيز والشحن",
                desc: "نجهزو طلبك ونبعثوه — التوصيل يستغرق 2–4 أيام عمل.",
              },
              {
                step: "03",
                title: "الاستلام والدفع",
                desc: "تستلمي طلبك وتدفعي لصاحب التوصيل — ما في دفع مسبق.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center shrink-0">
                  <span className="text-brand-deep font-bold text-sm font-sans">
                    {s.step}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-brand-deep">{s.title}</p>
                  <p className="text-gray-600 text-sm mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence builder */}
        <div className="bg-brand-light rounded-3xl p-6 text-center">
          <p className="text-brand-deep font-bold text-lg mb-2">
            قرارك صح 💚
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            اخترتي منتجاً مدروساً علمياً، مصنوعاً للبشرة المغربية.
            روتينك الجديد في الطريق — ما تنساي تستخدميه بانتظام.
          </p>
        </div>

        {/* Soft recommendations */}
        <div>
          <h2 className="text-xl font-bold text-brand-deep mb-4">
            قد يعجبك أيضاً
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PRODUCTS.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="block bg-white rounded-2xl border border-border p-4 hover:border-brand-deep transition-colors"
              >
                <div className="h-28 rounded-xl overflow-hidden mb-3">
                  <PlaceholderImage label={p.name_ar} className="w-full h-full" />
                </div>
                <p className="font-semibold text-brand-deep text-sm leading-snug">
                  {p.name_ar}
                </p>
                <p className="text-brand-mid text-sm font-bold mt-1">
                  {p.formattedPrice}
                </p>
              </Link>
            ))}
          </div>
          <p className="text-xs text-center text-gray-400 mt-3">
            استكشاف فقط — مش إلزامي
          </p>
        </div>

        {/* Return policy reminder */}
        <div className="text-center py-6 border-t border-border">
          <p className="text-sm text-gray-600">
            عندك سؤال أو مشكلة؟{" "}
            <Link href="/contact" className="text-brand-deep font-semibold underline">
              تواصلي معنا
            </Link>
            {" "}— أو راجعي{" "}
            <Link href="/policies/returns" className="text-brand-deep underline">
              سياسة الإرجاع
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

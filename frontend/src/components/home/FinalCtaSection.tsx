import React from "react";
import Link from "next/link";
import { FlaskConical, ShieldCheck, Truck } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-[linear-gradient(135deg,#f7dde4_0%,#fffaf1_62%,#fffdf9_100%)] px-6 py-12 text-center soft-shadow md:px-16 md:py-16">
          <div className="absolute -top-20 left-10 h-48 w-48 rounded-full bg-white/60 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold tracking-[0.22em] text-gold">NURA SKIN ROUTINE</p>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-brand-deep md:text-5xl">
              ابدئي روتيناً ناعماً يمنح بشرتكِ حضوراً أكثر توازناً وإشراقاً
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-gray-600">
              اختاري المجموعة الكاملة واستمتعي بتجربة عناية متناسقة، مصممة لتكون بسيطة، راقية، وسهلة الالتزام يومياً.
            </p>
            <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/products" className="btn-primary">
                تسوّقي الروتين الكامل
              </Link>
              <Link href="/about" className="btn-secondary">
                تعرّفي على فلسفتنا
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-brand-deep">
              {[
                { icon: ShieldCheck, text: "الدفع عند الاستلام" },
                { icon: Truck, text: "توصيل سريع داخل المغرب" },
                { icon: FlaskConical, text: "تركيبات مختارة بعناية" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <span key={item.text} className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2">
                    <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                    {item.text}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

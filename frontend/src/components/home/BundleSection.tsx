"use client";

import Image from "next/image";
import { Check, Eye, Moon, ShieldCheck, SunMedium } from "lucide-react";
import { BUNDLES, PRODUCTS_MAP, PRODUCTS } from "@/config/products";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart } from "@/lib/tracking";
import { CartItem } from "@/types";
import { BUNDLE_HERO_IMAGES } from "@/components/packs/PackCard";

export function BundleSection() {
  const { addItem } = useCartStore();

  const handleBundleAdd = (productSlugs: string[], bundlePrice: number, bundleName: string) => {
    const unitPrice = Math.floor(bundlePrice / productSlugs.length);
    const remainder = bundlePrice - unitPrice * productSlugs.length;

    productSlugs.forEach((slug, index) => {
      const p = PRODUCTS_MAP[slug];
      if (p) {
        const allocatedPrice = unitPrice + (index === 0 ? remainder : 0);
        addItem({
          slug: p.slug,
          name_ar: p.name_ar,
          price: allocatedPrice,
          image: p.image,
          compareAtPrice: p.price,
          bundleName,
          discountAmount: Math.max(p.price - allocatedPrice, 0),
        });
      }
    });

    const updatedItems: CartItem[] = productSlugs.map((slug, index) => {
      const p = PRODUCTS_MAP[slug];
      return {
        slug,
        name_ar: p?.name_ar || slug,
        price: unitPrice + (index === 0 ? remainder : 0),
        image: "",
        quantity: 1,
        compareAtPrice: p?.price,
        bundleName,
        discountAmount: Math.max((p?.price ?? 0) - (unitPrice + (index === 0 ? remainder : 0)), 0),
      };
    });
    const total = updatedItems.reduce((s, i) => s + i.price, 0);
    trackAddToCart(updatedItems, total, generateEventId());
  };

  return (
    <section className="py-16 md:py-24 bg-[linear-gradient(180deg,#fffdf9_0%,#fffaf1_100%)]">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="luxury-kicker mx-auto mb-4 w-fit">روتين متكامل</p>
          <h2 className="section-heading">
            لبشرة أكثر توازناً وإشراقاً
          </h2>
          <p className="section-subheading max-w-xl mx-auto">
            روتين صباحي للحماية والإشراقة، وروتين ليلي يدعم مظهر الراحة والتجدد.
          </p>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: SunMedium, title: "الصباح", text: "سيروم توازن وإشراقة البشرة بالنياسيناميد." },
            { icon: ShieldCheck, title: "الحماية", text: "واقي الشمس اليومي SPF 50 كآخر خطوة صباحية." },
            { icon: Moon, title: "المساء", text: "كريم التجديد الليلي للبشرة." },
            { icon: Eye, title: "محيط العين", text: "سيروم نضارة محيط العين." },
          ].map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="premium-card rounded-3xl p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-mid">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-brand-deep">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">{step.text}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BUNDLES.map((bundle, idx) => {
            const products = bundle.products.map((s) => PRODUCTS_MAP[s]).filter(Boolean);
            const isMain = idx === 0;
            const listTotal = bundle.products.reduce((sum, slug) => {
              const p = PRODUCTS.find((x) => x.slug === slug);
              return sum + (p?.price ?? 0);
            }, 0);

            const hero = BUNDLE_HERO_IMAGES[bundle.id];

            return (
              <div
                key={bundle.id}
                className={`rounded-[1.65rem] relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${
                  isMain
                    ? "border-2 border-gold/40 bg-gradient-to-b from-brand-deep via-brand-deep to-[#2e2429] shadow-[0_24px_60px_rgba(58,34,44,0.35)]"
                    : "premium-card border border-border shadow-[0_12px_36px_rgba(58,34,44,0.06)]"
                }`}
              >
                {/* Hero image */}
                {hero && (
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={hero.src}
                      alt={hero.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    {bundle.tag && (
                      <div
                        className={`absolute top-3 start-3 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wide text-white shadow-lg ${
                          isMain ? "bg-gradient-to-l from-gold to-[#C9A84C]" : "bg-brand-mid"
                        }`}
                      >
                        {bundle.tag}
                      </div>
                    )}
                  </div>
                )}

                <div className="p-7">
                {!hero && bundle.tag && (
                  <div
                    className={`absolute -top-px start-6 rounded-b-xl px-4 py-1.5 text-[10px] font-bold tracking-wide text-white shadow-lg ${
                      isMain ? "bg-gradient-to-l from-gold to-[#C9A84C]" : "bg-brand-mid"
                    }`}
                  >
                    {bundle.tag}
                  </div>
                )}

                <h3 className={`mt-4 font-bold text-xl mb-1 ${isMain ? "text-white" : "text-brand-deep"}`}>
                  {bundle.name_ar}
                </h3>

                <div className="my-5 space-y-2.5">
                  {products.map((p) => (
                    <div key={p!.slug} className="flex items-start gap-2 text-start">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${isMain ? "text-gold" : "text-gold"}`} strokeWidth={2.2} aria-hidden />
                      <span className={`text-sm leading-snug ${isMain ? "text-white/90" : "text-gray-700"}`}>{p!.name_ar}</span>
                    </div>
                  ))}
                </div>

                <div
                  className={`mb-5 flex flex-wrap items-end gap-2 border-t pt-5 ${isMain ? "border-white/10" : "border-border/70"}`}
                >
                  <span className={`text-4xl font-black tracking-tight ${isMain ? "text-white" : "text-brand-deep"}`}>
                    {bundle.price}
                  </span>
                  <span className={`mb-1 text-sm font-semibold ${isMain ? "text-white/85" : "text-brand-mid"}`}>درهم</span>
                  {bundle.saving > 0 && listTotal > bundle.price && (
                    <div className={`mt-3 w-full space-y-1 text-sm ${isMain ? "text-white/78" : "text-gray-600"}`}>
                      <p>القيمة الكاملة: <span className="line-through">{listTotal} درهم</span></p>
                      <p>سعر الروتين: <span className={isMain ? "font-bold text-white" : "font-bold text-brand-deep"}>{bundle.price} درهم</span></p>
                      <p
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          isMain ? "bg-white/15 text-gold-light" : "bg-gold-light text-brand-deep"
                        }`}
                      >
                        وفّري {bundle.saving} درهم
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleBundleAdd(bundle.products, bundle.price, bundle.name_ar)}
                  className={`w-full rounded-full py-4 text-base font-bold transition-all active:scale-[0.98] ${
                    isMain
                      ? "bg-white text-brand-deep shadow-lg hover:bg-gold-light"
                      : "bg-brand-deep text-white hover:bg-brand-mid"
                  }`}
                >
                  اطلبي هذه المجموعة
                </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            الدفع عند الاستلام • توصيل مجاني لجميع أنحاء المغرب • إرجاع مجاني
          </p>
        </div>
      </div>
    </section>
  );
}

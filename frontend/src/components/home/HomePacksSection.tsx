"use client";

import { Check, Sparkles } from "lucide-react";
import { BUNDLES, PRODUCTS_MAP } from "@/config/products";
import { PackCard, addBundleToCart } from "@/components/packs/PackCard";
import { useCartStore } from "@/store/cart";

const completePack = BUNDLES.find((bundle) => bundle.id === "nura-complete-ritual") ?? BUNDLES[0];
const smallerPacks = BUNDLES.filter((bundle) => bundle.id !== completePack.id);

export function HomePacksSection() {
  const { addItem } = useCartStore();
  const completeProducts = completePack.products.map((slug) => PRODUCTS_MAP[slug]).filter(Boolean);

  return (
    <section className="bg-[linear-gradient(180deg,#FFFDFC_0%,#FDF5F7_100%)] py-16 md:py-24">
      <div className="container-wide">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="luxury-kicker mx-auto mb-4 w-fit">الباقات</p>
          <h2 className="section-heading text-[#3A222C]">روتينات Nura Skin المتكاملة</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-[#6B5555]">
            اختاري الباقة المناسبة لبشرتك وابدئي روتينًا واضحًا يجمع بين العناية، النضارة، والحماية.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <article className="relative overflow-hidden rounded-[2.2rem] border border-gold/30 bg-gradient-to-br from-[#3D2C32] via-[#46313A] to-[#7B5260] p-6 text-white shadow-[0_28px_80px_rgba(61,44,50,0.26)] md:p-8">
            <div className="absolute start-8 top-0 rounded-b-2xl bg-gold px-4 py-1.5 text-[11px] font-bold text-[#3A222C]">
              {completePack.tag}
            </div>

            <div className="grid items-center gap-8 md:grid-cols-[0.95fr_1.05fr]">
              <div className="order-2 md:order-1">
                <h3 className="mt-4 text-3xl font-black leading-tight md:text-4xl">{completePack.name_ar}</h3>
                <p className="mt-3 text-sm leading-8 text-white/78">
                  روتين كامل يجمع بين التوازن، النضارة، التجديد الليلي، والحماية اليومية في باقة واحدة عالية القيمة.
                </p>

                <ul className="mt-6 space-y-2.5">
                  {completeProducts.map((product) => (
                    <li key={product!.slug} className="flex items-start gap-2 text-sm leading-6 text-white/86">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={2.1} />
                      <span>{product!.name_ar}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 rounded-3xl border border-white/15 bg-white/8 p-4">
                  <p className="text-sm text-white/72">
                    القيمة الكاملة: <span className="line-through">{completePack.compareAtPrice} درهم</span>
                  </p>
                  <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
                    <p className="text-4xl font-black">
                      {completePack.price} <span className="text-sm font-bold">درهم</span>
                    </p>
                    <p className="rounded-full bg-white/12 px-3 py-1 text-xs font-bold text-gold-light">
                      وفّري {completePack.saving} درهم
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => addBundleToCart(completePack, addItem)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-extrabold text-[#3D2C32] shadow-lg transition hover:bg-gold-light sm:w-auto"
                >
                  <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                  اطلبي الروتين الكامل
                </button>
              </div>

              <div className="order-1 md:order-2">
                <div className="rounded-[2rem] border border-white/15 bg-white/8 p-4">
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.6rem] border border-white/15 bg-white/8">
                    <div className="absolute inset-x-10 bottom-8 h-14 rounded-full bg-gold/18 blur-2xl" />
                    <div className="relative grid grid-cols-4 items-end gap-2 sm:gap-3">
                      {completeProducts.map((product, index) => (
                        <div
                          key={product!.slug}
                          className="w-12 rounded-[1.1rem] border border-white/20 bg-white/14 shadow-ivory-sm sm:w-16"
                          style={{ height: `${104 + ((index % 3) * 18)}px` }}
                        >
                          <div className="mx-auto mt-5 h-8 w-8 rounded-full border border-gold/40 bg-white/10" />
                          <div className="mx-auto mt-5 h-1.5 w-8 rounded-full bg-white/25" />
                          <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-white/18" />
                        </div>
                      ))}
                    </div>
                    <span className="absolute bottom-4 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-semibold text-white/86">
                      صورة الروتين الكامل
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-6">
            {smallerPacks.map((bundle) => (
              <PackCard
                key={bundle.id}
                bundle={bundle}
                cta={bundle.id === "morning-ritual" ? "أضيفي روتين الصباح للسلة" : "أضيفي روتين الليل للسلة"}
                positioning={bundle.id === "morning-ritual" ? "روتين صباحي للحماية والإشراقة." : "روتين ناعم للعناية الليلية."}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

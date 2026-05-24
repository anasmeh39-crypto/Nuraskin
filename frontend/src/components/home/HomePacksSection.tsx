"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { BUNDLES, PRODUCTS_MAP } from "@/config/products";
import { BenefitIconRow, PackCard, ProductChecklist, TrustPill, addBundleToCart } from "@/components/packs/PackCard";
import { useCartStore } from "@/store/cart";

const completePack = BUNDLES.find((bundle) => bundle.id === "nura-complete-ritual") ?? BUNDLES[0];
const smallerPacks = BUNDLES.filter((bundle) => bundle.id !== completePack.id);

export function HomePacksSection() {
  const { addItem } = useCartStore();
  const completeProducts = completePack.products.map((slug) => PRODUCTS_MAP[slug]).filter(Boolean);

  return (
    /* IMAGES NEEDED:
       /images/bundles/morning-routine-hero.jpg  (4:3, min 1200x900)
       /images/bundles/night-renewal-hero.jpg   (4:3, min 1200x900)
       /images/bundles/full-routine-hero.jpg    (4:3, min 1200x900)
       /images/products/*.jpg                   (1:1, min 400x400)
       */
    <section className="bg-[linear-gradient(180deg,#FFFDFC_0%,#FDF5F7_100%)] py-16 md:py-24">
      <div className="container-wide">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="luxury-kicker mx-auto mb-4 w-fit">الباقات</p>
          <h2 className="section-heading text-[#3A222C]">روتينات نورا سكين المتكاملة</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-[#6B5555]">
            اختاري الباقة المناسبة لبشرتك وابدئي روتينًا واضحًا يجمع بين العناية، النضارة، والحماية.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <article className="relative overflow-hidden rounded-[2.2rem] border border-[#E7D8CB] bg-[linear-gradient(135deg,#FFFDF9_0%,#F8EEE8_100%)] p-5 shadow-[0_28px_80px_rgba(97,70,58,0.14)] md:p-7">
            <div className="grid items-center gap-7 md:grid-cols-[0.85fr_1.15fr]">
              <div className="order-2 max-w-[28rem] md:order-1">
                <h3 className="mt-3 text-3xl font-semibold leading-tight text-[#72544A] md:text-[2.55rem] md:leading-[1.16]">{completePack.name_ar}</h3>
                <p className="mt-4 text-sm leading-8 text-[#8A7268]">
                  روتين كامل يجمع بين التوازن، النضارة، التجديد الليلي، والحماية اليومية في باقة واحدة عالية القيمة.
                </p>

                <div className="mt-6">
                  <ProductChecklist products={completeProducts} />
                </div>

                <div className="mt-6">
                  <BenefitIconRow />
                </div>

                <div className="mt-7 rounded-3xl border border-[#E7D8CB] bg-white/54 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] backdrop-blur">
                  <p className="text-sm text-[#9A8175]">
                    القيمة الكاملة: <span className="line-through">{completePack.compareAtPrice} درهم</span>
                  </p>
                  <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
                    <p className="text-4xl font-semibold text-[#674A42]">
                      {completePack.price} <span className="text-sm font-bold">درهم</span>
                    </p>
                    <p className="rounded-full border border-[#E2CCBB] bg-[#F7E9DE] px-3 py-1 text-xs font-bold text-[#8D684E]">
                      وفّري {completePack.saving} درهم
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <TrustPill />
                </div>

                <button
                  type="button"
                  onClick={() => addBundleToCart(completePack, addItem)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D9BFAE] bg-[linear-gradient(135deg,#8A655A,#B98D72)] px-6 py-4 text-sm font-bold text-white shadow-[0_16px_38px_rgba(137,94,78,0.20)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(137,94,78,0.26)] sm:w-auto"
                >
                  <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                  اطلبي الروتين الكامل
                </button>
              </div>

              <div className="order-1 md:order-2">
                <div className="rounded-[2rem] border border-white/70 bg-white/40 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_18px_52px_rgba(97,70,58,0.12)]">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem] border border-[#E5D2C3] bg-[#F6EDE5] md:aspect-[16/11]">
                    <Image
                      src="/images/bundles/full-routine-hero.jpg"
                      alt="روتين نورا الكامل للعناية بالبشرة"
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      priority
                      className="object-cover object-center"
                    />
                    <span className="absolute end-4 top-4 z-10 rounded-full border border-[#E2CCBB] bg-[#F4E4D8]/92 px-4 py-1.5 text-[11px] font-bold text-[#765A4D] shadow-[0_10px_28px_rgba(97,70,58,0.08)] backdrop-blur">
                      {completePack.tag}
                    </span>
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,transparent_46%,rgba(255,250,246,0.16)_100%)]" />
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

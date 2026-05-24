"use client";

import { Eye, MoonStar, Sparkles, SunMedium } from "lucide-react";
import { BUNDLES, PRODUCTS_MAP } from "@/config/products";
import { BenefitIconRow, ProductChecklist, TrustPill, addBundleToCart } from "@/components/packs/PackCard";
import { useCartStore } from "@/store/cart";
import type { Bundle } from "@/types";

const completePack = BUNDLES.find((bundle) => bundle.id === "nura-complete-ritual") ?? BUNDLES[0];
const smallerPacks = BUNDLES.filter((bundle) => bundle.id !== completePack.id);

const routinePillars = [
  { label: "الصباح", Icon: SunMedium },
  { label: "الليل", Icon: MoonStar },
  { label: "محيط العين", Icon: Eye },
  { label: "الروتين الكامل", Icon: Sparkles },
];

const bundleIconMap = {
  "morning-ritual": SunMedium,
  "night-renewal-ritual": MoonStar,
  "nura-complete-ritual": Sparkles,
} as const;

function RoutineIconBadge({ bundle, featured = false }: { bundle: Bundle; featured?: boolean }) {
  const Icon = bundleIconMap[bundle.id as keyof typeof bundleIconMap] ?? Sparkles;

  return (
    <div className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ${
      featured
        ? "border-[#D8B79A]/50 bg-[#FFF8F1] text-[#8A655A]"
        : "border-[#E7D8CB] bg-[#FFF9F6] text-[#8E5A68]"
    }`}>
      <span className="absolute inset-2 rounded-[1.25rem] bg-[radial-gradient(circle_at_35%_22%,rgba(255,255,255,0.9),transparent_56%)]" />
      <Icon className="relative h-7 w-7" strokeWidth={1.25} />
    </div>
  );
}

function RoutinePillarGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {routinePillars.map(({ label, Icon }) => (
        <div
          key={label}
          className="rounded-[1.35rem] border border-[#E7D8CB] bg-white/62 p-4 text-center shadow-[0_12px_34px_rgba(97,70,58,0.08)] backdrop-blur"
        >
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E5D2C3] bg-[#FFF9F6] text-[#8A655A]">
            <Icon className="h-5 w-5" strokeWidth={1.25} />
          </div>
          <p className="text-xs font-bold text-[#72544A]">{label}</p>
        </div>
      ))}
    </div>
  );
}

function CompactBundleCard({ bundle, cta, positioning }: { bundle: Bundle; cta: string; positioning: string }) {
  const { addItem } = useCartStore();
  const products = bundle.products.map((slug) => PRODUCTS_MAP[slug]).filter(Boolean);

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-[#E7D8CB] bg-white p-5 shadow-[0_18px_52px_rgba(97,70,58,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_68px_rgba(142,90,104,0.13)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_18%_0%,rgba(248,224,226,0.58),transparent_42%),linear-gradient(180deg,#FFF8F2,rgba(255,255,255,0))]" />
      <div className="relative flex items-start gap-4">
        <RoutineIconBadge bundle={bundle} />
        <div className="min-w-0 flex-1">
          <div className="mb-3 inline-flex rounded-full border border-[#E2CCBB] bg-[#FFF4EC] px-3 py-1 text-[11px] font-bold text-[#8D684E]">
            {bundle.tag}
          </div>
          <h3 className="text-2xl font-black leading-tight text-[#3A222C]">{bundle.name_ar}</h3>
          <p className="mt-2 text-sm leading-7 text-[#6B5555]">{positioning}</p>
        </div>
      </div>

      <div className="relative mt-5">
        <ProductChecklist products={products} />
      </div>

      <div className="mt-5 rounded-3xl border border-[#E7D8CB] bg-[#FFF9F6] p-4">
        <p className="text-sm text-[#8A7268]">
          القيمة الكاملة: <span className="line-through">{bundle.compareAtPrice} درهم</span>
        </p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          <p className="text-3xl font-black text-[#8E5A68]">
            {bundle.price} <span className="text-sm font-bold">درهم</span>
          </p>
          <p className="rounded-full border border-[#E2CCBB] bg-[#F7E9DE] px-3 py-1 text-xs font-bold text-[#8D684E]">
            وفّري {bundle.saving} درهم
          </p>
        </div>
      </div>

      <div className="mt-4">
        <TrustPill />
      </div>

      <button
        type="button"
        onClick={() => addBundleToCart(bundle, addItem)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-rose-deep px-5 py-4 text-sm font-extrabold text-white shadow-rose-md transition hover:-translate-y-0.5 hover:bg-[#774956] active:scale-[0.98]"
      >
        <Sparkles className="h-4 w-4" strokeWidth={1.5} />
        {cta}
      </button>
    </article>
  );
}

export function HomePacksSection() {
  const { addItem } = useCartStore();
  const completeProducts = completePack.products.map((slug) => PRODUCTS_MAP[slug]).filter(Boolean);

  return (
    <section className="bg-[linear-gradient(180deg,#FFFDFC_0%,#FDF5F7_100%)] py-14 md:py-18">
      <div className="container-wide">
        <div className="mx-auto mb-9 max-w-2xl text-center md:mb-10">
          <p className="luxury-kicker mx-auto mb-3 w-fit">الباقات</p>
          <h2 className="section-heading text-[#3A222C]">روتينات نورا سكين المتكاملة</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-[#6B5555]">
            اختاري الباقة المناسبة لبشرتك وابدئي روتينًا واضحًا يجمع بين العناية، النضارة، والحماية.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="relative overflow-hidden rounded-[2.2rem] border border-[#E7D8CB] bg-[linear-gradient(135deg,#FFFDF9_0%,#F8EEE8_100%)] p-5 shadow-[0_28px_80px_rgba(97,70,58,0.14)] md:p-7">
            <div className="pointer-events-none absolute -right-16 top-8 h-44 w-44 rounded-full bg-[#F2DCCF]/40 blur-3xl" />
            <div className="pointer-events-none absolute -left-14 bottom-8 h-48 w-48 rounded-full bg-white/60 blur-3xl" />
            <div className="relative grid gap-6 md:grid-cols-[1fr_0.88fr] md:items-center">
              <div className="max-w-[31rem]">
                <div className="mb-5 flex items-center gap-4">
                  <RoutineIconBadge bundle={completePack} featured />
                  <div>
                    <p className="inline-flex rounded-full border border-[#E2CCBB] bg-[#F4E4D8]/92 px-4 py-1.5 text-[11px] font-bold text-[#765A4D]">
                      {completePack.tag}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold leading-tight text-[#72544A] md:text-[2.45rem] md:leading-[1.16]">
                      {completePack.name_ar}
                    </h3>
                  </div>
                </div>

                <p className="text-sm leading-8 text-[#8A7268]">
                  روتين كامل يجمع بين التوازن، النضارة، التجديد الليلي، والحماية اليومية في باقة واحدة عالية القيمة.
                </p>

                <div className="mt-5">
                  <ProductChecklist products={completeProducts} />
                </div>

                <div className="mt-5">
                  <BenefitIconRow />
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/70 bg-white/48 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_18px_52px_rgba(97,70,58,0.10)] backdrop-blur">
                <RoutinePillarGrid />
                <div className="mt-5 rounded-3xl border border-[#E7D8CB] bg-white/64 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
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
                <div className="mt-4">
                  <TrustPill />
                </div>
                <button
                  type="button"
                  onClick={() => addBundleToCart(completePack, addItem)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D9BFAE] bg-[linear-gradient(135deg,#8A655A,#B98D72)] px-6 py-4 text-sm font-bold text-white shadow-[0_16px_38px_rgba(137,94,78,0.20)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(137,94,78,0.26)]"
                >
                  <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                  اطلبي الروتين الكامل
                </button>
              </div>
            </div>
          </article>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
            {smallerPacks.map((bundle) => (
              <CompactBundleCard
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

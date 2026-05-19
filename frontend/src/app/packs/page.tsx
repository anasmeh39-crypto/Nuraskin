import type { Metadata } from "next";
import { BUNDLES } from "@/config/products";
import { PackCard } from "@/components/packs/PackCard";

export const metadata: Metadata = {
  title: "باقات العناية من Nura Skin",
  description:
    "روتينات Nura Skin المختارة بعناية: روتين نورا الكامل، روتين الصباح، وروتين التجديد الليلي.",
  alternates: { canonical: "https://nuraskin.cc/packs" },
};

const PACK_COPY: Record<string, { cta: string; positioning: string }> = {
  "nura-complete-ritual": {
    cta: "أضيفي الروتين الكامل للسلة",
    positioning:
      "روتين متكامل يجمع بين التوازن، النضارة، العناية الليلية، والحماية اليومية.",
  },
  "morning-ritual": {
    cta: "أضيفي روتين الصباح للسلة",
    positioning:
      "خطوات صباحية واضحة تجمع الإشراقة، نضارة محيط العين، والحماية اليومية.",
  },
  "night-renewal-ritual": {
    cta: "أضيفي روتين الليل للسلة",
    positioning:
      "عناية ليلية ناعمة تساعد البشرة على مظهر أكثر راحة ونضارة صباحًا.",
  },
};

const ORDERED_PACKS = [
  "nura-complete-ritual",
  "morning-ritual",
  "night-renewal-ritual",
].map((id) => BUNDLES.find((bundle) => bundle.id === id)).filter(Boolean);

export default function PacksPage() {
  return (
    <main className="bg-ivory">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#FDFAF6_0%,#FDF5F7_58%,#FFFDFC_100%)] py-16 md:py-24">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-rose-soft/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold-light/28 blur-3xl" />

        <div className="container-wide relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="luxury-kicker mx-auto mb-4 w-fit">الباقات</p>
            <h1 className="text-4xl font-black leading-tight text-[#3A222C] md:text-5xl">
              باقات العناية من Nura Skin
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-[#6B5555] md:text-base">
              روتينات مختارة بعناية لتمنح بشرتك عناية متكاملة، من الإشراقة الصباحية إلى التجديد الليلي.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.9fr_0.9fr]">
            {ORDERED_PACKS.map((bundle, index) => {
              if (!bundle) return null;
              const copy = PACK_COPY[bundle.id];
              return (
                <PackCard
                  key={bundle.id}
                  bundle={bundle}
                  cta={copy.cta}
                  positioning={copy.positioning}
                  featured={index === 0}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

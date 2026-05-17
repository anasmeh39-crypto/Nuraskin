import type { Metadata } from "next";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { BundleSection } from "@/components/home/BundleSection";

export const metadata: Metadata = {
  title: "جميع المنتجات — نيورا سكين",
  description:
    "اكتشفي مجموعة نيورا سكين الكاملة: نيورا بالانس، رينيو الليلي، وآي ريفايف — الدفع عند الاستلام.",
  alternates: { canonical: "https://nuraskin.cc/products" },
};

export default function CollectionPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-deep py-16 md:py-20">
        <div className="container-wide text-center">
          <p className="text-gold text-sm font-semibold tracking-wider uppercase mb-3">
            Nura Skin Collection
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            ثلاثة منتجات — روتين كامل
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            كل منتج حل لمشكلة حقيقية. كل مكوّن مختار بعناية.
            بشرتك تستاهل أكثر من وعود فارغة.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-cream">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product, idx) => (
              <ProductCard
                key={product.slug}
                product={product}
                showBadge={idx === 0}
                badge="الأكثر مبيعاً"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <div className="container-wide pb-12">
        <TrustBadges />
      </div>

      {/* Bundles */}
      <BundleSection />
    </>
  );
}

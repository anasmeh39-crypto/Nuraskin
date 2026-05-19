import type { Metadata } from "next";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { BundleSection } from "@/components/home/BundleSection";
import { ShieldCheck, Truck, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "جميع المنتجات — نورا سكين",
  description:
    "اكتشفي مجموعة نورا سكين الكاملة: سيروم توازن وإشراقة البشرة بالنياسيناميد، كريم التجديد الليلي، سيروم محيط العين، وواقي الشمس اليومي SPF 50 — الدفع عند الاستلام وتوصيل مجاني لجميع أنحاء المغرب.",
  alternates: { canonical: "https://nuraskin.cc/products" },
};

export default function CollectionPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[linear-gradient(135deg,#FDFAF6,#FDF5F7)] py-16 md:py-20">
        <div className="container-wide text-center">
          <p className="text-rose-mid text-sm font-semibold tracking-wider uppercase mb-3">
            NURA SKIN COLLECTION
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#3A222C] leading-tight mb-4">
            أربعة منتجات لروتين عناية متكامل
          </h1>
          <p className="text-[#6B5555] text-lg max-w-xl mx-auto">
            مجموعة مختارة بعناية لدعم توازن البشرة، نضارة محيط العين، تجدد مظهر البشرة ليلًا، والحماية الصباحية اليومية.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: ShieldCheck, text: "الدفع عند الاستلام" },
              { icon: Truck, text: "توصيل مجاني لجميع أنحاء المغرب" },
              { icon: FlaskConical, text: "تركيبات مختارة بعناية" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <span key={item.text} className="inline-flex items-center gap-2 rounded-full border border-rose-soft/30 bg-white px-4 py-2 text-sm font-semibold text-[#3A222C]">
                  <Icon className="h-4 w-4 text-rose-mid" strokeWidth={1.5} />
                  {item.text}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Bundles */}
      <BundleSection />
    </>
  );
}

import React from "react";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";

export function ProductCollectionSection() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="luxury-kicker mx-auto mb-4 w-fit">مجموعة العناية الأساسية</p>
          <h2 className="section-heading">ثلاثة منتجات بتجربة فاخرة واحدة</h2>
          <p className="section-subheading max-w-xl mx-auto">
            تركيبات مختارة بعناية لتدعم توازن البشرة، إشراقة محيط العينين، وتجدد مظهر البشرة خلال الليل.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {PRODUCTS.map((product, idx) => (
            <ProductCard
              key={product.slug}
              product={product}
              showBadge={idx === 0}
              badge="الأكثر مبيعاً"
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-brand-deep font-semibold hover:text-brand-mid transition-colors underline underline-offset-4"
          >
            اكتشفي المجموعة كاملة ←
          </Link>
        </div>
      </div>
    </section>
  );
}

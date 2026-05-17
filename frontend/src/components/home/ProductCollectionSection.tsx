import React from "react";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";

export function ProductCollectionSection() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="section-heading">ثلاثة منتجات — روتين كامل</h2>
          <p className="section-subheading max-w-xl mx-auto">
            مش بالكثرة، بالجودة. كل منتج حل لمشكلة حقيقية، بمكون علمي واضح.
          </p>
        </div>

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

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-brand-deep font-semibold hover:text-brand-mid transition-colors underline underline-offset-4"
          >
            شوفي جميع المنتجات ←
          </Link>
        </div>
      </div>
    </section>
  );
}

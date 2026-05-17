import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/config/products";
import { ProductHeroSection } from "@/components/product/ProductHeroSection";
import { IngredientExplainer } from "@/components/product/IngredientExplainer";
import { ProductTestimonialsSection } from "@/components/product/ProductTestimonialsSection";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { CrossSells } from "@/components/product/CrossSells";
import { StickyMobileCTA } from "@/components/product/StickyMobileCTA";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: `${product.name_ar} | نيورا سكين`,
    description: product.metaDescription,
    openGraph: {
      title: product.name_ar,
      description: product.metaDescription,
      url: `https://nuraskin.cc/products/${product.slug}`,
    },
    alternates: {
      canonical: `https://nuraskin.cc/products/${product.slug}`,
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name_ar,
    description: product.description_ar,
    brand: { "@type": "Brand", name: "Nura Skin" },
    offers: {
      "@type": "Offer",
      url: `https://nuraskin.cc/products/${product.slug}`,
      priceCurrency: "MAD",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: product.reviews.length,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ProductHeroSection product={product} />
      <IngredientExplainer product={product} />

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-brand-deep mb-6">
            شنو يساعد عليه؟
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 p-4 bg-cream rounded-2xl">
                <span className="text-brand-mid font-bold text-lg mt-0.5">✓</span>
                <p className="text-gray-700 text-sm">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After perception */}
      <section className="py-12 bg-cream">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-brand-deep mb-3 text-center">
            الفارق اللي تحسيه
          </h2>
          <p className="text-center text-gray-600 text-sm mb-8">
            النتائج تختلف من شخص لآخر — هاد الأمثلة تعكس تجارب مستخدمين حقيقيين
          </p>
          <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
            <div className="text-center p-6 bg-white border border-border rounded-3xl">
              <div className="text-3xl mb-3">😟</div>
              <p className="text-sm font-semibold text-gray-600 mb-2">قبل</p>
              {product.concerns.slice(0, 2).map((c) => (
                <p key={c} className="text-xs text-gray-500">{c}</p>
              ))}
            </div>
            <div className="text-center p-6 bg-brand-light border border-brand-light rounded-3xl">
              <div className="text-3xl mb-3">✨</div>
              <p className="text-sm font-semibold text-brand-deep mb-2">بعد</p>
              {product.benefits.slice(0, 2).map((b) => (
                <p key={b} className="text-xs text-brand-mid">{b}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductTestimonialsSection product={product} />

      <div className="py-12 bg-white">
        <div className="container-wide">
          <TrustBadges />
        </div>
      </div>

      <CrossSells currentSlug={product.slug} slugs={product.crossSells} />

      <StickyMobileCTA product={product} />
    </>
  );
}

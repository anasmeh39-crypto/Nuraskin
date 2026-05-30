import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/config/products";
import { ProductHeroElite } from "@/components/product/ProductHeroElite";
import { ProblemSection } from "@/components/product/ProblemSection";
import { BeforeAfterSlider } from "@/components/product/BeforeAfterSlider";
import { RoutineEducationSection } from "@/components/product/RoutineEducationSection";
import { IngredientAuthority } from "@/components/product/IngredientAuthority";
import { EmotionalTransformationSection } from "@/components/product/EmotionalTransformationSection";
import { ScienceSection } from "@/components/product/ScienceSection";
import { UsageAndTimeline } from "@/components/product/UsageAndTimeline";
import { RoutineSection } from "@/components/product/RoutineSection";
import { RoutineReviewsSection } from "@/components/product/RoutineReviewsSection";
import { RitualSelectorSection } from "@/components/product/RitualSelectorSection";
import { TrustAuthoritySection } from "@/components/product/TrustAuthoritySection";
import { StickyMobileCTAElite } from "@/components/product/StickyMobileCTAElite";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name_ar} | نورا سكين`,
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

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const avgRating =
    product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name_ar,
    description: product.description_ar,
    brand: { "@type": "Brand", name: "NURA SKIN" },
    offers: {
      "@type": "Offer",
      url: `https://nuraskin.cc/products/${product.slug}`,
      priceCurrency: "MAD",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: product.reviews.length,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 1. Hero — restored product gallery + product identity */}
      <ProductHeroElite product={product} />

      {/* 2. Problem hook */}
      <ProblemSection product={product} />

      {/* 3. Before / After perception slider */}
      <BeforeAfterSlider productSlug={product.slug} />

      {/* 4. Why routine beats one product */}
      <RoutineEducationSection />

      {/* 5. Ingredient authority */}
      <IngredientAuthority product={product} />

      {/* 6. Emotional transformation */}
      <EmotionalTransformationSection />

      {/* 7. Science & philosophy */}
      <ScienceSection product={product} />

      {/* 8. Routine visualizer — hidden on eye-revive (duplicated by RoutineEducationSection) */}
      {product.slug !== "nura-eye-revive" && <RoutineSection currentSlug={product.slug} />}

      {/* 9. How to use + realistic timeline */}
      <UsageAndTimeline product={product} />

      {/* 10. Routine-focused social proof */}
      <RoutineReviewsSection />

      {/* 11. Ritual selector */}
      <RitualSelectorSection product={product} />

      {/* 12. Trust bar */}
      <TrustAuthoritySection />

      {/* Sticky mobile CTA */}
      <StickyMobileCTAElite product={product} />
    </>
  );
}

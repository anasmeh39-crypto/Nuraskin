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

// ── Per-product SEO overrides ─────────────────────────────────────────────
// French + Arabic bilingual metadata targets both fr-MA and ar-MA search intent
const PRODUCT_SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  "nura-balance": {
    title: "Sérum Équilibre & Éclat — Niacinamide 10% | Nura Skin",
    description:
      "Régulez le sébum et illuminez votre teint avec notre sérum premium à la Niacinamide 10%. Pores resserrés, teint unifié. Paiement à la livraison, livraison gratuite au Maroc.",
    keywords: [
      "sérum niacinamide maroc", "niacinamide 10%", "soin pores", "سيروم نياسيناميد",
      "توازن البشرة", "مسام واسعة", "لمعان البشرة", "nura skin",
    ],
  },
  "nura-eye-revive": {
    title: "Sérum Anti-Cernes & Anti-Poches — Caféine 5% | Nura Skin",
    description:
      "Réduisez les cernes et les poches grâce à notre sérum contour des yeux à la Caféine 5%, Niacinamide et Acide Hyaluronique. Regard reposé dès les premières semaines.",
    keywords: [
      "sérum anti cernes maroc", "soin contour des yeux", "caféine 5%",
      "سيروم محيط العين", "هالات سوداء", "انتفاخ العين", "nura skin",
    ],
  },
  "nura-night-renewal": {
    title: "Crème de Nuit Rénovatrice — Bakuchiol & Peptides | Nura Skin",
    description:
      "Réveillez-vous avec une peau plus douce et lumineuse grâce à notre crème de nuit au Bakuchiol végétal et Peptides. Hydratation profonde sans obstruction des pores.",
    keywords: [
      "crème de nuit maroc", "bakuchiol", "peptides", "anti-âge naturel",
      "كريم الليل", "تجديد البشرة ليلاً", "باكوتشيول", "nura skin",
    ],
  },
  "nura-spf-50": {
    title: "Crème Solaire SPF 50 Légère — UVA/UVB Sans Résidu Blanc | Nura Skin",
    description:
      "Protégez votre peau des UVA/UVB avec notre écran solaire léger sans effet blanc ni texture grasse. Idéal sous le maquillage. Livraison COD gratuite au Maroc.",
    keywords: [
      "écran solaire maroc", "SPF 50 sans résidu blanc", "protection solaire légère",
      "واقي شمس SPF 50", "no white cast", "كريم حماية الشمس", "nura skin",
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const seo = PRODUCT_SEO[slug];
  const title       = seo?.title       ?? `${product.name_ar} | Nura Skin`;
  const description = seo?.description ?? product.metaDescription;
  const ogImage     = `/images/${slug}-gallery-1.png`;
  const pageUrl     = `https://nuraskin.cc/products/${slug}`;

  return {
    title,
    description,
    keywords: seo?.keywords,
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 1200, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: pageUrl },
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

      {/* 3. Before / After perception slider — only for products that have before/after photos */}
      {(product.slug === "nura-balance" || product.slug === "nura-eye-revive") && (
        <BeforeAfterSlider productSlug={product.slug} />
      )}

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

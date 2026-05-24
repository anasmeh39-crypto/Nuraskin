"use client";

import Image from "next/image";
import { Check, Moon, Sparkles, Star, Sun, Truck, Users } from "lucide-react";
import { BUNDLES, PRODUCTS_MAP } from "@/config/products";
import { BenefitIconRow, addBundleToCart } from "@/components/packs/PackCard";
import { useCartStore } from "@/store/cart";
import type { Bundle } from "@/types";

/* ─── Bundle display metadata ─────────────────────────────────────────────── */

const BUNDLE_DISPLAY = [
  {
    id: "morning-ritual",
    description: "روتين صباحي للحماية والإشراقة.",
    TimeIcon: Sun,
    timeLabel: "مثالي للاستخدام الصباحي",
    cta: "أضيفي روتين الصباح للسلة",
    imageSrc: "/images/bundles/morning-routine.jpg",
    imageAlt: "روتين الصباح من نورا سكين",
    featured: false,
    priority: false,
  },
  {
    id: "night-renewal-ritual",
    description: "روتين ناعم للعناية الليلية.",
    TimeIcon: Moon,
    timeLabel: "مثالي للعناية الليلية",
    cta: "أضيفي روتين الليل للسلة",
    imageSrc: "/images/bundles/night-renewal.jpg",
    imageAlt: "روتين التجديد الليلي من نورا سكين",
    featured: false,
    priority: false,
  },
  {
    id: "nura-complete-ritual",
    description:
      "روتين كامل يجمع بين التوازن، النضارة، التجديد الليلي، والحماية اليومية في باقة واحدة عالية القيمة.",
    TimeIcon: Sparkles,
    timeLabel: "روتين كامل · صباحاً ومساءً",
    cta: "أضيفي الروتين الكامل للسلة",
    imageSrc: "/images/bundles/complete-routine.jpg",
    imageAlt: "روتين نورا الكامل من نورا سكين",
    featured: true,
    priority: true,
  },
] as const;

/* ─── Sub-components ──────────────────────────────────────────────────────── */

function BundleCheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      className="bundle-check-icon"
    >
      <circle cx="7.5" cy="7.5" r="7" stroke="currentColor" strokeWidth="1" />
      <path
        d="M4.5 7.5L6.5 9.5L10.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SavingsPill({ amount }: { amount: number }) {
  return (
    <span className="bundle-savings-pill">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path
          d="M1.5 5.5L4 8L9.5 3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      وفّري {amount} درهم
    </span>
  );
}

function BundleCard({
  bundle,
  display,
}: {
  bundle: Bundle;
  display: (typeof BUNDLE_DISPLAY)[number];
}) {
  const { addItem } = useCartStore();
  const products = bundle.products.map((slug) => PRODUCTS_MAP[slug]).filter(Boolean);
  const { TimeIcon, featured } = display;

  return (
    <article
      className={`bundle-card${featured ? " bundle-card-featured" : ""}`}
      aria-label={bundle.name_ar}
    >
      {/* "أفضل قيمة" badge — only on highlighted card */}
      {featured && (
        <div className="bundle-best-badge" role="note">
          أفضل قيمة
        </div>
      )}

      {/* Hero image — full-width, flush with card top */}
      <div className="bundle-image-wrap">
        <Image
          src={display.imageSrc}
          alt={display.imageAlt}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="bundle-image-photo"
          priority={display.priority}
          loading={display.priority ? undefined : "lazy"}
        />
        {/* Gradient that bleeds image into card background */}
        <div className="bundle-image-fade" aria-hidden="true" />
      </div>

      <div className="bundle-content">
        {/* 1. Time-of-use row */}
        <div className="bundle-time-row">
          <TimeIcon size={15} strokeWidth={1.5} aria-hidden="true" />
          <span>{display.timeLabel}</span>
        </div>

        {/* 2. Bundle name */}
        <h3 className="bundle-name">{bundle.name_ar}</h3>

        {/* 3. Description */}
        <p className="bundle-desc">{display.description}</p>

        {/* 4. Product checklist — checkmark + text only, no thumbnails */}
        <ul className="bundle-checklist" role="list">
          {products.map((product) => (
            <li key={product!.slug} className="bundle-checklist-item" role="listitem">
              <BundleCheckIcon />
              <span>{product!.name_ar}</span>
            </li>
          ))}
        </ul>

        {/* 5. Price block */}
        <div className="bundle-price-block">
          <p className="bundle-price-original">
            القيمة الكاملة:{" "}
            <span className="bundle-price-strikethrough">{bundle.compareAtPrice} درهم</span>
          </p>
          <div className="bundle-price-row">
            <p className="bundle-price-main" aria-label={`السعر ${bundle.price} درهم`}>
              <span className="bundle-price-number">{bundle.price}</span>
              <span className="bundle-price-currency">درهم</span>
            </p>
            <SavingsPill amount={bundle.saving} />
          </div>
        </div>

        {/* 6. Social proof row */}
        <div className="bundle-social-proof">
          <span className="bundle-social-row">
            <Star size={12} strokeWidth={1.5} aria-hidden="true" />
            4.8 من 2,341 تقييم
            <span className="bundle-social-sep" aria-hidden="true">·</span>
            <Truck size={12} strokeWidth={1.5} aria-hidden="true" />
            الدفع عند الاستلام
          </span>
          {featured && (
            <span className="bundle-social-urgency">
              <Users size={12} strokeWidth={1.5} aria-hidden="true" />
              اشترتها 47 امرأة هذا الأسبوع
            </span>
          )}
        </div>

        {/* 7. CTA button */}
        <button
          type="button"
          onClick={() => addBundleToCart(bundle, addItem)}
          className={`bundle-cta ${featured ? "bundle-cta-primary" : "bundle-cta-outlined"}`}
          aria-label={display.cta}
        >
          <span aria-hidden="true">✦</span>
          {display.cta}
        </button>
      </div>
    </article>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────────── */

export function HomePacksSection() {
  return (
    <section className="bundles-section" aria-labelledby="bundles-heading">
      <div className="container-wide">

        {/* Section header */}
        <header className="bundles-header">
          <p className="bundles-eyebrow" aria-hidden="true">NOS COFFRETS</p>
          <h2 id="bundles-heading" className="bundles-heading">اختاري الباقة التي تناسبك</h2>
          <p className="bundles-subline">ثلاث باقات مدروسة بعناية — وفّري حتى 247 درهم</p>
        </header>

        {/* Three bundle cards */}
        <div className="bundles-grid" role="list" aria-label="باقات نورا سكين">
          {BUNDLE_DISPLAY.map((display) => {
            const bundle = BUNDLES.find((b) => b.id === display.id)!;
            return (
              <div key={display.id} role="listitem">
                <BundleCard bundle={bundle} display={display} />
              </div>
            );
          })}
        </div>

        {/* Reassurance bar below cards */}
        <p className="bundles-reassurance" role="note">
          إرجاع مجاني · توصيل سريع · ضمان رضا 100%
        </p>

        {/* Brand benefit row */}
        <div className="bundles-benefit-row">
          <BenefitIconRow />
        </div>

      </div>
    </section>
  );
}

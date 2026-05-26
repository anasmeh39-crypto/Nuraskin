"use client";

import Image from "next/image";
import { Check, Droplets, Leaf, Moon, ShieldCheck, Sparkles, Star, Sun, Truck, Users } from "lucide-react";
import { BUNDLES, PRODUCTS_MAP } from "@/config/products";
import { PRODUCT_THUMBNAILS, REVIEW_COUNT, addBundleToCart } from "@/components/packs/PackCard";
import { useCartStore } from "@/store/cart";
import type { Bundle } from "@/types";

/* ─── Bundle display metadata ─────────────────────────────────────────────── */

const BUNDLE_DISPLAY = [
  {
    id: "nura-complete-ritual",
    description:
      "روتين كامل يجمع بين التوازن، النضارة، التجديد الليلي، والحماية اليومية في باقة واحدة عالية القيمة.",
    TimeIcon: Sparkles,
    timeLabel: "روتين كامل · صباحاً ومساءً",
    cta: "أضيفي الروتين الكامل للسلة",
    imageSrc: "/images/bundles/complete-routine.jpg",
    imageAlt: "روتين نورا الكامل من نورا سكين",
    imageBadge: "الأعلى قيمة · الأوفر تكلفة",
    reasons: [
      "وفّري 397 درهماً",
      "صباح + مساء في باقة",
      "4 منتجات",
    ],
    featured: true,
    priority: true,
    weeklyBuyers: 47,
  },
  {
    id: "morning-ritual",
    description: "روتين صباحي للحماية والإشراقة.",
    TimeIcon: Sun,
    timeLabel: "روتين صباحي · حماية ونضارة",
    cta: "أضيفي روتين الصباح للسلة",
    imageSrc: "/images/bundles/morning-routine.jpg",
    imageAlt: "روتين الصباح من نورا سكين",
    imageBadge: "اختيار الصباح الذكي",
    reasons: [
      "حماية شمسية 50",
      "إشراقة وتوازن يومي",
      "وفّري 278 درهماً",
    ],
    featured: false,
    priority: false,
    weeklyBuyers: 39,
  },
  {
    id: "night-renewal-ritual",
    description: "روتين ناعم للعناية الليلية.",
    TimeIcon: Moon,
    timeLabel: "روتين ليلي · راحة وتجديد",
    cta: "أضيفي روتين الليل للسلة",
    imageSrc: "/images/bundles/night-renewal.jpg",
    imageAlt: "روتين التجديد الليلي من نورا سكين",
    imageBadge: "أنسب اختيار قبل النوم",
    reasons: [
      "تجديد ليلي فعّال",
      "ترطيب عميق للعينين",
      "خطوتان",
    ],
    featured: false,
    priority: false,
    weeklyBuyers: 28,
  },
] as const;

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

function displayProductName(name: string, slug: string) {
  if (slug === "nura-spf-50") {
    return "واقي الشمس اليومي إس بي إف 50";
  }

  return name;
}

function BundleProductList({ products }: { products: Array<(typeof PRODUCTS_MAP)[string]> }) {
  return (
    <ul className="bundle-checklist" role="list">
      {products.map((product) => (
        <li key={product.slug} className="bundle-checklist-item" role="listitem">
          <span className="bundle-checklist-text">
            {displayProductName(product.name_ar, product.slug)}
          </span>
          <Image
            src={PRODUCT_THUMBNAILS[product.slug] ?? PRODUCT_THUMBNAILS["nura-balance"]}
            alt={`صورة ${displayProductName(product.name_ar, product.slug)}`}
            width={28}
            height={28}
            className="bundle-checklist-thumb"
            loading="lazy"
          />
          <Check className="bundle-check-icon" strokeWidth={2.1} aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

function BundleProductLineup({
  products,
  featured,
}: {
  products: Array<(typeof PRODUCTS_MAP)[string]>;
  featured: boolean;
}) {
  const compact = products.length >= 3;

  return (
    <div
      className={`relative mb-5 min-h-[104px] overflow-visible rounded-[22px] border ${
        featured
          ? "border-[#B58B6E]/30 bg-[radial-gradient(circle_at_50%_18%,rgba(237,228,215,0.98),transparent_58%),linear-gradient(135deg,#FFF9F6_0%,#FFFFFF_45%,#F5E8EC_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.58)]"
          : "border-[#B58B6E]/20 bg-[radial-gradient(circle_at_50%_20%,rgba(237,228,215,0.82),transparent_54%),linear-gradient(135deg,#FFF9F6_0%,#FFFFFF_48%,#F5E8EC_100%)]"
      } sm:min-h-[112px]`}
      aria-label="صور المنتجات داخل الباقة"
    >
      <div className="absolute left-1/2 top-6 h-16 w-44 -translate-x-1/2 rounded-full bg-[#EDE4D7]/80 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-x-9 bottom-4 h-3 rounded-full bg-[#3D2C32]/10 blur-md" aria-hidden="true" />
      <div className="relative flex h-24 items-end justify-center sm:h-[104px]">
        {products.map((product, index) => {
          const count = products.length;
          const offset = (index - (count - 1) / 2) * (compact ? 26 : 38);

          return (
            <img
              key={product.slug}
              src={PRODUCT_THUMBNAILS[product.slug] ?? PRODUCT_THUMBNAILS["nura-balance"]}
              alt={`صورة ${displayProductName(product.name_ar, product.slug)}`}
              className="absolute bottom-0 block h-auto min-h-[80px] min-w-[64px] object-contain bg-transparent drop-shadow-[0_15px_16px_rgba(61,44,50,0.18)]"
              style={{
                width: featured ? "88px" : "78px",
                transform: `translateX(${offset}px)`,
                zIndex: index + 1,
              }}
              loading="lazy"
            />
          );
        })}
      </div>
    </div>
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
  const products = bundle.products.map((slug) => PRODUCTS_MAP[slug]).filter(Boolean) as Array<(typeof PRODUCTS_MAP)[string]>;
  const { TimeIcon, featured } = display;

  return (
    <article
      className={`bundle-card${featured ? " bundle-card-featured" : ""}`}
      style={{ overflow: "visible" }}
      aria-label={bundle.name_ar}
    >
      {/* "أفضل قيمة" badge — only on highlighted card */}
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
        <div className="bundle-image-fade" aria-hidden="true" />
        <div className="bundle-badge">{display.imageBadge}</div>
        <div className="bundle-time-label">{display.timeLabel}</div>
      </div>

      <div className="bundle-content">
        <div className="bundle-time-row">
          <TimeIcon size={15} strokeWidth={1.5} aria-hidden="true" />
          <span>{display.timeLabel}</span>
        </div>

        <h3 className="bundle-name">{bundle.name_ar}</h3>

        <p className="bundle-desc">{display.description}</p>

        <div className="bundle-reason-pills" role="list" aria-label="مزايا الباقة">
          {display.reasons.map((reason) => (
            <span key={reason} className="bundle-reason-pill" role="listitem">
              {reason}
            </span>
          ))}
        </div>

        <BundleProductLineup products={products} featured={featured} />

        <BundleProductList products={products} />

        <div className="bundle-price-block">
          <div className="bundle-price-main-row">
            <p className="bundle-price-main" aria-label={`السعر ${bundle.price} درهم`}>
              <span className="bundle-price-number">{bundle.price}</span>
              <span className="bundle-price-currency">درهم</span>
            </p>
          </div>
          <div className="bundle-price-meta">
            <span className="bundle-price-original">القيمة الكاملة: {bundle.compareAtPrice} درهم</span>
            <SavingsPill amount={bundle.saving} />
          </div>
        </div>

        <div className="bundle-social-proof">
          <span className="bundle-social-row">
            <Star size={12} strokeWidth={1.5} aria-hidden="true" />
            4.8 من {REVIEW_COUNT} تقييم
            <span className="bundle-social-sep" aria-hidden="true">·</span>
            <Truck size={12} strokeWidth={1.5} aria-hidden="true" />
            الدفع عند الاستلام
          </span>
          <span className="bundle-social-urgency">
            <Users size={12} strokeWidth={1.5} aria-hidden="true" />
            اشترتها {display.weeklyBuyers} امرأة هذا الأسبوع
          </span>
        </div>

        <button
          type="button"
          onClick={() => addBundleToCart(bundle, addItem)}
          className="bundle-cta"
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
          <p className="bundles-eyebrow" aria-hidden="true">باقات نورا سكين</p>
          <h2 id="bundles-heading" className="bundles-heading">اختاري الباقة التي تناسبك</h2>
          <p className="bundles-subline">ثلاث باقات مدروسة بعناية — وفّري حتى 397 درهم</p>
        </header>

        <div className="bundle-swipe-hint" aria-hidden="true">
          <span>←</span>
          <span>اسحبي لرؤية كل الباقات</span>
          <span>→</span>
        </div>

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
          <div className="bundle-trust-bar" aria-label="مؤشرات الثقة في باقات نورا سكين">
            <span className="bundle-trust-item">
              <Leaf size={16} strokeWidth={1.5} aria-hidden="true" />
              صنع في المغرب
            </span>
            <span className="bundle-trust-item">
              <ShieldCheck size={16} strokeWidth={1.5} aria-hidden="true" />
              حماية شمسية 50
            </span>
            <span className="bundle-trust-item">
              <Droplets size={16} strokeWidth={1.5} aria-hidden="true" />
              ترطيب عميق
            </span>
            <span className="bundle-trust-item">
              <Sparkles size={16} strokeWidth={1.5} aria-hidden="true" />
              طبيعي 100%
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { Check, Sparkles, Star, Truck } from "lucide-react";
import { Bundle, CartItem } from "@/types";
import { PRODUCTS_MAP } from "@/config/products";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart } from "@/lib/tracking";

interface PackCardProps {
  bundle: Bundle;
  cta: string;
  positioning?: string;
  featured?: boolean;
}

export const REVIEW_COUNT = "2,341";

export const PRODUCT_THUMBNAILS: Record<string, string> = {
  "nura-balance": "/images/products/serum-niacinamide-pack.png",
  "nura-night-renewal": "/images/products/retinol-cream-pack.png",
  "nura-eye-revive": "/images/products/eye-serum-pack.png",
  "nura-spf-50": "/images/products/sunscreen-spf50-pack.png",
};

export const BUNDLE_HERO_IMAGES: Record<string, { src: string; alt: string }> = {
  "morning-ritual": {
    src: "/images/bundles/morning-routine-hero.jpg",
    alt: "روتين الصباح من نورا سكين",
  },
  "night-renewal-ritual": {
    src: "/images/bundles/night-renewal-hero.jpg",
    alt: "روتين التجديد الليلي من نورا سكين",
  },
  "nura-complete-ritual": {
    src: "/images/bundles/full-routine-hero.jpg",
    alt: "روتين نورا الكامل من نورا سكين",
  },
  // Product-page offer tiers — same heroes reused by slug
  "nura-eye-balance-spf-trio": {
    src: "/images/bundles/morning-routine-hero.jpg",
    alt: "طقس الإشراقة اليومية من نورا سكين",
  },
  "nura-retinol-balance-spf-trio": {
    src: "/images/bundles/morning-routine-hero.jpg",
    alt: "طقس التجديد والحماية من نورا سكين",
  },
  "nura-balance-retinol-eye-trio": {
    src: "/images/bundles/morning-routine-hero.jpg",
    alt: "طقس الصباح الكامل من نورا سكين",
  },
  "nura-eye-retinol-duo": {
    src: "/images/bundles/night-renewal-hero.jpg",
    alt: "روتين التجديد الليلي من نورا سكين",
  },
  "nura-balance-retinol-duo": {
    src: "/images/bundles/night-renewal-hero.jpg",
    alt: "روتين النياسيناميد والريتينول من نورا سكين",
  },
  "nura-retinol-eye-duo": {
    src: "/images/bundles/night-renewal-hero.jpg",
    alt: "روتين التجديد الليلي من نورا سكين",
  },
};

const benefitIcons = [
  { icon: "/images/icons/argan.svg", label: "طبيعي 100%" },
  { icon: "/images/icons/water-drop.svg", label: "ترطيب عميق" },
  { icon: "/images/icons/sun.svg", label: "حماية SPF 50" },
  { icon: "/images/icons/natural.svg", label: "صنع في المغرب" },
];

export function BenefitIconRow({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 border-y py-3 min-[480px]:grid-cols-4 ${
        dark ? "border-white/12" : "border-[#6F5046]/10"
      }`}
    >
      {benefitIcons.map((item) => (
        <div
          key={item.label}
          role="group"
          aria-label={item.label}
          className="flex flex-col items-center gap-1 text-center"
        >
          <Image
            src={item.icon}
            alt=""
            width={20}
            height={20}
            className={dark ? "brightness-0 invert opacity-90" : "opacity-90"}
          />
          <span
            className={`text-[11px] font-medium leading-4 ${
              dark ? "text-white/82" : "text-[#7A6560]"
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function TrustPill({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full px-3 py-1.5 text-[11px] font-medium min-[380px]:gap-x-2.5 ${
        dark
          ? "border border-white/10 bg-white/8 text-white/84"
          : "border border-[#6F5046]/10 bg-[#FFF7EE]/60 text-[#745C52]"
      }`}
    >
      <span className="inline-flex items-center gap-1.5">
        <Truck className="h-3.5 w-3.5" strokeWidth={1.6} />
        الدفع عند الاستلام
      </span>
      <span className="hidden min-[380px]:inline text-current/45">·</span>
      <span className="inline-flex items-center gap-1.5">
        <Star className="h-3.5 w-3.5" strokeWidth={1.6} />
        4.8 من {REVIEW_COUNT} تقييم
      </span>
    </div>
  );
}

export function BundleHeroImage({
  bundle,
  featured = false,
  priority = false,
}: {
  bundle: Bundle;
  featured?: boolean;
  priority?: boolean;
}) {
  const hero = BUNDLE_HERO_IMAGES[bundle.id] ?? BUNDLE_HERO_IMAGES["nura-complete-ritual"];
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden sm:aspect-[4/3] ${
        featured ? "after:to-[#3D2C32]" : "after:to-white"
      } after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-2/3 after:bg-gradient-to-b after:from-transparent after:via-transparent`}
    >
      <Image
        src={hero.src}
        alt={hero.alt}
        fill
        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        priority={priority}
        loading={priority ? undefined : "lazy"}
      />
    </div>
  );
}

export function ProductChecklist({
  products,
  dark = false,
}: {
  products: Array<(typeof PRODUCTS_MAP)[string]>;
  dark?: boolean;
}) {
  return (
    <ul className="space-y-2.5">
      {products.map((product) => (
        <li
          key={product!.slug}
          className={`flex items-center gap-3 text-sm leading-6 ${
            dark ? "text-white/86" : "text-[#5C4A4A]"
          }`}
        >
          <Check
            className={`h-4 w-4 shrink-0 ${dark ? "text-gold" : "text-[#B98D72]"}`}
            strokeWidth={2.2}
          />
          <span className="min-w-0 flex-1">{product!.name_ar}</span>
          <Image
            src={PRODUCT_THUMBNAILS[product!.slug] ?? PRODUCT_THUMBNAILS["nura-balance"]}
            alt={`صورة ${product!.name_ar}`}
            width={32}
            height={32}
            className={`h-8 w-8 flex-shrink-0 rounded-full object-cover ${
              dark ? "border border-white/20" : "border border-[#6F5046]/12"
            } shadow-sm`}
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}

export function ProductLineup({
  products,
  featured = false,
}: {
  products: Array<(typeof PRODUCTS_MAP)[string]>;
  featured?: boolean;
}) {
  const compact = products.length >= 3;
  return (
    <div
      className={`relative my-1 flex min-h-[116px] items-end justify-center overflow-visible rounded-[1.65rem] border ${
        featured
          ? "border-white/14 bg-white/10"
          : "border-[#6F5046]/10 bg-gradient-to-br from-[#FFF9F6] via-white to-[#F5E8EC]"
      }`}
      aria-label="صور المنتجات داخل الباقة"
    >
      <div
        className={`absolute left-1/2 top-7 h-16 w-44 -translate-x-1/2 rounded-full blur-3xl ${
          featured ? "bg-gold-light/25" : "bg-[#EDE4D7]/85"
        }`}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-x-10 bottom-5 h-3 rounded-full blur-md ${
          featured ? "bg-black/20" : "bg-[#3D2C32]/10"
        }`}
        aria-hidden="true"
      />
      <div className="relative flex h-[104px] items-end justify-center">
        {products.map((product, index) => {
          const count = products.length;
          const offset = (index - (count - 1) / 2) * (compact ? 27 : 40);
          const scale = featured && index === 1 ? 1.08 : 1;
          return (
            <img
              key={product.slug}
              src={PRODUCT_THUMBNAILS[product.slug] ?? PRODUCT_THUMBNAILS["nura-balance"]}
              alt={`صورة ${product.name_ar}`}
              className="absolute bottom-0 block h-auto min-h-[80px] min-w-[70px] object-contain bg-transparent drop-shadow-[0_18px_20px_rgba(61,44,50,0.20)]"
              style={{
                width: `${featured ? 92 : 82}px`,
                transform: `translateX(${offset}px) scale(${scale})`,
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

export function addBundleToCart(
  bundle: Bundle,
  addItem: (item: Omit<CartItem, "quantity">) => void
) {
  const unitPrice = Math.floor(bundle.price / bundle.products.length);
  const remainder = bundle.price - unitPrice * bundle.products.length;

  const cartItems: CartItem[] = bundle.products.map((slug, index) => {
    const product = PRODUCTS_MAP[slug];
    const allocatedPrice = unitPrice + (index === 0 ? remainder : 0);
    const item = {
      cartKey: `${bundle.id}:${slug}`,
      slug,
      name_ar: product?.name_ar || slug,
      price: allocatedPrice,
      image: product?.image || "",
      quantity: 1,
      compareAtPrice: product?.price,
      bundleName: bundle.name_ar,
      discountAmount: Math.max((product?.price ?? 0) - allocatedPrice, 0),
    };

    if (product) {
      addItem({
        cartKey: item.cartKey,
        slug: product.slug,
        name_ar: product.name_ar,
        price: allocatedPrice,
        image: product.image,
        compareAtPrice: product.price,
        bundleName: bundle.name_ar,
        discountAmount: item.discountAmount,
      });
    }

    return item;
  });

  trackAddToCart(cartItems, bundle.price, generateEventId());
}

export function PackCard({ bundle, cta, positioning, featured = false }: PackCardProps) {
  const { addItem } = useCartStore();
  const products = bundle.products.map((slug) => PRODUCTS_MAP[slug]).filter(Boolean);
  const hero = BUNDLE_HERO_IMAGES[bundle.id] ?? BUNDLE_HERO_IMAGES["nura-complete-ritual"];
  const savingsPercent = Math.round((bundle.saving / bundle.compareAtPrice) * 100);

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-[2rem] border border-gold/40 shadow-[0_28px_80px_rgba(61,44,50,0.28)] transition-all duration-300 hover:-translate-y-1">
        <div className="flex flex-col lg:flex-row">
          {/* Left: hero image */}
          <div className="relative aspect-[4/3] flex-shrink-0 overflow-hidden lg:aspect-auto lg:min-h-[580px] lg:w-[44%]">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              priority
            />
            {/* Desktop blend gradient */}
            <div className="absolute inset-0 hidden bg-gradient-to-l from-[#3D2C32]/55 via-transparent to-transparent lg:block" />
            {/* Mobile bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3D2C32]/65 via-transparent to-transparent lg:hidden" />

            {/* Badges */}
            <div className="absolute start-4 top-4 flex flex-col gap-2">
              <span className="w-fit rounded-full bg-gold/95 px-4 py-1.5 text-[11px] font-bold text-[#3A222C] shadow-lg backdrop-blur">
                {bundle.tag}
              </span>
              <span className="w-fit rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">
                وفّري {savingsPercent}%
              </span>
            </div>
          </div>

          {/* Right: content */}
          <div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-[#3D2C32] via-[#46313A] to-[#7B5260] p-7 text-white lg:p-10">
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold/80">
                  الروتين الأشمل
                </p>
                <h2 className="text-3xl font-black leading-tight text-white lg:text-[2.35rem]">
                  {bundle.name_ar}
                </h2>
                {positioning && (
                  <p className="mt-3 text-[15px] leading-7 text-white/72">{positioning}</p>
                )}
              </div>

              <ProductChecklist products={products} dark />

              <BenefitIconRow dark />
            </div>

            <div className="mt-6 space-y-4">
              {/* Price block */}
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <p className="text-sm text-white/55">
                  القيمة الكاملة:{" "}
                  <span className="line-through">{bundle.compareAtPrice} درهم</span>
                </p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="text-4xl font-black text-white">
                    {bundle.price}{" "}
                    <span className="text-lg font-semibold text-white/80">درهم</span>
                  </p>
                  <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2.5 text-center">
                    <p className="text-2xl font-black text-emerald-300">{bundle.saving}</p>
                    <p className="text-[10px] text-emerald-300/75">درهم وفّرتِ</p>
                  </div>
                </div>
              </div>

              <TrustPill dark />

              <button
                type="button"
                onClick={() => addBundleToCart(bundle, addItem)}
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-6 py-4 text-base font-extrabold text-[#3D2C32] shadow-lg transition hover:bg-gold-light active:scale-[0.98]"
              >
                <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                {cta}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Secondary card
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-rose-soft/25 bg-white text-[#3A222C] shadow-rose-sm transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] flex-shrink-0 overflow-hidden">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          sizes="(min-width: 768px) 48vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent" />

        <div className="absolute start-4 top-4">
          <span className="rounded-full bg-rose-blush/92 px-4 py-1.5 text-[11px] font-bold text-rose-deep shadow backdrop-blur">
            {bundle.tag}
          </span>
        </div>
        <div className="absolute end-4 top-4">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
            وفّري {savingsPercent}%
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col space-y-4 p-6">
        <div>
          <h2 className="text-2xl font-black leading-tight text-[#3A222C]">{bundle.name_ar}</h2>
          {positioning && (
            <p className="mt-2 text-sm leading-7 text-[#6B5555]">{positioning}</p>
          )}
        </div>

        <ProductChecklist products={products} />

        <div className="mt-auto space-y-3 pt-2">
          {/* Price block */}
          <div className="rounded-2xl border border-rose-soft/20 bg-ivory p-4">
            <p className="text-xs text-[#7A6560]">
              القيمة الكاملة:{" "}
              <span className="line-through">{bundle.compareAtPrice} درهم</span>
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-3xl font-black text-rose-deep">
                {bundle.price}{" "}
                <span className="text-sm font-semibold text-[#6B5555]">درهم</span>
              </p>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-center">
                <p className="text-xl font-black text-emerald-700">{bundle.saving}</p>
                <p className="text-[10px] text-emerald-600">درهم وفّرتِ</p>
              </div>
            </div>
          </div>

          <TrustPill />

          <button
            type="button"
            onClick={() => addBundleToCart(bundle, addItem)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-deep px-5 py-4 text-sm font-extrabold text-white shadow-rose-md transition hover:bg-[#774956] active:scale-[0.98]"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            {cta}
          </button>
        </div>
      </div>
    </article>
  );
}

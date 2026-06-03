"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { BUNDLES, PRODUCTS_MAP } from "@/config/products";
import { FlowProductImage } from "@/components/ui/FlowProductImage";
import { generateEventId, trackInitiateCheckout, trackAddToCart } from "@/lib/tracking";

/* ─── Icon helpers ───────────────────────────────────────────────────────── */
function IconX({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function IconCheck({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
function IconTruck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <rect x="1" y="3" width="15" height="13" rx="1" stroke="currentColor" strokeWidth="1.75" fill="none" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="1.5" />
      <circle cx="18.5" cy="18.5" r="1.5" />
    </svg>
  );
}
function IconCod({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <rect x="1" y="4" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.25" />
      <line x1="3" y1="8.5" x2="4.5" y2="8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="11.5" y1="8.5" x2="13" y2="8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}
function IconStar({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

/* ─── Routine definition ─────────────────────────────────────────────────── */
const ROUTINE_SLUGS = [
  "nura-balance",
  "nura-night-renewal",
  "nura-eye-revive",
  "nura-spf-50",
] as const;

type RoutineSlug = (typeof ROUTINE_SLUGS)[number];

/* ─── Upsell scenario type ───────────────────────────────────────────────── */
type UpsellScenario =
  | "complete"      // all 4 in cart → show trust/reassurance only
  | "missing-1"     // 3 in cart → spotlight the 1 missing product
  | "missing-2"     // 2 in cart → show both missing + pack CTA
  | "missing-3"     // 1 in cart → full pack hero CTA
  | "empty";        // 0 items → empty state

/* ─────────────────────────────────────────────────────────────────────────── */

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    openCheckout,
    removeItem,
    updateQuantity,
    addItem,
    clearCart,
    getTotal,
    getShipping,
    getGrandTotal,
  } = useCartStore();

  const total = getTotal();
  const shipping = getShipping();
  const grandTotal = getGrandTotal();
  const freeShipping = shipping === 0;

  /* ── Cart analysis ──────────────────────────────────────────────────────── */
  const allCartSlugs = new Set(items.map((i) => i.slug));

  const missingFromRoutine = ROUTINE_SLUGS.filter(
    (s) => !allCartSlugs.has(s)
  ) as RoutineSlug[];

  const upsellScenario: UpsellScenario =
    items.length === 0
      ? "empty"
      : missingFromRoutine.length === 0
      ? "complete"
      : missingFromRoutine.length === 1
      ? "missing-1"
      : missingFromRoutine.length === 2
      ? "missing-2"
      : "missing-3";

  /* ── Bundle grouping ───────────────────────────────────────────────────── */
  const bundleMetaByName = new Map(BUNDLES.map((b) => [b.name_ar, b]));

  const groupedBundleItems = items.reduce<Map<string, typeof items>>(
    (groups, item) => {
      if (!item.bundleName) return groups;
      const group = groups.get(item.bundleName) ?? [];
      group.push(item);
      groups.set(item.bundleName, group);
      return groups;
    },
    new Map()
  );

  const bundleGroups = Array.from(groupedBundleItems.entries()).map(
    ([bundleName, groupItems]) => {
      const meta = bundleMetaByName.get(bundleName);
      const totalPrice = groupItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const compareAtPrice = groupItems.reduce(
        (sum, item) => sum + (item.compareAtPrice ?? item.price) * item.quantity,
        0
      );
      return {
        id: meta?.id ?? bundleName,
        name_ar: meta?.name_ar ?? bundleName,
        compareAtPrice,
        saving: Math.max(compareAtPrice - totalPrice, 0),
        items: groupItems,
        totalPrice,
      };
    }
  );

  const soloItems = items.filter((item) => !item.bundleName);

  /* ── Complete pack reference ───────────────────────────────────────────── */
  const completePack =
    BUNDLES.find((b) => b.id === "nura-complete-ritual") ?? BUNDLES[0];

  /* ── Interaction state ─────────────────────────────────────────────────── */
  const [addedSlugs, setAddedSlugs] = useState<Set<string>>(new Set());

  /* ── Handlers ──────────────────────────────────────────────────────────── */
  const handleCheckout = () => {
    trackInitiateCheckout(grandTotal, generateEventId());
    openCheckout();
  };

  const handleAddProduct = (slug: string) => {
    const p = PRODUCTS_MAP[slug];
    if (!p) return;
    addItem({
      slug: p.slug,
      name_ar: p.name_ar,
      price: p.price,
      image: p.image,
      compareAtPrice: p.compareAtPrice,
      discountAmount: p.compareAtPrice - p.price,
    });
    trackAddToCart(
      [
        {
          slug: p.slug,
          name_ar: p.name_ar,
          price: p.price,
          image: p.image,
          quantity: 1,
          compareAtPrice: p.compareAtPrice,
          discountAmount: p.compareAtPrice - p.price,
        },
      ],
      p.price,
      generateEventId()
    );
    setAddedSlugs((prev) => new Set(prev).add(slug));
    window.setTimeout(() => {
      setAddedSlugs((prev) => {
        const next = new Set(prev);
        next.delete(slug);
        return next;
      });
    }, 2000);
  };

  /* Clear everything first, then add the complete pack.
     Used for all "upgrade" CTAs so the cart never shows
     old solo items alongside the pack. */
  const handleUpgradeToComplete = () => {
    clearCart();
    const bundle = completePack;
    const unitPrice = Math.floor(bundle.price / bundle.products.length);
    const remainder = bundle.price - unitPrice * bundle.products.length;
    const cartItems = bundle.products.map((slug, index) => {
      const product = PRODUCTS_MAP[slug];
      const allocatedPrice = unitPrice + (index === 0 ? remainder : 0);
      if (product) {
        addItem({
          cartKey: `${bundle.id}:${product.slug}`,
          slug: product.slug,
          name_ar: product.name_ar,
          price: allocatedPrice,
          image: product.image,
          compareAtPrice: product.price,
          bundleName: bundle.name_ar,
          discountAmount: Math.max(product.price - allocatedPrice, 0),
        });
      }
      return {
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
    });
    trackAddToCart(cartItems, bundle.price, generateEventId());
  };

  /* Used only for the empty-cart state where there is nothing to replace */
  const handleAddCompletePack = handleUpgradeToComplete;

  /* ─────────────────────────────────────────────────────────────────────── */
  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/35 backdrop-blur-sm z-50"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 start-0 z-50 flex w-full max-w-[440px] flex-col bg-[#FFF9F6] shadow-[4px_0_40px_rgba(61,44,50,0.18)]"
            dir="rtl"
          >
            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="cart-header">
              <div className="cart-header-title">
                <span className="cart-header-label">سلّة التسوق</span>
                {items.length > 0 && (
                  <span className="cart-header-count">{items.length}</span>
                )}
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="cart-close-btn"
                aria-label="إغلاق السلة"
              >
                <IconX />
              </button>
            </div>

            {/* ── Trust bar ──────────────────────────────────────────── */}
            <div className="cart-trust-bar">
              <span className="cart-trust-item">
                <IconTruck className="w-3.5 h-3.5" />
                توصيل مجاني بالمغرب
              </span>
              <span className="cart-trust-sep" aria-hidden>·</span>
              <span className="cart-trust-item">
                <IconCod className="w-3.5 h-3.5" />
                الدفع عند الاستلام
              </span>
            </div>

            {/* ── Scrollable body ────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto">

              {/* ════════════════════════════════════════════════════════
                  SCENARIO: EMPTY CART
                  → Recommend the complete routine pack directly
              ════════════════════════════════════════════════════════ */}
              {upsellScenario === "empty" && (
                <div className="flex flex-col h-full px-5 py-8 gap-5">
                  <div className="flex flex-col items-center text-center gap-3 pt-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EDE8]">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8E5A68" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-[#3D2C32] text-base">السلة فارغة</p>
                      <p className="text-sm text-[#9B8A8A] mt-1 leading-6">ابدئي بروتين العناية الكامل</p>
                    </div>
                  </div>

                  {/* Complete routine recommendation for empty cart */}
                  <div className="cart-pack-card">
                    <div className="relative h-[140px] w-full overflow-hidden rounded-xl">
                      <Image
                        src="/images/bundles/nura-complete-premium-routine.png"
                        alt="روتين نورا الكامل"
                        fill sizes="400px"
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(40,15,22,0.60)] via-transparent to-transparent" />
                      <span className="absolute bottom-3 right-3 rounded-full bg-[#6B2D3A] px-3 py-1 text-[11px] font-bold text-white">
                        وفّري {completePack.saving} درهم
                      </span>
                      <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-[#6B2D3A]">
                        <IconStar className="w-3 h-3 text-amber-500" />
                        الأعلى مبيعاً
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-[14px] font-bold text-[#3D2C32]">روتين نورا الكامل — 4 منتجات</p>
                      <p className="mt-1 text-[12px] text-[#7A6060] leading-5">
                        روتين صباحي وليلي متكامل — إشراقة، تجديد، عين، وحماية
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <p className="text-xs text-[#B0A0A0] line-through">كان {completePack.compareAtPrice} درهم</p>
                          <p className="text-xl font-black text-[#3D2C32]">{completePack.price} درهم</p>
                        </div>
                        <div className="flex flex-col gap-1 text-right text-[11px] text-[#2D6A4F] font-semibold">
                          <span>✓ توصيل مجاني</span>
                          <span>✓ الدفع عند الاستلام</span>
                        </div>
                      </div>
                      <button onClick={handleAddCompletePack} className="cart-pack-cta mt-4">
                        أضيفي الروتين الكامل للسلة
                      </button>
                    </div>
                  </div>

                  <Link
                    href="/packs"
                    onClick={closeDrawer}
                    className="text-center text-sm text-[#8E5A68] underline underline-offset-2"
                  >
                    أو تصفّحي جميع الباقات
                  </Link>
                </div>
              )}

              {/* ════════════════════════════════════════════════════════
                  SCENARIO: ITEMS IN CART
              ════════════════════════════════════════════════════════ */}
              {items.length > 0 && (
                <div className="p-4 space-y-3">

                  {/* Bundle groups */}
                  {bundleGroups.map((bundle) => (
                    <div key={bundle.id} className="cart-bundle-card">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="text-sm font-bold text-[#6B2D3A]">{bundle.name_ar}</p>
                          {bundle.saving > 0 && (
                            <p className="mt-0.5 text-xs font-semibold text-[#2D6A4F]">
                              ✓ وفّرتِ {bundle.saving} درهم
                            </p>
                          )}
                          <p className="text-xs text-[#9B8A8A] line-through mt-0.5">
                            كان {bundle.compareAtPrice} درهم
                          </p>
                        </div>
                        <div className="text-end">
                          <p className="text-xl font-black text-[#3D2C32]">{bundle.totalPrice} درهم</p>
                          <button
                            type="button"
                            onClick={() => bundle.items.forEach((item) => removeItem(item.cartKey || item.slug))}
                            className="mt-1 text-[11px] text-[#9B8A8A] transition hover:text-[#6B2D3A] underline underline-offset-2"
                          >
                            إزالة الباقة
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2 border-t border-[rgba(61,44,50,0.08)] pt-3">
                        {bundle.items.map((item) => (
                          <div key={item.cartKey || item.slug} className="flow-bundle-product-row">
                            <FlowProductImage src={item.image} slug={item.slug} alt={item.name_ar} size="cart-sm" />
                            <span className="flex-1 min-w-0 text-[13px] text-[#5F4A51]">
                              {item.name_ar} × {item.quantity}
                            </span>
                            <span className="shrink-0 text-[13px] font-semibold text-[#3D2C32]">
                              {item.price * item.quantity} درهم
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Solo items */}
                  {soloItems.map((item, index) => (
                    <motion.div
                      key={item.cartKey || item.slug}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="cart-item-card"
                    >
                      <FlowProductImage
                        src={item.image}
                        slug={item.slug}
                        alt={item.name_ar}
                        size="cart"
                        priority={index < 3}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="cart-item-name">{item.name_ar}</p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.cartKey || item.slug)}
                            className="cart-item-remove"
                            aria-label={`إزالة ${item.name_ar}`}
                          >
                            <IconX className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-[15px] font-bold text-[#6B2D3A]">{item.price} درهم</p>
                          {item.compareAtPrice && item.compareAtPrice > item.price && (
                            <p className="text-xs text-[#B0A0A0] line-through">كان {item.compareAtPrice} درهم</p>
                          )}
                        </div>
                        <div className="cart-qty-row">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartKey || item.slug, item.quantity - 1)}
                            className="cart-qty-btn"
                            aria-label="تقليل الكمية"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                            </svg>
                          </button>
                          <span className="cart-qty-value">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartKey || item.slug, item.quantity + 1)}
                            className="cart-qty-btn"
                            aria-label="زيادة الكمية"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* ════════════════════════════════════════════════════
                      SMART UPSELL SECTION — one block, one message
                  ════════════════════════════════════════════════════ */}

                  {/* ── COMPLETE: all 4 products → trust reassurance only ── */}
                  {upsellScenario === "complete" && (
                    <div className="cart-complete-banner">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="cart-complete-icon">✓</span>
                        <p className="text-[14px] font-bold text-[#1E5232]">الروتين الكامل في سلّتك!</p>
                      </div>
                      <p className="text-[12px] text-[#3D6B50] leading-5 mb-3">
                        عندك روتين صباحي وليلي متكامل — 4 منتجات للإشراقة، التجديد، العين، والحماية.
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { icon: <IconCod className="w-3.5 h-3.5" />, text: "الدفع عند الاستلام" },
                          { icon: <IconTruck className="w-3.5 h-3.5" />, text: "توصيل مجاني" },
                          { icon: <IconCheck className="w-3.5 h-3.5" />, text: "ضمان الرضا" },
                        ].map(({ icon, text }) => (
                          <div key={text} className="cart-complete-badge-item">
                            {icon}
                            <span>{text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── MISSING 1: spotlight the single missing product ── */}
                  {upsellScenario === "missing-1" && (() => {
                    const missing = missingFromRoutine[0];
                    const product = PRODUCTS_MAP[missing];
                    const isAdded = addedSlugs.has(missing);
                    if (!product) return null;
                    return (
                      <div className="cart-upsell-close">
                        <div className="cart-upsell-close-header">
                          <span className="cart-upsell-close-badge">منتج واحد ناقص</span>
                          <p className="text-[13px] font-bold text-[#3D2C32] mt-2">
                            كمّلي روتينك ديالك — باقي خطوة واحدة!
                          </p>
                          <p className="text-[12px] text-[#7A6060] mt-1 leading-5">
                            الروتين الكامل كيعطي نتائج أحسن بكثير من المنتجات المنفردة.
                          </p>
                        </div>
                        <div className="cart-crosssell-card cart-crosssell-highlighted mt-3">
                          <FlowProductImage src={product.image} slug={product.slug} alt={product.name_ar} size="cart-sm" />
                          <div className="flex-1 min-w-0">
                            <p className="cart-crosssell-name">{product.name_ar}</p>
                            <p className="cart-crosssell-benefit">{product.tagline_ar}</p>
                            <p className="cart-crosssell-price">{product.price} درهم</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddProduct(missing)}
                            disabled={isAdded}
                            className={`cart-crosssell-btn${isAdded ? " is-added" : ""}`}
                          >
                            {isAdded ? (
                              <><IconCheck className="w-3 h-3" /> تمت الإضافة</>
                            ) : (
                              "+ أضيفي"
                            )}
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={handleUpgradeToComplete}
                          className="cart-upsell-or-note cart-upsell-upgrade-link"
                        >
                          أو ترقية إلى الروتين الكامل — {completePack.price} درهم (توفيري {completePack.saving} درهم)
                        </button>
                      </div>
                    );
                  })()}

                  {/* ── MISSING 2: show both missing products + pack CTA ── */}
                  {upsellScenario === "missing-2" && (
                    <div className="cart-upsell-two">
                      <div className="cart-upsell-two-header">
                        <span className="cart-upsell-close-badge">منتجان ناقصان</span>
                        <p className="text-[13px] font-bold text-[#3D2C32] mt-2">
                          أضيفي المنتجين الناقصين وأكملي الروتين
                        </p>
                      </div>
                      <div className="space-y-2 mt-3">
                        {missingFromRoutine.map((slug) => {
                          const product = PRODUCTS_MAP[slug];
                          const isAdded = addedSlugs.has(slug);
                          if (!product) return null;
                          return (
                            <div key={slug} className="cart-crosssell-card">
                              <FlowProductImage src={product.image} slug={product.slug} alt={product.name_ar} size="cart-sm" />
                              <div className="flex-1 min-w-0">
                                <p className="cart-crosssell-name">{product.name_ar}</p>
                                <p className="cart-crosssell-benefit">{product.tagline_ar}</p>
                                <p className="cart-crosssell-price">{product.price} درهم</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleAddProduct(slug)}
                                disabled={isAdded}
                                className={`cart-crosssell-btn${isAdded ? " is-added" : ""}`}
                              >
                                {isAdded ? (
                                  <><IconCheck className="w-3 h-3" /> تمت الإضافة</>
                                ) : (
                                  "+ أضيفي"
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      {/* Pack shortcut */}
                      <div className="cart-upsell-pack-shortcut">
                        <div>
                          <p className="text-[12px] font-bold text-[#3D2C32]">أو ترقية إلى الروتين الكامل</p>
                          <p className="text-[11px] text-[#7A6060]">4 منتجات · وفّري {completePack.saving} درهم</p>
                        </div>
                        <button
                          onClick={handleUpgradeToComplete}
                          className="cart-upsell-pack-shortcut-btn"
                        >
                          {completePack.price} درهم
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── MISSING 3: 1 product only → full pack hero CTA ── */}
                  {upsellScenario === "missing-3" && (
                    <div className="cart-pack-card">
                      <div className="relative h-[130px] w-full overflow-hidden rounded-xl">
                        <Image
                          src="/images/bundles/nura-complete-premium-routine.png"
                          alt="روتين نورا الكامل"
                          fill sizes="400px"
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(40,15,22,0.60)] via-transparent to-transparent" />
                        <span className="absolute bottom-3 right-3 rounded-full bg-[#6B2D3A] px-3 py-1 text-[11px] font-bold text-white">
                          وفّري {completePack.saving} درهم
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="text-[13px] font-bold text-[#3D2C32]">كمّلي الروتين الكامل</p>
                        <p className="mt-1 text-[12px] text-[#7A6060] leading-5">
                          عندك منتج واحد — ضيفي الروتين الكامل وتستافدي من نتائج أحسن بكثير.
                        </p>
                        <div className="flex items-center justify-between mt-3 mb-1">
                          <div>
                            <p className="text-xs text-[#B0A0A0] line-through">كان {completePack.compareAtPrice} درهم</p>
                            <p className="text-lg font-black text-[#3D2C32]">{completePack.price} درهم</p>
                          </div>
                          <div className="text-[11px] text-[#2D6A4F] font-semibold text-right">
                            <p>✓ 4 منتجات</p>
                            <p>✓ صباح + مساء</p>
                          </div>
                        </div>
                        <button onClick={handleUpgradeToComplete} className="cart-pack-cta">
                          ترقية إلى الروتين الكامل — {completePack.price} درهم
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* ── Footer ─────────────────────────────────────────────── */}
            {items.length > 0 && (
              <div className="cart-footer">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-[#7A6060]">
                    <span>المجموع الجزئي</span>
                    <span>{total} درهم</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#7A6060]">التوصيل</span>
                    <span className="font-semibold text-[#2D6A4F]">
                      {freeShipping ? "مجاني ✓" : `${shipping} درهم`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[rgba(61,44,50,0.10)]">
                    <span className="font-bold text-[#3D2C32] text-base">المجموع الكلي</span>
                    <span className="text-2xl font-black text-[#3D2C32]">{grandTotal} درهم</span>
                  </div>
                </div>

                <button onClick={handleCheckout} className="cart-checkout-btn">
                  <span>إتمام الطلب</span>
                  <span className="cart-checkout-price">{grandTotal} درهم</span>
                </button>

                <div className="cart-cod-note">
                  <IconCod className="w-3.5 h-3.5 shrink-0" />
                  <span>الدفع عند الاستلام — ما تخلصي حتى توصلي</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

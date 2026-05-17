"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart";
import { SHIPPING_THRESHOLD, SHIPPING_COST, PRODUCTS_MAP } from "@/config/products";
import { BRAND_ASSETS } from "@/config/brand";
import { generateEventId, trackInitiateCheckout, trackAddToCart } from "@/lib/tracking";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    openCheckout,
    removeItem,
    updateQuantity,
    addItem,
    getTotal,
    getShipping,
    getGrandTotal,
  } = useCartStore();

  const total = getTotal();
  const shipping = getShipping();
  const grandTotal = getGrandTotal();
  const shippingRemaining = Math.max(0, SHIPPING_THRESHOLD - total);
  const freeShipping = shippingRemaining === 0;
  const shippingPct = Math.min(100, (total / SHIPPING_THRESHOLD) * 100);

  const inCartSlugs = new Set(items.map((i) => i.slug));
  const crossSells = Object.values(PRODUCTS_MAP).filter((p) => !inCartSlugs.has(p.slug));
  const missingRoutineProducts = Object.values(PRODUCTS_MAP).filter((p) => !inCartSlugs.has(p.slug));

  const handleCheckout = () => {
    trackInitiateCheckout(grandTotal, generateEventId());
    openCheckout();
  };

  const handleAddCross = (slug: string) => {
    const p = PRODUCTS_MAP[slug];
    if (!p) return;
    addItem({ slug: p.slug, name_ar: p.name_ar, price: p.price, image: p.image });
    trackAddToCart(
      [{ slug: p.slug, name_ar: p.name_ar, price: p.price, image: p.image, quantity: 1 }],
      p.price,
      generateEventId()
    );
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-y-0 start-0 z-50 flex w-full max-w-md flex-col border-e border-nura-border bg-nura-cream shadow-luxury"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-nura-border bg-nura-cream/40 px-6 py-4">
              <button
                type="button"
                onClick={closeDrawer}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-nura-plum shadow-ivory-sm transition-colors hover:bg-nura-blush"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex flex-col items-center gap-1">
                <Link href="/" className="dir-ltr opacity-90 hover:opacity-100" dir="ltr" onClick={closeDrawer}>
                  <img src={BRAND_ASSETS.icon} alt="" width={36} height={36} className="h-9 w-9" />
                </Link>
                <p className="text-sm font-bold text-nura-plum">سلّة التسوق</p>
                <p className="text-[11px] text-nura-muted">{items.length} منتج</p>
              </div>
              <div className="w-9" aria-hidden />
            </div>

            {/* Free shipping progress */}
            {!freeShipping && (
              <div className="px-6 py-3 bg-rose-blush border-b border-rose-soft/20">
                <div className="flex justify-between text-xs text-rose-deep mb-1.5 font-medium">
                  <span>أضيفي {shippingRemaining} درهم للشحن المجاني</span>
                  <span>{Math.round(shippingPct)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-rose-light overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingPct}%` }}
                    className="h-full rounded-full bg-rose-deep"
                  />
                </div>
              </div>
            )}
            {freeShipping && (
              <div className="flex items-center gap-2 border-b border-nura-champagne/25 bg-nura-champagne-light/50 px-6 py-3">
                <svg className="h-4 w-4 shrink-0 text-nura-rose-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-xs font-semibold text-nura-plum">أصبح الشحن مجانيًا لطلبك</p>
              </div>
            )}

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16">
                  <div className="w-16 h-16 rounded-full bg-rose-blush flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-rose-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                    </svg>
                  </div>
                  <p className="font-bold text-[#2C1810] mb-2">السلة فارغة</p>
                  <p className="text-sm text-[#9B8A8A]">ابدأي باختيار منتجاتك المفضلة</p>
                </div>
              ) : (
                <div className="p-5 space-y-3">
                  {/* Cart items */}
                  {items.map((item) => (
                    <motion.div
                      key={item.slug}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 bg-ivory rounded-2xl p-4"
                    >
                      {/* Image placeholder */}
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-rose-blush to-rose-light flex items-center justify-center shrink-0">
                        <span className="font-display text-rose-deep text-xl italic">N</span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#2C1810] text-sm leading-tight line-clamp-2">
                          {item.name_ar}
                        </p>
                        <p className="text-rose-deep font-bold text-sm mt-1">
                          {item.price} درهم
                        </p>

                        {/* Qty */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center hover:border-rose-soft transition-colors"
                          >
                            <svg className="w-3 h-3 text-[#2C1810]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                            </svg>
                          </button>
                          <span className="text-sm font-bold text-[#2C1810] w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center hover:border-rose-soft transition-colors"
                          >
                            <svg className="w-3 h-3 text-[#2C1810]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="self-start w-6 h-6 rounded-full flex items-center justify-center text-[#9B8A8A] hover:text-rose-deep hover:bg-rose-blush transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}

                  {/* Cross-sells */}
                  {crossSells.length > 0 && (
                    <div className="pt-4">
                      <p className="text-xs text-[#9B8A8A] font-semibold uppercase tracking-wider mb-3">
                        أكملي روتينك
                      </p>
                      {crossSells.slice(0, 2).map((p) => (
                        <div key={p.slug} className="flex gap-3 items-center p-3 bg-white border border-border rounded-2xl mb-2">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-blush to-rose-light flex items-center justify-center shrink-0">
                            <span className="font-display text-rose-deep text-base italic">N</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-[#2C1810] line-clamp-1">{p.name_ar}</p>
                            <p className="text-xs text-rose-deep font-bold">{p.price} درهم</p>
                          </div>
                          <button
                            onClick={() => handleAddCross(p.slug)}
                            className="text-xs font-bold text-white bg-rose-deep px-3 py-1.5 rounded-full hover:opacity-90 active:scale-95 transition-all shrink-0"
                          >
                            أضيفي
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {missingRoutineProducts.length > 1 && (
                    <div className="rounded-2xl border border-rose-soft/30 bg-rose-blush p-4">
                      <p className="text-sm font-bold text-rose-deep">ترقية الروتين الكامل</p>
                      <p className="mt-1 text-xs leading-5 text-[#6B5555]">
                        أضيفي المنتجات المكملة لتحصلي على روتين صباحي وليلي أكثر اكتمالًا.
                      </p>
                      <button
                        onClick={() => missingRoutineProducts.forEach((p) => handleAddCross(p.slug))}
                        className="mt-3 w-full rounded-full bg-white px-4 py-2 text-xs font-bold text-rose-deep transition hover:bg-ivory"
                      >
                        أكملي الروتين
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-4 bg-white">
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-[#6B5555]">
                    <span>المجموع</span>
                    <span>{total} درهم</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#6B5555]">
                    <span>الشحن</span>
                    <span className={freeShipping ? "font-semibold text-nura-rose-deep" : ""}>
                      {freeShipping ? "مجاني" : `${shipping} درهم`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-[#2C1810] text-lg border-t border-border pt-2">
                    <span>المجموع الكلي</span>
                    <span>{grandTotal} درهم</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleCheckout}
                  className="w-full h-14 bg-rose-deep text-white font-bold text-base rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-rose-md"
                >
                  إتمام الطلب
                  <svg className="w-4 h-4 flip-ltr" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

                {/* COD note */}
                <p className="text-center text-[10px] text-[#9B8A8A]">
                  الدفع عند الاستلام — لا يوجد دفع مسبق
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

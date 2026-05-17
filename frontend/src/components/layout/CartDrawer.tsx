"use client";

import React from "react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart";
import { SHIPPING_THRESHOLD, SHIPPING_COST, PRODUCTS_MAP } from "@/config/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { generateEventId, trackInitiateCheckout } from "@/lib/tracking";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    openCheckout,
    removeItem,
    updateQuantity,
    getTotal,
    getShipping,
    getGrandTotal,
  } = useCartStore();

  const total = getTotal();
  const shipping = getShipping();
  const grandTotal = getGrandTotal();
  const shippingRemaining = Math.max(0, SHIPPING_THRESHOLD - total);
  const freeShipping = shippingRemaining === 0;

  // Cross-sells: products not in cart
  const inCartSlugs = new Set(items.map((i) => i.slug));
  const crossSells = Object.values(PRODUCTS_MAP).filter(
    (p) => !inCartSlugs.has(p.slug)
  );

  const handleCheckout = () => {
    const eid = generateEventId();
    trackInitiateCheckout(grandTotal, eid);
    openCheckout();
  };

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50 transition-opacity"
        onClick={closeDrawer}
      />

      {/* Drawer — RTL: slides from right (start side) */}
      <div className="fixed top-0 start-0 h-full w-full md:w-[420px] bg-white z-50 flex flex-col animate-slide-in-left shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-brand-deep">سلتي</h2>
          <button
            onClick={closeDrawer}
            className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="إغلاق السلة"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center">
                <span className="text-3xl">🧴</span>
              </div>
              <p className="text-gray-500 font-arabic">
                سلتك فارغة — ابدئي بإضافة منتجاتك
              </p>
            </div>
          ) : (
            <div className="p-5 space-y-5">
              {/* Free shipping bar */}
              {!freeShipping && (
                <div className="bg-brand-light rounded-2xl p-4">
                  <p className="text-sm text-brand-deep font-medium mb-2">
                    بقا غير{" "}
                    <strong>{shippingRemaining} درهم</strong> للشحن المجاني
                  </p>
                  <div className="h-1.5 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-deep rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (total / SHIPPING_THRESHOLD) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
              {freeShipping && (
                <div className="bg-brand-light rounded-2xl p-4 text-center">
                  <p className="text-sm text-brand-deep font-semibold">
                    🎉 مبروك! الشحن مجاني لك
                  </p>
                </div>
              )}

              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.slug}
                    className="flex gap-4 bg-cream rounded-2xl p-4"
                  >
                    <div className="w-18 h-18 rounded-xl bg-brand-light flex items-center justify-center shrink-0">
                      <span className="text-brand-deep font-bold text-lg font-sans">N</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-brand-deep text-sm leading-snug">
                        {item.name_ar}
                      </p>
                      <p className="text-brand-mid font-bold mt-1">
                        {item.price * item.quantity} درهم
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2 bg-white border border-border rounded-full px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                            className="text-gray-400 hover:text-brand-deep transition-colors"
                          >
                            <MinusIcon className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-bold text-brand-deep min-w-[16px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                            className="text-gray-400 hover:text-brand-deep transition-colors"
                          >
                            <PlusIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.slug)}
                          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                        >
                          إزالة
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cross-sells */}
              {crossSells.length > 0 && items.length < 3 && (
                <div>
                  <p className="text-sm font-semibold text-brand-deep mb-3">
                    أكملي روتينك
                  </p>
                  <div className="space-y-3">
                    {crossSells.slice(0, 2).map((p) => (
                      <div
                        key={p.slug}
                        className="flex items-center gap-3 bg-cream rounded-2xl p-3"
                      >
                        <div className="w-14 h-14 rounded-xl bg-brand-light flex items-center justify-center shrink-0">
                          <span className="text-brand-deep font-bold font-sans">N</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-brand-deep leading-snug">
                            {p.name_ar}
                          </p>
                          <p className="text-xs text-gray-500">{p.tagline_ar}</p>
                          <p className="text-brand-mid font-bold text-sm mt-1">
                            {p.formattedPrice}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            useCartStore.getState().addItem({
                              slug: p.slug,
                              name_ar: p.name_ar,
                              price: p.price,
                              image: p.image,
                            });
                          }}
                          className="shrink-0 text-xs bg-brand-deep text-white px-3 py-1.5 rounded-full hover:bg-brand-mid transition-colors"
                        >
                          + أضيفي
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-4 bg-white">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm text-gray-600">
                <span>المجموع الفرعي</span>
                <span>{total} درهم</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>الشحن</span>
                <span>
                  {freeShipping ? (
                    <span className="text-brand-mid font-medium">مجاني</span>
                  ) : (
                    `${SHIPPING_COST} درهم`
                  )}
                </span>
              </div>
              <div className="flex justify-between font-bold text-brand-deep text-lg pt-1 border-t border-border">
                <span>الإجمالي</span>
                <span>{grandTotal} درهم</span>
              </div>
            </div>

            <Button variant="primary" fullWidth size="lg" onClick={handleCheckout}>
              أكملي طلبك ←
            </Button>

            <p className="text-center text-xs text-gray-400">
              الدفع عند الاستلام — ما تدفعي حتى يوصلك الطلب
            </p>
          </div>
        )}
      </div>
    </>
  );
}

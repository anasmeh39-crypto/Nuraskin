"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart";
import { createOrder } from "@/lib/api";
import { generateEventId, trackLead } from "@/lib/tracking";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const MOROCCO_PHONE_RE = /^0[67]\d{8}$/;

export function CheckoutPopup() {
  const router = useRouter();
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
    getTotal,
    getShipping,
    getGrandTotal,
    clearCart,
  } = useCartStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const total = getTotal();
  const shipping = getShipping();
  const grandTotal = getGrandTotal();
  const freeShipping = shipping === 0;

  const validatePhone = (val: string): boolean => {
    const clean = val.replace(/[\s-]/g, "");
    if (!MOROCCO_PHONE_RE.test(clean)) {
      setPhoneError("رقم الهاتف غير صحيح — يجب أن يبدأ بـ 06 أو 07 ويتكون من 10 أرقام");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateName = (val: string): boolean => {
    if (val.trim().length < 2) {
      setNameError("الاسم قصير جداً");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validName = validateName(name);
    const validPhone = validatePhone(phone);
    if (!validName || !validPhone) return;

    setLoading(true);
    setApiError("");

    const eventId = generateEventId();

    try {
      const response = await createOrder({
        customer_name: name.trim(),
        customer_phone: phone.replace(/[\s-]/g, ""),
        items: items.map((i) => ({ product_slug: i.slug, quantity: i.quantity })),
        total: grandTotal,
        shipping_cost: shipping,
        source_url: window.location.href,
        event_id: eventId,
      });

      trackLead(phone, eventId);
      clearCart();
      closeCheckout();

      const params = new URLSearchParams({
        order: response.order_number,
        upsell: response.upsell_eligible ? "1" : "0",
        ...(response.upsell_product
          ? {
              uslug: response.upsell_product.slug,
              uname: response.upsell_product.name_ar,
              uprice: String(response.upsell_product.discounted_price),
              uoriginal: String(response.upsell_product.price),
              upct: String(response.upsell_product.discount_percent),
            }
          : {}),
      });

      router.push(`/checkout/upsell?${params.toString()}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "حدث خطأ، يرجى المحاولة مجدداً";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isCheckoutOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeCheckout}
      />
      <div className="fixed inset-0 md:inset-auto md:top-1/2 md:start-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-white z-50 md:rounded-3xl flex flex-col overflow-auto animate-fade-scale">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="text-xl font-bold text-brand-deep">إتمام الطلب</h2>
          <button
            onClick={closeCheckout}
            className="p-2 text-gray-400 hover:text-gray-700"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-cream rounded-2xl p-4 space-y-2">
            <p className="text-sm font-semibold text-brand-deep mb-3">ملخص طلبك</p>
            {items.map((item) => (
              <div key={item.slug} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.name_ar} × {item.quantity}
                </span>
                <span className="font-medium text-brand-deep">
                  {item.price * item.quantity} درهم
                </span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-2 flex justify-between text-sm text-gray-600">
              <span>الشحن</span>
              <span>{freeShipping ? "مجاني" : `${shipping} درهم`}</span>
            </div>
            <div className="flex justify-between font-bold text-brand-deep text-base pt-1">
              <span>الإجمالي</span>
              <span>{grandTotal} درهم</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-deep mb-2">
                الاسم الكامل
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) validateName(e.target.value);
                }}
                placeholder="مثال: ياسمين المنصوري"
                className="input-field"
                required
                autoComplete="name"
              />
              {nameError && (
                <p className="text-red-500 text-xs mt-1">{nameError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-deep mb-2">
                رقم الهاتف
              </label>
              <div className="relative">
                <span className="absolute start-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-sans">
                  🇲🇦
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) validatePhone(e.target.value);
                  }}
                  placeholder="06XXXXXXXX"
                  className="input-field ps-10"
                  required
                  autoComplete="tel"
                  maxLength={10}
                  inputMode="numeric"
                  dir="ltr"
                />
              </div>
              {phoneError && (
                <p className="text-red-500 text-xs mt-1 text-right">{phoneError}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                رقم مغربي يبدأ بـ 06 أو 07
              </p>
            </div>

            {/* COD Reassurance */}
            <div className="bg-brand-light rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-brand-deep">
                <span className="text-xl">🔒</span>
                <p className="font-semibold text-sm">
                  الدفع عند الاستلام — ما تدفعي حتى يوصلك الطلب
                </p>
              </div>
              <div className="flex items-center gap-2 text-brand-deep">
                <span className="text-xl">🚚</span>
                <p className="text-sm text-gray-700">
                  توصيل خلال 2–4 أيام عمل في جميع أنحاء المغرب
                </p>
              </div>
              <div className="flex items-center gap-2 text-brand-deep">
                <span className="text-xl">🔄</span>
                <p className="text-sm text-gray-700">
                  إرجاع مجاني — سهل وبدون أسئلة
                </p>
              </div>
            </div>

            {/* Scarcity */}
            <p className="text-center text-xs text-amber-700 font-medium bg-amber-50 py-2 px-4 rounded-full">
              ⚡ الكمية محدودة — احجزي طلبك الآن
            </p>

            {apiError && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                <p className="text-red-600 text-sm text-center">{apiError}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={loading}
            >
              أكّدي طلبك ←
            </Button>

            <p className="text-center text-xs text-gray-400">
              بالضغط، توافقين على{" "}
              <a href="/policies/terms" className="underline">
                شروط الاستخدام
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

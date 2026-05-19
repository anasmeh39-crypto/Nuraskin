"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { BRAND_ASSETS } from "@/config/brand";
import { PRODUCTS } from "@/config/products";
import { createOrder } from "@/lib/api";
import { generateEventId, trackLead } from "@/lib/tracking";
import { useRouter } from "next/navigation";

const MOROCCO_PHONE_RE = /^0[67]\d{8}$/;
const MOROCCAN_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Tanger",
  "Fès",
  "Agadir",
  "Meknès",
  "Oujda",
  "Tétouan",
  "Salé",
  "Kénitra",
  "Mohammedia",
  "El Jadida",
  "Nador",
  "Béni Mellal",
  "Safi",
  "Khouribga",
  "Settat",
  "Essaouira",
  "Autre ville",
];

export function CheckoutPopup() {
  const router = useRouter();
  const { items, isCheckoutOpen, closeCheckout, getTotal, getShipping, getGrandTotal, clearCart } = useCartStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const total = getTotal();
  const shipping = getShipping();
  const grandTotal = getGrandTotal();
  const freeShipping = shipping === 0;

  const validatePhone = (val: string): boolean => {
    const clean = val.replace(/[\s-]/g, "");
    if (!MOROCCO_PHONE_RE.test(clean)) {
      setPhoneError("رقم غير صحيح — يبدأ بـ 06 أو 07 ويتكون من 10 أرقام");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateName = (val: string): boolean => {
    if (val.trim().length < 2) { setNameError("الاسم قصير جداً"); return false; }
    setNameError("");
    return true;
  };

  const validateAddress = (val: string): boolean => {
    if (val.trim().length < 8) {
      setAddressError("المرجو إدخال عنوان واضح للتوصيل");
      return false;
    }
    setAddressError("");
    return true;
  };

  const validateCity = (val: string): boolean => {
    if (!val) {
      setCityError("اختاري المدينة");
      return false;
    }
    setCityError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateName(name) || !validatePhone(phone) || !validateAddress(address) || !validateCity(city)) return;
    setLoading(true);
    setApiError("");
    const eventId = generateEventId();
    try {
      const response = await createOrder({
        customer_name: name.trim(),
        customer_phone: phone.replace(/[\s-]/g, ""),
        customer_address: address.trim(),
        customer_city: city,
        items: items.map((i) => ({
          product_slug: i.slug,
          quantity: i.quantity,
          unit_price: i.price,
          compare_at_price: i.compareAtPrice,
          bundle_name: i.bundleName,
          discount_amount: i.discountAmount,
        })),
        total: grandTotal,
        shipping_cost: shipping,
        source_url: window.location.href,
        event_id: eventId,
      });
      const orderedSlugs = Array.from(new Set(items.map((i) => i.slug)));
      trackLead(phone, eventId);
      clearCart();
      closeCheckout();
      const params = new URLSearchParams({
        order: response.order_number,
        upsell: orderedSlugs.length < PRODUCTS.length ? "1" : "0",
        items: orderedSlugs.join(","),
        ...(response.upsell_product ? {
          uslug: response.upsell_product.slug,
          uname: response.upsell_product.name_ar,
          uprice: String(response.upsell_product.discounted_price),
          uoriginal: String(response.upsell_product.price),
          upct: String(response.upsell_product.discount_percent),
        } : {}),
      });
      router.push(`/checkout/upsell?${params.toString()}`);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "حدث خطأ، يرجى المحاولة مجدداً");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={closeCheckout}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed inset-0 z-50 flex max-h-dvh flex-col overflow-hidden bg-white shadow-2xl md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[calc(100vh-2rem)] md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[2rem]"
          >
            {/* Header */}
            <div className="relative border-b border-nura-border bg-gradient-to-b from-nura-blush to-nura-cream px-6 py-6">
              <button
                type="button"
                onClick={closeCheckout}
                className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-nura-muted shadow-ivory-sm transition-colors hover:bg-nura-blush hover:text-nura-plum"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex flex-col items-center gap-3 pe-8">
                <Link href="/" className="dir-ltr" dir="ltr">
                  <img
                    src={BRAND_ASSETS.horizontal}
                    alt="NURA SKIN نورا سكين"
                    width={710}
                    height={210}
                    className="h-10 w-auto max-w-[190px] object-contain mix-blend-multiply"
                  />
                </Link>
                <h2 className="text-xl font-bold text-nura-plum">تأكيد طلبك</h2>
                <p className="text-xs text-nura-muted">خطوة واحدة للاستلام عندك</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-5 p-5 md:p-6">
                {/* Order summary */}
                <div className="space-y-2 rounded-[1.4rem] border border-rose-soft/20 bg-ivory/80 p-4 shadow-ivory-sm">
                  <p className="text-xs font-bold text-[#9B8A8A] uppercase tracking-wider mb-3">ملخص طلبك</p>
                  {items.map((item) => (
                    <div key={item.slug} className="flex justify-between text-sm">
                      <span className="text-[#6B5555]">
                        {item.name_ar} × {item.quantity}
                        {item.bundleName && <span className="me-1 text-[10px] font-bold text-gold">({item.bundleName})</span>}
                      </span>
                      <span className="text-end">
                        {item.compareAtPrice && item.compareAtPrice > item.price && (
                          <span className="block text-[11px] font-semibold text-[#9B8A8A] line-through">
                            بدل {item.compareAtPrice * item.quantity} درهم
                          </span>
                        )}
                        <span className="font-semibold text-[#2C1810]">{item.price * item.quantity} درهم</span>
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 flex justify-between text-sm text-[#9B8A8A]">
                    <span>التوصيل</span>
                    <span className={freeShipping ? "font-semibold text-nura-rose-deep" : ""}>
                      توصيل مجاني لجميع أنحاء المغرب
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-[#2C1810] text-base border-t border-border pt-2">
                    <span>الإجمالي</span>
                    <span className="text-rose-deep">{grandTotal} درهم</span>
                  </div>
                </div>

                {/* Scarcity */}
                <div className="flex items-center gap-2 rounded-2xl border border-nura-champagne/35 bg-nura-champagne-light/60 px-4 py-2.5">
                  <div className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-nura-champagne" />
                  <p className="text-xs font-medium text-nura-plum-mid">كميات محدودة — احجزي طلبك الآن</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-nura-plum">الاسم الكامل</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (nameError) validateName(e.target.value); }}
                      placeholder="مثال: ياسمين المنصوري"
                      className="input-field premium-input"
                      required
                      autoComplete="name"
                    />
                    {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-nura-plum">رقم الهاتف</label>
                    <div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); if (phoneError) validatePhone(e.target.value); }}
                        placeholder="06XXXXXXXX"
                        className="input-field premium-input"
                        required
                        autoComplete="tel"
                        maxLength={10}
                        inputMode="numeric"
                        dir="ltr"
                      />
                    </div>
                    {phoneError && <p className="text-red-500 text-xs mt-1 text-right">{phoneError}</p>}
                    <p className="text-xs text-[#9B8A8A] mt-1">رقم مغربي يبدأ بـ 06 أو 07</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-nura-plum">المدينة</label>
                      <div className="relative">
                        <select
                          value={city}
                          onChange={(e) => { setCity(e.target.value); if (cityError) validateCity(e.target.value); }}
                          className="input-field premium-input appearance-none pe-10"
                          required
                        >
                          <option value="">اختاري المدينة</option>
                          {MOROCCAN_CITIES.map((cityName) => (
                            <option key={cityName} value={cityName}>{cityName}</option>
                          ))}
                        </select>
                        <MapPin className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-mid" strokeWidth={1.5} />
                      </div>
                      {cityError && <p className="mt-1 text-xs text-red-500">{cityError}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-bold text-nura-plum">العنوان الكامل</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value); if (addressError) validateAddress(e.target.value); }}
                        placeholder="مثال: شارع محمد الخامس، رقم 12"
                        className="input-field premium-input"
                        required
                        autoComplete="street-address"
                      />
                      {addressError && <p className="mt-1 text-xs text-red-500">{addressError}</p>}
                    </div>
                  </div>

                  {/* COD reassurance */}
                  <div className="space-y-3 rounded-[1.35rem] border border-rose-soft/25 bg-rose-blush/70 p-4">
                    {[
                      { icon: ShieldCheck, text: "الدفع عند الاستلام" },
                      { icon: Truck, text: "توصيل مجاني لجميع أنحاء المغرب" },
                      { icon: Phone, text: "سنتصل بك لتأكيد الطلب قبل الإرسال" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-[#6B5555]">
                        <Icon className="h-4 w-4 text-rose-mid" strokeWidth={1.5} />
                        <span>{item.text}</span>
                      </div>
                    );
                    })}
                  </div>

                  {apiError && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                      <p className="text-red-600 text-sm text-center">{apiError}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-[1.25rem] bg-nura-plum text-base font-bold text-white shadow-[0_18px_38px_rgba(61,44,50,0.18)] transition-colors hover:bg-nura-rose-deep disabled:opacity-60"
                  >
                    {loading ? (
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                    ) : (
                      <>
                        أكدي طلبك
                        <svg className="w-4 h-4 flip-ltr" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-[10px] text-[#9B8A8A]">
                    بالضغط، توافقين على{" "}
                    <a href="/policies/terms" className="underline hover:text-rose-mid">شروط الاستخدام</a>
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

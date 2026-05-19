"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, MapPin, PhoneCall, PackageCheck, ReceiptText, Truck } from "lucide-react";
import { PRODUCTS } from "@/config/products";
import { BRAND_ASSETS } from "@/config/brand";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { getOrder } from "@/lib/api";
import { trackThankYouViewed } from "@/lib/tracking";
import type { OrderDetail } from "@/types";

export function ThankYouContent() {
  const params = useSearchParams();
  const orderNumber = params.get("order") || "";
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    if (orderNumber) trackThankYouViewed(orderNumber);
  }, [orderNumber]);

  useEffect(() => {
    let alive = true;

    if (!orderNumber) return;

    setIsLoadingOrder(true);
    setOrderError("");
    getOrder(orderNumber)
      .then((data) => {
        if (alive) setOrder(data);
      })
      .catch(() => {
        if (alive) setOrderError("لم نتمكن من تحميل تفاصيل الطلب الآن، لكن تم تسجيل طلبك بنجاح.");
      })
      .finally(() => {
        if (alive) setIsLoadingOrder(false);
      });

    return () => {
      alive = false;
    };
  }, [orderNumber]);

  const itemsSubtotal = useMemo(() => {
    if (!order) return 0;
    return order.items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
  }, [order]);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-[linear-gradient(135deg,#3A222C,#8B4A5A)] py-16 text-center">
        <div className="container-wide max-w-xl">
          <div className="mx-auto mb-6 inline-flex dir-ltr">
            <img
              src={BRAND_ASSETS.horizontal}
              alt="NURA SKIN نورا سكين"
              width={710}
              height={210}
              className="h-12 w-auto max-w-[260px] object-contain [filter:invert(1)_brightness(1.85)_grayscale(0.2)] mix-blend-screen md:h-14 md:max-w-[320px]"
            />
          </div>
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-gold" strokeWidth={1.4} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            شكراً لثقتكِ! تم استلام طلبكِ
          </h1>
          <p className="text-white/80 text-lg">
            بدأ فريقنا بتجهيز منتجاتك بعناية
          </p>
          {orderNumber && (
            <div className="mt-6 inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-3">
              <span className="text-white/60 text-sm">رقم الطلب:</span>
              <span className="text-white font-bold font-sans">{orderNumber}</span>
            </div>
          )}
        </div>
      </section>

      <div className="container-wide max-w-2xl py-12 space-y-8">
        {/* Order details */}
        {orderNumber && (
          <div className="overflow-hidden rounded-3xl border border-[#ECDDE1] bg-white shadow-[0_20px_60px_rgba(61,44,50,0.08)]">
            <div className="border-b border-[#F0E4E7] bg-[#FFF9F6] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5E8EC] text-[#8E5A68]">
                  <ReceiptText className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#3A222C]">تفاصيل طلبكِ</h2>
                  <p className="text-sm font-semibold text-[#8D7D82]">
                    راجعي المنتجات ومعلومات التوصيل
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {isLoadingOrder && (
                <div className="space-y-4">
                  <div className="h-5 w-2/3 animate-pulse rounded-full bg-[#F5E8EC]" />
                  <div className="h-20 animate-pulse rounded-2xl bg-[#FFF4F6]" />
                  <div className="h-20 animate-pulse rounded-2xl bg-[#FFF4F6]" />
                </div>
              )}

              {!isLoadingOrder && orderError && (
                <div className="rounded-2xl border border-[#F0E4E7] bg-[#FFF9F6] p-4 text-sm font-semibold leading-7 text-[#8E5A68]">
                  {orderError}
                </div>
              )}

              {!isLoadingOrder && order && (
                <div className="space-y-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#F0E4E7] bg-[#FFF9F6] p-4">
                      <p className="text-xs font-bold text-[#9D8990]">الاسم</p>
                      <p className="mt-1 font-bold text-[#3A222C]">{order.customer_name}</p>
                    </div>
                    <div className="rounded-2xl border border-[#F0E4E7] bg-[#FFF9F6] p-4">
                      <p className="text-xs font-bold text-[#9D8990]">رقم الطلب</p>
                      <p className="mt-1 font-bold text-[#3A222C] font-sans">{order.order_number}</p>
                    </div>
                    {(order.customer_city || order.customer_address) && (
                      <div className="rounded-2xl border border-[#F0E4E7] bg-[#FFF9F6] p-4 sm:col-span-2">
                        <p className="flex items-center gap-2 text-xs font-bold text-[#9D8990]">
                          <MapPin className="h-4 w-4" />
                          عنوان التوصيل
                        </p>
                        <p className="mt-1 font-semibold leading-7 text-[#3A222C]">
                          {[order.customer_address, order.customer_city].filter(Boolean).join("، ")}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={`${item.product_slug}-${item.is_upsell}`}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-[#F0E4E7] bg-white p-4"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold leading-7 text-[#3A222C]">{item.product_name}</p>
                            {item.is_upsell && (
                              <span className="rounded-full bg-[#F5E8EC] px-2.5 py-1 text-[11px] font-extrabold text-[#8E5A68]">
                                إضافة للروتين
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-[#8D7D82]">
                            الكمية: {item.quantity}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-black text-[#3A222C]">
                          {item.unit_price * item.quantity} درهم
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 rounded-2xl bg-[#FFF9F6] p-4">
                    <div className="flex items-center justify-between text-sm font-semibold text-[#6B4E56]">
                      <span>مجموع المنتجات</span>
                      <span>{itemsSubtotal} درهم</span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-semibold text-[#6B4E56]">
                      <span>التوصيل</span>
                      <span>{order.shipping_cost === 0 ? "مجاني" : `${order.shipping_cost} درهم`}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#ECDDE1] pt-3 text-lg font-black text-[#3A222C]">
                      <span>الإجمالي عند الاستلام</span>
                      <span>{order.total} درهم</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* What happens next */}
        <div className="bg-white rounded-3xl border border-rose-soft/20 p-6 shadow-rose-sm">
          <h2 className="text-xl font-bold text-[#3A222C] mb-5">
            ما هي الخطوة التالية؟
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "01",
                icon: PhoneCall,
                title: "تأكيد الطلب هاتفياً",
                desc: "سيتواصل معك فريق خدمة العملاء قريبًا لتأكيد العنوان وموعد التوصيل المناسب. الرجاء الرد على مكالمة التأكيد حتى لا يتأخر الطلب.",
              },
              {
                step: "02",
                icon: PackageCheck,
                title: "تجهيز طلبكِ بعناية",
                desc: "نقوم بتغليف المنتجات بعناية وإرسالها لتصل خلال يومين إلى 4 أيام عمل.",
              },
              {
                step: "03",
                icon: Truck,
                title: "استلام الطلب والدفع",
                desc: "تستلمين طلبك وتدفعين قيمته نقدًا للمندوب عند الاستلام، مع توصيل مجاني لجميع أنحاء المغرب.",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
              <div key={s.step} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-rose-deep" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-[#3A222C]">{s.title}</p>
                  <p className="text-gray-600 text-sm mt-0.5">{s.desc}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* Confidence builder */}
        <div className="bg-rose-blush rounded-3xl p-6 text-center">
          <p className="text-rose-deep font-bold text-lg mb-2">
            خطوة نحو إشراقتكِ
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            لقد اخترتِ عناية مدروسة بمكونات واضحة وروتين بسيط يساعد بشرتكِ على الانتظام.
            روتينك الجديد في الطريق إليك. اختاري وقتًا مناسبًا للرد على مكالمة التأكيد لضمان وصول الطلب في موعده.
          </p>
        </div>

        {/* Soft recommendations */}
        <div>
          <h2 className="text-xl font-bold text-[#3A222C] mb-4">
            قد يعجبك أيضاً
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PRODUCTS.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="block bg-white rounded-2xl border border-border p-4 hover:border-rose-soft transition-colors"
              >
                <div className="h-28 rounded-xl overflow-hidden mb-3">
                  <PlaceholderImage label={p.name_ar} className="w-full h-full" />
                </div>
                <p className="font-semibold text-[#3A222C] text-sm leading-snug">
                  {p.name_ar}
                </p>
                <p className="text-rose-deep text-sm font-bold mt-1">
                  {p.formattedPrice}
                </p>
              </Link>
            ))}
          </div>
          <p className="text-xs text-center text-gray-400 mt-3">
            توصيات اختيارية لإكمال الروتين لاحقًا
          </p>
        </div>

        {/* Return policy reminder */}
        <div className="text-center py-6 border-t border-border">
          <p className="text-sm text-gray-600">
            هل لديك سؤال حول الطلب؟{" "}
            <Link href="/contact" className="text-rose-deep font-semibold underline">
              تواصلي معنا
            </Link>
            {" "}— أو راجعي{" "}
            <Link href="/policies/returns" className="text-rose-deep underline">
              سياسة الإرجاع
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

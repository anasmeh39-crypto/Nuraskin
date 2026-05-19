"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, Sparkles } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PRODUCTS, PRODUCTS_MAP } from "@/config/products";
import { acceptUpsell } from "@/lib/api";
import {
  generateEventId,
  trackUpsellAccepted,
  trackUpsellViewed,
} from "@/lib/tracking";
import type { Product } from "@/types";

const DISCOUNT_PERCENT = 20;

const BENEFITS: Record<string, string> = {
  "nura-balance": "يمنح إشراقة وتوازنًا للبشرة",
  "nura-night-renewal": "يساعد على ترطيب وتجديد البشرة أثناء النوم",
  "nura-eye-revive": "يساعد على تقليل مظهر التعب حول العينين",
  "nura-spf-50": "خطوة حماية يومية للحفاظ على إشراقة الروتين",
};

function getDiscountedPrice(price: number) {
  return Math.round(price * (1 - DISCOUNT_PERCENT / 100));
}

function parseSlugs(value: string | null) {
  return new Set(
    (value || "")
      .split(",")
      .map((slug) => slug.trim())
      .filter(Boolean)
  );
}

export function UpsellContent() {
  const router = useRouter();
  const params = useSearchParams();

  const orderNumber = params.get("order") || "";
  const purchasedSlugs = useMemo(() => parseSlugs(params.get("items")), [params]);
  const legacySlug = params.get("uslug") || "";

  const products = useMemo<Product[]>(() => {
    if (!orderNumber) return [];

    if (purchasedSlugs.size > 0) {
      const spf = PRODUCTS_MAP["nura-spf-50"];
      const hasRoutineProduct = PRODUCTS.some(
        (product) => product.slug !== "nura-spf-50" && purchasedSlugs.has(product.slug)
      );
      if (hasRoutineProduct && spf && !purchasedSlugs.has(spf.slug)) {
        return [spf];
      }
      return PRODUCTS.filter((product) => !purchasedSlugs.has(product.slug));
    }

    const legacyProduct = PRODUCTS_MAP[legacySlug];
    return legacyProduct ? [legacyProduct] : [];
  }, [legacySlug, orderNumber, purchasedSlugs]);

  const [addingSlug, setAddingSlug] = useState<string | null>(null);
  const [addedSlugs, setAddedSlugs] = useState<Set<string>>(new Set());

  const goToThankYou = useCallback(() => {
    router.replace(`/thank-you?order=${orderNumber}`);
  }, [router, orderNumber]);

  useEffect(() => {
    if (!orderNumber || products.length === 0) {
      goToThankYou();
      return;
    }

    products.forEach((product) => trackUpsellViewed(product.slug));
  }, [goToThankYou, orderNumber, products]);

  const handleAdd = async (product: Product) => {
    if (addingSlug || addedSlugs.has(product.slug)) return;

    setAddingSlug(product.slug);
    const discountedPrice = getDiscountedPrice(product.price);
    const eventId = generateEventId();

    try {
      await acceptUpsell(orderNumber, product.slug, discountedPrice);
      trackUpsellAccepted(product.slug, discountedPrice, eventId);
      setAddedSlugs((current) => new Set(current).add(product.slug));
    } catch {
      goToThankYou();
    } finally {
      setAddingSlug(null);
    }
  };

  if (!orderNumber || products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
        <p className="text-sm text-text-tertiary">جاري التحويل...</p>
      </div>
    );
  }

  const isSpfPriority = products.length === 1 && products[0].slug === "nura-spf-50";

  return (
    <main dir="rtl" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#3D2C32]/28 px-3 py-5 text-text-primary backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 right-[-12%] h-72 w-72 rounded-full bg-[#F1CDD4]/65 blur-3xl"
          animate={{ y: [0, 18, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-10%] h-80 w-80 rounded-full bg-[#EDE4D7]/80 blur-3xl"
          animate={{ y: [0, -16, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.48, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-[#FFF9F6]/96 shadow-[0_30px_90px_rgba(61,44,50,0.26)] backdrop-blur-xl sm:rounded-[2.5rem]"
      >
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F5E8EC]/75 to-transparent" />

        <div className="relative mx-auto max-w-2xl px-5 pb-5 pt-7 text-center sm:px-8 sm:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45 }}
            className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8D6CC] bg-white/76 px-4 py-2 text-xs font-bold text-[#8E5A68] shadow-[0_12px_34px_rgba(61,44,50,0.06)] backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-[#C8A24A]" />
            روتين متكامل
          </motion.div>
          <h1 className="text-2xl font-black leading-tight text-[#3D2C32] sm:text-3xl">
            {isSpfPriority ? "أكملي روتينك بخطوة الحماية اليومية" : "✨ خصم خاص لإكمال روتينك اليوم"}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-7 text-[#6B4E56] sm:text-base">
            {isSpfPriority
              ? "واقي الشمس خطوة أساسية للحفاظ على إشراقة البشرة، خاصة مع روتين العناية الليلي."
              : "منتجات مختارة بعناية لتمنح بشرتك نتائج أفضل مع روتين متكامل."}
          </p>
        </div>

        <div className="relative grid max-h-[62vh] gap-3 overflow-y-auto px-4 pb-4 sm:max-h-none sm:grid-cols-2 sm:px-6 sm:pb-5 lg:gap-4">
          <AnimatePresence>
            {products.map((product, index) => {
              const discountedPrice = getDiscountedPrice(product.price);
              const isAdded = addedSlugs.has(product.slug);
              const isAdding = addingSlug === product.slug;

              return (
                <motion.article
                  key={product.slug}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: index * 0.09, duration: 0.45, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className="group overflow-hidden rounded-[1.6rem] border border-[#ECDDE1] bg-white/86 shadow-[0_18px_50px_rgba(61,44,50,0.10)] backdrop-blur"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F7EEF0] sm:aspect-[4/3]">
                    <PlaceholderImage
                      label={product.name_ar}
                      aspectRatio="landscape"
                      className="h-full w-full rounded-none transition duration-700 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3D2C32]/30 via-transparent to-transparent" />
                    <div className="absolute right-3 top-3 rounded-full bg-white/86 px-3 py-1.5 text-[11px] font-extrabold text-[#8E5A68] shadow-[0_12px_28px_rgba(61,44,50,0.10)] backdrop-blur">
                      خصم %{DISCOUNT_PERCENT} عند الإضافة الآن
                    </div>
                  </div>

                  <div className="space-y-3 p-4 sm:p-5">
                    <div>
                      <h2 className="text-lg font-black leading-snug text-[#3D2C32]">
                        {product.name_ar}
                      </h2>
                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold leading-7 text-[#7A6269]">
                        <Heart className="h-4 w-4 text-[#B88996]" />
                        {BENEFITS[product.slug]}
                      </p>
                    </div>

                    <div className="flex items-end justify-between gap-3 rounded-3xl border border-[#F0E4E7] bg-[#FFF9F6] px-4 py-3">
                      <div>
                        <p className="text-xs font-bold text-[#9D8990]">السعر الخاص</p>
                        <div className="mt-1 flex items-center gap-3">
                          <span className="text-xl font-black text-[#3D2C32]">
                            {discountedPrice} درهم
                          </span>
                          <span className="text-sm font-bold text-[#A59499] line-through">
                            {product.price} درهم
                          </span>
                        </div>
                      </div>
                      {isAdded && (
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1E7D8] text-[#8E5A68]">
                          <Check className="h-5 w-5" />
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      disabled={Boolean(addingSlug) || isAdded}
                      className="w-full rounded-full bg-[#3D2C32] px-5 py-3.5 text-center text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(61,44,50,0.18),0_0_0_6px_rgba(212,188,155,0.12)] transition duration-300 hover:bg-[#8E5A68] hover:shadow-[0_18px_40px_rgba(142,90,104,0.24),0_0_0_8px_rgba(212,188,155,0.16)] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isAdded ? "تمت الإضافة إلى روتينك" : isAdding ? "جاري الإضافة..." : "أضيفيه لروتيني الآن"}
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="relative flex flex-col items-center gap-3 border-t border-[#ECDDE1] bg-white/42 px-5 py-5">
          <button
            type="button"
            onClick={goToThankYou}
            disabled={Boolean(addingSlug)}
            className="rounded-full border border-[#E8D6CC] bg-white/80 px-8 py-3 text-sm font-bold text-[#6B4E56] shadow-[0_12px_34px_rgba(61,44,50,0.06)] transition hover:border-[#D4BC9B] hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            إكمال الطلب فقط
          </button>
          {addedSlugs.size > 0 && (
            <p className="text-center text-xs font-semibold text-[#8D7D82]">
              تمت إضافة اختيارك إلى نفس الطلب، ويمكنكِ الآن المتابعة.
            </p>
          )}
        </div>
      </motion.section>
    </main>
  );
}

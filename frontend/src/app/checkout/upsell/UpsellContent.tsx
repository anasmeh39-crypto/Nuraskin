"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, Sparkles } from "lucide-react";
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

  return (
    <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#FAF7F4] px-4 py-8 text-text-primary sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 right-[-12%] h-72 w-72 rounded-full bg-[#F1CDD4]/45 blur-3xl"
          animate={{ y: [0, 18, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-10%] h-80 w-80 rounded-full bg-[#EDE4D7]/70 blur-3xl"
          animate={{ y: [0, -16, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col justify-center"
      >
        <div className="mx-auto mb-7 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45 }}
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8D6CC] bg-white/70 px-4 py-2 text-xs font-bold text-[#8E5A68] shadow-[0_12px_34px_rgba(61,44,50,0.06)] backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-[#C8A24A]" />
            روتين متكامل
          </motion.div>
          <h1 className="text-3xl font-black leading-tight text-[#3D2C32] sm:text-4xl">
            ✨ خصم خاص لإكمال روتينك اليوم
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-[#6B4E56]">
            منتجات مختارة بعناية لتمنح بشرتك نتائج أفضل مع روتين متكامل.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
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
                  className="group overflow-hidden rounded-[2rem] border border-[#ECDDE1] bg-white/82 shadow-[0_24px_70px_rgba(61,44,50,0.10)] backdrop-blur"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F7EEF0]">
                    <Image
                      src={product.image}
                      alt={product.name_ar}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.035]"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3D2C32]/30 via-transparent to-transparent" />
                    <div className="absolute right-4 top-4 rounded-full bg-white/86 px-3 py-1.5 text-xs font-extrabold text-[#8E5A68] shadow-[0_12px_28px_rgba(61,44,50,0.10)] backdrop-blur">
                      خصم %{DISCOUNT_PERCENT} عند الإضافة الآن
                    </div>
                  </div>

                  <div className="space-y-4 p-5 sm:p-6">
                    <div>
                      <h2 className="text-xl font-black leading-snug text-[#3D2C32]">
                        {product.name_ar}
                      </h2>
                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold leading-7 text-[#7A6269]">
                        <Heart className="h-4 w-4 text-[#B88996]" />
                        {BENEFITS[product.slug]}
                      </p>
                    </div>

                    <div className="flex items-end justify-between gap-4 rounded-3xl border border-[#F0E4E7] bg-[#FFF9F6] px-4 py-3">
                      <div>
                        <p className="text-xs font-bold text-[#9D8990]">السعر الخاص</p>
                        <div className="mt-1 flex items-center gap-3">
                          <span className="text-2xl font-black text-[#3D2C32]">
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
                      className="w-full rounded-full bg-[#3D2C32] px-6 py-4 text-center text-base font-extrabold text-white shadow-[0_18px_40px_rgba(61,44,50,0.18),0_0_0_6px_rgba(212,188,155,0.12)] transition duration-300 hover:bg-[#8E5A68] hover:shadow-[0_20px_48px_rgba(142,90,104,0.24),0_0_0_8px_rgba(212,188,155,0.16)] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isAdded ? "تمت الإضافة إلى روتينك" : isAdding ? "جاري الإضافة..." : "أضيفيه لروتيني الآن ✨"}
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-7 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={goToThankYou}
            disabled={Boolean(addingSlug)}
            className="rounded-full border border-[#E8D6CC] bg-white/70 px-8 py-3 text-sm font-bold text-[#6B4E56] shadow-[0_12px_34px_rgba(61,44,50,0.06)] transition hover:border-[#D4BC9B] hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
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

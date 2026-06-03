"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { OfferSelector, Offer } from "./OfferSelector";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart } from "@/lib/tracking";

interface Props {
  product: Product;
}

export function RitualSelectorSection({ product }: Props) {
  const { addItem, openDrawer } = useCartStore();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedOffer || adding) return;
    setAdding(true);

    const unitPrice = Math.floor(selectedOffer.price / selectedOffer.products.length);
    const remainder = selectedOffer.price - unitPrice * selectedOffer.products.length;

    selectedOffer.products.forEach((p, index) => {
      const allocatedPrice = unitPrice + (index === 0 ? remainder : 0);
      const compareAtPrice = selectedOffer.products.length > 1 ? p.price : p.compareAtPrice;
      addItem({
        slug: p.slug,
        name_ar: p.name_ar,
        price: allocatedPrice,
        image: p.image,
        compareAtPrice,
        bundleName: selectedOffer.bundleName,
        discountAmount: Math.max(compareAtPrice - allocatedPrice, 0),
      });
    });

    const eventId = generateEventId();
    const cartItems = selectedOffer.products.map((p, index) => ({
      slug: p.slug,
      name_ar: p.name_ar,
      price: unitPrice + (index === 0 ? remainder : 0),
      image: p.image,
      quantity: 1,
    }));
    trackAddToCart(cartItems, selectedOffer.price, eventId);

    openDrawer();
    setAdded(true);
    setTimeout(() => {
      setAdding(false);
      setAdded(false);
    }, 2000);
  };

  const price = selectedOffer?.price ?? product.price;
  const saving = selectedOffer?.saving;

  return (
    <section id="ritual-selector" className="bg-[#FEFCF9] py-12 sm:py-20 scroll-mt-20" dir="rtl">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 sm:mb-10 max-w-2xl text-center"
        >
          <p className="luxury-kicker mx-auto mb-3 w-fit">اختاري طقسك</p>
          <h2 className="section-heading text-[#5C2D3E]">روتين مصمم لبشرتك</h2>
          <p className="mt-3 text-sm leading-7 text-[#8C6E73]">كلما اكتمل الروتين، نتائج أسرع وتوفير أكبر — الدفع عند الاستلام</p>
        </motion.div>

        <OfferSelector product={product} onOfferChange={setSelectedOffer} />

        <div className="mx-auto mt-8 max-w-2xl rounded-[24px] border border-[#5C2D3E]/12 bg-[#F5F0EA] p-5 text-center shadow-[0_16px_45px_rgba(92,45,62,0.08)]">
          <div className="mb-4 flex flex-wrap items-end justify-center gap-2">
            <span className="font-serif text-4xl font-black leading-none text-[#5C2D3E]">{price}</span>
            <span className="text-sm font-bold text-[#8C6E73]">درهم</span>
            {saving && (
              <span className="rounded-full bg-[#EAF3DE] px-3 py-1 text-xs font-black text-[#27500A]">
                وفر {saving} درهم
              </span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleAddToCart}
            className="flex min-h-[56px] w-full items-center justify-center rounded-full bg-[#5C2D3E] px-6 text-base font-bold text-white shadow-[0_14px_32px_rgba(92,45,62,0.22)] transition hover:bg-[#4A2230]"
          >
            {added ? "✓ تمت الإضافة للسلة" : adding ? "جاري الإضافة..." : `احجزي طقسك الآن — ${price} درهم`}
          </motion.button>
          <p className="mt-3 text-xs font-medium text-[#8C6E73]">الدفع عند الاستلام · توصيل مجاني · تأكيد قبل الإرسال</p>
        </div>
      </div>
    </section>
  );
}

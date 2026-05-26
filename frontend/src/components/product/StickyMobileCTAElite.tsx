"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { BRAND_ASSETS } from "@/config/brand";
import { getProductPageOffers, ProductPageOffer } from "@/config/products";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart } from "@/lib/tracking";

interface Props {
  product: Product;
}

export function StickyMobileCTAElite({ product }: Props) {
  const [visible, setVisible] = useState(false);
  const { addItem } = useCartStore();
  const offers = React.useMemo(() => getProductPageOffers(product.slug), [product.slug]);
  const defaultOffer = offers.find((offer) => offer.recommended) ?? offers[offers.length - 1] ?? offers[0];
  const [selectedOfferId, setSelectedOfferId] = useState(defaultOffer?.id);
  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId) ?? defaultOffer;

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setSelectedOfferId(defaultOffer?.id);
  }, [defaultOffer?.id]);

  useEffect(() => {
    const handleOfferChange = (event: Event) => {
      const detail = (event as CustomEvent<{ productSlug: string; offerId: string }>).detail;
      if (detail?.productSlug === product.slug) {
        setSelectedOfferId(detail.offerId);
      }
    };

    window.addEventListener("nura-offer-change", handleOfferChange);
    return () => window.removeEventListener("nura-offer-change", handleOfferChange);
  }, [product.slug]);

  const addOfferToCart = (offer: ProductPageOffer) => {
    const unitPrice = Math.floor(offer.price / offer.products.length);
    const remainder = offer.price - unitPrice * offer.products.length;

    offer.products.forEach((p, index) => {
      const allocatedPrice = unitPrice + (index === 0 ? remainder : 0);
      const compareAtPrice = offer.products.length > 1 ? p.price : p.compareAtPrice;
      addItem({
        slug: p.slug,
        name_ar: p.name_ar,
        price: allocatedPrice,
        image: p.image,
        compareAtPrice,
        bundleName: offer.bundleName,
        discountAmount: Math.max(compareAtPrice - allocatedPrice, 0),
      });
    });

    trackAddToCart(
      offer.products.map((p, index) => ({
        slug: p.slug,
        name_ar: p.name_ar,
        price: unitPrice + (index === 0 ? remainder : 0),
        image: p.image,
        quantity: 1,
      })),
      offer.price,
      generateEventId()
    );
  };

  const handleAdd = () => {
    if (!selectedOffer) return;
    addOfferToCart(selectedOffer);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="fixed bottom-0 inset-x-0 z-40 md:hidden"
        >
          <div className="border-t border-nura-border bg-nura-cream/95 px-4 pb-safe-area-bottom pt-4 backdrop-blur-md shadow-luxury">
            <div className="flex items-center gap-3">
              <Link href="/" className="dir-ltr shrink-0" aria-label="NURA SKIN">
                <img src={BRAND_ASSETS.icon} alt="" width={440} height={440} className="h-8 w-8 object-contain mix-blend-multiply" />
              </Link>
              {/* Product info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#2C1810] truncate">{selectedOffer?.label ?? product.name_ar}</p>
                <p className="text-[10px] text-[#9B8A8A]">الدفع عند الاستلام</p>
              </div>

              {/* Price */}
              <div className="text-center shrink-0">
                {selectedOffer?.originalPrice && (
                  <p className="text-[10px] font-semibold text-[#9B8A8A] line-through">بدل {selectedOffer.originalPrice}</p>
                )}
                <p className="font-bold text-rose-deep text-lg">{selectedOffer?.price ?? product.price}</p>
                <p className="text-[10px] text-rose-mid">درهم</p>
              </div>

              {/* CTA */}
              <button
                onClick={handleAdd}
                className="bg-rose-deep text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-rose-md hover:opacity-90 active:scale-95 transition-all shrink-0"
              >
                أضيفي للسلة
              </button>
            </div>

            {/* Trust microcopy */}
            <p className="text-center text-[10px] text-[#9B8A8A] mt-2">
              توصيل مجاني لجميع أنحاء المغرب
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

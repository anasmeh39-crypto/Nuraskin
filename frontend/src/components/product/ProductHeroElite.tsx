"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PackageCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Product } from "@/types";
import { ProductGallery } from "./ProductGallery";
import { OfferSelector, Offer } from "./OfferSelector";
import { StarRating } from "@/components/ui/StarRating";
import { useCartStore } from "@/store/cart";
import { generateEventId, trackAddToCart, trackViewContent } from "@/lib/tracking";

interface Props { product: Product }

const TRUST_ITEMS = [
  { Icon: ShieldCheck, text: "الدفع عند الاستلام" },
  { Icon: Truck, text: "توصيل مجاني لجميع أنحاء المغرب" },
  { Icon: RotateCcw, text: "إرجاع مجاني 14 يوم" },
  { Icon: PackageCheck, text: "تأكيد قبل الإرسال" },
];

export function ProductHeroElite({ product }: Props) {
  const { addItem, openDrawer } = useCartStore();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const avgRating = product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;

  useEffect(() => {
    trackViewContent(product, generateEventId());
  }, [product]);

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
    setTimeout(() => { setAdding(false); setAdded(false); }, 2000);
  };

  const price = selectedOffer?.price ?? product.price;
  const original = selectedOffer?.originalPrice;
  const saving = selectedOffer?.saving;

  return (
    <section className="bg-ivory pt-6 pb-0 md:pt-12" dir="rtl">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">

          {/* ── Gallery — full bleed on mobile ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:sticky lg:top-24 -mx-4 sm:mx-0"
          >
            <ProductGallery productName={product.name_ar} productSlug={product.slug} offerTier={selectedOffer?.tier} offerLabel={selectedOffer?.label} />
          </motion.div>

          {/* ── Right: Details ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
            className="space-y-5 pb-10 sm:space-y-6"
          >
            {/* Brand + badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-rose-mid font-semibold tracking-[0.15em] uppercase">
                NURA SKIN — نورا سكين
              </span>
              <span className="badge-rose text-[10px] font-bold">{product.heroIngredient}</span>
            </div>

            {/* Product name */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#2C1810] leading-tight">
                {product.name_ar}
              </h1>
              <p className="text-rose-mid font-medium text-lg mt-1">{product.tagline_ar}</p>
            </div>

            {/* Emotional headline */}
            <p className="text-[#6B5555] text-base leading-relaxed border-r-2 border-rose-soft pr-4 italic font-arabic">
              {product.slug === "nura-balance" && "توازن يومي لطيف يساعد بشرتك على الظهور بإشراقة أكثر صفاءً"}
              {product.slug === "nura-night-renewal" && "كريم ليلي ناعم يدعم مظهر البشرة المريحة عند الاستيقاظ"}
              {product.slug === "nura-eye-revive" && "عناية خفيفة لمحيط العين لمظهر أكثر انتعاشًا وراحة"}
              {product.slug === "nura-spf-50" && "حماية عالية من أشعة UVA/UVB بتركيبة خفيفة، مرطبة، ولمسة غير دهنية للاستخدام اليومي"}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={Math.round(avgRating)} size="md" />
              <span className="text-sm font-semibold text-[#2C1810]">{avgRating.toFixed(1)}</span>
              <span className="text-sm text-[#9B8A8A]">({product.reviews.length} تقييم موثّق)</span>
            </div>

            {/* Key benefits strip */}
            <div className="flex flex-wrap gap-2">
              {product.benefits.slice(0, 3).map((b, i) => (
                <span key={i} className="text-xs bg-rose-blush text-rose-deep border border-rose-soft/20 px-3 py-1 rounded-full">
                  {b}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-l from-transparent via-border to-transparent" />

            {/* Offer selector */}
            <OfferSelector product={product} onOfferChange={setSelectedOffer} />

            {/* Price display */}
            <div className="flex items-end gap-3">
              <div className="text-4xl font-bold text-rose-deep">{price}</div>
              <span className="text-rose-mid text-lg mb-0.5">درهم</span>
              {original && (
                <>
                  <span className="text-[#9B8A8A] line-through text-lg mb-0.5">{original} درهم</span>
                  <span className="mb-1 rounded-full bg-nura-champagne-light px-2 py-0.5 text-xs font-bold text-nura-plum">
                    -{saving} درهم
                  </span>
                </>
              )}
            </div>

            {/* CTA */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`w-full h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-rose-md ${
                added
                  ? "bg-nura-plum text-white"
                  : adding
                  ? "bg-rose-soft text-white cursor-wait"
                  : "bg-rose-deep text-white hover:opacity-90"
              }`}
            >
              {added ? (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  تمت الإضافة للسلة
                </>
              ) : adding ? (
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : (
                <>
                  {selectedOffer?.tier === "single" ? `اطلبي السيروم الآن — ${price} درهم` : `احجزي روتينك الآن — ${price} درهم`}
                  <svg className="w-5 h-5 flip-ltr" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </motion.button>

            {/* COD reassurance */}
            <div className="bg-rose-blush border border-rose-soft/30 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-rose-light flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-rose-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-rose-deep font-bold text-sm">الدفع عند الاستلام — توصيل مجاني لجميع أنحاء المغرب</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {TRUST_ITEMS.map((t, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-[#6B5555]">
                    <t.Icon className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden />
                    {t.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Format info */}
            <div className="flex gap-3">
              {[
                { label: "النوع", value: product.format },
                { label: "الحجم", value: product.volume },
                { label: "جوهر التركيبة", value: product.heroIngredient },
              ].map((d) => (
                <div key={d.label} className="flex-1 bg-white border border-border rounded-2xl p-3 text-center">
                  <p className="text-[10px] text-[#9B8A8A] mb-1">{d.label}</p>
                  <p className="text-xs font-semibold text-[#2C1810]">{d.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

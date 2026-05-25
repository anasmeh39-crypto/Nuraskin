import { PRODUCTS_MAP } from "@/config/products";

/** Fallback when a product image path is missing from cart/order data. */
export const PRODUCT_IMAGE_PLACEHOLDER = "/images/nura-complete-routine-hero.png";

/**
 * Resolve a product image URL from cart/order data or product slug.
 * SKUs with images mapped in config/products.ts: nura-balance, nura-night-renewal,
 * nura-eye-revive, nura-spf-50.
 */
export function resolveProductImage(image?: string | null, slug?: string): string {
  if (image?.trim()) return image;
  if (slug && PRODUCTS_MAP[slug]?.image) return PRODUCTS_MAP[slug].image;
  return PRODUCT_IMAGE_PLACEHOLDER;
}

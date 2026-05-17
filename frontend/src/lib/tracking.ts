"use client";

import { CartItem, Product } from "@/types";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void; page: () => void };
    snaptr?: (...args: unknown[]) => void;
  }
}

export function generateEventId(): string {
  return crypto.randomUUID();
}

export function trackPageView() {
  try {
    window.fbq?.("track", "PageView");
    window.ttq?.page();
    window.snaptr?.("track", "PAGE_VIEW");
  } catch {}
}

export function trackViewContent(product: Product, eventId: string) {
  const payload = {
    content_ids: [product.slug],
    content_name: product.name_ar,
    content_type: "product",
    value: product.price,
    currency: "MAD",
  };

  try {
    window.fbq?.("track", "ViewContent", payload, { eventID: eventId });
    window.ttq?.track(
      "ViewContent",
      { content_id: product.slug, value: product.price, currency: "MAD" },
      { event_id: eventId }
    );
    window.snaptr?.("track", "VIEW_CONTENT", {
      item_ids: [product.slug],
      price: product.price,
      currency: "MAD",
    });
  } catch {}
}

export function trackAddToCart(items: CartItem[], total: number, eventId: string) {
  const ids = items.map((i) => i.slug);
  try {
    window.fbq?.(
      "track",
      "AddToCart",
      { content_ids: ids, content_type: "product", value: total, currency: "MAD" },
      { eventID: eventId }
    );
    window.ttq?.track(
      "AddToCart",
      { content_id: ids[0], value: total, currency: "MAD" },
      { event_id: eventId }
    );
    window.snaptr?.("track", "ADD_CART", {
      item_ids: ids,
      price: total,
      currency: "MAD",
    });
  } catch {}
}

export function trackInitiateCheckout(total: number, eventId: string) {
  try {
    window.fbq?.(
      "track",
      "InitiateCheckout",
      { value: total, currency: "MAD" },
      { eventID: eventId }
    );
    window.ttq?.track(
      "InitiateCheckout",
      { value: total, currency: "MAD" },
      { event_id: eventId }
    );
    window.snaptr?.("track", "START_CHECKOUT", {
      price: total,
      currency: "MAD",
    });
  } catch {}
}

export function trackLead(phone: string, eventId: string) {
  try {
    window.fbq?.("track", "Lead", {}, { eventID: eventId });
    window.ttq?.track("PlaceAnOrder", {}, { event_id: eventId });
    window.snaptr?.("track", "PURCHASE", {});
  } catch {}
}

export function trackUpsellViewed(productSlug: string) {
  try {
    window.fbq?.("trackCustom", "UpsellViewed", { content_id: productSlug });
    window.ttq?.track("UpsellViewed", { content_id: productSlug });
  } catch {}
}

export function trackUpsellAccepted(
  productSlug: string,
  price: number,
  eventId: string
) {
  try {
    window.fbq?.(
      "trackCustom",
      "UpsellAccepted",
      { content_id: productSlug, value: price, currency: "MAD" },
      { eventID: eventId }
    );
    window.ttq?.track(
      "UpsellAccepted",
      { content_id: productSlug, value: price, currency: "MAD" },
      { event_id: eventId }
    );
  } catch {}
}

export function trackThankYouViewed(orderNumber: string) {
  try {
    window.fbq?.("trackCustom", "ThankYouViewed", { order_number: orderNumber });
  } catch {}
}

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

// ─── CAPI helper ──────────────────────────────────────────────────────────────
// Sends the same event to your backend, which forwards it to Meta + TikTok.
// Uses the same eventId as the browser pixel so platforms deduplicate correctly.

interface CapiOptions {
  eventName: string;
  eventId: string;
  phone?: string;
  customData?: Record<string, unknown>;
  channels?: string[];
}

function sendCapi(opts: CapiOptions): void {
  const body = {
    event_name: opts.eventName,
    event_id: opts.eventId,
    event_time: Math.floor(Date.now() / 1000),
    user_data: {
      phone: opts.phone ?? null,
      client_user_agent: navigator.userAgent,
    },
    custom_data: opts.customData ?? {},
    page_url: window.location.href,
    channels: opts.channels ?? ["meta", "tiktok"],
  };

  // fire-and-forget — never block the UI
  fetch("/api/tracking/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => {});
}

// ─── Events ───────────────────────────────────────────────────────────────────

export function trackPageView() {
  try {
    window.fbq?.("track", "PageView");
    window.ttq?.page();
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
  } catch {}

  sendCapi({
    eventName: "ViewContent",
    eventId,
    customData: { value: product.price, currency: "MAD", content_ids: [product.slug] },
  });
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
  } catch {}

  sendCapi({
    eventName: "AddToCart",
    eventId,
    customData: { value: total, currency: "MAD", content_ids: ids },
  });
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
  } catch {}

  sendCapi({
    eventName: "InitiateCheckout",
    eventId,
    customData: { value: total, currency: "MAD" },
  });
}

// Called when customer submits order — phone is available here, most valuable for CAPI
export function trackLead(phone: string, eventId: string) {
  try {
    window.fbq?.("track", "Lead", {}, { eventID: eventId });
    window.ttq?.track("PlaceAnOrder", {}, { event_id: eventId });
  } catch {}

  sendCapi({
    eventName: "Lead",
    eventId,
    phone,
  });
}

// Called on thank-you page — most important event for ad optimization
export function trackPurchase(
  phone: string,
  total: number,
  eventId: string,
  items: { slug: string; quantity: number; price: number }[]
) {
  const ids = items.map((i) => i.slug);
  try {
    window.fbq?.(
      "track",
      "Purchase",
      { value: total, currency: "MAD", content_ids: ids, content_type: "product" },
      { eventID: eventId }
    );
    window.ttq?.track(
      "PlaceAnOrder",
      { value: total, currency: "MAD", content_id: ids[0] },
      { event_id: eventId }
    );
  } catch {}

  sendCapi({
    eventName: "Purchase",
    eventId,
    phone,
    customData: { value: total, currency: "MAD", content_ids: ids },
  });
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

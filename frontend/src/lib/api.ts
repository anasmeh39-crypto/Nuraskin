import {
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/types";

const API_URL = "/api";

async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "خطأ غير متوقع" }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function createOrder(
  data: CreateOrderRequest
): Promise<CreateOrderResponse> {
  return apiFetch<CreateOrderResponse>("/orders", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function acceptUpsell(
  orderNumber: string,
  upsellProductSlug: string,
  upsellPrice: number
): Promise<{ order_number: string; new_total: number; status: string }> {
  return apiFetch(`/orders/${orderNumber}/upsell`, {
    method: "POST",
    body: JSON.stringify({
      upsell_product_slug: upsellProductSlug,
      upsell_price: upsellPrice,
    }),
  });
}

export async function getOrder(orderNumber: string) {
  return apiFetch(`/orders/${orderNumber}`);
}

export async function sendServerEvent(eventData: {
  event_name: string;
  event_id: string;
  event_time: number;
  user_data: { phone?: string; client_ip_address?: string; client_user_agent?: string };
  custom_data: Record<string, unknown>;
  page_url?: string;
  channels: string[];
}): Promise<void> {
  try {
    await apiFetch("/tracking/event", {
      method: "POST",
      body: JSON.stringify(eventData),
    });
  } catch {
    // Non-blocking — tracking failures must not affect UX
  }
}

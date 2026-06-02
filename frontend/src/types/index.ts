export interface Product {
  slug: string;
  name_ar: string;
  name_en?: string;
  tagline_ar: string;
  description_ar: string;
  price: number;
  formattedPrice: string;
  compareAtPrice: number;
  formattedCompareAtPrice: string;
  image: string;
  heroIngredient: string;
  ingredients: Ingredient[];
  benefits: string[];
  concerns: string[];
  crossSells: string[];
  format: string;
  volume: string;
  reviews: Review[];
  metaDescription: string;
  keyResults?: KeyResult[];
}

export interface Ingredient {
  name_ar: string;
  name_en: string;
  description_ar: string;
  percent?: string;
}

export interface KeyResult {
  icon: "smooth" | "glow" | "firm" | "hydrate" | "calm" | "tone";
  text: string;
}

export interface Review {
  name: string;
  city: string;
  rating: number;
  text: string;
  date: string;
}

export interface CartItem {
  cartKey?: string;
  slug: string;
  name_ar: string;
  price: number;
  quantity: number;
  image: string;
  compareAtPrice?: number;
  bundleName?: string;
  discountAmount?: number;
}

export interface OrderItemIn {
  product_slug: string;
  quantity: number;
  unit_price?: number;
  compare_at_price?: number;
  bundle_name?: string;
  discount_amount?: number;
}

export interface CreateOrderRequest {
  customer_name: string;
  customer_phone: string;
  customer_address?: string;
  customer_city?: string;
  items: OrderItemIn[];
  total: number;
  shipping_cost: number;
  source_url?: string;
  event_id?: string;
}

export interface UpsellProduct {
  slug: string;
  name_ar: string;
  price: number;
  discounted_price: number;
  discount_percent: number;
}

export interface CreateOrderResponse {
  order_id: string;
  order_number: string;
  status: string;
  total: number;
  shipping_cost: number;
  upsell_eligible: boolean;
  upsell_product?: UpsellProduct;
}

export interface OrderItemOut {
  product_slug: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  is_upsell: boolean;
  compare_at_price?: number;
  bundle_name?: string;
  discount_amount?: number;
}

export interface OrderDetail {
  order_number: string;
  status: string;
  customer_name: string;
  customer_address?: string;
  customer_city?: string;
  total: number;
  shipping_cost: number;
  items: OrderItemOut[];
  upsell_accepted: boolean;
}

export interface Bundle {
  id: string;
  name_ar: string;
  products: string[];
  price: number;
  compareAtPrice: number;
  saving: number;
  tag?: string;
}

export interface Product {
  slug: string;
  name_ar: string;
  name_en?: string;
  tagline_ar: string;
  description_ar: string;
  price: number;
  formattedPrice: string;
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
}

export interface Ingredient {
  name_ar: string;
  name_en: string;
  description_ar: string;
}

export interface Review {
  name: string;
  city: string;
  rating: number;
  text: string;
  date: string;
}

export interface CartItem {
  slug: string;
  name_ar: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderItemIn {
  product_slug: string;
  quantity: number;
}

export interface CreateOrderRequest {
  customer_name: string;
  customer_phone: string;
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

export interface Bundle {
  id: string;
  name_ar: string;
  products: string[];
  price: number;
  saving: number;
  tag?: string;
}

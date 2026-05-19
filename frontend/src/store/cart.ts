import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";
import { calculateShipping, PRODUCTS_MAP } from "@/config/products";

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  isCheckoutOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  getTotal: () => number;
  getShipping: () => number;
  getGrandTotal: () => number;
  getItemCount: () => number;
}

function normalizeCartItem(item: CartItem): CartItem {
  const product = PRODUCTS_MAP[item.slug];
  if (!product || item.bundleName) return item;

  return {
    ...item,
    name_ar: product.name_ar,
    image: product.image,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    discountAmount: product.compareAtPrice - product.price,
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      isCheckoutOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find((i) => i.slug === newItem.slug);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === newItem.slug
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              isDrawerOpen: true,
            };
          }
          return {
            items: [...state.items, { ...newItem, quantity: 1 }],
            isDrawerOpen: true,
          };
        });
      },

      removeItem: (slug) => {
        set((state) => ({
          items: state.items.filter((i) => i.slug !== slug),
        }));
      },

      updateQuantity: (slug, quantity) => {
        if (quantity < 1) {
          get().removeItem(slug);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.slug === slug ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      openCheckout: () => set({ isCheckoutOpen: true, isDrawerOpen: false }),
      closeCheckout: () => set({ isCheckoutOpen: false }),

      getTotal: () => get().items.reduce((sum, i) => sum + normalizeCartItem(i).price * i.quantity, 0),

      getShipping: () => calculateShipping(get().getTotal()),

      getGrandTotal: () => get().getTotal() + get().getShipping(),

      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "nura-skin-cart",
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as CartStore;
        return {
          ...state,
          items: (state.items || []).map(normalizeCartItem),
        };
      },
      partialize: (state) => ({ items: state.items }),
    }
  )
);

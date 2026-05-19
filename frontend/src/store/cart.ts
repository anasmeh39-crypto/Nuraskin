import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";
import { calculateShipping, PRODUCTS_MAP } from "@/config/products";

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  isCheckoutOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
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

function getCartKey(item: Pick<CartItem, "cartKey" | "slug" | "bundleName">): string {
  return item.cartKey || (item.bundleName ? `${item.bundleName}:${item.slug}` : item.slug);
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      isCheckoutOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const nextItem = { ...newItem, cartKey: getCartKey(newItem) };
          const existing = state.items.find((i) => getCartKey(i) === nextItem.cartKey);
          if (existing) {
            return {
              items: state.items.map((i) =>
                getCartKey(i) === nextItem.cartKey
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              isDrawerOpen: true,
            };
          }
          return {
            items: [...state.items, { ...nextItem, quantity: 1 }],
            isDrawerOpen: true,
          };
        });
      },

      removeItem: (key) => {
        set((state) => ({
          items: state.items.filter((i) => getCartKey(i) !== key),
        }));
      },

      updateQuantity: (key, quantity) => {
        if (quantity < 1) {
          get().removeItem(key);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            getCartKey(i) === key ? { ...i, quantity } : i
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
      version: 3,
      migrate: (persistedState) => {
        const state = persistedState as CartStore;
        return {
          ...state,
          items: (state.items || []).map(normalizeCartItem).map((item) => ({
            ...item,
            cartKey: getCartKey(item),
          })),
        };
      },
      partialize: (state) => ({ items: state.items }),
    }
  )
);

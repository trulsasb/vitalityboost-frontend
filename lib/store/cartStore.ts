import { create } from "zustand";
import { getCart, addToCart, removeFromCart, clearCart } from "@/lib/api/cart";
import { Cart, CartItem, AddToCartRequest } from "@/types/cart";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;

  fetchCart: (userId: string) => Promise<void>;
  addItem: (data: AddToCartRequest) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clear: (userId: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  loading: false,
  error: null,

  async fetchCart(userId: string) {
    set({ loading: true, error: null });
    try {
      const cart = await getCart(userId);
      set({ cart });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  async addItem(data: AddToCartRequest) {
    set({ loading: true, error: null });
    try {
      const newItem: CartItem = await addToCart(data);

      set((state) => {
        if (!state.cart) {
          return {
            cart: {
              items: [newItem],
              totals: {
                subtotal: newItem.price * newItem.quantity,
                tax: 0,
                total: newItem.price * newItem.quantity,
              },
            },
          };
        }

        return {
          cart: {
            ...state.cart,
            items: [...state.cart.items, newItem],
          },
        };
      });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  async removeItem(itemId: string) {
    set({ loading: true, error: null });
    try {
      await removeFromCart(itemId);

      set((state) => {
        if (!state.cart) return { cart: null };

        const updatedItems = state.cart.items.filter(
          (item) => item.productId !== itemId
        );

        return {
          cart: {
            ...state.cart,
            items: updatedItems,
          },
        };
      });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  async clear(userId: string) {
    set({ loading: true, error: null });
    try {
      await clearCart(userId);

      set({
        cart: {
          items: [],
          totals: {
            subtotal: 0,
            tax: 0,
            total: 0,
          },
        },
      });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

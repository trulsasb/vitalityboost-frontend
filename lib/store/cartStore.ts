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
                subtotal: newItem.price * newItem

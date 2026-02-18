// lib/store/cartStore.ts

import { Cart, CartItem } from "@/types";

class CartStore {
  private cart: Cart = { items: [] };

  getCart(): Cart {
    return this.cart;
  }

  addItem(productId: string, variantId: string, quantity: number = 1): void {
    const existing = this.cart.items.find(
      (item) =>
        item.productId === productId && item.variantId === variantId
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      const newItem: CartItem = {
        productId,
        variantId,
        quantity,
      };
      this.cart.items.push(newItem);
    }
  }

  removeItem(productId: string, variantId: string): void {
    this.cart.items = this.cart.items.filter(
      (item) =>
        !(item.productId === productId && item.variantId === variantId)
    );
  }

  updateQuantity(
    productId: string,
    variantId: string,
    quantity: number
  ): void {
    const item = this.cart.items.find(
      (i) =>
        i.productId === productId && i.variantId === variantId
    );

    if (item) {
      item.quantity = quantity;
    }
  }

  clearCart(): void {
    this.cart.items = [];
  }

  getTotal(): number {
    return this.cart.items.reduce((sum, item) => {
      // Pris hentes fra backend ved checkout — frontend lagrer kun antall
      return sum;
    }, 0);
  }
}

export const cartStore = new CartStore();

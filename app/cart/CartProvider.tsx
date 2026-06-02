"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem } from "@/types/cart";

interface CartContextValue {
  items: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function updateQuantity(id: string, quantity: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, quantity } : item
      )
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.productId !== id));
  }

  return (
    <CartContext.Provider value={{ items, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

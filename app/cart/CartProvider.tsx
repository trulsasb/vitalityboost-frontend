"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (id: string, quantity?: number) => void;
  remove: (id: string) => void;
  update: (id: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  function add(id: string, quantity: number = 1) {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === id);
      if (existing) {
        return prev.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { id, quantity }];
    });
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function update(id: string, quantity: number) {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  }

  function clear() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}

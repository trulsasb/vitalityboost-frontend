"use client";

import { useCart } from "@/app/cart/CartProvider";

export function CartSummary() {
  const { items } = useCart();

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="border rounded-lg p-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Oppsummering</h2>

      <div className="flex justify-between mb-2">
        <span>Antall varer</span>
        <span>{items.length}</span>
      </div>

      <div className="flex justify-between font-medium text-lg mt-4">
        <span>Total</span>
        <span>{total} kr</span>
      </div>
    </div>
  );
}

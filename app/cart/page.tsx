"use client";

import { useCart } from "@/app/cart/CartProvider";
import CartItem from "@/app/cart/Drawer/CartItem";
import CartSummary from "@/app/cart/CartSummary";

export default function CartPage() {
  const { items } = useCart();

  const isEmpty = items.length === 0;

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Handlekurv</h1>

      {isEmpty ? (
        <p className="text-lg text-gray-600">Handlekurven er tom.</p>
      ) : (
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}

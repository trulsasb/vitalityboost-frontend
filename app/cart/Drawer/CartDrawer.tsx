"use client";

import { useCart } from "@/app/cart/CartProvider";
import CartItem from "@/app/cart/Drawer/CartItem";
import { CartSummary } from "@/app/cart/CartSummary";
import { useState } from "react";

export default function CartDrawer() {
  const { items } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-40 bg-black text-white px-4 py-2 rounded-lg"
      >
        Handlekurv ({items.length})
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 p-6 transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-6">Handlekurv</h2>

        {items.length === 0 ? (
          <p className="text-gray-600">Handlekurven er tom.</p>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <CartItem
                key={item.productId}
                id={item.productId}
                name={item.title}
                price={item.price}
                image={item.image ?? "/placeholder.png"}
                quantity={item.quantity}
              />
            ))}

            <CartSummary />
          </div>
        )}

        <button
          onClick={() => setOpen(false)}
          className="mt-8 w-full bg-black text-white py-3 rounded-lg text-lg"
        >
          Lukk
        </button>
      </div>
    </>
  );
}

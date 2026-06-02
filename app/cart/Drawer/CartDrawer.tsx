"use client";

import { useCart } from "@/app/cart/CartProvider";
import CartItem from "@/app/cart/Drawer/CartItem";
import { CartSummary } from "@/app/cart/CartSummary";
import { useState } from "react";

export default function CartDrawer() {
  const { items, isOpen, toggleCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  function closeDrawer() {
    setIsAnimating(true);
    setTimeout(() => {
      toggleCart();
      setIsAnimating(false);
    }, 300);
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeDrawer}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Handlekurv</h2>
            <button onClick={closeDrawer} className="text-gray-500">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6">
              {items.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>

            <CartSummary />
          </div>
        </div>
      </aside>
    </>
  );
}

"use client";

import { useCart } from "@/app/cart/CartProvider";
import { useState } from "react";

export function CartDrawer() {
  const { items, remove, update } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-6 z-40 bg-black text-white px-4 py-2 rounded-lg"
      >
        Handlekurv ({items.length})
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 p-6 transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-xl font-semibold mb-6">Handlekurv</h2>

        {items.length === 0 && (
          <p className="text-gray-500">Handlekurven er tom.</p>
        )}

        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">Produkt {item.id}</p>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    update(item.id, Number(e.target.value))
                  }
                  className="border rounded px-2 py-1 w-20 mt-2"
                />
              </div>

              <button
                onClick={() => remove(item.id)}
                className="text-red-600 hover:underline"
              >
                Fjern
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <button
            onClick={() => setOpen(false)}
            className="mt-8 w-full bg-black text-white py-3 rounded-lg"
          >
            Gå til kassen
          </button>
        )}
      </div>
    </>
  );
}

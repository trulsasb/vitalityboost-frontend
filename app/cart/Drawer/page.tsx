"use client";

import { useCart } from "@/app/cart/CartProvider";

export default function CartPage() {
  const { items, remove, update } = useCart();

  return (
    <div className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-semibold mb-10">Handlekurv</h1>

      {items.length === 0 && (
        <p className="text-gray-500">Handlekurven er tom.</p>
      )}

      <div className="space-y-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-6"
          >
            <div>
              <p className="font-medium text-lg">Produkt {item.id}</p>

              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => update(item.id, Number(e.target.value))}
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
        <button className="mt-10 w-full bg-black text-white py-4 rounded-lg text-lg">
          Gå til kassen
        </button>
      )}
    </div>
  );
}

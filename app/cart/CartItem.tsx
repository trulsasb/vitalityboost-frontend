"use client";

import { useCart } from "@/app/cart/CartProvider";

interface CartItemProps {
  id: string;
  quantity: number;
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { update, remove } = useCart();

  return (
    <div className="flex justify-between items-center border-b pb-6">
      <div>
        <p className="font-medium text-lg">Produkt {id}</p>

        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => update(id, Number(e.target.value))}
          className="border rounded px-2 py-1 w-20 mt-2"
        />
      </div>

      <button
        onClick={() => remove(id)}
        className="text-red-600 hover:underline"
      >
        Fjern
      </button>
    </div>
  );
}

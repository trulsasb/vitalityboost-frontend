"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/app/cart/CartProvider";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartItem({
  id,
  name,
  price,
  image,
  quantity,
}: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  // Local draft string so the field can be freely typed into (cleared,
  // multi-digit numbers entered) without fighting the committed cart
  // quantity on every keystroke -- only commits (and clamps to >= 1) on
  // blur/Enter. Previously there was no text input at all, only +/-
  // buttons, so entering a quantity meant clicking one-by-one.
  const [draft, setDraft] = useState(String(quantity));

  useEffect(() => {
    setDraft(String(quantity));
  }, [quantity]);

  function commitDraft() {
    const parsed = parseInt(draft, 10);
    const next = Number.isFinite(parsed) && parsed >= 1 ? parsed : quantity;
    setDraft(String(next));
    if (next !== quantity) updateQuantity(id, next);
  }

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center gap-4">
        <Image
          src={image}
          alt={name}
          width={64}
          height={64}
          className="rounded-md object-cover"
        />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{price} kr</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => updateQuantity(id, Math.max(1, quantity - 1))}
          className="px-2 py-1 border rounded"
        >
          -
        </button>

        <input
          type="number"
          min={1}
          inputMode="numeric"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitDraft}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              (e.target as HTMLInputElement).blur();
            }
          }}
          className="w-14 text-center border rounded px-1 py-1"
          aria-label={`Antall av ${name}`}
        />

        <button
          onClick={() => updateQuantity(id, quantity + 1)}
          className="px-2 py-1 border rounded"
        >
          +
        </button>

        <button
          onClick={() => removeItem(id)}
          className="text-red-500 text-sm ml-4"
        >
          Fjern
        </button>
      </div>
    </div>
  );
}

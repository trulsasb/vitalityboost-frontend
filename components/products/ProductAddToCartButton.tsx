"use client";

import { useState } from "react";
import { useCart } from "@/app/cart/CartProvider";

interface ProductAddToCartButtonProps {
  productId: string;
  title: string;
  price: number;
  image?: string;
  className?: string;
}

export function ProductAddToCartButton({
  productId,
  title,
  price,
  image,
  className = "",
}: ProductAddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  function handleClick() {
    addItem({ productId, title, price, image }, quantity);
    setAdded(true);
    setQuantity(1);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center border rounded w-fit">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-2 py-1 text-sm"
          aria-label="Reduser antall"
        >
          -
        </button>
        <input
          type="number"
          min={1}
          inputMode="numeric"
          value={quantity}
          onChange={(e) => {
            const parsed = parseInt(e.target.value, 10);
            setQuantity(Number.isFinite(parsed) && parsed >= 1 ? parsed : 1);
          }}
          className="w-10 text-center text-sm outline-none"
          aria-label={`Antall av ${title}`}
        />
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="px-2 py-1 text-sm"
          aria-label="Øk antall"
        >
          +
        </button>
      </div>

      <button
        onClick={handleClick}
        className={`rounded bg-forest px-4 py-2 text-white text-sm font-medium hover:bg-forest-dark ${className}`}
      >
        {added ? "Lagt til!" : "Legg i handlekurv"}
      </button>
    </div>
  );
}

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

  function handleClick() {
    addItem({ productId, title, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded bg-black px-4 py-2 text-white text-sm font-medium hover:bg-gray-800 ${className}`}
    >
      {added ? "Lagt til!" : "Legg i handlekurv"}
    </button>
  );
}

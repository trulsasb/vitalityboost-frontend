"use client";

import Image from "next/image";
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
          onClick={() => updateQuantity(id, quantity - 1)}
          className="px-2 py-1 border rounded"
        >
          -
        </button>

        <span>{quantity}</span>

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

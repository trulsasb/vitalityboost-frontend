"use client";

export const dynamic = "force-dynamic";

import { useCart } from "@/app/cart/CartProvider";
import CartItem from "@/app/cart/Drawer/CartItem";
import { CartSummary } from "@/app/cart/CartSummary";

export default function CartPage() {
  const { items } = useCart();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-8">Handlekurv</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Handlekurven er tom.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
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
          </div>

          <CartSummary />
        </div>
      )}
    </div>
  );
}


"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useCart } from "@/app/cart/CartProvider";
import CartItem from "@/app/cart/Drawer/CartItem";
import { CartSummary } from "@/app/cart/CartSummary";
import { useState } from "react";

export default function CheckoutPage() {
  const { items } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    zip: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!customer.name || !customer.email) return alert("Fyll ut navn og e‑post.");

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (data.url) window.location.href = data.url;
      else throw new Error();
    } catch {
      setLoading(false);
      alert("Kunne ikke starte betaling.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16">
        <h1 className="text-3xl font-semibold mb-6">Kasse</h1>
        <p className="text-gray-600">Handlekurven er tom.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-16">
      <h1 className="text-3xl font-semibold mb-10">Kasse</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {/* form fields */}
          <div>
            <label className="block mb-2 font-medium">Navn</label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border rounded w-full px-3 py-2"
              placeholder="Fullt navn"
            />
          </div>

          {/* ... resten av feltene ... */}

          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Dine produkter</h2>

            <div className="space-y-4">
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
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-8 w-full py-4 rounded-lg text-lg ${
              loading ? "bg-gray-400" : "bg-black text-white"
            }`}
          >
            {loading ? "Starter betaling..." : "Fullfør bestilling"}
          </button>
        </div>

        <CartSummary />
      </div>
    </div>
  );
}

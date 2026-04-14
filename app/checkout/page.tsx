"use client";

import { useCart } from "@/app/cart/CartProvider";
import { CartItem } from "@/app/cart/CartItem";
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

  const handleChange = (field: string, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!customer.name || !customer.email) {
      alert("Vennligst fyll ut navn og e‑post.");
      return;
    }

    // Midlertidig redirect – her kommer Stripe senere
    window.location.href = "/checkout/success";
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
        {/* Kundedetaljer */}
        <div className="lg:col-span-2 space-y-6">
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

          <div>
            <label className="block mb-2 font-medium">E‑post</label>
            <input
              type="email"
              value={customer.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border rounded w-full px-3 py-2"
              placeholder="din@epost.no"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Adresse</label>
            <input
              type="text"
              value={customer.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="border rounded w-full px-3 py-2"
              placeholder="Gateadresse"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Postnummer</label>
              <input
                type="text"
                value={customer.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
                className="border rounded w-full px-3 py-2"
                placeholder="0000"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">By</label>
              <input
                type="text"
                value={customer.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="border rounded w-full px-3 py-2"
                placeholder="Oslo"
              />
            </div>
          </div>

          {/* Produkter i bestillingen */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Dine produkter</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} id={item.id} quantity={item.quantity} />
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-black text-white py-4 rounded-lg text-lg"
          >
            Fullfør bestilling
          </button>
        </div>

        {/* Oppsummering */}
        <CartSummary />
      </div>
    </div>
  );
}

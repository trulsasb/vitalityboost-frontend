"use client";

import { useCart } from "@/app/cart/CartProvider";
import { CartSummary } from "@/app/cart/CartSummary";

export default function CheckoutPage() {
  const { items } = useCart();

  return (
    <div className="max-w-4xl mx-auto py-16">
      <h1 className="text-3xl font-semibold mb-10">Kasse</h1>

      {items.length === 0 && (
        <p className="text-gray-500">Handlekurven er tom.</p>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Kundedetaljer */}
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Navn</label>
              <input
                type="text"
                className="border rounded w-full px-3 py-2"
                placeholder="Fullt navn"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">E‑post</label>
              <input
                type="email"
                className="border rounded w-full px-3 py-2"
                placeholder="din@epost.no"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Adresse</label>
              <input
                type="text"
                className="border rounded w-full px-3 py-2"
                placeholder="Gateadresse"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Postnummer</label>
              <input
                type="text"
                className="border rounded w-full px-3 py-2"
                placeholder="0000"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">By</label>
              <input
                type="text"
                className="border rounded w-full px-3 py-2"
                placeholder="Oslo"
              />
            </div>

            <button className="mt-6 w-full bg-black text-white py-4 rounded-lg text-lg">
              Fullfør bestilling
            </button>
          </div>

          {/* Oppsummering */}
          <CartSummary />
        </div>
      )}
    </div>
  );
}

"use client";

import { useCart } from "@/app/cart/CartProvider";
import CartItem from "@/app/cart/Drawer/CartItem";
import { CartSummary } from "@/app/cart/CartSummary";
import { useState } from "react";

type Provider = "stripe" | "vipps";

export default function CheckoutPage() {
  const { items } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    zip: "",
    city: "",
  });

  const [provider, setProvider] = useState<Provider>("vipps");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [discountCodeInput, setDiscountCodeInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [checkingDiscount, setCheckingDiscount] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const total = Math.max(0, subtotal - (appliedDiscount?.amount || 0));

  const handleChange = (field: string, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  async function applyDiscountCode() {
    if (!discountCodeInput.trim()) return;
    setCheckingDiscount(true);
    setDiscountError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discounts/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: discountCodeInput.trim(),
          items: items.map((item) => ({
            product_id: Number(item.productId),
            quantity: item.quantity,
          })),
          customer_email: customer.email || null,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.valid) {
        setAppliedDiscount(null);
        setDiscountError(data.message || "Ugyldig rabattkode");
        return;
      }

      setAppliedDiscount({ code: discountCodeInput.trim(), amount: data.discount_amount });
    } catch {
      setAppliedDiscount(null);
      setDiscountError("Kunne ikke sjekke rabattkoden. Prøv igjen.");
    } finally {
      setCheckingDiscount(false);
    }
  }

  function removeDiscountCode() {
    setAppliedDiscount(null);
    setDiscountCodeInput("");
    setDiscountError("");
  }

  const handleSubmit = async () => {
    if (!customer.name || !customer.email || !customer.address || !customer.zip || !customer.city) {
      setError("Fyll ut navn, e-post, adresse, postnummer og by.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          provider,
          customer,
          discountCode: appliedDiscount?.code,
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        // Stashed so the success/complete page — reached after a full
        // redirect round-trip to Stripe/Vipps and back — can poll the
        // backend for the real payment status instead of just assuming
        // success because the browser landed there.
        sessionStorage.setItem(
          "vb_pending_payment",
          JSON.stringify({ paymentId: data.paymentId, statusToken: data.statusToken })
        );
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Kunne ikke starte betaling.");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Kunne ikke starte betaling.");
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
          {/* Kundeinfo */}
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
            <label className="block mb-2 font-medium">E-post</label>
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
              placeholder="Gate og husnummer"
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

          {/* Betalingsvalg */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Betaling</h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setProvider("vipps")}
                className={`flex-1 border rounded-lg py-3 font-medium ${
                  provider === "vipps"
                    ? "border-black bg-black text-white"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                Vipps
              </button>
              <button
                type="button"
                onClick={() => setProvider("stripe")}
                className={`flex-1 border rounded-lg py-3 font-medium ${
                  provider === "stripe"
                    ? "border-black bg-black text-white"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                Kort (Stripe)
              </button>
            </div>
          </div>

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

          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Rabattkode</h2>

            {appliedDiscount ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                <span className="text-sm text-green-800">
                  Kode <strong>{appliedDiscount.code}</strong> — trekker fra {appliedDiscount.amount} kr
                </span>
                <button type="button" onClick={removeDiscountCode} className="text-sm text-gray-600 underline">
                  Fjern
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <input
                  type="text"
                  value={discountCodeInput}
                  onChange={(e) => setDiscountCodeInput(e.target.value)}
                  placeholder="Rabattkode"
                  className="border rounded-lg px-3 py-2 flex-1"
                />
                <button
                  type="button"
                  onClick={applyDiscountCode}
                  disabled={checkingDiscount || !discountCodeInput.trim()}
                  className="px-4 py-2 border border-black rounded-lg font-medium disabled:opacity-50"
                >
                  {checkingDiscount ? "Sjekker..." : "Bruk"}
                </button>
              </div>
            )}

            {discountError && <p className="mt-2 text-sm text-red-600">{discountError}</p>}
          </div>

          <div className="pt-6 border-t space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Delsum</span>
              <span>{subtotal} kr</span>
            </div>
            {appliedDiscount && (
              <div className="flex justify-between text-green-700">
                <span>Rabatt</span>
                <span>-{appliedDiscount.amount} kr</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{total} kr</span>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

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

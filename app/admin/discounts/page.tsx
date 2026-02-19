"use client";

import { useEffect, useState } from "react";

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDiscounts() {
    try {
      const res = await fetch("/api/discounts", { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente rabatter");
      const data = await res.json();
      setDiscounts(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDiscounts();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster rabatter...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Rabatter</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {discounts.map((discount) => (
          <div
            key={discount.id}
            className="border rounded-md p-4 hover:bg-gray-50 transition"
          >
            <h2 className="font-semibold text-lg">{discount.name}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {discount.description || "Ingen beskrivelse"}
            </p>
            <p className="text-sm mt-2">
              <strong>Prosent:</strong> {discount.percentage}%
            </p>
            <p className="text-sm">
              <strong>Aktiv:</strong> {discount.active ? "Ja" : "Nei"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

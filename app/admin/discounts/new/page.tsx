"use client";

import { useEffect, useState } from "react";

export default function DiscountDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [discount, setDiscount] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDiscount() {
    try {
      const res = await fetch(`/api/discounts/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente rabatt");
      const data = await res.json();
      setDiscount(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDiscount();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster rabatt...</p>
      </div>
    );
  }

  if (error || !discount) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error || "Fant ikke rabatt"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <h1 className="text-xl font-semibold tracking-tight">
        Rabatt: {discount.name}
      </h1>

      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Detaljer</h2>
        <p><strong>ID:</strong> {discount.id}</p>
        <p><strong>Navn:</strong> {discount.name}</p>
        <p><strong>Prosent:</strong> {discount.percentage}%</p>
        <p><strong>Aktiv:</strong> {discount.active ? "Ja" : "Nei"}</p>

        {discount.description && (
          <p><strong>Beskrivelse:</strong> {discount.description}</p>
        )}

        {discount.created_at && (
          <p>
            <strong>Opprettet:</strong>{" "}
            {new Date(discount.created_at).toLocaleDateString("no-NO")}
          </p>
        )}
      </section>
    </div>
  );
}

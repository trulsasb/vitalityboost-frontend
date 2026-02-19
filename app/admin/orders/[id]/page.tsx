"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [order, setOrder] = useState<any>(null);

  async function loadOrder() {
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente ordre");
      const data = await res.json();
      setOrder(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  async function refund() {
    if (!confirm("Er du sikker på at du vil refundere denne ordren?")) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/orders/${id}/refund`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Kunne ikke refundere ordre");

      await loadOrder();
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadOrder();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster ordre...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <p>Fant ikke ordren.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-3xl">
      <h1 className="text-xl font-semibold tracking-tight">
        Ordre #{order.id}
      </h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {/* Kundeinfo */}
      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Kunde</h2>
        <p><strong>Navn:</strong> {order.customer_name}</p>
        <p><strong>E‑post:</strong> {order.customer_email}</p>
        <p><strong>Adresse:</strong> {order.address}</p>
      </section>

      {/* Produkter */}
      <section className="border rounded-md p-4 space-y-4">
        <h2 className="font-semibold text-lg">Produkter</h2>

        <div className="space-y-2">
          {order.items.map((item: any) => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.product_name}</p>
                <p className="text-sm text-gray-600">
                  Antall: {item.quantity}
                </p>
              </div>
              <p>{item.total_price} kr</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <p className="font-medium">Total</p>
          <p className="font-semibold">{order.total_amount} kr</p>
        </div>
      </section>

      {/* Betaling */}
      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Betaling</h2>
        <p><strong>Metode:</strong> {order.payment_method}</p>
        <p><strong>Status:</strong> {order.payment_status}</p>
        <p>
          <strong>Transaksjon:</strong>{" "}
          {order.transaction_id || "Ingen"}
        </p>
      </section>

      {/* Hendelseslogg */}
      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Hendelseslogg</h2>

        {order.events.length === 0 && (
          <p className="text-gray-600">Ingen hendelser registrert.</p>
        )}

        <ul className="space-y-2">
          {order.events.map((event: any) => (
            <li
              key={event.id}
              className="border-b pb-2"
            >
              <p className="font-medium">{event.type}</p>
              <p className="text-sm text-gray-600">
                {new Date(event.timestamp).toLocaleString("no-NO")}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Handlinger */}
      <div className="flex justify-end">
        <button
          onClick={refund}
          disabled={saving}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
        >
          {saving ? "Behandler..." : "Refunder ordre"}
        </button>
      </div>
    </div>
  );
}

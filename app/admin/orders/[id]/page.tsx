"use client";

import { useEffect, useState } from "react";

const STATUS_OPTIONS = [
  "pending_payment",
  "paid",
  "shipped",
  "completed",
  "cancelled",
  "refunded",
  "failed",
];

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
}

interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string | null;
  customer_name: string | null;
  customer_email: string | null;
  shipping_address: string | null;
  shipping_zip: string | null;
  shipping_city: string | null;
  items: OrderItem[];
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<Order | null>(null);

  async function loadOrder() {
    try {
      const res = await fetch(`/api/admin/proxy/orders/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente ordre");
      const data = await res.json();
      setOrder(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(status: string) {
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/proxy/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Kunne ikke oppdatere status");
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
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Ordre #{order.id}</h1>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Status</label>
          <select
            value={order.status}
            disabled={saving}
            onChange={(e) => updateStatus(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Kunde</h2>
        <p><strong>Navn:</strong> {order.customer_name || "-"}</p>
        <p><strong>E-post:</strong> {order.customer_email || "-"}</p>
      </section>

      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Leveringsadresse</h2>
        <p>{order.shipping_address || "-"}</p>
        <p>{order.shipping_zip} {order.shipping_city}</p>
      </section>

      <section className="border rounded-md p-4 space-y-4">
        <h2 className="font-semibold text-lg">Produkter</h2>

        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">Produkt #{item.product_id}</p>
                <p className="text-sm text-gray-600">Antall: {item.quantity}</p>
              </div>
              <p>{(item.price_at_purchase * item.quantity).toFixed(2)} kr</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <p className="font-medium">Total</p>
          <p className="font-semibold">{order.total_amount} kr</p>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function BillingDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tx, setTx] = useState<any>(null);

  async function loadTx() {
    try {
      const res = await fetch(`/api/billing/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente transaksjon");
      const data = await res.json();
      setTx(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTx();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster transaksjon...</p>
      </div>
    );
  }

  if (!tx) {
    return (
      <div className="p-6">
        <p>Fant ikke transaksjonen.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-3xl">
      <h1 className="text-xl font-semibold tracking-tight">
        Transaksjon #{tx.id}
      </h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Detaljer</h2>
        <p><strong>Kunde:</strong> {tx.customer_name}</p>
        <p><strong>E‑post:</strong> {tx.customer_email}</p>
        <p><strong>Beløp:</strong> {tx.amount} kr</p>
        <p><strong>Status:</strong> {tx.status}</p>
        <p>
          <strong>Dato:</strong>{" "}
          {new Date(tx.created_at).toLocaleDateString("no-NO")}
        </p>
        <p><strong>Transaksjon ID:</strong> {tx.transaction_id}</p>
      </section>

      {tx.order && (
        <section className="border rounded-md p-4 space-y-2">
          <h2 className="font-semibold text-lg">Relatert ordre</h2>
          <p><strong>Ordre-ID:</strong> {tx.order.id}</p>
          <p><strong>Total:</strong> {tx.order.total_amount} kr</p>
          <p>
            <strong>Dato:</strong>{" "}
            {new Date(tx.order.created_at).toLocaleDateString("no-NO")}
          </p>
        </section>
      )}

      {tx.payout && (
        <section className="border rounded-md p-4 space-y-2">
          <h2 className="font-semibold text-lg">Payout</h2>
          <p><strong>Payout-ID:</strong> {tx.payout.id}</p>
          <p><strong>Beløp:</strong> {tx.payout.amount} kr</p>
          <p><strong>Status:</strong> {tx.payout.status}</p>
          <p>
            <strong>Dato:</strong>{" "}
            {new Date(tx.payout.created_at).toLocaleDateString("no-NO")}
          </p>
        </section>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function NewOrderPage() {
  const [customerName, setCustomerName] = useState("");
  const [totalAmount, setTotalAmount] = useState<number | "">("");
  const [status, setStatus] = useState("pending");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function createOrder(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName,
          total_amount: Number(totalAmount),
          status,
        }),
      });

      if (!res.ok) throw new Error("Kunne ikke opprette ordre");

      setSuccess("Ordre opprettet!");
      setCustomerName("");
      setTotalAmount("");
      setStatus("pending");
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-xl space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Ny ordre</h1>

      <form onSubmit={createOrder} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Kundenavn</label>
          <input
            type="text"
            className="border rounded-md p-2 w-full"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Totalbeløp (NOK)</label>
          <input
            type="number"
            className="border rounded-md p-2 w-full"
            value={totalAmount}
            onChange={(e) =>
              setTotalAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            required
            min={0}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            className="border rounded-md p-2 w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Avventer</option>
            <option value="processing">Behandles</option>
            <option value="completed">Fullført</option>
            <option value="cancelled">Kansellert</option>
          </select>
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
        )}

        {success && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? "Lagrer..." : "Opprett ordre"}
        </button>
      </form>
    </div>
  );
}

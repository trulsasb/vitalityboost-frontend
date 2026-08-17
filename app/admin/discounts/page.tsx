"use client";

import { useEffect, useState } from "react";

interface DiscountCode {
  id: number;
  code: string;
  discount_type: "percentage" | "fixed";
  value: number;
  customer_email: string | null;
  product_id: number | null;
  active: boolean;
  expires_at: string | null;
  max_uses: number | null;
  used_count: number;
  created_at: string | null;
}

interface Product {
  id: number;
  name: string;
}

const emptyForm = {
  code: "",
  discount_type: "percentage" as "percentage" | "fixed",
  value: "",
  customer_email: "",
  product_id: "",
  expires_at: "",
  max_uses: "",
};

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const [discountsRes, productsRes] = await Promise.all([
      fetch("/api/admin/proxy/discounts", { cache: "no-store" }),
      fetch("/api/admin/proxy/products", { cache: "no-store" }),
    ]);
    setDiscounts(discountsRes.ok ? await discountsRes.json() : []);
    setProducts(productsRes.ok ? await productsRes.json() : []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function updateField(key: keyof typeof emptyForm, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/proxy/discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: form.code,
          discount_type: form.discount_type,
          value: Number(form.value),
          customer_email: form.customer_email || null,
          product_id: form.product_id ? Number(form.product_id) : null,
          expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
          max_uses: form.max_uses ? Number(form.max_uses) : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Kunne ikke opprette rabattkode");
      }

      setForm(emptyForm);
      setShowForm(false);
      await load();
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(discount: DiscountCode) {
    await fetch(`/api/admin/proxy/discounts/${discount.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !discount.active }),
    });
    await load();
  }

  async function remove(discount: DiscountCode) {
    if (!confirm(`Slette rabattkoden "${discount.code}"?`)) return;
    await fetch(`/api/admin/proxy/discounts/${discount.id}`, { method: "DELETE" });
    await load();
  }

  function productName(id: number | null) {
    if (id === null) return "Alle produkter";
    return products.find((p) => p.id === id)?.name || `Produkt #${id}`;
  }

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Rabattkoder</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          {showForm ? "Avbryt" : "Ny rabattkode"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="border rounded-md p-4 space-y-4 bg-gray-50">
          {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Kode</label>
              <input
                required
                value={form.code}
                onChange={(e) => updateField("code", e.target.value)}
                placeholder="SOMMER2026"
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Type</label>
              <select
                value={form.discount_type}
                onChange={(e) => updateField("discount_type", e.target.value)}
                className="border rounded-md px-3 py-2 w-full"
              >
                <option value="percentage">Prosent (%)</option>
                <option value="fixed">Fast beløp (kr)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Verdi {form.discount_type === "percentage" ? "(%)" : "(kr)"}
            </label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.value}
              onChange={(e) => updateField("value", e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Kun for e-post (valgfritt)</label>
              <input
                type="email"
                value={form.customer_email}
                onChange={(e) => updateField("customer_email", e.target.value)}
                placeholder="Tom = alle kunder"
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Kun for produkt (valgfritt)</label>
              <select
                value={form.product_id}
                onChange={(e) => updateField("product_id", e.target.value)}
                className="border rounded-md px-3 py-2 w-full"
              >
                <option value="">Alle produkter</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Utløpsdato (valgfritt)</label>
              <input
                type="date"
                value={form.expires_at}
                onChange={(e) => updateField("expires_at", e.target.value)}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Maks antall bruk (valgfritt)</label>
              <input
                type="number"
                min="1"
                step="1"
                value={form.max_uses}
                onChange={(e) => updateField("max_uses", e.target.value)}
                placeholder="Tom = ubegrenset"
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          >
            {saving ? "Oppretter..." : "Opprett rabattkode"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3 font-medium">Kode</th>
              <th className="text-left p-3 font-medium">Rabatt</th>
              <th className="text-left p-3 font-medium">Kunde</th>
              <th className="text-left p-3 font-medium">Produkt</th>
              <th className="text-left p-3 font-medium">Bruk</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-right p-3 font-medium">Handling</th>
            </tr>
          </thead>
          <tbody>
            {discounts.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-6 text-gray-500">
                  Ingen rabattkoder opprettet
                </td>
              </tr>
            )}

            {discounts.map((d) => (
              <tr key={d.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 font-mono">{d.code}</td>
                <td className="p-3">{d.discount_type === "percentage" ? `${d.value}%` : `${d.value} kr`}</td>
                <td className="p-3">{d.customer_email || "Alle"}</td>
                <td className="p-3">{productName(d.product_id)}</td>
                <td className="p-3">
                  {d.used_count}
                  {d.max_uses ? ` / ${d.max_uses}` : ""}
                </td>
                <td className="p-3">
                  {d.active ? "Aktiv" : "Inaktiv"}
                  {d.expires_at && new Date(d.expires_at) < new Date() && " (utløpt)"}
                </td>
                <td className="p-3 text-right space-x-3">
                  <button onClick={() => toggleActive(d)} className="text-blue-600 hover:underline">
                    {d.active ? "Deaktiver" : "Aktiver"}
                  </button>
                  <button onClick={() => remove(d)} className="text-red-600 hover:underline">
                    Slett
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    active: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category || null,
          active: form.active,
        }),
      });

      if (!res.ok) {
        throw new Error("Kunne ikke opprette produkt");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Nytt produkt</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Navn</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Beskrivelse</label>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full h-32"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Pris (inkl. MVA)</label>
          <input
            type="number"
            required
            min="0"
            step="1"
            value={form.price}
            onChange={(e) => updateField("price", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Kategori</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => updateField("active", e.target.checked)}
          />
          <label className="font-medium">Aktiv</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Lagrer..." : "Opprett produkt"}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    active: true,
    image: "" as string,
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function updateField(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("files", files[0]);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Feil ved opplasting");
        return;
      }

      updateField("image", data.urls?.[0] || "");
    } catch {
      setError("Ukjent feil ved opplasting");
    } finally {
      setUploading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/proxy/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          stock: Number(form.stock),
          category: form.category || null,
          active: form.active,
          image: form.image || null,
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

        <div className="grid grid-cols-2 gap-4">
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
            <label className="block mb-1 font-medium">Lagerbeholdning</label>
            <input
              type="number"
              required
              min="0"
              step="1"
              value={form.stock}
              onChange={(e) => updateField("stock", e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
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
          <label className="font-medium">Aktiv (synlig i butikken)</label>
        </div>

        <div>
          <label className="block mb-1 font-medium">Bilde</label>

          <input type="file" accept="image/*" onChange={uploadImage} className="mt-1" />

          {uploading && <p className="text-sm text-gray-500 mt-2">Laster opp...</p>}

          {form.image && (
            <img
              src={form.image}
              alt="Produktbilde"
              className="w-32 h-24 object-cover rounded-md border mt-4"
            />
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Oppretter..." : "Opprett produkt"}
          </button>
        </div>
      </form>
    </div>
  );
}

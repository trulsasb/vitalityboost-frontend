"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CategorySelect } from "@/components/admin/CategorySelect";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    active: true,
    image: "" as string,
  });

  function updateField(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function loadProduct() {
    try {
      const res = await fetch(`/api/admin/proxy/products/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente produkt");

      const data = await res.json();

      setForm({
        name: data.name || "",
        description: data.description || "",
        price: String(data.price ?? ""),
        stock: String(data.stock ?? ""),
        category: data.category || "",
        active: Boolean(data.active),
        image: data.image || "",
      });
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", files[0]);

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

      updateField("image", data.url || "");
    } catch {
      setError("Ukjent feil ved opplasting");
    } finally {
      setUploading(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/proxy/products/${id}`, {
        method: "PUT",
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

      if (!res.ok) throw new Error("Kunne ikke lagre produkt");

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct() {
    if (!confirm("Er du sikker på at du vil slette dette produktet? Dette kan ikke angres.")) return;

    setDeleting(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/proxy/products/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Kunne ikke slette produkt");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
      setDeleting(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster produkt...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Rediger produkt</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <form onSubmit={save} className="space-y-4">
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
          <CategorySelect value={form.category} onChange={(v) => updateField("category", v)} />
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
            <div className="relative w-32 mt-4">
              <img
                src={form.image}
                alt="Produktbilde"
                className="w-full h-24 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => updateField("image", "")}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                X
              </button>
            </div>
          )}
        </div>

        <div className="pt-4 flex items-center justify-between">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          >
            {saving ? "Lagrer..." : "Lagre endringer"}
          </button>

          <button
            type="button"
            onClick={deleteProduct}
            disabled={deleting}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
          >
            {deleting ? "Sletter..." : "Slett produkt"}
          </button>
        </div>
      </form>
    </div>
  );
}

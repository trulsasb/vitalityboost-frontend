"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    active: true,
    images: [] as string[],
  });

  function updateField(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function loadProduct() {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente produkt");

      const data = await res.json();

      setForm({
        name: data.name || "",
        description: data.description || "",
        price: String(data.price || ""),
        category: data.category || "",
        active: Boolean(data.active),
        images: data.images || [],
      });
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

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

      updateField("images", [...form.images, ...data.urls]);
    } catch {
      setError("Ukjent feil ved opplasting");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(url: string) {
    updateField(
      "images",
      form.images.filter((img) => img !== url)
    );
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category || null,
          active: form.active,
          images: form.images,
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
    if (!confirm("Sikker på at du vil slette produktet?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Kunne ikke slette produkt");

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
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

        <div>
          <label className="block mb-1 font-medium">Bilder</label>

          <input
            type="file"
            multiple
            onChange={uploadImages}
            className="mt-1"
          />

          {uploading && (
            <p className="text-sm text-gray-500 mt-2">Laster opp...</p>
          )}

          {form.images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {form.images.map((url) => (
                <div key={url} className="relative">
                  <img
                    src={url}
                    alt="Produktbilde"
                    className="w-full h-24 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4">
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
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Slett produkt
          </button>
        </div>
      </form>
    </div>
  );
}

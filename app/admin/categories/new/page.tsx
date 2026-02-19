"use client";

import { useState } from "react";

export default function NewCategoryPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function createCategory(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      if (!res.ok) throw new Error("Kunne ikke opprette kategori");

      setSuccess("Kategori opprettet!");
      setName("");
      setDescription("");
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-xl space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Ny kategori</h1>

      <form onSubmit={createCategory} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Navn</label>
          <input
            type="text"
            className="border rounded-md p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Beskrivelse</label>
          <textarea
            className="border rounded-md p-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
        )}

        {success && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md">{success}</div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? "Lagrer..." : "Opprett kategori"}
        </button>
      </form>
    </div>
  );
}

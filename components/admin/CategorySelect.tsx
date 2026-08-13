"use client";

import { useEffect, useState } from "react";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function loadCategories() {
    try {
      const res = await fetch("/api/admin/proxy/categories");
      if (!res.ok) return;
      const data = await res.json();
      setCategories(data.map((c: { name: string }) => c.name));
    } catch {
      // Dropdown just stays empty/whatever it already had if this fails.
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function createCategory() {
    const name = newCategory.trim();
    if (!name) return;

    setCreating(true);
    setError("");

    try {
      const res = await fetch("/api/admin/proxy/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Kunne ikke opprette kategori");

      const created = await res.json();
      await loadCategories();
      onChange(created.name);
      setNewCategory("");
      setShowNew(false);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <select
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Ingen kategori</option>
          {value && !categories.includes(value) && <option value={value}>{value}</option>}
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setShowNew((v) => !v)}
          className="border border-gray-300 rounded-md px-3 py-2 whitespace-nowrap hover:bg-gray-50"
        >
          + Ny kategori
        </button>
      </div>

      {showNew && (
        <div className="flex gap-2">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            placeholder="Navn på ny kategori"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            type="button"
            onClick={createCategory}
            disabled={creating}
            className="bg-black text-white px-3 py-2 rounded-md whitespace-nowrap disabled:opacity-50"
          >
            {creating ? "Oppretter..." : "Opprett"}
          </button>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

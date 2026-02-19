"use client";

import { useEffect, useState } from "react";

export default function CategoryDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCategory() {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente kategori");
      const data = await res.json();
      setCategory(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategory();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster kategori...</p>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error || "Fant ikke kategori"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <h1 className="text-xl font-semibold tracking-tight">
        Kategori: {category.name}
      </h1>

      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Detaljer</h2>
        <p><strong>ID:</strong> {category.id}</p>
        <p><strong>Navn:</strong> {category.name}</p>
        {category.description && (
          <p><strong>Beskrivelse:</strong> {category.description}</p>
        )}
        {category.created_at && (
          <p>
            <strong>Opprettet:</strong>{" "}
            {new Date(category.created_at).toLocaleDateString("no-NO")}
          </p>
        )}
      </section>
    </div>
  );
}

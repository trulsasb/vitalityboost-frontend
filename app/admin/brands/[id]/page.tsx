"use client";

import { useEffect, useState } from "react";

export default function BrandDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadBrand() {
    try {
      const res = await fetch(`/api/brands/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente brand");
      const data = await res.json();
      setBrand(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBrand();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster merke...</p>
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error || "Fant ikke merke"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <h1 className="text-xl font-semibold tracking-tight">
        Merke: {brand.name}
      </h1>

      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Detaljer</h2>
        <p><strong>ID:</strong> {brand.id}</p>
        <p><strong>Navn:</strong> {brand.name}</p>
        {brand.description && (
          <p><strong>Beskrivelse:</strong> {brand.description}</p>
        )}
        {brand.created_at && (
          <p>
            <strong>Opprettet:</strong>{" "}
            {new Date(brand.created_at).toLocaleDateString("no-NO")}
          </p>
        )}
      </section>
    </div>
  );
}

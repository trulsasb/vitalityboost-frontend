"use client";

import { useEffect, useState } from "react";

export default function BrandsPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadBrands() {
    try {
      const res = await fetch("/api/brands", { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente brands");
      const data = await res.json();
      setBrands(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBrands();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster merker...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Merker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="border rounded-md p-4 hover:bg-gray-50 transition"
          >
            <h2 className="font-semibold text-lg">{brand.name}</h2>

            {brand.description && (
              <p className="text-sm text-gray-600 mt-1">
                {brand.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

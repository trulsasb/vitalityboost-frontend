import * as React from "react";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">
        Rediger kategori
      </h1>

      <p className="text-gray-700 mb-2">
        Kategori‑ID: <span className="font-mono">{params.id}</span>
      </p>

      <p className="text-gray-700">
        Her vil du kunne redigere kategorien når vi bygger ut funksjonaliteten.
      </p>
    </div>
  );
}

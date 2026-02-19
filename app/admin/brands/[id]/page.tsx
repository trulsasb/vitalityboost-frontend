import * as React from "react";

interface BrandPageProps {
  params: {
    id: string;
  };
}

export default function BrandDetailPage({ params }: BrandPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">
        Rediger merke
      </h1>

      <p className="text-gray-700 mb-2">
        Merke‑ID: <span className="font-mono">{params.id}</span>
      </p>

      <p className="text-gray-700">
        Her vil du kunne redigere merket når vi bygger ut funksjonaliteten.
      </p>
    </div>
  );
}

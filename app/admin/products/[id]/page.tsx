import * as React from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">
        Rediger produkt
      </h1>

      <p className="text-gray-700 mb-2">
        Produkt‑ID: <span className="font-mono">{params.id}</span>
      </p>

      <p className="text-gray-700">
        Her vil du kunne redigere produktet når vi bygger ut funksjonaliteten.
      </p>
    </div>
  );
}

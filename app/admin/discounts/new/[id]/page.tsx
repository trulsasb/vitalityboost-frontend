import * as React from "react";

interface DiscountPageProps {
  params: {
    id: string;
  };
}

export default function DiscountDetailPage({ params }: DiscountPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">
        Rediger rabatt
      </h1>

      <p className="text-gray-700 mb-2">
        Rabatt‑ID: <span className="font-mono">{params.id}</span>
      </p>

      <p className="text-gray-700">
        Her vil du kunne redigere rabattkoden eller kampanjen når vi bygger ut funksjonaliteten.
      </p>
    </div>
  );
}

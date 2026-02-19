import * as React from "react";

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: OrderPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">
        Ordredetaljer
      </h1>

      <p className="text-gray-700 mb-2">
        Ordre‑ID: <span className="font-mono">{params.id}</span>
      </p>

      <p className="text-gray-700">
        Her vil du kunne se og administrere detaljer for denne ordren.
      </p>
    </div>
  );
}

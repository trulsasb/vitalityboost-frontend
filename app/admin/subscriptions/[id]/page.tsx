import * as React from "react";

interface SubscriptionPageProps {
  params: {
    id: string;
  };
}

export default function SubscriptionDetailPage({ params }: SubscriptionPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">
        Abonnementsdetaljer
      </h1>

      <p className="text-gray-700 mb-2">
        Abonnement‑ID: <span className="font-mono">{params.id}</span>
      </p>

      <p className="text-gray-700">
        Her vil du kunne se og administrere detaljer for dette abonnementet.
      </p>
    </div>
  );
}

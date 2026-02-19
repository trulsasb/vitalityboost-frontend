import * as React from "react";

interface ReviewPageProps {
  params: {
    id: string;
  };
}

export default function ReviewDetailPage({ params }: ReviewPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">
        Anmeldelsesdetaljer
      </h1>

      <p className="text-gray-700 mb-2">
        Anmeldelse‑ID: <span className="font-mono">{params.id}</span>
      </p>

      <p className="text-gray-700">
        Her vil du kunne lese, moderere og administrere denne anmeldelsen.
      </p>
    </div>
  );
}

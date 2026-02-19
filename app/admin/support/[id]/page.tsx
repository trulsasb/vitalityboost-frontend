import * as React from "react";

interface SupportPageProps {
  params: {
    id: string;
  };
}

export default function SupportDetailPage({ params }: SupportPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">
        Supporthenvendelse
      </h1>

      <p className="text-gray-700 mb-2">
        Henvendelses‑ID: <span className="font-mono">{params.id}</span>
      </p>

      <p className="text-gray-700">
        Her vil du kunne lese, svare på og administrere denne supporthenvendelsen.
      </p>
    </div>
  );
}

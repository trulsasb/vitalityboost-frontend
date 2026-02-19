import * as React from "react";

interface UserPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailPage({ params }: UserPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">
        Rediger bruker
      </h1>

      <p className="text-gray-700 mb-2">
        Bruker‑ID: <span className="font-mono">{params.id}</span>
      </p>

      <p className="text-gray-700">
        Her vil du kunne redigere brukerens informasjon og tilgangsnivåer.
      </p>
    </div>
  );
}

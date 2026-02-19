import * as React from "react";

interface SupportTicketPageProps {
  params: {
    id: string;
  };
}

export default function SupportTicketPage({ params }: SupportTicketPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">
        Supporthenvendelse
      </h1>

      <p className="text-gray-700 mb-2">
        Ticket‑ID: <span className="font-mono">{params.id}</span>
      </p>

      <p className="text-gray-700">
        Her vil du kunne se detaljer, meldinger og status for denne henvendelsen.
      </p>
    </div>
  );
}

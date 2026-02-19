"use client";

import { useEffect, useState } from "react";

export default function SupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTickets() {
    try {
      const res = await fetch("/api/support", { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente supporthenvendelser");
      const data = await res.json();
      setTickets(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster supporthenvendelser...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Support</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="border rounded-md p-4 hover:bg-gray-50 transition"
          >
            <h2 className="font-semibold text-lg">{ticket.subject}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {ticket.user_email || "Ukjent bruker"}
            </p>

            <p className="text-sm mt-2">
              <strong>Status:</strong> {ticket.status}
            </p>

            <p className="text-sm mt-2 line-clamp-3">{ticket.message}</p>

            <a
              href={`/admin/support/${ticket.id}`}
              className="text-blue-600 text-sm mt-3 inline-block hover:underline"
            >
              Åpne henvendelse →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

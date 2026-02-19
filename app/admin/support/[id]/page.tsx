"use client";

import { useEffect, useState } from "react";

export default function SupportTicketPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");

  async function loadTicket() {
    try {
      const res = await fetch(`/api/support/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente supporthenvendelsen");
      const data = await res.json();
      setTicket(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/support/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });

      if (!res.ok) throw new Error("Kunne ikke sende svar");

      setSuccess("Svar sendt til bruker");
      setReply("");
      loadTicket();
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    loadTicket();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster henvendelse...</p>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error || "Fant ikke henvendelsen"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-2xl">
      <h1 className="text-xl font-semibold tracking-tight">
        Supporthenvendelse #{ticket.id}
      </h1>

      <section className="border rounded-md p-4 space-y-2">
        <p><strong>Fra:</strong> {ticket.user_email}</p>
        <p><strong>Emne:</strong> {ticket.subject}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Melding:</strong></p>
        <p className="whitespace-pre-line">{ticket.message}</p>

        {ticket.created_at && (
          <p className="text-sm text-gray-500 mt-2">
            Opprettet: {new Date(ticket.created_at).toLocaleString("no-NO")}
          </p>
        )}
      </section>

      <section className="border rounded-md p-4 space-y-4">
        <h2 className="font-semibold text-lg">Svar til bruker</h2>

        {success && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={sendReply} className="space-y-4">
          <textarea
            className="border rounded-md p-2 w-full"
            rows={5}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Skriv svar til brukeren..."
            required
          />

          <button
            type="submit"
            disabled={sending}
            className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {sending ? "Sender..." : "Send svar"}
          </button>
        </form>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface Challenge {
  a: number;
  b: number;
  issued_at: number;
  token: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function ContactForm() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [humanAnswer, setHumanAnswer] = useState("");
  const [website, setWebsite] = useState(""); // honeypot, left empty by real visitors
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadChallenge();
  }, []);

  async function loadChallenge() {
    try {
      const res = await fetch(`${API_URL}/contact/challenge`, { cache: "no-store" });
      if (res.ok) setChallenge(await res.json());
    } catch {
      // Form still renders; submit will just fail with a clear error until this loads.
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!challenge) {
      setErrorMessage("Kunne ikke laste skjemaet. Prøv å laste siden på nytt.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          challenge_a: challenge.a,
          challenge_b: challenge.b,
          challenge_issued_at: challenge.issued_at,
          challenge_token: challenge.token,
          challenge_answer: Number(humanAnswer),
          website,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Kunne ikke sende meldingen");
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setHumanAnswer("");
      loadChallenge();
    } catch (err: any) {
      setErrorMessage(err.message || "Ukjent feil");
      setStatus("error");
      loadChallenge();
    }
  }

  if (status === "sent") {
    return (
      <div className="border rounded-lg p-6 bg-green-50 text-green-800">
        Takk for henvendelsen! Vi svarer så raskt vi kan.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Navn</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-post</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Melding</label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>

      {/* Honeypot: hidden from real visitors via CSS, bots fill every field they see in the DOM. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Ikke fyll ut dette feltet</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {challenge ? `Vis at du er menneske: hva er ${challenge.a} + ${challenge.b}?` : "Laster kontrollspørsmål..."}
        </label>
        <input
          type="number"
          required
          value={humanAnswer}
          onChange={(e) => setHumanAnswer(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-32"
        />
      </div>

      {status === "error" && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{errorMessage}</div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-black text-white px-6 py-2 rounded-md disabled:opacity-50"
      >
        {status === "sending" ? "Sender..." : "Send melding"}
      </button>
    </form>
  );
}

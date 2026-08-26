"use client";

import { useEffect, useState } from "react";

export default function ContactSettingsPage() {
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/proxy/contact-settings");
      if (res.ok) {
        const data = await res.json();
        setCurrentEmail(data.notify_email);
        setValue(data.notify_email);
      }
    } finally {
      setLoading(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/proxy/contact-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notify_email: value }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Kunne ikke lagre");
      }

      const data = await res.json();
      setCurrentEmail(data.notify_email);
      setSuccess("Lagret.");
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Kontaktskjema</h1>
        <p className="text-sm text-gray-600 mt-1">
          Meldinger fra "Kontakt oss"-siden i nettbutikken sendes til denne
          e-postadressen. Adressen vises aldri for kundene.
        </p>
      </div>

      {currentEmail && (
        <p className="text-sm text-gray-600">
          Nåværende adresse: <span className="font-medium text-gray-900">{currentEmail}</span>
        </p>
      )}

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
      {success && <div className="p-4 bg-green-100 text-green-700 rounded-md">{success}</div>}

      <form onSubmit={save} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">E-postadresse for henvendelser</label>
          <input
            type="email"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? "Lagrer..." : "Lagre"}
        </button>
      </form>
    </div>
  );
}

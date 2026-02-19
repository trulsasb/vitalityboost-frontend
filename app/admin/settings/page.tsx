"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [settings, setSettings] = useState({
    siteName: "",
    supportEmail: "",
    currency: "NOK",
    maintenanceMode: false,
  });

  async function loadSettings() {
    try {
      const res = await fetch("/api/settings", { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente innstillinger");
      const data = await res.json();
      setSettings(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Kunne ikke lagre innstillinger");

      setSuccess("Innstillinger lagret");
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster innstillinger...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-2xl">
      <h1 className="text-xl font-semibold tracking-tight">Innstillinger</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}

      <form onSubmit={saveSettings} className="space-y-6">
        {/* Site name */}
        <div className="space-y-2">
          <label className="font-medium">Nettstedsnavn</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) =>
              setSettings({ ...settings, siteName: e.target.value })
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        {/* Support email */}
        <div className="space-y-2">
          <label className="font-medium">Support‑epost</label>
          <input
            type="email"
            value={settings.supportEmail}
            onChange={(e) =>
              setSettings({ ...settings, supportEmail: e.target.value })
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        {/* Currency */}
        <div className="space-y-2">
          <label className="font-medium">Valuta</label>
          <select
            value={settings.currency}
            onChange={(e) =>
              setSettings({ ...settings, currency: e.target.value })
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="NOK">NOK</option>
            <option value="SEK">SEK</option>
            <option value="DKK">DKK</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Maintenance mode */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) =>
              setSettings({ ...settings, maintenanceMode: e.target.checked })
            }
            className="h-4 w-4"
          />
          <label className="font-medium">Vedlikeholdsmodus</label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-50"
        >
          {saving ? "Lagrer..." : "Lagre innstillinger"}
        </button>
      </form>
    </div>
  );
}

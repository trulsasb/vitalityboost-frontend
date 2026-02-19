"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SubscriptionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [subscription, setSubscription] = useState<any>(null);

  async function loadSubscription() {
    try {
      const res = await fetch(`/api/subscriptions/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente abonnement");
      const data = await res.json();
      setSubscription(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  async function cancelSubscription() {
    if (!confirm("Er du sikker på at du vil stoppe dette abonnementet?")) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/subscriptions/${id}/cancel`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Kunne ikke stoppe abonnement");

      await loadSubscription();
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  async function renewNow() {
    if (!confirm("Vil du manuelt kjøre en fornyelse nå?")) return;

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/subscriptions/${id}/renew`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Kunne ikke kjøre fornyelse");

      await loadSubscription();
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadSubscription();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster abonnement...</p>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="p-6">
        <p>Fant ikke abonnementet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-3xl">
      <h1 className="text-xl font-semibold tracking-tight">
        Abonnement #{subscription.id}
      </h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {/* Kundeinfo */}
      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Kunde</h2>
        <p><strong>Navn:</strong> {subscription.customer_name}</p>
        <p><strong>E‑post:</strong> {subscription.customer_email}</p>
      </section>

      {/* Produktinfo */}
      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Produkt</h2>
        <p><strong>Produkt:</strong> {subscription.product_name}</p>
        <p><strong>Intervall:</strong> {subscription.interval}</p>
        <p><strong>Status:</strong> {subscription.status}</p>
        <p>
          <strong>Neste fornyelse:</strong>{" "}
          {new Date(subscription.next_renewal).toLocaleDateString("no-NO")}
        </p>
      </section>

      {/* Betalinger */}
      <section className="border rounded-md p-4 space-y-4">
        <h2 className="font-semibold text-lg">Betalingshistorikk</h2>

        {subscription.payments.length === 0 && (
          <p className="text-gray-600">Ingen betalinger registrert.</p>
        )}

        <div className="space-y-2">
          {subscription.payments.map((p: any) => (
            <div key={p.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{p.status}</p>
                <p className="text-sm text-gray-600">
                  {new Date(p.timestamp).toLocaleString("no-NO")}
                </p>
              </div>
              <p>{p.amount} kr</p>
            </div>
          ))}
        </div>
      </section>

      {/* Handlinger */}
      <div className="flex justify-end gap-3">
        <button
          onClick={renewNow}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? "Behandler..." : "Kjør fornyelse nå"}
        </button>

        <button
          onClick={cancelSubscription}
          disabled={saving}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
        >
          {saving ? "Behandler..." : "Stopp abonnement"}
        </button>
      </div>
    </div>
  );
}

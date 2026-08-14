"use client";

import { useEffect, useState } from "react";

interface FieldStatus {
  source: "database" | "environment" | "unset";
  preview: string | null;
}

interface StripeFields {
  secret_key: FieldStatus;
  publishable_key: FieldStatus;
  webhook_secret: FieldStatus;
}

const SOURCE_LABEL: Record<FieldStatus["source"], string> = {
  database: "Konfigurert (lagret her)",
  environment: "Konfigurert (server-miljøvariabel)",
  unset: "Ikke konfigurert",
};

const SOURCE_COLOR: Record<FieldStatus["source"], string> = {
  database: "text-green-700",
  environment: "text-amber-700",
  unset: "text-gray-500",
};

export default function IntegrationsPage() {
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<StripeFields | null>(null);
  const [form, setForm] = useState({ secret_key: "", publishable_key: "", webhook_secret: "" });
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function loadStatus() {
    try {
      const res = await fetch("/api/admin/proxy/integrations/stripe");
      if (res.ok) {
        setStatus(await res.json());
      }
    } catch {
      // Leave status null — the page shows blank fields either way.
    }
  }

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setIsOwner(Boolean(data?.is_owner)))
      .finally(() => setLoading(false));
    loadStatus();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    setTestResult(null);

    const values = Object.fromEntries(Object.entries(form).filter(([, v]) => v.trim() !== ""));

    if (Object.keys(values).length === 0) {
      setError("Fyll ut minst ett felt du vil oppdatere.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/proxy/integrations/stripe", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Kunne ikke lagre");
      }

      setForm({ secret_key: "", publishable_key: "", webhook_secret: "" });
      setSuccess("Lagret.");
      await loadStatus();
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  async function testConnection() {
    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/admin/proxy/integrations/stripe/test", { method: "POST" });
      const data = await res.json();
      setTestResult({ ok: res.ok, message: res.ok ? data.message : data.detail });
    } catch {
      setTestResult({ ok: false, message: "Kunne ikke koble til serveren" });
    } finally {
      setTesting(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster...</p>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold tracking-tight mb-4">Betalingsoppsett</h1>
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-md">
          Denne siden er kun tilgjengelig for eier-kontoen, siden den styrer hvor kundenes
          betalinger går. Kontakt eieren hvis du trenger endringer her.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Betalingsoppsett — Stripe</h1>
        <p className="text-sm text-gray-600 mt-1">
          Nøklene lagres kryptert. Du ser aldri en lagret verdi igjen her — for å endre den, skriv
          inn en ny.
        </p>
      </div>

      <StripeGuidePanel />

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
      {success && <div className="p-4 bg-green-100 text-green-700 rounded-md">{success}</div>}

      <form onSubmit={save} className="space-y-4">
        <Field
          label="Secret Key"
          statusField={status?.secret_key}
          value={form.secret_key}
          onChange={(v) => setForm((f) => ({ ...f, secret_key: v }))}
          type="password"
          placeholder="sk_live_..."
        />
        <Field
          label="Publishable Key"
          statusField={status?.publishable_key}
          value={form.publishable_key}
          onChange={(v) => setForm((f) => ({ ...f, publishable_key: v }))}
          type="text"
          placeholder="pk_live_..."
        />
        <Field
          label="Webhook Secret"
          statusField={status?.webhook_secret}
          value={form.webhook_secret}
          onChange={(v) => setForm((f) => ({ ...f, webhook_secret: v }))}
          type="password"
          placeholder="whsec_..."
        />

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {saving ? "Lagrer..." : "Koble til / Lagre"}
          </button>

          <button
            type="button"
            onClick={testConnection}
            disabled={testing}
            className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            {testing ? "Tester..." : "Test tilkobling"}
          </button>
        </div>

        {testResult && (
          <div
            className={`p-3 rounded-md text-sm ${
              testResult.ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {testResult.message}
          </div>
        )}
      </form>
    </div>
  );
}

function StripeGuidePanel() {
  const webhookUrl = `${process.env.NEXT_PUBLIC_API_URL || ""}/webhooks/stripe/`;
  const [copied, setCopied] = useState(false);

  function copyWebhookUrl() {
    navigator.clipboard.writeText(webhookUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <details className="border border-blue-200 bg-blue-50 rounded-md p-4 open:pb-5" open>
      <summary className="font-medium cursor-pointer text-blue-900">
        Hvordan få tak i Stripe-nøklene dine
      </summary>

      <div className="mt-4 space-y-4 text-sm text-gray-800">
        <p>
          Selve kontoopprettelsen og identitetsverifiseringen må skje hos Stripe selv (det er en
          bank-/finanslovkrav ingen tredjepart kan gjøre for deg) — men når kontoen er klar, skjer
          alt annet herfra.
        </p>

        <ol className="list-decimal list-inside space-y-3">
          <li>
            <a
              href="https://dashboard.stripe.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:no-underline"
            >
              Opprett en Stripe-konto
            </a>{" "}
            (eller{" "}
            <a
              href="https://dashboard.stripe.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:no-underline"
            >
              logg inn
            </a>{" "}
            hvis du allerede har en) og fullfør Stripes verifisering av bedriften din.
          </li>

          <li>
            Gå til{" "}
            <a
              href="https://dashboard.stripe.com/apikeys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:no-underline"
            >
              Developers → API keys
            </a>
            . Kopier <strong>Secret key</strong> (starter med <code>sk_live_</code> eller{" "}
            <code>sk_test_</code>) og lim den inn i feltet under.
          </li>

          <li>
            Gå til{" "}
            <a
              href="https://dashboard.stripe.com/webhooks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline hover:no-underline"
            >
              Developers → Webhooks
            </a>{" "}
            → <strong>Add endpoint</strong>. Lim inn denne URL-en som endepunkt:
            <div className="mt-2 flex items-center gap-2">
              <code className="bg-white border border-gray-300 rounded px-2 py-1 text-xs break-all">
                {webhookUrl}
              </code>
              <button
                type="button"
                onClick={copyWebhookUrl}
                className="text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-100 whitespace-nowrap"
              >
                {copied ? "Kopiert!" : "Kopier"}
              </button>
            </div>
            Velg disse hendelsene:{" "}
            <code>checkout.session.completed</code>, <code>checkout.session.expired</code>,{" "}
            <code>payment_intent.payment_failed</code> (eller enklest: velg "alle hendelser").
          </li>

          <li>
            Etter du har opprettet webhooken, klikk inn på den og kopier{" "}
            <strong>Signing secret</strong> (starter med <code>whsec_</code>) inn i feltet under.
          </li>

          <li>Klikk "Koble til / Lagre" nedenfor, og deretter "Test tilkobling" for å bekrefte.</li>
        </ol>
      </div>
    </details>
  );
}

function Field({
  label,
  statusField,
  value,
  onChange,
  type,
  placeholder,
}: {
  label: string;
  statusField?: FieldStatus;
  value: string;
  onChange: (v: string) => void;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="font-medium">{label}</label>
        {statusField && (
          <span className={`text-xs ${SOURCE_COLOR[statusField.source]}`}>
            {SOURCE_LABEL[statusField.source]}
            {statusField.preview ? ` — ${statusField.preview}` : ""}
          </span>
        )}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        autoComplete="off"
      />
    </div>
  );
}

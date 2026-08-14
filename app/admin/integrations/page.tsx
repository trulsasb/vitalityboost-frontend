"use client";

import { useEffect, useState } from "react";

interface FieldStatus {
  source: "database" | "environment" | "unset";
  preview: string | null;
}

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "password" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
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

const STRIPE_FIELDS: FieldDef[] = [
  { key: "secret_key", label: "Secret Key", type: "password", placeholder: "sk_live_..." },
  { key: "publishable_key", label: "Publishable Key", type: "text", placeholder: "pk_live_..." },
  { key: "webhook_secret", label: "Webhook Secret", type: "password", placeholder: "whsec_..." },
];

const VIPPS_FIELDS: FieldDef[] = [
  { key: "client_id", label: "Client ID", type: "text" },
  { key: "client_secret", label: "Client Secret", type: "password" },
  { key: "subscription_key", label: "Subscription Key (Ocp-Apim-Subscription-Key)", type: "password" },
  { key: "msn", label: "Merchant Serial Number (MSN)", type: "text", placeholder: "123456" },
  {
    key: "base_url",
    label: "Miljø",
    type: "select",
    options: [
      { value: "https://apitest.vipps.no", label: "Test (apitest.vipps.no)" },
      { value: "https://api.vipps.no", label: "Produksjon (api.vipps.no)" },
    ],
  },
  { key: "webhook_secret", label: "Webhook Secret", type: "password" },
];

export default function IntegrationsPage() {
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setIsOwner(Boolean(data?.is_owner)))
      .finally(() => setLoading(false));
  }, []);

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
    <div className="p-6 max-w-2xl space-y-12">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Betalingsoppsett</h1>
        <p className="text-sm text-gray-600 mt-1">
          Nøklene lagres kryptert. Du ser aldri en lagret verdi igjen her — for å endre den, skriv
          inn en ny.
        </p>
      </div>

      <ProviderSection provider="stripe" title="Stripe" fields={STRIPE_FIELDS} guide={<StripeGuide />} />
      <ProviderSection provider="vipps" title="Vipps" fields={VIPPS_FIELDS} guide={<VippsGuide />} />
    </div>
  );
}

function ProviderSection({
  provider,
  title,
  fields,
  guide,
}: {
  provider: string;
  title: string;
  fields: FieldDef[];
  guide: React.ReactNode;
}) {
  const [status, setStatus] = useState<Record<string, FieldStatus> | null>(null);
  const [form, setForm] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.key, ""]))
  );
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function loadStatus() {
    try {
      const res = await fetch(`/api/admin/proxy/integrations/${provider}`);
      if (res.ok) setStatus(await res.json());
    } catch {
      // Leave status null — the form still renders, just without status labels.
    }
  }

  useEffect(() => {
    loadStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const res = await fetch(`/api/admin/proxy/integrations/${provider}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Kunne ikke lagre");
      }

      setForm(Object.fromEntries(fields.map((f) => [f.key, ""])));
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
      const res = await fetch(`/api/admin/proxy/integrations/${provider}/test`, { method: "POST" });
      const data = await res.json();
      setTestResult({ ok: res.ok, message: res.ok ? data.message : data.detail });
    } catch {
      setTestResult({ ok: false, message: "Kunne ikke koble til serveren" });
    } finally {
      setTesting(false);
    }
  }

  return (
    <section className="space-y-4 pt-8 border-t first:pt-0 first:border-t-0">
      <h2 className="text-lg font-semibold">{title}</h2>

      {guide}

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
      {success && <div className="p-4 bg-green-100 text-green-700 rounded-md">{success}</div>}

      <form onSubmit={save} className="space-y-4">
        {fields.map((field) => (
          <Field
            key={field.key}
            field={field}
            statusField={status?.[field.key]}
            value={form[field.key]}
            onChange={(v) => setForm((f) => ({ ...f, [field.key]: v }))}
          />
        ))}

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
    </section>
  );
}

function Field({
  field,
  statusField,
  value,
  onChange,
}: {
  field: FieldDef;
  statusField?: FieldStatus;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="font-medium">{field.label}</label>
        {statusField && (
          <span className={`text-xs ${SOURCE_COLOR[statusField.source]}`}>
            {SOURCE_LABEL[statusField.source]}
            {statusField.preview ? ` — ${statusField.preview}` : ""}
          </span>
        )}
      </div>

      {field.type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="">Ikke endre</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          autoComplete="off"
        />
      )}
    </div>
  );
}

function StripeGuide() {
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

function VippsGuide() {
  const webhookUrl = `${process.env.NEXT_PUBLIC_API_URL || ""}/webhooks/vipps/`;
  const [copied, setCopied] = useState(false);

  function copyWebhookUrl() {
    navigator.clipboard.writeText(webhookUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <details className="border border-orange-200 bg-orange-50 rounded-md p-4 open:pb-5" open>
      <summary className="font-medium cursor-pointer text-orange-900">
        Hvordan få tak i Vipps-nøklene dine
      </summary>

      <div className="mt-4 space-y-4 text-sm text-gray-800">
        <p>
          Som med Stripe må selve avtalen og identitetsverifiseringen med Vipps skje direkte hos
          dem — men når det er på plass, skjer alt annet herfra.
        </p>

        <ol className="list-decimal list-inside space-y-3">
          <li>
            Logg inn på{" "}
            <a
              href="https://portal.vippsmobilepay.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-700 underline hover:no-underline"
            >
              Vipps MobilePay Portal
            </a>{" "}
            (krever at bedriften allerede har en avtale med Vipps for nettbutikk).
          </li>

          <li>
            Velg riktig salgsenhet, og gå til <strong>API-nøkler</strong>. Der finner du{" "}
            <strong>Client ID</strong>, <strong>Client Secret</strong>,{" "}
            <strong>Subscription Key (Ocp-Apim-Subscription-Key)</strong> og{" "}
            <strong>Merchant Serial Number (MSN)</strong> — kopier alle inn i feltene under.
          </li>

          <li>
            Velg <strong>Test</strong> som miljø mens du fortsatt tester, og bytt til{" "}
            <strong>Produksjon</strong> når dere er klare til å ta imot ekte betalinger.
          </li>

          <li>
            Registrer en webhook (samme sted som API-nøklene, under <strong>Webhooks</strong>) med
            denne URL-en:
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
            Vipps viser en hemmelig nøkkel når webhooken opprettes — kopier den inn i{" "}
            <strong>Webhook Secret</strong>-feltet under (den vises kun én gang).
          </li>

          <li>Klikk "Koble til / Lagre" nedenfor, og deretter "Test tilkobling" for å bekrefte.</li>
        </ol>
      </div>
    </details>
  );
}

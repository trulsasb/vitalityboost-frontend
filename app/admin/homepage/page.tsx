"use client";

import { useEffect, useState } from "react";
import { defaultHomepageContent, HomepageContent } from "@/lib/homepageContent";

const TEMPLATES: {
  id: HomepageContent["template"];
  name: string;
  description: string;
  preview: React.ReactNode;
}[] = [
  {
    id: "classic",
    name: "Klassisk",
    description:
      "Stort hovedbanner, deretter produkter, funksjoner, statistikk og kundeuttalelser. God balanse mellom merkevarehistorie og salg.",
    preview: (
      <div className="space-y-1.5">
        <div className="h-10 bg-gray-800 rounded" />
        <div className="grid grid-cols-3 gap-1">
          <div className="h-6 bg-gray-300 rounded" />
          <div className="h-6 bg-gray-300 rounded" />
          <div className="h-6 bg-gray-300 rounded" />
        </div>
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    ),
  },
  {
    id: "product-forward",
    name: "Produktfokusert",
    description:
      "Kort banner rett inn i et fullt produktgrid, slik de største norske nettbutikkene gjør det. Kortest mulig vei til kjøp.",
    preview: (
      <div className="space-y-1.5">
        <div className="h-5 bg-gray-300 rounded" />
        <div className="grid grid-cols-4 gap-1">
          <div className="h-6 bg-gray-800 rounded" />
          <div className="h-6 bg-gray-800 rounded" />
          <div className="h-6 bg-gray-800 rounded" />
          <div className="h-6 bg-gray-800 rounded" />
        </div>
        <div className="grid grid-cols-4 gap-1">
          <div className="h-6 bg-gray-300 rounded" />
          <div className="h-6 bg-gray-300 rounded" />
          <div className="h-6 bg-gray-300 rounded" />
          <div className="h-6 bg-gray-300 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: "lifestyle",
    name: "Livsstil",
    description:
      "Stor, rolig helside med merkevarehistorie og bilder først — passer for premium longevity-posisjonering. Kjøpsknapp alltid synlig.",
    preview: (
      <div className="space-y-1.5">
        <div className="h-14 bg-gradient-to-b from-gray-200 to-gray-100 rounded" />
        <div className="grid grid-cols-2 gap-1">
          <div className="h-8 bg-gray-300 rounded" />
          <div className="h-8 bg-gray-800 rounded" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>
    ),
  },
];

export default function HomepageTemplatePickerPage() {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/homepage`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent({ ...defaultHomepageContent, ...data.content });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function selectTemplate(templateId: HomepageContent["template"]) {
    setSaving(templateId);
    setError("");
    setSuccess("");

    const updated = { ...content, template: templateId };

    try {
      const res = await fetch("/api/admin/proxy/content/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: updated }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Kunne ikke bytte forside");
      }

      setContent(updated);
      setSuccess("Forsiden er byttet og live nå.");
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(null);
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
    <div className="p-6 max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Lag hjemmeside</h1>
        <p className="text-sm text-gray-600 mt-1">
          Velg en av designene under. Den blir live på forsiden med én gang du velger den. Tekst, bilder og
          produkter hentes automatisk inn i det designet du velger — rediger tekstinnholdet under{" "}
          <a href="/admin/content" className="underline">
            Content
          </a>
          .
        </p>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
      {success && <div className="p-4 bg-green-100 text-green-700 rounded-md">{success}</div>}

      <div className="grid sm:grid-cols-3 gap-6">
        {TEMPLATES.map((template) => {
          const active = content.template === template.id;
          return (
            <div
              key={template.id}
              className={`border rounded-lg p-4 flex flex-col ${
                active ? "border-black ring-2 ring-black" : "border-gray-200"
              }`}
            >
              <div className="bg-white border rounded-md p-3 mb-3">{template.preview}</div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                {template.name}
                {active && (
                  <span className="text-xs font-medium bg-black text-white px-2 py-0.5 rounded-full">Aktiv</span>
                )}
              </h3>
              <p className="text-sm text-gray-600 mt-1 flex-1">{template.description}</p>
              <button
                onClick={() => selectTemplate(template.id)}
                disabled={active || saving !== null}
                className="mt-4 bg-black text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
              >
                {active ? "I bruk" : saving === template.id ? "Bytter..." : "Bruk denne"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

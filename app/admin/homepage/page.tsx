"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { defaultHomepageContent, HomepageContent } from "@/lib/homepageContent";

const TEMPLATES: { id: HomepageContent["template"]; name: string; description: string }[] = [
  {
    id: "classic",
    name: "Klassisk",
    description:
      "Stort hovedbanner, deretter produkter, funksjoner, statistikk og kundeuttalelser. God balanse mellom merkevarehistorie og salg.",
  },
  {
    id: "product-forward",
    name: "Produktfokusert",
    description:
      "Kort banner rett inn i et fullt produktgrid, slik de største norske nettbutikkene gjør det. Kortest mulig vei til kjøp.",
  },
  {
    id: "lifestyle",
    name: "Livsstil",
    description:
      "Stor, rolig helside med merkevarehistorie og bilder først — passer for premium longevity-posisjonering. Kjøpsknapp alltid synlig.",
  },
];

export default function HomepageTemplatePickerPage() {
  const router = useRouter();
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/homepage`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent({ ...defaultHomepageContent, ...data.content });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
          Velg en design for å forhåndsvise den i full størrelse før du publiserer — ingenting blir live før
          du bekrefter. Tekst, bilder og produkter hentes automatisk inn i det designet du velger — rediger
          tekstinnholdet under{" "}
          <a href="/admin/content" className="underline">
            Content
          </a>
          .
        </p>
      </div>

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
              <div className="relative w-full h-56 overflow-hidden rounded-md border bg-gray-50 mb-3">
                <iframe
                  src={`/admin/homepage/preview?template=${template.id}&embed=1`}
                  title={`${template.name} forhåndsvisning`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0"
                  style={{
                    width: "1280px",
                    height: "2600px",
                    transform: "scale(0.19)",
                    transformOrigin: "top left",
                    border: "none",
                  }}
                  scrolling="no"
                  loading="lazy"
                />
              </div>

              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                {template.name}
                {active && (
                  <span className="text-xs font-medium bg-black text-white px-2 py-0.5 rounded-full">Aktiv</span>
                )}
              </h3>
              <p className="text-sm text-gray-600 mt-1 flex-1">{template.description}</p>

              <button
                onClick={() => router.push(`/admin/homepage/preview?template=${template.id}`)}
                className="mt-4 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
              >
                Forhåndsvis i full størrelse
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { defaultHomepageContent, HomepageContent } from "@/lib/homepageContent";

export default function ContentEditorPage() {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/homepage`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {
        // No saved content yet — defaults are already loaded.
      })
      .finally(() => setLoading(false));
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/proxy/content/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Kunne ikke lagre innhold");
      }

      setSuccess("Lagret! Endringene er nå live på forsiden.");
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster innhold...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Rediger forsidetekst</h1>
        <p className="text-sm text-gray-600 mt-1">
          Endringer blir live på forsiden så snart du lagrer.
        </p>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
      {success && <div className="p-4 bg-green-100 text-green-700 rounded-md">{success}</div>}

      <form onSubmit={save} className="space-y-8">
        <Section title="Hovedbanner">
          <Field label="Tittel">
            <input
              className="border rounded-md p-2 w-full"
              value={content.hero.title}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
            />
          </Field>
          <Field label="Undertekst">
            <textarea
              className="border rounded-md p-2 w-full"
              value={content.hero.subtitle}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
            />
          </Field>
        </Section>

        <Section title="Funksjoner (Hvorfor Vitalityboost?)">
          <Field label="Overskrift">
            <input
              className="border rounded-md p-2 w-full"
              value={content.features.heading}
              onChange={(e) =>
                setContent({ ...content, features: { ...content.features, heading: e.target.value } })
              }
            />
          </Field>
          {content.features.items.map((item, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <Field label={`Funksjon ${i + 1} — tittel`}>
                <input
                  className="border rounded-md p-2 w-full"
                  value={item.title}
                  onChange={(e) => {
                    const items = [...content.features.items];
                    items[i] = { ...items[i], title: e.target.value };
                    setContent({ ...content, features: { ...content.features, items } });
                  }}
                />
              </Field>
              <Field label="Beskrivelse">
                <input
                  className="border rounded-md p-2 w-full"
                  value={item.description}
                  onChange={(e) => {
                    const items = [...content.features.items];
                    items[i] = { ...items[i], description: e.target.value };
                    setContent({ ...content, features: { ...content.features, items } });
                  }}
                />
              </Field>
            </div>
          ))}
        </Section>

        <Section title="Statistikk">
          {content.stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <Field label={`Tall ${i + 1}`}>
                <input
                  className="border rounded-md p-2 w-full"
                  value={stat.value}
                  onChange={(e) => {
                    const stats = [...content.stats];
                    stats[i] = { ...stats[i], value: e.target.value };
                    setContent({ ...content, stats });
                  }}
                />
              </Field>
              <Field label="Etikett">
                <input
                  className="border rounded-md p-2 w-full"
                  value={stat.label}
                  onChange={(e) => {
                    const stats = [...content.stats];
                    stats[i] = { ...stats[i], label: e.target.value };
                    setContent({ ...content, stats });
                  }}
                />
              </Field>
            </div>
          ))}
        </Section>

        <Section title="Bildeseksjon">
          <Field label="Overskrift">
            <input
              className="border rounded-md p-2 w-full"
              value={content.featureWithImage.heading}
              onChange={(e) =>
                setContent({
                  ...content,
                  featureWithImage: { ...content.featureWithImage, heading: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Beskrivelse">
            <textarea
              className="border rounded-md p-2 w-full"
              value={content.featureWithImage.description}
              onChange={(e) =>
                setContent({
                  ...content,
                  featureWithImage: { ...content.featureWithImage, description: e.target.value },
                })
              }
            />
          </Field>
        </Section>

        <Section title="Kundeuttalelser">
          <Field label="Overskrift">
            <input
              className="border rounded-md p-2 w-full"
              value={content.testimonials.heading}
              onChange={(e) =>
                setContent({ ...content, testimonials: { ...content.testimonials, heading: e.target.value } })
              }
            />
          </Field>
          {content.testimonials.items.map((item, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <Field label={`Sitat ${i + 1}`}>
                <input
                  className="border rounded-md p-2 w-full"
                  value={item.quote}
                  onChange={(e) => {
                    const items = [...content.testimonials.items];
                    items[i] = { ...items[i], quote: e.target.value };
                    setContent({ ...content, testimonials: { ...content.testimonials, items } });
                  }}
                />
              </Field>
              <Field label="Navn">
                <input
                  className="border rounded-md p-2 w-full"
                  value={item.author}
                  onChange={(e) => {
                    const items = [...content.testimonials.items];
                    items[i] = { ...items[i], author: e.target.value };
                    setContent({ ...content, testimonials: { ...content.testimonials, items } });
                  }}
                />
              </Field>
            </div>
          ))}
        </Section>

        <Section title="Priser">
          <Field label="Overskrift">
            <input
              className="border rounded-md p-2 w-full"
              value={content.pricing.heading}
              onChange={(e) => setContent({ ...content, pricing: { ...content.pricing, heading: e.target.value } })}
            />
          </Field>
          {content.pricing.plans.map((plan, i) => (
            <div key={i} className="grid grid-cols-3 gap-3">
              <Field label="Navn">
                <input
                  className="border rounded-md p-2 w-full"
                  value={plan.name}
                  onChange={(e) => {
                    const plans = [...content.pricing.plans];
                    plans[i] = { ...plans[i], name: e.target.value };
                    setContent({ ...content, pricing: { ...content.pricing, plans } });
                  }}
                />
              </Field>
              <Field label="Pris (kr)">
                <input
                  className="border rounded-md p-2 w-full"
                  value={plan.price}
                  onChange={(e) => {
                    const plans = [...content.pricing.plans];
                    plans[i] = { ...plans[i], price: e.target.value };
                    setContent({ ...content, pricing: { ...content.pricing, plans } });
                  }}
                />
              </Field>
              <Field label="Fordeler (kommaseparert)">
                <input
                  className="border rounded-md p-2 w-full"
                  value={plan.features}
                  onChange={(e) => {
                    const plans = [...content.pricing.plans];
                    plans[i] = { ...plans[i], features: e.target.value };
                    setContent({ ...content, pricing: { ...content.pricing, plans } });
                  }}
                />
              </Field>
            </div>
          ))}
        </Section>

        <Section title="Oppfordring til handling">
          <Field label="Tittel">
            <input
              className="border rounded-md p-2 w-full"
              value={content.cta.title}
              onChange={(e) => setContent({ ...content, cta: { ...content.cta, title: e.target.value } })}
            />
          </Field>
          <Field label="Beskrivelse">
            <input
              className="border rounded-md p-2 w-full"
              value={content.cta.description}
              onChange={(e) => setContent({ ...content, cta: { ...content.cta, description: e.target.value } })}
            />
          </Field>
        </Section>

        <Section title="Nyhetsbrev">
          <Field label="Overskrift">
            <input
              className="border rounded-md p-2 w-full"
              value={content.newsletter.heading}
              onChange={(e) =>
                setContent({ ...content, newsletter: { ...content.newsletter, heading: e.target.value } })
              }
            />
          </Field>
          <Field label="Undertekst">
            <input
              className="border rounded-md p-2 w-full"
              value={content.newsletter.subheading}
              onChange={(e) =>
                setContent({ ...content, newsletter: { ...content.newsletter, subheading: e.target.value } })
              }
            />
          </Field>
        </Section>

        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-6 py-3 rounded-md disabled:opacity-50"
        >
          {saving ? "Lagrer..." : "Lagre og publiser"}
        </button>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border rounded-md p-4 space-y-4">
      <legend className="px-2 font-semibold">{title}</legend>
      {children}
    </fieldset>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {children}
    </div>
  );
}

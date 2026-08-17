"use client";

import { useEffect, useRef, useState } from "react";
import {
  HomepageContent,
  ButtonContent,
  INTERNAL_DESTINATIONS,
  mergeHomepageContent,
} from "@/lib/homepageContent";
import {
  CONTENT_FIELDS,
  CONTENT_SECTIONS,
  ContentField,
  getByPath,
  setByPath,
  getFieldLabel,
} from "@/lib/homepageContentFields";
import { getProducts } from "@/lib/products";
import { ClassicTemplate } from "@/components/homepage/ClassicTemplate";
import { ProductForwardTemplate } from "@/components/homepage/ProductForwardTemplate";
import { LifestyleTemplate } from "@/components/homepage/LifestyleTemplate";

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: string[];
}

interface StatItemDraft {
  value: string;
  label: string;
  hidden?: boolean;
}

interface TestimonialItemDraft {
  quote: string;
  author: string;
  hidden?: boolean;
}

interface BadgeItemDraft {
  text: string;
  hidden?: boolean;
}

const EDIT_BOX_WIDTH = 320;

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const TEMPLATE_NAMES: Record<string, string> = {
  classic: "Klassisk",
  "product-forward": "Produktfokusert",
  lifestyle: "Livsstil",
};

export default function ContentEditorPage() {
  const [content, setContent] = useState<HomepageContent>(() => mergeHomepageContent(null));
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeField, setActiveField] = useState<string | null>(null);
  const [rect, setRect] = useState<Rect | null>(null);
  const [boxLeft, setBoxLeft] = useState(8);
  const [draftText, setDraftText] = useState("");
  const [draftButton, setDraftButton] = useState<ButtonContent>({ label: "", destination: "" });
  const [draftStatItem, setDraftStatItem] = useState<StatItemDraft>({ value: "", label: "" });
  const [draftTestimonialItem, setDraftTestimonialItem] = useState<TestimonialItemDraft>({
    quote: "",
    author: "",
  });
  const [draftBadgeItem, setDraftBadgeItem] = useState<BadgeItemDraft>({ text: "" });
  const [saving, setSaving] = useState(false);
  const [savedField, setSavedField] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/homepage`, { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null),
      getProducts(),
    ]).then(([data, prods]) => {
      setContent(mergeHomepageContent(data?.content));
      setProducts(prods);
      setLoading(false);
    });
  }, []);

  function measure(field: string) {
    const container = previewRef.current;
    if (!container) return;
    const target = container.querySelector<HTMLElement>(`[data-field="${field}"]`);
    if (!target) {
      setRect(null);
      setNotFound(true);
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "center" });

    const targetBox = target.getBoundingClientRect();
    const containerBox = container.getBoundingClientRect();
    setRect({
      top: targetBox.top - containerBox.top + container.scrollTop,
      left: targetBox.left - containerBox.left + container.scrollLeft,
      width: targetBox.width,
      height: targetBox.height,
    });

    // Clamp so the edit box never renders past the right edge of the
    // preview panel — without this, fields in the rightmost column (e.g.
    // the 3rd stat) could open a box that's partially or fully off-screen,
    // looking like nothing happened when clicked.
    const rawLeft = targetBox.left - containerBox.left + container.scrollLeft;
    const maxLeft = Math.max(8, container.clientWidth - EDIT_BOX_WIDTH - 8);
    setBoxLeft(Math.min(Math.max(8, rawLeft), maxLeft));
  }

  function openField(field: ContentField) {
    setError("");
    setSavedField(null);
    setNotFound(false);
    setActiveField(field.path);

    const value = getByPath(content, field.path);
    if (field.kind === "button") {
      setDraftButton(value as ButtonContent);
    } else if (field.kind === "stat-item") {
      setDraftStatItem(value as StatItemDraft);
    } else if (field.kind === "testimonial-item") {
      setDraftTestimonialItem(value as TestimonialItemDraft);
    } else if (field.kind === "badge-item") {
      setDraftBadgeItem(value as BadgeItemDraft);
    } else {
      setDraftText((value as string) || "");
    }

    // Wait a frame so the field is in the DOM (it always is here, but this
    // keeps the measurement after any pending re-render) before measuring.
    requestAnimationFrame(() => measure(field.path));
  }

  function closeEditor() {
    setActiveField(null);
    setRect(null);
    setError("");
    setNotFound(false);
  }

  async function save(field: ContentField) {
    const value =
      field.kind === "button"
        ? draftButton
        : field.kind === "stat-item"
        ? draftStatItem
        : field.kind === "testimonial-item"
        ? draftTestimonialItem
        : field.kind === "badge-item"
        ? draftBadgeItem
        : draftText;
    const updated = setByPath(content, field.path, value);
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/proxy/content/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: updated }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || "Kunne ikke lagre");
      }

      setContent(updated);
      setSavedField(field.path);
      setTimeout(() => {
        setActiveField((current) => (current === field.path ? null : current));
        setRect(null);
      }, 900);
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

  const activeFieldDef = CONTENT_FIELDS.find((f) => f.path === activeField);

  function Template() {
    switch (content.template) {
      case "product-forward":
        return <ProductForwardTemplate content={content} products={products} />;
      case "lifestyle":
        return <LifestyleTemplate content={content} products={products} />;
      default:
        return <ClassicTemplate content={content} products={products} />;
    }
  }

  return (
    <div className="flex h-screen -m-10">
      {/* List panel */}
      <aside className="w-80 shrink-0 border-r border-gray-200 bg-white overflow-y-auto p-5">
        <h1 className="text-lg font-semibold tracking-tight">Innhold</h1>
        <p className="text-sm text-gray-600 mt-1 mb-4">
          Klikk på et element for å redigere det direkte på siden til høyre.
        </p>

        {CONTENT_SECTIONS.map((section) => (
          <div key={section} className="mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">{section}</h2>
            <div className="space-y-1">
              {CONTENT_FIELDS.filter((f) => f.section === section).map((field) => {
                const isActive = activeField === field.path;
                const preview = getFieldLabel(content, field);
                return (
                  <button
                    key={field.path}
                    onClick={() => openField(field)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="font-medium">{field.label}</div>
                    {preview && (
                      <div className={`text-xs truncate ${isActive ? "text-blue-100" : "text-gray-500"}`}>
                        {preview}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </aside>

      {/* Live preview */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-6 py-3 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
          <span className="text-sm text-gray-600">
            Design: <span className="font-medium text-gray-900">{TEMPLATE_NAMES[content.template]}</span>
          </span>
          <a href="/admin/homepage" className="text-sm underline text-gray-600 hover:text-gray-900">
            Bytt design
          </a>
        </div>

        {activeField && notFound && activeFieldDef && (
          <div className="px-6 py-2 bg-amber-50 text-amber-800 text-sm border-b border-amber-200 shrink-0 flex items-center justify-between">
            <span>
              «{activeFieldDef.label}» finnes ikke i designet «{TEMPLATE_NAMES[content.template]}» — velg et
              annet element, eller bytt design.
            </span>
            <button onClick={closeEditor} className="underline ml-3 shrink-0">
              Lukk
            </button>
          </div>
        )}

        <div ref={previewRef} className="relative flex-1 overflow-y-auto bg-gray-50">
          <Template />

          {activeField && rect && (
            <div
              className="absolute ring-2 ring-blue-500 ring-offset-2 rounded pointer-events-none z-40"
              style={{ top: rect.top - 4, left: rect.left - 4, width: rect.width + 8, height: rect.height + 8 }}
            />
          )}

          {activeField && rect && activeFieldDef && (
            <div
              className="absolute z-50 bg-white border border-gray-300 shadow-xl rounded-lg p-4 w-80 max-w-[90vw]"
              style={{ top: rect.top + rect.height + 10, left: boxLeft }}
            >
              <div className="text-sm font-medium text-gray-900 mb-2">{activeFieldDef.label}</div>

              {error && <div className="mb-2 text-sm text-red-600">{error}</div>}

              {activeFieldDef.kind === "button" ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Knappetekst</label>
                    <input
                      autoFocus
                      className="border rounded-md p-2 w-full text-sm"
                      value={draftButton.label}
                      onChange={(e) => setDraftButton({ ...draftButton, label: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Går til</label>
                    <select
                      className="border rounded-md p-2 w-full text-sm"
                      value={draftButton.destination}
                      onChange={(e) => setDraftButton({ ...draftButton, destination: e.target.value })}
                    >
                      {INTERNAL_DESTINATIONS.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : activeFieldDef.kind === "stat-item" ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Tall</label>
                    <input
                      autoFocus
                      className="border rounded-md p-2 w-full text-sm"
                      value={draftStatItem.value}
                      onChange={(e) => setDraftStatItem({ ...draftStatItem, value: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Etikett</label>
                    <input
                      className="border rounded-md p-2 w-full text-sm"
                      value={draftStatItem.label}
                      onChange={(e) => setDraftStatItem({ ...draftStatItem, label: e.target.value })}
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={!!draftStatItem.hidden}
                      onChange={(e) => setDraftStatItem({ ...draftStatItem, hidden: e.target.checked })}
                    />
                    Skjul fra nettsiden
                  </label>
                </div>
              ) : activeFieldDef.kind === "testimonial-item" ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Sitat</label>
                    <textarea
                      autoFocus
                      className="border rounded-md p-2 w-full text-sm"
                      rows={3}
                      value={draftTestimonialItem.quote}
                      onChange={(e) => setDraftTestimonialItem({ ...draftTestimonialItem, quote: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Navn</label>
                    <input
                      className="border rounded-md p-2 w-full text-sm"
                      value={draftTestimonialItem.author}
                      onChange={(e) =>
                        setDraftTestimonialItem({ ...draftTestimonialItem, author: e.target.value })
                      }
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={!!draftTestimonialItem.hidden}
                      onChange={(e) =>
                        setDraftTestimonialItem({ ...draftTestimonialItem, hidden: e.target.checked })
                      }
                    />
                    Skjul fra nettsiden
                  </label>
                </div>
              ) : activeFieldDef.kind === "badge-item" ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Tekst</label>
                    <input
                      autoFocus
                      className="border rounded-md p-2 w-full text-sm"
                      value={draftBadgeItem.text}
                      onChange={(e) => setDraftBadgeItem({ ...draftBadgeItem, text: e.target.value })}
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={!!draftBadgeItem.hidden}
                      onChange={(e) => setDraftBadgeItem({ ...draftBadgeItem, hidden: e.target.checked })}
                    />
                    Skjul fra nettsiden
                  </label>
                </div>
              ) : activeFieldDef.kind === "textarea" ? (
                <textarea
                  autoFocus
                  className="border rounded-md p-2 w-full text-sm"
                  rows={4}
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                />
              ) : (
                <input
                  autoFocus
                  className="border rounded-md p-2 w-full text-sm"
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                />
              )}

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => save(activeFieldDef)}
                  disabled={saving}
                  className="bg-black text-white px-3 py-1.5 rounded-md text-sm disabled:opacity-50"
                >
                  {saving ? "Lagrer..." : "Lagre"}
                </button>
                <button
                  onClick={closeEditor}
                  className="px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                >
                  Avbryt
                </button>
                {savedField === activeField && !saving && (
                  <span className="text-sm text-green-600 ml-1">Lagret ✓</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { HomepageContent } from "./homepageContent";

export type FieldKind = "text" | "textarea" | "button" | "stat-item" | "testimonial-item" | "badge-item";

export interface ContentField {
  path: string;
  label: string;
  section: string;
  kind: FieldKind;
}

export const CONTENT_FIELDS: ContentField[] = [
  { path: "hero.title", label: "Tittel", section: "Hovedbanner", kind: "text" },
  { path: "hero.subtitle", label: "Undertekst", section: "Hovedbanner", kind: "textarea" },
  { path: "hero.primaryButton", label: "Hovedknapp", section: "Hovedbanner", kind: "button" },
  { path: "hero.secondaryButton", label: "Sekundærknapp", section: "Hovedbanner", kind: "button" },

  { path: "featuredProducts.heading", label: "Overskrift", section: "Populære produkter", kind: "text" },

  { path: "trustBadges.0", label: "Tillitsmerke 1", section: "Tillitsmerker", kind: "badge-item" },
  { path: "trustBadges.1", label: "Tillitsmerke 2", section: "Tillitsmerker", kind: "badge-item" },
  { path: "trustBadges.2", label: "Tillitsmerke 3", section: "Tillitsmerker", kind: "badge-item" },
  { path: "trustBadges.3", label: "Tillitsmerke 4", section: "Tillitsmerker", kind: "badge-item" },

  { path: "features.heading", label: "Overskrift", section: "Funksjoner", kind: "text" },
  { path: "features.items.0.title", label: "Funksjon 1 – tittel", section: "Funksjoner", kind: "text" },
  { path: "features.items.0.description", label: "Funksjon 1 – beskrivelse", section: "Funksjoner", kind: "text" },
  { path: "features.items.1.title", label: "Funksjon 2 – tittel", section: "Funksjoner", kind: "text" },
  { path: "features.items.1.description", label: "Funksjon 2 – beskrivelse", section: "Funksjoner", kind: "text" },
  { path: "features.items.2.title", label: "Funksjon 3 – tittel", section: "Funksjoner", kind: "text" },
  { path: "features.items.2.description", label: "Funksjon 3 – beskrivelse", section: "Funksjoner", kind: "text" },

  { path: "stats.0", label: "Statistikk 1", section: "Statistikk", kind: "stat-item" },
  { path: "stats.1", label: "Statistikk 2", section: "Statistikk", kind: "stat-item" },
  { path: "stats.2", label: "Statistikk 3", section: "Statistikk", kind: "stat-item" },

  { path: "featureWithImage.heading", label: "Overskrift", section: "Bildeseksjon", kind: "text" },
  { path: "featureWithImage.description", label: "Beskrivelse", section: "Bildeseksjon", kind: "textarea" },

  { path: "testimonials.heading", label: "Overskrift", section: "Kundeuttalelser", kind: "text" },
  { path: "testimonials.items.0", label: "Sitat 1", section: "Kundeuttalelser", kind: "testimonial-item" },
  { path: "testimonials.items.1", label: "Sitat 2", section: "Kundeuttalelser", kind: "testimonial-item" },

  { path: "cta.title", label: "Tittel", section: "Oppfordring til handling", kind: "text" },
  { path: "cta.description", label: "Beskrivelse", section: "Oppfordring til handling", kind: "textarea" },
  { path: "cta.button", label: "Knapp", section: "Oppfordring til handling", kind: "button" },

  { path: "newsletter.heading", label: "Overskrift", section: "Nyhetsbrev", kind: "text" },
  { path: "newsletter.subheading", label: "Undertekst", section: "Nyhetsbrev", kind: "text" },
];

export const CONTENT_SECTIONS: string[] = Array.from(new Set(CONTENT_FIELDS.map((f) => f.section)));

function pathParts(path: string): (string | number)[] {
  return path.split(".").map((p) => (/^\d+$/.test(p) ? Number(p) : p));
}

export function getByPath(obj: unknown, path: string): unknown {
  return pathParts(path).reduce<unknown>((acc, key) => {
    if (acc == null) return undefined;
    return (acc as Record<string | number, unknown>)[key];
  }, obj);
}

// Returns a new object with `value` set at `path`, cloning every object/array
// along the way so React state updates trigger re-renders correctly.
export function setByPath<T>(obj: T, path: string, value: unknown): T {
  const parts = pathParts(path);
  const clone = (node: unknown, depth: number): unknown => {
    const key = parts[depth];
    const isLast = depth === parts.length - 1;
    const current = (node as Record<string | number, unknown>)?.[key];
    const nextValue = isLast ? value : clone(current, depth + 1);

    if (Array.isArray(node)) {
      const copy = [...node];
      copy[key as number] = nextValue;
      return copy;
    }
    return { ...(node as object), [key]: nextValue };
  };

  return clone(obj, 0) as T;
}

export function getFieldLabel(content: HomepageContent, field: ContentField): string {
  const value = getByPath(content, field.path);

  if (field.kind === "button") {
    const button = value as { label?: string } | undefined;
    return button?.label || field.label;
  }

  if (field.kind === "stat-item") {
    const stat = value as { value?: string; label?: string; hidden?: boolean } | undefined;
    const preview = [stat?.value, stat?.label].filter(Boolean).join(" — ");
    return stat?.hidden ? `${preview} (skjult)` : preview;
  }

  if (field.kind === "testimonial-item") {
    const item = value as { quote?: string; author?: string; hidden?: boolean } | undefined;
    const preview = item?.quote || "";
    return item?.hidden ? `${preview} (skjult)` : preview;
  }

  if (field.kind === "badge-item") {
    const badge = value as { text?: string; hidden?: boolean } | undefined;
    return badge?.hidden ? `${badge?.text} (skjult)` : badge?.text || "";
  }

  return (value as string) || "";
}

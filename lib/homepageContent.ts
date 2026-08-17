export interface ButtonContent {
  label: string;
  destination: string;
}

export interface HomepageContent {
  template: "classic" | "product-forward" | "lifestyle";
  hero: {
    title: string;
    subtitle: string;
    primaryButton: ButtonContent;
    secondaryButton: ButtonContent;
  };
  featuredProducts: { heading: string };
  trustBadges: { text: string; hidden?: boolean }[];
  features: {
    heading: string;
    items: { title: string; description: string }[];
  };
  stats: { label: string; value: string; hidden?: boolean }[];
  featureWithImage: { heading: string; description: string };
  testimonials: {
    heading: string;
    items: { quote: string; author: string; hidden?: boolean }[];
  };
  cta: { title: string; description: string; button: ButtonContent };
  newsletter: { heading: string; subheading: string };
}

// Internal pages a content button can point to. Kept to a fixed, known-safe
// list rather than free-text URLs — every option here is guaranteed to
// resolve to a real page on the site.
export const INTERNAL_DESTINATIONS: { label: string; value: string }[] = [
  { label: "Produkter", value: "/products" },
  { label: "Om oss", value: "/about" },
  { label: "Kontakt", value: "/contact" },
  { label: "Handlekurv", value: "/cart" },
];

export const defaultHomepageContent: HomepageContent = {
  template: "classic",
  featuredProducts: { heading: "Populære produkter" },
  trustBadges: [
    { text: "Trusted by athletes" },
    { text: "Nordic Quality" },
    { text: "Science Backed" },
    { text: "Eco Friendly" },
  ],
  hero: {
    title: "Vitalityboost",
    subtitle: "Naturlig energi. Klarere fokus. Bedre hverdag.",
    primaryButton: { label: "Se produkter", destination: "/products" },
    secondaryButton: { label: "Lær mer", destination: "/about" },
  },
  features: {
    heading: "Hvorfor Vitalityboost?",
    items: [
      { title: "Ren energi", description: "Naturlige ingredienser som støtter energi uten krasj." },
      { title: "Bedre fokus", description: "Formulert for mental klarhet og konsentrasjon." },
      { title: "Vitenskapelig utviklet", description: "Basert på dokumentert forskning og kliniske studier." },
    ],
  },
  stats: [
    { label: "Kunder", value: "12 500+" },
    { label: "Tilfredshet", value: "98%" },
    { label: "Gjennomsnittlig energiøkning", value: "27%" },
  ],
  featureWithImage: {
    heading: "Optimalisert for hverdagen",
    description:
      "Våre produkter er utviklet for å gi deg stabil energi og fokus – enten du jobber, trener eller studerer.",
  },
  testimonials: {
    heading: "Hva kundene sier",
    items: [
      { quote: "Jeg har aldri følt meg så fokusert på jobb!", author: "Marius, 34" },
      { quote: "Perfekt før trening – gir meg et skikkelig løft.", author: "Sara, 29" },
    ],
  },
  cta: {
    title: "Klar for mer energi?",
    description: "Start reisen mot en bedre hverdag i dag.",
    button: { label: "Se produkter", destination: "/products" },
  },
  newsletter: {
    heading: "Hold deg oppdatert",
    subheading: "Få eksklusive tilbud og nyheter rett i innboksen.",
  },
};

// Saved content in the database may pre-date fields added later (e.g. hero
// buttons), or still carry fields that have since been removed (e.g. the old
// unused "pricing" block). Deep-merging onto the current defaults means old
// sites never crash on a missing field, and stale fields are silently
// dropped rather than resurfacing.
export function mergeHomepageContent(saved: Partial<HomepageContent> | null | undefined): HomepageContent {
  if (!saved) return defaultHomepageContent;

  return {
    ...defaultHomepageContent,
    ...saved,
    hero: {
      ...defaultHomepageContent.hero,
      ...saved.hero,
      primaryButton: { ...defaultHomepageContent.hero.primaryButton, ...saved.hero?.primaryButton },
      secondaryButton: { ...defaultHomepageContent.hero.secondaryButton, ...saved.hero?.secondaryButton },
    },
    featuredProducts: { ...defaultHomepageContent.featuredProducts, ...saved.featuredProducts },
    trustBadges: saved.trustBadges?.length ? saved.trustBadges : defaultHomepageContent.trustBadges,
    features: {
      ...defaultHomepageContent.features,
      ...saved.features,
      items: saved.features?.items?.length ? saved.features.items : defaultHomepageContent.features.items,
    },
    stats: saved.stats?.length ? saved.stats : defaultHomepageContent.stats,
    featureWithImage: { ...defaultHomepageContent.featureWithImage, ...saved.featureWithImage },
    testimonials: {
      ...defaultHomepageContent.testimonials,
      ...saved.testimonials,
      items: saved.testimonials?.items?.length
        ? saved.testimonials.items
        : defaultHomepageContent.testimonials.items,
    },
    cta: {
      ...defaultHomepageContent.cta,
      ...saved.cta,
      button: { ...defaultHomepageContent.cta.button, ...saved.cta?.button },
    },
    newsletter: { ...defaultHomepageContent.newsletter, ...saved.newsletter },
  };
}

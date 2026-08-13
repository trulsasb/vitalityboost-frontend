export interface HomepageContent {
  hero: { title: string; subtitle: string };
  features: {
    heading: string;
    items: { title: string; description: string }[];
  };
  stats: { label: string; value: string }[];
  featureWithImage: { heading: string; description: string };
  testimonials: {
    heading: string;
    items: { quote: string; author: string }[];
  };
  pricing: {
    heading: string;
    plans: { name: string; price: string; features: string }[];
  };
  cta: { title: string; description: string };
  newsletter: { heading: string; subheading: string };
}

export const defaultHomepageContent: HomepageContent = {
  hero: {
    title: "Naturlig energi. Klarere fokus. Bedre hverdag.",
    subtitle:
      "Premium kosttilskudd utviklet for å støtte energi, konsentrasjon og velvære – helt uten kompromisser.",
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
  pricing: {
    heading: "Velg din pakke",
    plans: [
      { name: "Start", price: "299", features: "1 produkt, Gratis frakt, 30 dagers garanti" },
      { name: "Pro", price: "499", features: "2 produkter, Prioritert frakt, 30 dagers garanti" },
      { name: "Ultimate", price: "799", features: "3 produkter, Ekspressfrakt, Premium support" },
    ],
  },
  cta: {
    title: "Klar for mer energi?",
    description: "Start reisen mot en bedre hverdag i dag.",
  },
  newsletter: {
    heading: "Hold deg oppdatert",
    subheading: "Få eksklusive tilbud og nyheter rett i innboksen.",
  },
};

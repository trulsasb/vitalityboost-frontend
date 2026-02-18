// config/site.ts

export type SiteNavItem = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  domain: string;
  shopDomain: string;
  description: string;
  mainNav: SiteNavItem[];
  footerNav: SiteNavItem[];
};

export const siteConfig: SiteConfig = {
  name: "VitalityBoost",
  domain: "vitalityboost.no",
  shopDomain: "vitalityboost_nettbutikk.no",
  description:
    "VitalityBoost tilbyr nøye utvalgte longevity-kosttilskudd med fokus på kvalitet, dokumentasjon og langsiktig helse.",
  mainNav: [
    { label: "Produkter", href: "/products" },
    { label: "Om oss", href: "/om-oss" },
    { label: "Forskning", href: "/forskning" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  footerNav: [
    { label: "Personvern", href: "/personvern" },
    { label: "Vilkår", href: "/vilkar" },
    { label: "Retur og angrerett", href: "/retur" },
    { label: "Kundeservice", href: "/kundeservice" },
  ],
};

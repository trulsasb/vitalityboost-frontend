"use client";
export const dynamic = "force-dynamic";

import {
  Hero,
  FeatureGrid,
  StatsSection,
  Testimonials,
  CTASection,
  Newsletter,
  LogoCloud,
  FeatureWithImage,
  Pricing,
} from "@/components/sections";

import PageSection from "@/components/layout/PageSection";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <PageSection>
        <Hero
          title="Naturlig energi. Klarere fokus. Bedre hverdag."
          subtitle="Premium kosttilskudd utviklet for å støtte energi, konsentrasjon og velvære – helt uten kompromisser."
          ctaPrimary={
            <a href="/products" className="btn-primary" aria-label="Se produkter">
              Se produkter
            </a>
          }
          ctaSecondary={
            <a href="/about" className="btn-secondary" aria-label="Lær mer om Vitalityboost">
              Lær mer
            </a>
          }
        />
      </PageSection>

      <PageSection>
        <LogoCloud
          logos={[
            "Trusted by athletes",
            "Nordic Quality",
            "Science Backed",
            "Eco Friendly",
          ]}
        />
      </PageSection>

      <PageSection>
        <FeatureGrid
          heading="Hvorfor Vitalityboost?"
          features={[
            {
              title: "Ren energi",
              description: "Naturlige ingredienser som støtter energi uten krasj.",
            },
            {
              title: "Bedre fokus",
              description: "Formulert for mental klarhet og konsentrasjon.",
            },
            {
              title: "Vitenskapelig utviklet",
              description: "Basert på dokumentert forskning og kliniske studier.",
            },
          ]}
        />
      </PageSection>

      <PageSection>
        <StatsSection
          stats={[
            { label: "Kunder", value: "12 500+" },
            { label: "Tilfredshet", value: "98%" },
            { label: "Gjennomsnittlig energiøkning", value: "27%" },
          ]}
        />
      </PageSection>

      <PageSection>
        <FeatureWithImage
          heading="Optimalisert for hverdagen"
          description="Våre produkter er utviklet for å gi deg stabil energi og fokus – enten du jobber, trener eller studerer."
          image={
            <Image
              src="/images/product-1.png"
              alt="Produkt"
              width={600}
              height={600}
              className="rounded-xl"
            />
          }
        />
      </PageSection>

      <PageSection>
        <Testimonials
          heading="Hva kundene sier"
          testimonials={[
            {
              quote: "Jeg har aldri følt meg så fokusert på jobb!",
              author: "Marius, 34",
            },
            {
              quote: "Perfekt før trening – gir meg et skikkelig løft.",
              author: "Sara, 29",
            },
          ]}
        />
      </PageSection>

      <PageSection>
        <Pricing
          heading="Velg din pakke"
          plans={[
            {
              name: "Start",
              price: "299",
              features: ["1 produkt", "Gratis frakt", "30 dagers garanti"],
            },
            {
              name: "Pro",
              price: "499",
              features: ["2 produkter", "Prioritert frakt", "30 dagers garanti"],
            },
            {
              name: "Ultimate",
              price: "799",
              features: ["3 produkter", "Ekspressfrakt", "Premium support"],
            },
          ]}
        />
      </PageSection>

      <PageSection>
        <CTASection
          title="Klar for mer energi?"
          description="Start reisen mot en bedre hverdag i dag."
          cta={
            <a href="/products" className="btn-primary">
              Se produkter
            </a>
          }
        />
      </PageSection>

      <PageSection>
        <Newsletter
          heading="Hold deg oppdatert"
          subheading="Få eksklusive tilbud og nyheter rett i innboksen."
        />
      </PageSection>
    </>
  );
}

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

import { PageShell } from "@/components/layout/PageShell";
import { PageSection } from "@/components/layout/PageSection";
import { PageContainer } from "@/components/layout/PageContainer";
import Image from "next/image";

export default function HomePage() {
  return (
    <PageShell>
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

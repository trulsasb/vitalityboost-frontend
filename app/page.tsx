"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
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
import { defaultHomepageContent, HomepageContent } from "@/lib/homepageContent";

export default function HomePage() {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/homepage`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) {
          setContent(data.content);
        }
      })
      .catch(() => {
        // Keep defaults if the content endpoint isn't reachable or nothing's saved yet.
      });
  }, []);

  return (
    <>
      <PageSection>
        <Hero
          title={content.hero.title}
          subtitle={content.hero.subtitle}
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
        <FeatureGrid heading={content.features.heading} features={content.features.items} />
      </PageSection>

      <PageSection>
        <StatsSection stats={content.stats} />
      </PageSection>

      <PageSection>
        <FeatureWithImage
          heading={content.featureWithImage.heading}
          description={content.featureWithImage.description}
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
        <Testimonials heading={content.testimonials.heading} testimonials={content.testimonials.items} />
      </PageSection>

      <PageSection>
        <Pricing
          heading={content.pricing.heading}
          plans={content.pricing.plans.map((plan) => ({
            name: plan.name,
            price: plan.price,
            features: plan.features
              .split(",")
              .map((f) => f.trim())
              .filter(Boolean),
          }))}
        />
      </PageSection>

      <PageSection>
        <CTASection
          title={content.cta.title}
          description={content.cta.description}
          cta={
            <a href="/products" className="btn-primary">
              Se produkter
            </a>
          }
        />
      </PageSection>

      <PageSection>
        <Newsletter heading={content.newsletter.heading} subheading={content.newsletter.subheading} />
      </PageSection>
    </>
  );
}

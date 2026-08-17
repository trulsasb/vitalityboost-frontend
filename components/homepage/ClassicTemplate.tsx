import {
  Hero,
  FeatureGrid,
  StatsSection,
  Testimonials,
  Newsletter,
  LogoCloud,
  FeatureWithImage,
} from "@/components/sections";
import PageSection from "@/components/layout/PageSection";
import Image from "next/image";
import { FeaturedProducts } from "./FeaturedProducts";
import { HomepageContent } from "@/lib/homepageContent";

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: string[];
}

export function ClassicTemplate({ content, products }: { content: HomepageContent; products: Product[] }) {
  return (
    <>
      <PageSection>
        <Hero
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          fieldPrefix="hero"
          ctaPrimary={
            <a
              href={content.hero.primaryButton.destination}
              className="btn-primary"
              data-field="hero.primaryButton"
            >
              {content.hero.primaryButton.label}
            </a>
          }
          ctaSecondary={
            <a
              href={content.hero.secondaryButton.destination}
              className="btn-secondary"
              data-field="hero.secondaryButton"
            >
              {content.hero.secondaryButton.label}
            </a>
          }
        />
      </PageSection>

      <PageSection>
        <FeaturedProducts
          heading={content.featuredProducts.heading}
          products={products.slice(0, 3)}
          fieldPrefix="featuredProducts"
        />
      </PageSection>

      <PageSection>
        <div className="bg-field rounded-2xl">
          <LogoCloud
            logos={content.trustBadges
              .map((badge, i) =>
                badge.hidden ? null : (
                  <span key={i} data-field={`trustBadges.${i}`} className="text-sm font-medium text-gray-500">
                    {badge.text}
                  </span>
                )
              )
              .filter((node): node is React.ReactElement => node !== null)}
          />
        </div>
      </PageSection>

      <PageSection>
        <FeatureGrid heading={content.features.heading} features={content.features.items} fieldPrefix="features" />
      </PageSection>

      <PageSection>
        <StatsSection stats={content.stats} fieldPrefix="stats" />
      </PageSection>

      <PageSection>
        <FeatureWithImage
          heading={content.featureWithImage.heading}
          description={content.featureWithImage.description}
          fieldPrefix="featureWithImage"
          image={
            <Image
              src="/images/feature-yoga-sunrise.jpg"
              alt="Morgenyoga i naturen"
              width={600}
              height={700}
              unoptimized
              className="rounded-xl object-cover"
            />
          }
        />
      </PageSection>

      <PageSection>
        <Testimonials
          heading={content.testimonials.heading}
          testimonials={content.testimonials.items}
          fieldPrefix="testimonials"
        />
      </PageSection>

      <PageSection>
        <section className="w-full py-16 bg-forest rounded-2xl text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-bold text-white" data-field="cta.title">
              {content.cta.title}
            </h2>
            {content.cta.description && (
              <p className="mt-4 text-lg text-gray-200" data-field="cta.description">
                {content.cta.description}
              </p>
            )}
            <div className="mt-8 flex justify-center">
              <a
                href={content.cta.button.destination}
                className="btn-primary !bg-white !text-forest"
                data-field="cta.button"
              >
                {content.cta.button.label}
              </a>
            </div>
          </div>
        </section>
      </PageSection>

      <PageSection>
        <Newsletter
          heading={content.newsletter.heading}
          subheading={content.newsletter.subheading}
          fieldPrefix="newsletter"
        />
      </PageSection>
    </>
  );
}

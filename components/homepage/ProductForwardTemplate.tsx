import { StatsSection, Testimonials, Newsletter } from "@/components/sections";
import PageSection from "@/components/layout/PageSection";
import { FeaturedProducts } from "./FeaturedProducts";
import { HomepageContent } from "@/lib/homepageContent";

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: string[];
}

export function ProductForwardTemplate({ content, products }: { content: HomepageContent; products: Product[] }) {
  return (
    <>
      <PageSection className="!mb-6">
        <section className="w-full py-10 md:py-14 bg-field rounded-b-2xl">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900" data-field="hero.title">
              {content.hero.title}
            </h1>
            {content.hero.subtitle && (
              <p
                className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
                data-field="hero.subtitle"
              >
                {content.hero.subtitle}
              </p>
            )}
            <div className="mt-6">
              <a href={content.hero.primaryButton.destination} className="btn-primary" data-field="hero.primaryButton">
                {content.hero.primaryButton.label}
              </a>
            </div>
          </div>
        </section>
      </PageSection>

      <PageSection>
        <div id="produkter">
          <FeaturedProducts
            heading={content.featuredProducts.heading || "Alle produkter"}
            products={products}
            compact
            fieldPrefix="featuredProducts"
          />
        </div>
      </PageSection>

      <PageSection>
        <StatsSection stats={content.stats} fieldPrefix="stats" />
      </PageSection>

      <PageSection>
        <Testimonials
          heading={content.testimonials.heading}
          testimonials={content.testimonials.items}
          fieldPrefix="testimonials"
        />
      </PageSection>

      <PageSection>
        <section className="w-full py-10 bg-forest rounded-2xl text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white" data-field="cta.title">
              {content.cta.title}
            </h2>
            {content.cta.description && (
              <p className="mt-3 text-gray-200" data-field="cta.description">
                {content.cta.description}
              </p>
            )}
            <div className="mt-6">
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

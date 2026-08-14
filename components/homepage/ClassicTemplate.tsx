import {
  Hero,
  FeatureGrid,
  StatsSection,
  Testimonials,
  CTASection,
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
        <FeaturedProducts heading={content.featuredProducts.heading} products={products.slice(0, 3)} />
      </PageSection>

      <PageSection>
        <LogoCloud logos={["Trusted by athletes", "Nordic Quality", "Science Backed", "Eco Friendly"]} />
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
            <Image src="/images/product-1.png" alt="Produkt" width={600} height={600} className="rounded-xl" />
          }
        />
      </PageSection>

      <PageSection>
        <Testimonials heading={content.testimonials.heading} testimonials={content.testimonials.items} />
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

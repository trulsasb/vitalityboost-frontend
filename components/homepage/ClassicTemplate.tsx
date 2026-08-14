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
        <div className="bg-field rounded-2xl">
          <LogoCloud logos={["Trusted by athletes", "Nordic Quality", "Science Backed", "Eco Friendly"]} />
        </div>
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
        <Testimonials heading={content.testimonials.heading} testimonials={content.testimonials.items} />
      </PageSection>

      <PageSection>
        <section className="w-full py-16 bg-forest rounded-2xl text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-bold text-white">{content.cta.title}</h2>
            {content.cta.description && <p className="mt-4 text-lg text-gray-200">{content.cta.description}</p>}
            <div className="mt-8 flex justify-center">
              <a href="/products" className="btn-primary !bg-white !text-forest">
                Se produkter
              </a>
            </div>
          </div>
        </section>
      </PageSection>

      <PageSection>
        <Newsletter heading={content.newsletter.heading} subheading={content.newsletter.subheading} />
      </PageSection>
    </>
  );
}

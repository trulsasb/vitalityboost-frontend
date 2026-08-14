import { StatsSection, Testimonials, CTASection, Newsletter, FeatureWithImage } from "@/components/sections";
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

export function LifestyleTemplate({ content, products }: { content: HomepageContent; products: Product[] }) {
  return (
    <>
      <PageSection>
        <section className="w-full py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">{content.hero.title}</h1>
            {content.hero.subtitle && (
              <p className="mt-6 text-lg text-gray-600">{content.hero.subtitle}</p>
            )}
            <div className="mt-10 flex justify-center gap-4">
              <a href="/products" className="btn-primary">
                Utforsk sortimentet
              </a>
              <a href="/about" className="btn-secondary">
                Vår filosofi
              </a>
            </div>
          </div>
        </section>
      </PageSection>

      <PageSection>
        <FeatureWithImage
          heading={content.featureWithImage.heading}
          description={content.featureWithImage.description}
          image={<Image src="/images/product-1.png" alt="Produkt" width={600} height={600} className="rounded-xl" />}
        />
      </PageSection>

      <PageSection>
        <FeaturedProducts heading={content.featuredProducts.heading || "Vårt utvalg"} products={products.slice(0, 3)} />
      </PageSection>

      <PageSection>
        <StatsSection heading="Tillit bygget over tid" stats={content.stats} />
      </PageSection>

      <PageSection>
        <FeatureWithImage
          heading={content.features.heading}
          description={content.features.items.map((f) => f.description).join(" ")}
          image={<Image src="/images/product-1.png" alt="Longevity" width={600} height={600} className="rounded-xl" />}
          reverse
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
              Kjøp nå
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

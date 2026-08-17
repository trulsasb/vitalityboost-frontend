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
        <section className="relative w-full py-32 md:py-44 text-center overflow-hidden rounded-2xl">
          <Image
            src="/images/hero-morning-run.jpg"
            alt=""
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-forest/60" />
          <div className="relative container mx-auto px-4 max-w-3xl">
            <h1
              className="text-4xl md:text-6xl font-bold text-white tracking-tight"
              data-field="hero.title"
            >
              {content.hero.title}
            </h1>
            {content.hero.subtitle && (
              <p className="mt-6 text-lg text-gray-100" data-field="hero.subtitle">
                {content.hero.subtitle}
              </p>
            )}
            <div className="mt-10 flex justify-center gap-4">
              <a
                href={content.hero.primaryButton.destination}
                className="btn-primary !bg-white !text-forest"
                data-field="hero.primaryButton"
              >
                {content.hero.primaryButton.label}
              </a>
              <a
                href={content.hero.secondaryButton.destination}
                className="btn-secondary !border-white !text-white hover:!bg-white/10"
                data-field="hero.secondaryButton"
              >
                {content.hero.secondaryButton.label}
              </a>
            </div>
          </div>
        </section>
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
        <FeaturedProducts
          heading={content.featuredProducts.heading || "Vårt utvalg"}
          products={products.slice(0, 3)}
          fieldPrefix="featuredProducts"
        />
      </PageSection>

      <PageSection>
        <StatsSection heading="Tillit bygget over tid" stats={content.stats} fieldPrefix="stats" />
      </PageSection>

      <PageSection>
          {/* Description here is a derived join of several feature items, so it
              isn't a single editable field — only the heading is wired for
              in-place editing; the underlying items are still editable via
              the "Funksjoner" section in the list panel. */}
        <FeatureWithImage
          heading={content.features.heading}
          description={content.features.items.map((f) => f.description).join(" ")}
          fieldPrefix="features"
          image={
            <Image
              src="/images/feature-salad.jpg"
              alt="Næringsrik mat"
              width={600}
              height={400}
              unoptimized
              className="rounded-xl object-cover"
            />
          }
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

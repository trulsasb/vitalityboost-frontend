import { PageShell } from "@/components/layout/PageShell";
import { PageSection } from "@/components/layout/PageSection";
import { PageContainer } from "@/components/layout/PageContainer";

import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductTitle } from "@/components/products/ProductTitle";
import { ProductPrice } from "@/components/products/ProductPrice";
import { ProductDescription } from "@/components/products/ProductDescription";
import { ProductHighlights } from "@/components/products/ProductHighlights";
import { ProductSpecifications } from "@/components/products/ProductSpecifications";
import { ProductFAQList } from "@/components/products/ProductFAQList";
import { ProductReviewList } from "@/components/products/ProductReviewList";
import { ProductQuantitySelector } from "@/components/products/ProductQuantitySelector";
import { ProductAddToCartButton } from "@/components/products/ProductAddToCartButton";
import { ProductStock } from "@/components/products/ProductStock";

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = {
    id: params.id,
    title: "Energy Boost",
    price: 299,
    description:
      "Naturlig energi uten krasj. Formulert for fokus, klarhet og stabil ytelse gjennom hele dagen.",
    images: [
      "/images/product-1.png",
      "/images/product-1b.png",
      "/images/product-1c.png",
    ],
    highlights: [
      "Naturlige ingredienser",
      "Ingen kunstige tilsetninger",
      "Stabil energi uten krasj",
    ],
    specifications: [
      { label: "Mengde", value: "60 kapsler" },
      { label: "Opprinnelse", value: "Norge" },
      { label: "Kategori", value: "Energi" },
    ],
    faq: [
      {
        question: "Når bør jeg ta produktet?",
        answer: "1 kapsel om morgenen eller før aktivitet.",
      },
      {
        question: "Er produktet vegansk?",
        answer: "Ja, alle ingrediensene er 100% veganske.",
      },
    ],
    reviews: [
      {
        author: "Marius",
        rating: 5,
        text: "Gir meg et skikkelig løft før jobb!",
      },
      {
        author: "Sara",
        rating: 4,
        text: "Mer fokus og mindre stress i hverdagen.",
      },
    ],
    stock: 42,
  };

  return (
    <PageShell>
      <PageSection>
        <PageContainer>
          <div className="grid gap-16 lg:grid-cols-2">

            {/* Left: Gallery */}
            <div>
              <ProductGallery images={product.images} />
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <ProductTitle>{product.title}</ProductTitle>
              <ProductPrice price={product.price} />
              <ProductDescription>{product.description}</ProductDescription>
              <ProductHighlights items={product.highlights} />
              <ProductSpecifications items={product.specifications} />
              <ProductStock stock={product.stock} />

              <div className="flex items-center gap-4">
                <ProductQuantitySelector />
                <ProductAddToCartButton productId={product.id} />
              </div>
            </div>
          </div>
        </PageContainer>
      </PageSection>

      {/* FAQ */}
      <PageSection>
        <PageContainer>
          <ProductFAQList items={product.faq} />
        </PageContainer>
      </PageSection>

      {/* Reviews */}
      <PageSection>
        <PageContainer>
          <ProductReviewList reviews={product.reviews} />
        </PageContainer>
      </PageSection>
    </PageShell>
  );
}

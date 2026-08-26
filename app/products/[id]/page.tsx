import PageSection from "@/components/layout/PageSection";
import PageContainer from "@/components/layout/PageContainer";
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import { ProductAddToCartButton } from "@/components/products/ProductAddToCartButton";
import type { Metadata } from "next";

interface ProductPageProps {
  params: {
    id: string;
  };
}

function metaDescription(description: string | null): string | undefined {
  if (!description) return undefined;
  return description.length > 155
    ? description.slice(0, 155).trimEnd() + "…"
    : description;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductById(params.id);

  if (!product) {
    return { title: "Produkt ikke funnet" };
  }

  const description = metaDescription(product.description);
  const image = product.images?.[0];

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    return notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    image: product.images,
    sku: String(product.id),
    offers: {
      "@type": "Offer",
      priceCurrency: "NOK",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    <PageSection>
      <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              {product.images && product.images.length > 0 ? (
                product.images.map((url: string) => (
                  <img
                    key={url}
                    src={url}
                    alt={product.name}
                    className="w-full rounded-lg shadow-md"
                  />
                ))
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg" />
              )}
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              <p className="text-3xl font-semibold text-gray-900">
                {product.price} kr
              </p>

              <ProductAddToCartButton
                productId={String(product.id)}
                title={product.name}
                price={product.price}
                image={product.images?.[0]}
                className="px-6 py-3 text-lg"
              />
            </div>
          </div>
      </PageContainer>
    </PageSection>
    </>
  );
}

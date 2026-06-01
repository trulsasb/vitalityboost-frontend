import PageShell from "@/components/layout/PageShell";
import PageSection from "@/components/layout/PageSection";
import PageContainer from "@/components/layout/PageContainer";
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    return notFound();
  }

  return (
    <PageShell>
      <PageSection>
        <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              {product.images && product.images.length > 0 ? (
                product.images.map((url) => (
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

              {product.description && (
                <p className="text-lg text-gray-700">{product.description}</p>
              )}

              <p className="text-3xl font-semibold text-gray-900">
                {product.price} kr
              </p>

              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg">
                Legg i handlekurv
              </button>
            </div>
          </div>
        </PageContainer>
      </PageSection>
    </PageShell>
  );
}

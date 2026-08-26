import PageSection from "@/components/layout/PageSection";
import PageContainer from "@/components/layout/PageContainer";
import Filters from "./Filters";
import { getProducts } from "@/lib/products";
import { ProductAddToCartButton } from "@/components/products/ProductAddToCartButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alle produkter",
  description:
    "Se hele utvalget av Vitalityboost sine kosttilskudd for longevity og sunn aldring.",
};

interface ProductsPageProps {
  searchParams: { sort?: string; tag?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const sort = searchParams.sort ?? "popular";
  const tag = searchParams.tag ?? "";

  let products = await getProducts();

  if (sort === "price-asc") {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    products = [...products].sort((a, b) => b.price - a.price);
  } else if (sort === "newest") {
    products = [...products].sort((a, b) => b.id - a.id);
  }

  return (
    <PageSection>
      <PageContainer>
          <div className="mb-8">
            <Filters sort={sort} tag={tag} />
          </div>

          {products.length === 0 ? (
            <p className="text-gray-600">Ingen produkter funnet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />

                  <h2 className="text-xl font-semibold">{product.name}</h2>

                  {product.description && (
                    <p className="text-gray-600 mt-2">{product.description}</p>
                  )}

                  <p className="text-lg font-bold mt-4">{product.price} kr</p>

                  <ProductAddToCartButton
                    productId={String(product.id)}
                    title={product.name}
                    price={product.price}
                    image={product.images?.[0]}
                    className="mt-4 w-full !bg-blue-600 hover:!bg-blue-700"
                  />
                </div>
              ))}
            </div>
          )}
      </PageContainer>
    </PageSection>
  );
}

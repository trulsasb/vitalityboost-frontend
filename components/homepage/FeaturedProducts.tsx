import Link from "next/link";
import { ProductAddToCartButton } from "@/components/products/ProductAddToCartButton";

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: string[];
}

export function FeaturedProducts({
  heading,
  products,
  compact = false,
}: {
  heading: string;
  products: Product[];
  compact?: boolean;
}) {
  if (products.length === 0) return null;

  return (
    <div>
      {heading && <h2 className="text-2xl font-bold text-gray-900 mb-6">{heading}</h2>}

      <div className={`grid grid-cols-2 ${compact ? "sm:grid-cols-4" : "sm:grid-cols-3"} gap-6`}>
        {products.map((product) => (
          <div
            key={product.id}
            className="border-2 border-field-dark bg-white rounded-lg p-4 shadow-sm hover:shadow-md hover:border-forest transition flex flex-col"
          >
            <Link href={`/products/${product.id}`}>
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
            </Link>
            <p className="text-lg font-bold mt-1 mb-3">{product.price} kr</p>
            <ProductAddToCartButton
              productId={String(product.id)}
              title={product.name}
              price={product.price}
              image={product.images?.[0]}
              className="mt-auto w-full text-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

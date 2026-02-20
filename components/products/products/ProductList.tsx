import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
  }[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          price={p.price}
          imageUrl={p.imageUrl}
        />
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import ProductList from "../components/ProductList";
import { Product } from "../types/Product";

export default function ProductFeedPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const data = await fetchProducts();
      setProducts(data);
    }
    load();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Produkter</h1>
      <ProductList products={products} />
    </div>
  );
}

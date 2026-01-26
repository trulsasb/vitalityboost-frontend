import { Product } from "../types/Product";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <div className="text-xl font-bold">{product.price} kr</div>
    </div>
  );
}

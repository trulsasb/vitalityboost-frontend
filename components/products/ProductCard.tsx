import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            Ingen bilde
          </div>
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-gray-700">{price} kr</p>
    </Link>
  );
}

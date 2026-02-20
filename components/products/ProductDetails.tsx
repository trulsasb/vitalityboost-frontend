import Image from "next/image";

interface ProductDetailsProps {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export function ProductDetails({
  name,
  description,
  price,
  imageUrl,
}: ProductDetailsProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="w-full overflow-hidden rounded-lg bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={800}
            height={800}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="flex h-64 items-center justify-center text-gray-400">
            Ingen bilde
          </div>
        )}
      </div>

      <h1 className="text-3xl font-semibold">{name}</h1>
      <p className="text-gray-700">{description}</p>
      <p className="text-xl font-medium">{price} kr</p>
    </div>
  );
}

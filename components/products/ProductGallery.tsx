import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
        Ingen bilder
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((src, i) => (
        <div key={i} className="overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={src}
            alt={`Produktbilde ${i + 1}`}
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

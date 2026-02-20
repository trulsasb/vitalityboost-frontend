import Image from "next/image";

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  if (!src) {
    return (
      <div className={`flex h-64 items-center justify-center rounded-lg bg-gray-100 text-gray-400 ${className}`}>
        Ingen bilde
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={800}
      className={`w-full h-auto object-cover rounded-lg ${className}`}
    />
  );
}

"use client";

import ProductImagePreview from "./ProductImagePreview";

type ProductImageListProps = {
  images: { url: string; id?: string }[];
  onRemove?: (id: string | number) => void;
};

export default function ProductImageList({ images, onRemove }: ProductImageListProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((img, index) => (
        <ProductImagePreview
          key={img.id ?? index}
          src={img.url}
          onRemove={onRemove ? () => onRemove(img.id ?? index) : undefined}
        />
      ))}
    </div>
  );
}

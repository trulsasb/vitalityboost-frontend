"use client";

import ProductImageContainer from "./ProductImageContainer";

type GridImage = {
  id?: string | number;
  url: string;
};

type ProductImageGridProps = {
  images: GridImage[];
  onRemove?: (id: string | number) => void;
  onMoveUp?: (id: string | number) => void;
  onMoveDown?: (id: string | number) => void;
};

export default function ProductImageGrid({
  images,
  onRemove,
  onMoveUp,
  onMoveDown,
}: ProductImageGridProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-6">
      {images.map((img, index) => (
        <ProductImageContainer
          key={img.id ?? index}
          id={img.id ?? index}
          url={img.url}
          onRemove={onRemove}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          disableUp={index === 0}
          disableDown={index === images.length - 1}
        />
      ))}
    </div>
  );
}

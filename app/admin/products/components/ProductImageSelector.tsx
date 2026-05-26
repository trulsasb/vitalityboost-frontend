"use client";

import ProductImageGrid from "./ProductImageGrid";
import ProductImageUpload from "./ProductImageUpload";
import ProductImageEmptyState from "./ProductImageEmptyState";

type ExistingImage = {
  id?: string | number;
  url: string;
};

type ProductImageSelectorProps = {
  existing?: ExistingImage[];
  onChange?: (uploaded: File[], removed: (string | number)[], reordered: ExistingImage[]) => void;
};

export default function ProductImageSelector({
  existing = [],
  onChange,
}: ProductImageSelectorProps) {
  let uploaded: File[] = [];
  const removed: (string | number)[] = [];
  let reordered: ExistingImage[] = existing;

  const handleUpload = (files: File[]) => {
    uploaded = files;
    onChange?.(uploaded, removed, reordered);
  };

  const handleRemove = (id: string | number) => {
    removed.push(id);
    onChange?.(uploaded, removed, reordered);
  };

  const handleReorder = (ordered: ExistingImage[]) => {
    reordered = ordered;
    onChange?.(uploaded, removed, reordered);
  };

  return (
    <div className="space-y-6">
      <ProductImageUpload onChange={handleUpload} />

      {existing.length === 0 ? (
        <ProductImageEmptyState />
      ) : (
        <ProductImageGrid
          images={existing}
          onRemove={handleRemove}
          onMoveUp={(id) => {
            const index = reordered.findIndex((i) => i.id === id);
            if (index > 0) {
              const updated = [...reordered];
              const [item] = updated.splice(index, 1);
              updated.splice(index - 1, 0, item);
              handleReorder(updated);
            }
          }}
          onMoveDown={(id) => {
            const index = reordered.findIndex((i) => i.id === id);
            if (index < reordered.length - 1) {
              const updated = [...reordered];
              const [item] = updated.splice(index, 1);
              updated.splice(index + 1, 0, item);
              handleReorder(updated);
            }
          }}
        />
      )}
    </div>
  );
}

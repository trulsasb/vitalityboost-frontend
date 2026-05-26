"use client";

import ProductImageUpload from "./ProductImageUpload";
import ProductImageList from "./ProductImageList";

type ProductImageManagerProps = {
  initialImages?: { url: string; id?: string }[];
  onChange?: (files: File[], removed: (string | number)[]) => void;
};

export default function ProductImageManager({
  initialImages = [],
  onChange,
}: ProductImageManagerProps) {
  const removed: (string | number)[] = [];
  let uploaded: File[] = [];

  const handleUploadChange = (files: File[]) => {
    uploaded = files;
    onChange?.(uploaded, removed);
  };

  const handleRemoveExisting = (id: string | number) => {
    removed.push(id);
    onChange?.(uploaded, removed);
  };

  return (
    <div className="space-y-6">
      <ProductImageUpload onChange={handleUploadChange} />

      {initialImages.length > 0 && (
        <ProductImageList images={initialImages} onRemove={handleRemoveExisting} />
      )}
    </div>
  );
}

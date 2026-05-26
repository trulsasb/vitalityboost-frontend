"use client";

import { useCallback, useRef, useState } from "react";
import ProductImagePreview from "./ProductImagePreview";

type UploadedImage = {
  file: File;
  previewUrl: string;
};

type ProductImageUploadProps = {
  onChange?: (files: File[]) => void;
};

export default function ProductImageUpload({ onChange }: ProductImageUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList) => {
      const newImages = Array.from(files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setImages((prev) => {
        const updated = [...prev, ...newImages];
        onChange?.(updated.map((i) => i.file));
        return updated;
      });
    },
    [onChange]
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onChange?.(updated.map((i) => i.file));
      return updated;
    });
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <p className="text-gray-600">Dra bilder hit eller klikk for å laste opp</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {images.map((img, i) => (
            <ProductImagePreview
              key={i}
              src={img.previewUrl}
              onRemove={() => removeImage(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

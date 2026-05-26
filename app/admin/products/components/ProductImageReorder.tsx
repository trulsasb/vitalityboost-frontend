"use client";

import { useState } from "react";
import ProductImagePreview from "./ProductImagePreview";

type ReorderImage = {
  id: string | number;
  url: string;
};

type ProductImageReorderProps = {
  images: ReorderImage[];
  onReorder?: (ordered: ReorderImage[]) => void;
};

export default function ProductImageReorder({ images, onReorder }: ProductImageReorderProps) {
  const [order, setOrder] = useState(images);

  const move = (from: number, to: number) => {
    const updated = [...order];
    const [item] = updated.splice(from, 1);
    updated.splice(to, 0, item);
    setOrder(updated);
    onReorder?.(updated);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {order.map((img, index) => (
        <div key={img.id} className="flex flex-col items-center">
          <ProductImagePreview src={img.url} />
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => move(index, index - 1)}
              className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-40"
            >
              Opp
            </button>
            <button
              type="button"
              disabled={index === order.length - 1}
              onClick={() => move(index, index + 1)}
              className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-40"
            >
              Ned
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

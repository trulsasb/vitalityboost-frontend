"use client";

import ProductImagePreview from "./ProductImagePreview";
import ProductImageActions from "./ProductImageActions";

type ProductImageContainerProps = {
  id?: string | number;
  url: string;
  onRemove?: (id: string | number) => void;
  onMoveUp?: (id: string | number) => void;
  onMoveDown?: (id: string | number) => void;
  disableUp?: boolean;
  disableDown?: boolean;
};

export default function ProductImageContainer({
  id,
  url,
  onRemove,
  onMoveUp,
  onMoveDown,
  disableUp,
  disableDown,
}: ProductImageContainerProps) {
  return (
    <div className="flex flex-col items-center">
      <ProductImagePreview src={url} />
      <ProductImageActions
        onRemove={onRemove ? () => onRemove(id!) : undefined}
        onMoveUp={onMoveUp ? () => onMoveUp(id!) : undefined}
        onMoveDown={onMoveDown ? () => onMoveDown(id!) : undefined}
        disableUp={disableUp}
        disableDown={disableDown}
      />
    </div>
  );
}

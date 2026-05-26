"use client";

type ProductImageSortHandleProps = {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  disableUp?: boolean;
  disableDown?: boolean;
};

export default function ProductImageSortHandle({
  onMoveUp,
  onMoveDown,
  disableUp,
  disableDown,
}: ProductImageSortHandleProps) {
  return (
    <div className="flex gap-2 mt-2">
      <button
        type="button"
        disabled={disableUp}
        onClick={onMoveUp}
        className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-40"
      >
        Opp
      </button>
      <button
        type="button"
        disabled={disableDown}
        onClick={onMoveDown}
        className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-40"
      >
        Ned
      </button>
    </div>
  );
}

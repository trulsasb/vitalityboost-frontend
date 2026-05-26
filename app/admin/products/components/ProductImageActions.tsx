"use client";

type ProductImageActionsProps = {
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  disableUp?: boolean;
  disableDown?: boolean;
};

export default function ProductImageActions({
  onRemove,
  onMoveUp,
  onMoveDown,
  disableUp,
  disableDown,
}: ProductImageActionsProps) {
  return (
    <div className="flex gap-2 mt-2">
      {onMoveUp && (
        <button
          type="button"
          disabled={disableUp}
          onClick={onMoveUp}
          className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-40"
        >
          Opp
        </button>
      )}

      {onMoveDown && (
        <button
          type="button"
          disabled={disableDown}
          onClick={onMoveDown}
          className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-40"
        >
          Ned
        </button>
      )}

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="px-2 py-1 text-xs bg-red-600 text-white rounded"
        >
          Slett
        </button>
      )}
    </div>
  );
}

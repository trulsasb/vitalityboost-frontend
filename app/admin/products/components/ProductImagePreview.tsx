"use client";

type ProductImagePreviewProps = {
  src: string;
  alt?: string;
  onRemove?: () => void;
};

export default function ProductImagePreview({
  src,
  alt,
  onRemove,
}: ProductImagePreviewProps) {
  return (
    <div className="relative group">
      <img
        src={src}
        alt={alt || "Product image"}
        className="w-32 h-32 object-cover rounded border"
      />

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
        >
          Slett
        </button>
      )}
    </div>
  );
}

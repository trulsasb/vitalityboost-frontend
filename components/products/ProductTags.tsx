interface ProductTagsProps {
  tags: string[];
  className?: string;
}

export function ProductTags({ tags, className = "" }: ProductTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

interface ProductBadgeListProps {
  badges: string[];
  className?: string;
}

export function ProductBadgeList({ badges, className = "" }: ProductBadgeListProps) {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((badge, i) => (
        <span
          key={i}
          className="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}

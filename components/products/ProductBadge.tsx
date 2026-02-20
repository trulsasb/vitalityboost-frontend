interface ProductBadgeProps {
  label: string;
  className?: string;
}

export function ProductBadge({ label, className = "" }: ProductBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white ${className}`}
    >
      {label}
    </span>
  );
}

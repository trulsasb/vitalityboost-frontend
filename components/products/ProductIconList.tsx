interface ProductIconListProps {
  items: {
    icon: React.ReactNode;
    label: string;
  }[];
  className?: string;
}

export function ProductIconList({ items, className = "" }: ProductIconListProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
          <span className="text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

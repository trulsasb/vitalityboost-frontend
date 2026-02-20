interface ProductSectionHeaderProps {
  title: string;
  className?: string;
}

export function ProductSectionHeader({ title, className = "" }: ProductSectionHeaderProps) {
  return (
    <h2 className={`text-xl font-semibold text-gray-900 mb-3 ${className}`}>
      {title}
    </h2>
  );
}

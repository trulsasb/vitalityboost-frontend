interface ProductCategoryProps {
  category: string;
  className?: string;
}

export function ProductCategory({ category, className = "" }: ProductCategoryProps) {
  return (
    <span className={`text-sm text-gray-500 ${className}`}>
      {category}
    </span>
  );
}

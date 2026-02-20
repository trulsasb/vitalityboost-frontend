interface ProductBrandProps {
  brand: string;
  className?: string;
}

export function ProductBrand({ brand, className = "" }: ProductBrandProps) {
  return (
    <span className={`text-sm text-gray-600 ${className}`}>
      {brand}
    </span>
  );
}

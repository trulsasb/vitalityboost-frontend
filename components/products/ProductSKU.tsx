interface ProductSKUProps {
  sku: string;
  className?: string;
}

export function ProductSKU({ sku, className = "" }: ProductSKUProps) {
  return (
    <span className={`text-xs text-gray-400 ${className}`}>
      SKU: {sku}
    </span>
  );
}

interface ProductStockProps {
  inStock: boolean;
  className?: string;
}

export function ProductStock({ inStock, className = "" }: ProductStockProps) {
  return (
    <span
      className={`text-sm font-medium ${
        inStock ? "text-green-600" : "text-red-600"
      } ${className}`}
    >
      {inStock ? "På lager" : "Ikke på lager"}
    </span>
  );
}

interface ProductPriceProps {
  price: number;
  className?: string;
}

export function ProductPrice({ price, className = "" }: ProductPriceProps) {
  return (
    <p className={`text-lg font-semibold text-gray-900 ${className}`}>
      {price} kr
    </p>
  );
}

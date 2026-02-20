interface ProductAddToCartButtonProps {
  onClick: () => void;
  className?: string;
}

export function ProductAddToCartButton({
  onClick,
  className = "",
}: ProductAddToCartButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded bg-black px-4 py-2 text-white text-sm font-medium hover:bg-gray-800 ${className}`}
    >
      Legg i handlekurv
    </button>
  );
}

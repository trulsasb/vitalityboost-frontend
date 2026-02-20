interface ProductDividerProps {
  className?: string;
}

export function ProductDivider({ className = "" }: ProductDividerProps) {
  return (
    <hr className={`border-gray-200 my-4 ${className}`} />
  );
}

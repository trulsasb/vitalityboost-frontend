interface ProductTitleProps {
  children: string;
  className?: string;
}

export function ProductTitle({ children, className = "" }: ProductTitleProps) {
  return (
    <h1 className={`text-2xl font-semibold text-gray-900 ${className}`}>
      {children}
    </h1>
  );
}

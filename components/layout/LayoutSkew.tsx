interface LayoutSkewProps {
  children: React.ReactNode;
  x?: string;
  y?: string;
  className?: string;
}

export function LayoutSkew({
  children,
  x = "0",
  y = "0",
  className = "",
}: LayoutSkewProps) {
  return (
    <div className={`skew-x-${x} skew-y-${y} ${className}`}>
      {children}
    </div>
  );
}

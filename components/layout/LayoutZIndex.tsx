interface LayoutZIndexProps {
  children: React.ReactNode;
  z?: number;
  className?: string;
}

export function LayoutZIndex({
  children,
  z = 10,
  className = "",
}: LayoutZIndexProps) {
  return (
    <div className={`z-${z} ${className}`}>
      {children}
    </div>
  );
}

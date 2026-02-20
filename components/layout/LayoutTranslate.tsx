interface LayoutTranslateProps {
  children: React.ReactNode;
  x?: string;
  y?: string;
  className?: string;
}

export function LayoutTranslate({
  children,
  x = "0",
  y = "0",
  className = "",
}: LayoutTranslateProps) {
  return (
    <div className={`translate-x-${x} translate-y-${y} ${className}`}>
      {children}
    </div>
  );
}


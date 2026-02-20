interface LayoutStickyProps {
  children: React.ReactNode;
  top?: string;
  className?: string;
}

export function LayoutSticky({
  children,
  top = "top-0",
  className = "",
}: LayoutStickyProps) {
  return (
    <div className={`sticky ${top} ${className}`}>
      {children}
    </div>
  );
}

interface LayoutOpacityProps {
  children: React.ReactNode;
  value?: number;
  className?: string;
}

export function LayoutOpacity({
  children,
  value = 100,
  className = "",
}: LayoutOpacityProps) {
  return (
    <div className={`opacity-${value} ${className}`}>
      {children}
    </div>
  );
}

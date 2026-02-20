interface LayoutScaleProps {
  children: React.ReactNode;
  value?: number;
  className?: string;
}

export function LayoutScale({
  children,
  value = 100,
  className = "",
}: LayoutScaleProps) {
  return (
    <div className={`scale-${value} ${className}`}>
      {children}
    </div>
  );
}

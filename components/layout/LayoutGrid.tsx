interface LayoutGridProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutGrid({ children, className = "" }: LayoutGridProps) {
  return (
    <div className={`grid gap-6 ${className}`}>
      {children}
    </div>
  );
}

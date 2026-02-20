interface LayoutStackProps {
  children: React.ReactNode;
  gap?: string;
  className?: string;
}

export function LayoutStack({
  children,
  gap = "gap-6",
  className = "",
}: LayoutStackProps) {
  return (
    <div className={`flex flex-col ${gap} ${className}`}>
      {children}
    </div>
  );
}

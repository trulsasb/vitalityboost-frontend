interface LayoutVStackProps {
  children: React.ReactNode;
  spacing?: string;
  className?: string;
}

export function LayoutVStack({
  children,
  spacing = "space-y-6",
  className = "",
}: LayoutVStackProps) {
  return (
    <div className={`${spacing} ${className}`}>
      {children}
    </div>
  );
}

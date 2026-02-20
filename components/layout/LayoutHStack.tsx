interface LayoutHStackProps {
  children: React.ReactNode;
  spacing?: string;
  className?: string;
}

export function LayoutHStack({
  children,
  spacing = "space-x-6",
  className = "",
}: LayoutHStackProps) {
  return (
    <div className={`flex flex-row ${spacing} ${className}`}>
      {children}
    </div>
  );
}

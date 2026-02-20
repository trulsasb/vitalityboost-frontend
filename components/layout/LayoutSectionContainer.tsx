interface LayoutSectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutSectionContainer({
  children,
  className = "",
}: LayoutSectionContainerProps) {
  return (
    <div className={`w-full max-w-5xl mx-auto py-6 px-4 ${className}`}>
      {children}
    </div>
  );
}

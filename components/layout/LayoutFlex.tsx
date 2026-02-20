interface LayoutFlexProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutFlex({ children, className = "" }: LayoutFlexProps) {
  return (
    <div className={`flex ${className}`}>
      {children}
    </div>
  );
}

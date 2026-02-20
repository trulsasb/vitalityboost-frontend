interface LayoutContentProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutContent({ children, className = "" }: LayoutContentProps) {
  return (
    <div className={`flex-1 w-full ${className}`}>
      {children}
    </div>
  );
}

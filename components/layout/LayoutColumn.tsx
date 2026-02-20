interface LayoutColumnProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutColumn({ children, className = "" }: LayoutColumnProps) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {children}
    </div>
  );
}

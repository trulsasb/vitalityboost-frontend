interface LayoutRowProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutRow({ children, className = "" }: LayoutRowProps) {
  return (
    <div className={`flex flex-row w-full ${className}`}>
      {children}
    </div>
  );
}

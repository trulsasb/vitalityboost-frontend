interface LayoutCenterProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutCenter({ children, className = "" }: LayoutCenterProps) {
  return (
    <div className={`flex justify-center items-center w-full ${className}`}>
      {children}
    </div>
  );
}

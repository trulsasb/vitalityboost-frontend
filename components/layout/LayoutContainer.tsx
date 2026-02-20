interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutContainer({ children, className = "" }: LayoutContainerProps) {
  return (
    <div className={`w-full mx-auto flex flex-col ${className}`}>
      {children}
    </div>
  );
}

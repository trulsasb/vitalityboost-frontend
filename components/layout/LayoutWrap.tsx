interface LayoutWrapProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutWrap({ children, className = "" }: LayoutWrapProps) {
  return (
    <div className={`flex flex-wrap w-full ${className}`}>
      {children}
    </div>
  );
}

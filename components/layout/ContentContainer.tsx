interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentContainer({ children, className = "" }: ContentContainerProps) {
  return (
    <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}

interface PageContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContentContainer({ children, className = "" }: PageContentContainerProps) {
  return (
    <div className={`max-w-4xl mx-auto w-full ${className}`}>
      {children}
    </div>
  );
}

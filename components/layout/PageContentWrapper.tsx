interface PageContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContentWrapper({ children, className = "" }: PageContentWrapperProps) {
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}

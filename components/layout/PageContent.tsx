interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContent({ children, className = "" }: PageContentProps) {
  return (
    <div className={`w-full max-w-5xl mx-auto py-6 px-4 ${className}`}>
      {children}
    </div>
  );
}

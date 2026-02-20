interface ProductPageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ProductPageLayout({ children, className = "" }: ProductPageLayoutProps) {
  return (
    <div className={`max-w-5xl mx-auto px-4 py-8 ${className}`}>
      {children}
    </div>
  );
}

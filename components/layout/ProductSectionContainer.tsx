interface ProductSectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ProductSectionContainer({ children, className = "" }: ProductSectionContainerProps) {
  return (
    <section className={`mb-8 ${className}`}>
      {children}
    </section>
  );
}

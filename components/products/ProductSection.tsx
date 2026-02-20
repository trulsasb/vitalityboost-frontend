interface ProductSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ProductSection({ title, children, className = "" }: ProductSectionProps) {
  return (
    <section className={`space-y-2 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="text-sm text-gray-700">{children}</div>
    </section>
  );
}

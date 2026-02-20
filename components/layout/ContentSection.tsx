interface ContentSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentSection({ title, children, className = "" }: ContentSectionProps) {
  return (
    <section className={`mb-10 ${className}`}>
      {title && (
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}


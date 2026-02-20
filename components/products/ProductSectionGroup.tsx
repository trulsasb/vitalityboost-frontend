interface ProductSectionGroupProps {
  sections: {
    title: string;
    content: React.ReactNode;
  }[];
  className?: string;
}

export function ProductSectionGroup({ sections, className = "" }: ProductSectionGroupProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {sections.map((section, i) => (
        <section key={i} className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
          <div className="text-sm text-gray-700">{section.content}</div>
        </section>
      ))}
    </div>
  );
}

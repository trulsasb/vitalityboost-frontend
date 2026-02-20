interface ProductAccordionGroupProps {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
  className?: string;
}

export function ProductAccordionGroup({ items, className = "" }: ProductAccordionGroupProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, i) => (
        <div key={i} className="border-b py-3">
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between text-gray-900 font-medium">
              {item.title}
              <span className="text-gray-500 group-open:hidden">+</span>
              <span className="text-gray-500 hidden group-open:inline">−</span>
            </summary>
            <div className="mt-2 text-sm text-gray-700">{item.content}</div>
          </details>
        </div>
      ))}
    </div>
  );
}

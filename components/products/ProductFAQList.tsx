interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQListProps {
  items: FAQItem[];
  className?: string;
}

export function ProductFAQList({ items, className = "" }: ProductFAQListProps) {
  if (!items || items.length === 0) {
    return <p className={`text-sm text-gray-500 ${className}`}>Ingen spørsmål enda</p>;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, i) => (
        <details key={i} className="group border-b pb-3">
          <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-900">
            {item.question}
            <span className="text-gray-500 group-open:hidden">+</span>
            <span className="text-gray-500 hidden group-open:inline">−</span>
          </summary>
          <p className="mt-2 text-sm text-gray-700">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

interface ProductFAQItemProps {
  question: string;
  answer: string;
  className?: string;
}

export function ProductFAQItem({ question, answer, className = "" }: ProductFAQItemProps) {
  return (
    <details className={`group border-b pb-3 ${className}`}>
      <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-900">
        {question}
        <span className="text-gray-500 group-open:hidden">+</span>
        <span className="text-gray-500 hidden group-open:inline">−</span>
      </summary>
      <p className="mt-2 text-sm text-gray-700">{answer}</p>
    </details>
  );
}

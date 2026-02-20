interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  heading?: string;
  subheading?: string;
  items: FAQItem[];
  className?: string;
}

export function FAQ({
  heading,
  subheading,
  items,
  className = "",
}: FAQProps) {
  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto px-4 max-w-3xl">

        {heading && (
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            {heading}
          </h2>
        )}

        {subheading && (
          <p className="mt-3 text-lg text-gray-600 text-center">
            {subheading}
          </p>
        )}

        <div className="mt-12 space-y-8">
          {items.map((item, i) => (
            <div key={i}>
              <h3 className="text-xl font-semibold text-gray-900">
                {item.question}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

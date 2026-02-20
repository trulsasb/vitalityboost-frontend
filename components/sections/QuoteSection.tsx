interface QuoteSectionProps {
  quote: string;
  author?: string;
  role?: string;
  className?: string;
}

export function QuoteSection({
  quote,
  author,
  role,
  className = "",
}: QuoteSectionProps) {
  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto px-4 max-w-3xl text-center">

        <blockquote className="text-2xl md:text-3xl font-semibold text-gray-900 italic">
          “{quote}”
        </blockquote>

        {author && (
          <div className="mt-6 text-gray-900 font-medium">
            {author}
          </div>
        )}

        {role && (
          <div className="text-gray-600 text-sm">
            {role}
          </div>
        )}

      </div>
    </section>
  );
}

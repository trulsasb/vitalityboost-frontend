interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  avatar?: React.ReactNode;
  hidden?: boolean;
}

interface TestimonialsProps {
  heading?: string;
  subheading?: string;
  items?: Testimonial[];
  testimonials?: Testimonial[];
  className?: string;
  fieldPrefix?: string;
}

export function Testimonials({
  heading,
  subheading,
  items,
  testimonials,
  className = "",
  fieldPrefix,
}: TestimonialsProps) {
  const list = items ?? testimonials ?? [];

  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto px-4 max-w-4xl text-center">

        {heading && (
          <h2
            className="text-3xl font-bold text-gray-900"
            data-field={fieldPrefix ? `${fieldPrefix}.heading` : undefined}
          >
            {heading}
          </h2>
        )}

        {subheading && (
          <p className="mt-3 text-lg text-gray-600">
            {subheading}
          </p>
        )}

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          {list.map((item, i) => {
            if (item.hidden) return null;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center"
                data-field={fieldPrefix ? `${fieldPrefix}.items.${i}` : undefined}
              >
                {item.avatar && <div className="mb-4">{item.avatar}</div>}

                <blockquote className="text-gray-700 italic">“{item.quote}”</blockquote>

                <div className="mt-4 font-semibold text-gray-900">{item.author}</div>

                {item.role && <div className="text-sm text-gray-500">{item.role}</div>}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

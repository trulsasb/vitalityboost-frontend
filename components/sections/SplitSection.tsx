interface SplitSectionProps {
  heading?: string;
  subheading?: string;
  content: React.ReactNode;
  image: React.ReactNode;
  reverse?: boolean;
  className?: string;
}

export function SplitSection({
  heading,
  subheading,
  content,
  image,
  reverse = false,
  className = "",
}: SplitSectionProps) {
  return (
    <section className={`w-full py-20 ${className}`}>
      <div
        className={`container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div>
          {heading && (
            <h2 className="text-3xl font-bold text-gray-900">
              {heading}
            </h2>
          )}

          {subheading && (
            <p className="mt-3 text-lg text-gray-600 max-w-lg">
              {subheading}
            </p>
          )}

          <div className="mt-6 text-gray-700 text-base leading-relaxed">
            {content}
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          {image}
        </div>
      </div>
    </section>
  );
}

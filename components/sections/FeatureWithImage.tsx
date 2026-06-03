interface FeatureWithImageProps {
  heading?: string;
  title?: string; // Backwards compatibility
  description: string;
  image: React.ReactNode;
  reverse?: boolean;
  cta?: React.ReactNode;
  className?: string;
}

export function FeatureWithImage({
  heading,
  title,
  description,
  image,
  reverse = false,
  cta,
  className = "",
}: FeatureWithImageProps) {
  const displayTitle = heading ?? title;

  return (
    <section className={`w-full py-20 ${className}`}>
      <div
        className={`container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {displayTitle}
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-lg">
            {description}
          </p>

          {cta && <div className="mt-8">{cta}</div>}
        </div>

        <div className="flex justify-center md:justify-end">
          {image}
        </div>
      </div>
    </section>
  );
}

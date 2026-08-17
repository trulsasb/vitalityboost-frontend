interface HeroProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: React.ReactNode;
  ctaSecondary?: React.ReactNode;
  image?: React.ReactNode;
  className?: string;
  // Optional data-field path prefix for the admin content editor to locate
  // this text in the DOM. Has no effect when omitted (public pages).
  fieldPrefix?: string;
}

export function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  image,
  className = "",
  fieldPrefix,
}: HeroProps) {
  return (
    <section className={`w-full py-20 md:py-28 ${className}`}>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900"
            data-field={fieldPrefix ? `${fieldPrefix}.title` : undefined}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="mt-4 text-lg text-gray-600 max-w-lg"
              data-field={fieldPrefix ? `${fieldPrefix}.subtitle` : undefined}
            >
              {subtitle}
            </p>
          )}

          {(ctaPrimary || ctaSecondary) && (
            <div className="mt-8 flex gap-4">
              {ctaPrimary}
              {ctaSecondary}
            </div>
          )}
        </div>

        {image && (
          <div className="flex justify-center md:justify-end">
            {image}
          </div>
        )}
      </div>
    </section>
  );
}

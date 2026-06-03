interface HeroProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: React.ReactNode;
  ctaSecondary?: React.ReactNode;
  image?: React.ReactNode;
  className?: string;
}

export function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  image,
  className = "",
}: HeroProps) {
  return (
    <section className={`w-full py-20 md:py-28 ${className}`}>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-lg text-gray-600 max-w-lg">
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

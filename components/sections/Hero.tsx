interface HeroProps {
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
  image?: React.ReactNode;
  className?: string;
}

export function Hero({
  title,
  subtitle,
  cta,
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

          {cta && <div className="mt-8">{cta}</div>}
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

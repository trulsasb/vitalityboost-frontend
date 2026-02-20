interface CTASectionProps {
  title: string;
  description?: string;
  cta: React.ReactNode;
  className?: string;
}

export function CTASection({
  title,
  description,
  cta,
  className = "",
}: CTASectionProps) {
  return (
    <section className={`w-full py-20 text-center ${className}`}>
      <div className="container mx-auto px-4 max-w-2xl">
        
        <h2 className="text-3xl font-bold text-gray-900">
          {title}
        </h2>

        {description && (
          <p className="mt-4 text-lg text-gray-600">
            {description}
          </p>
        )}

        <div className="mt-8 flex justify-center">
          {cta}
        </div>

      </div>
    </section>
  );
}

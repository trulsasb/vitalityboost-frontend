interface CalloutProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  cta?: React.ReactNode;
  className?: string;
}

export function Callout({
  title,
  description,
  icon,
  cta,
  className = "",
}: CalloutProps) {
  return (
    <section className={`w-full py-16 ${className}`}>
      <div className="container mx-auto px-4 max-w-3xl text-center">

        {icon && (
          <div className="flex justify-center mb-4 text-gray-700">
            {icon}
          </div>
        )}

        <h2 className="text-3xl font-bold text-gray-900">
          {title}
        </h2>

        {description && (
          <p className="mt-4 text-lg text-gray-600">
            {description}
          </p>
        )}

        {cta && (
          <div className="mt-8 flex justify-center">
            {cta}
          </div>
        )}

      </div>
    </section>
  );
}

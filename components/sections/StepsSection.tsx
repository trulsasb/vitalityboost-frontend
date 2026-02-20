interface StepItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface StepsSectionProps {
  heading?: string;
  subheading?: string;
  steps: StepItem[];
  className?: string;
}

export function StepsSection({
  heading,
  subheading,
  steps,
  className = "",
}: StepsSectionProps) {
  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto px-4 max-w-4xl">

        {heading && (
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            {heading}
          </h2>
        )}

        {subheading && (
          <p className="mt-3 text-lg text-gray-600 text-center max-w-2xl mx-auto">
            {subheading}
          </p>
        )}

        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              {step.icon && (
                <div className="flex justify-center mb-4 text-gray-700">
                  {step.icon}
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-2 text-gray-600 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

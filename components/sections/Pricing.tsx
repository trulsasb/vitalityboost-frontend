interface PricingTier {
  name: string;
  price: string;
  description?: string;
  features: string[];
  cta: React.ReactNode;
  highlighted?: boolean;
}

interface PricingProps {
  heading?: string;
  subheading?: string;
  tiers?: PricingTier[];
  plans?: PricingTier[];
  className?: string;
}

export function Pricing({
  heading,
  subheading,
  tiers,
  plans,
  className = "",
}: PricingProps) {
  const list = tiers ?? plans ?? [];

  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto px-4 text-center max-w-5xl">

        {heading && (
          <h2 className="text-3xl font-bold text-gray-900">
            {heading}
          </h2>
        )}

        {subheading && (
          <p className="mt-3 text-lg text-gray-600">
            {subheading}
          </p>
        )}

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {list.map((tier, i) => (
            <div
              key={i}
              className={`border rounded-lg p-8 text-left ${
                tier.highlighted
                  ? "border-gray-900 shadow-xl"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {tier.name}
              </h3>

              <div className="mt-4 text-4xl font-bold text-gray-900">
                {tier.price}
              </div>

              {tier.description && (
                <p className="mt-2 text-gray-600 text-sm">
                  {tier.description}
                </p>
              )}

              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                {tier.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-gray-900">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">{tier.cta}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

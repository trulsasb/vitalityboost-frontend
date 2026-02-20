interface LogoCloudProps {
  heading?: string;
  logos: React.ReactNode[];
  className?: string;
}

export function LogoCloud({
  heading,
  logos,
  className = "",
}: LogoCloudProps) {
  return (
    <section className={`w-full py-16 ${className}`}>
      <div className="container mx-auto px-4 text-center">

        {heading && (
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            {heading}
          </h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-80">
          {logos.map((logo, i) => (
            <div key={i} className="flex justify-center">
              {logo}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

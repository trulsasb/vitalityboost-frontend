interface GalleryProps {
  heading?: string;
  subheading?: string;
  images: React.ReactNode[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function Gallery({
  heading,
  subheading,
  images,
  columns = 3,
  className = "",
}: GalleryProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto px-4">

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

        <div className={`mt-12 grid gap-6 ${gridCols[columns]}`}>
          {images.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-lg">
              {img}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

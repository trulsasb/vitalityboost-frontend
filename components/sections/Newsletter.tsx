interface NewsletterProps {
  heading: string;
  subheading?: string;
  onSubmit: (email: string) => void;
  className?: string;
}

export function Newsletter({
  heading,
  subheading,
  onSubmit,
  className = "",
}: NewsletterProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    onSubmit(email);
    form.reset();
  }

  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto px-4 max-w-lg text-center">

        <h2 className="text-3xl font-bold text-gray-900">
          {heading}
        </h2>

        {subheading && (
          <p className="mt-3 text-lg text-gray-600">
            {subheading}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
          <input
            type="email"
            name="email"
            required
            placeholder="Din e‑postadresse"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-900"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white rounded-md font-medium"
          >
            Meld meg på
          </button>
        </form>

      </div>
    </section>
  );
}

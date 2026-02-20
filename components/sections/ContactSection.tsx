interface ContactSectionProps {
  heading: string;
  subheading?: string;
  onSubmit: (data: { name: string; email: string; message: string }) => void;
  className?: string;
}

export function ContactSection({
  heading,
  subheading,
  onSubmit,
  className = "",
}: ContactSectionProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    onSubmit({ name, email, message });
    form.reset();
  }

  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto px-4 max-w-xl">

        <h2 className="text-3xl font-bold text-gray-900 text-center">
          {heading}
        </h2>

        {subheading && (
          <p className="mt-3 text-lg text-gray-600 text-center">
            {subheading}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <input
            type="text"
            name="name"
            required
            placeholder="Navn"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="E‑post"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900"
          />

          <textarea
            name="message"
            required
            placeholder="Melding"
            rows={5}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gray-900 text-white rounded-md font-medium"
          >
            Send melding
          </button>
        </form>

      </div>
    </section>
  );
}

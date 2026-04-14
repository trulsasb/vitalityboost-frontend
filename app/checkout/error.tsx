"use client";

export default function ErrorPage() {
  return (
    <div className="max-w-xl mx-auto py-24 text-center">
      <div className="mx-auto mb-8 h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
        <span className="text-red-600 text-4xl">!</span>
      </div>

      <h1 className="text-4xl font-semibold mb-6">Noe gikk galt</h1>

      <p className="text-gray-600 text-lg mb-10">
        Det oppstod en feil under behandlingen av forespørselen. Dette kan være midlertidig.
        Prøv igjen, eller gå tilbake til kassen.
      </p>

      <div className="flex justify-center gap-4">
        <a
          href="/checkout"
          className="bg-black text-white px-6 py-3 rounded-lg text-lg"
        >
          Tilbake til kassen
        </a>

        <a
          href="/"
          className="bg-gray-200 text-black px-6 py-3 rounded-lg text-lg"
        >
          Til forsiden
        </a>
      </div>
    </div>
  );
}

"use client";

export default function CheckoutError({ error }: { error: Error }) {
  return (
    <div className="max-w-xl mx-auto py-24 text-center">
      <h1 className="text-4xl font-semibold mb-6">Noe gikk galt</h1>

      <p className="text-gray-600 text-lg mb-10">
        Det oppstod en feil under behandlingen av bestillingen.
      </p>

      <pre className="bg-gray-100 text-left p-4 rounded-lg text-sm overflow-auto mb-10">
        {error.message}
      </pre>

      <a
        href="/checkout"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg text-lg"
      >
        Prøv igjen
      </a>
    </div>
  );
}

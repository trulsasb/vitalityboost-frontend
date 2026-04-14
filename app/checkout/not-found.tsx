export default function CheckoutNotFound() {
  return (
    <div className="max-w-xl mx-auto py-24 text-center">
      <div className="mx-auto mb-8 h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-700 text-4xl">?</span>
      </div>

      <h1 className="text-4xl font-semibold mb-6">Siden finnes ikke</h1>

      <p className="text-gray-600 text-lg mb-10">
        Denne siden er ikke tilgjengelig i checkout‑flyten. Det kan være en feil i adressen.
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

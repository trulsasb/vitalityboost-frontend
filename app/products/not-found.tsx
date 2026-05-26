export default function ProductsNotFound() {
  return (
    <div className="p-12 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Ingen produkter funnet
      </h1>

      <p className="text-gray-600 mb-8">
        Vi fant ingen produkter som matcher søket ditt. Prøv å endre filter eller gå tilbake til oversikten.
      </p>

      <a
        href="/products"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Tilbake til produkter
      </a>
    </div>
  );
}

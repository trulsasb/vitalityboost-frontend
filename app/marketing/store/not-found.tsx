export default function MarketingStoreNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-3xl font-semibold mb-4">Fant ikke siden</h1>
      <p className="text-gray-600 mb-6">
        Butikksiden du leter etter finnes ikke.
      </p>
      <a
        href="/marketing/store"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Tilbake til butikken
      </a>
    </div>
  );
}

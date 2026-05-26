export default function AdminAnalyticsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-3xl font-semibold mb-4">Fant ikke analysedata</h1>
      <p className="text-gray-600 mb-6">
        Siden du prøver å åpne finnes ikke eller er ikke tilgjengelig.
      </p>
      <a
        href="/admin/analytics"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Tilbake til analyser
      </a>
    </div>
  );
}

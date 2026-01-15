export default function Dashboard() {
  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold">Admin – oversikt</h1>

      {/* Statuskort */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-sm text-gray-600 mb-1">Dagens ordre</h2>
          <p className="text-2xl font-semibold">0</p>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-sm text-gray-600 mb-1">Omsetning i dag</h2>
          <p className="text-2xl font-semibold">0 kr</p>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-sm text-gray-600 mb-1">Betalinger med feil</h2>
          <p className="text-2xl font-semibold">0</p>
        </div>
      </div>

      {/* Informasjon */}
      <div className="border rounded-lg p-6 bg-gray-50 max-w-3xl">
        <h2 className="text-lg font-semibold mb-2">Status</h2>
        <p>
          Nettbutikken er aktiv. Ingen registrerte feil i betalings- eller
          ordreflyt.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Denne oversikten oppdateres automatisk når backend kobles til.
        </p>
      </div>
    </section>
  );
}

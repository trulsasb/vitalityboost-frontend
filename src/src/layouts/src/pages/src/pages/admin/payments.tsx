export default function Payments() {
  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold">Betalinger</h1>

      {/* Betalingsoversikt */}
      <div className="border rounded-lg overflow-hidden bg-white max-w-4xl">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3">Dato</th>
              <th className="px-4 py-3">Ordre</th>
              <th className="px-4 py-3">Beløp</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-3">–</td>
              <td className="px-4 py-3">–</td>
              <td className="px-4 py-3">–</td>
              <td className="px-4 py-3 text-gray-500">Ingen data</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Statusforklaring */}
      <div className="border rounded-lg p-6 bg-gray-50 max-w-3xl">
        <h2 className="text-lg font-semibold mb-2">Statusinformasjon</h2>
        <p>
          Her vises alle betalinger som er gjennomført i nettbutikken. Du får
          oversikt over vellykkede betalinger, avbrutte forsøk og eventuelle
          feil.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Informasjonen oppdateres automatisk når betalingsløsningene er fullt
          koblet til.
        </p>
      </div>
    </section>
  );
}

export default function Products() {
  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold">Produkter</h1>

      {/* Produktliste */}
      <div className="border rounded-lg overflow-hidden bg-white max-w-4xl">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3">Navn</th>
              <th className="px-4 py-3">Pris</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-3 font-medium">
                VitalityBoost – Daglig støtte
              </td>
              <td className="px-4 py-3">499 kr</td>
              <td className="px-4 py-3 text-green-700">Aktiv</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Handlinger */}
      <div>
        <button className="bg-green-700 text-white px-5 py-3 rounded-md text-lg hover:bg-green-800">
          Legg til nytt produkt
        </button>
      </div>

      {/* Forklaring */}
      <div className="text-sm text-gray-600 max-w-3xl">
        Her administrerer du produktene som vises i nettbutikken. Du kan legge
        til, endre eller deaktivere produkter etter behov.
      </div>
    </section>
  );
}

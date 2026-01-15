export default function Shop() {
  return (
    <section className="space-y-8">
      {/* Tittel */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">
          Kosttilskudd for sunn aldring
        </h1>
        <p>
          Her finner du våre nøye utvalgte produkter. Hvert produkt er utviklet
          med fokus på kvalitet, trygghet og enkel bruk.
        </p>
      </div>

      {/* Produktkort (én visning – klar for backend senere) */}
      <div className="border border-gray-200 rounded-lg p-6 max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">
          VitalityBoost – Daglig støtte
        </h2>

        <p className="mb-4">
          Et balansert kosttilskudd for deg som ønsker å støtte energi, immunforsvar
          og generell vitalitet i hverdagen.
        </p>

        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Utviklet for voksne over 40 år</li>
          <li>Enkel daglig dosering</li>
          <li>Produsert etter strenge kvalitetskrav</li>
        </ul>

        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">
            499 kr
          </span>

          <button
            className="bg-green-700 text-white px-5 py-3 rounded-md text-lg hover:bg-green-800"
          >
            Legg i handlekurv
          </button>
        </div>
      </div>

      {/* Trygghetsinformasjon */}
      <div className="text-sm text-gray-600 max-w-xl">
        Pris er inkludert mva. Frakt er gratis. Du kan når som helst ta kontakt
        med oss dersom du har spørsmål om produktene.
      </div>
    </section>
  );
}

import PageSection from "@/components/layout/PageSection";
import PageContainer from "@/components/layout/PageContainer";

export default function TermsPage() {
  return (
    <PageSection>
      <PageContainer>
        <div className="max-w-3xl py-12 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Kjøpsvilkår</h1>
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
              Dette er et utkast til standard kjøpsvilkår for norsk
              nettbutikk. Det er ikke juridisk rådgivning — få det gjennomgått
              før dere legger det til grunn, og fyll inn
              organisasjonsnummer og postadresse under.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Selger</h2>
            <p className="text-gray-700">
              VitalityBoost [organisasjonsnummer og postadresse fylles inn
              her]. Kontakt:{" "}
              <a href="mailto:kontakt@vitalityboost.no" className="underline hover:no-underline">
                kontakt@vitalityboost.no
              </a>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Bestilling og avtale</h2>
            <p className="text-gray-700">
              En bindende avtale inngås når betaling er bekreftet. Du mottar
              en ordrebekreftelse på e-post når bestillingen er registrert.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Priser og betaling</h2>
            <p className="text-gray-700">
              Alle priser er oppgitt i NOK inkludert mva. Betaling skjer via
              Vipps eller kort (Stripe). Beløpet trekkes når bestillingen
              bekreftes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Levering</h2>
            <p className="text-gray-700">
              [Leveringstid og fraktvilkår fylles inn her.]
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Angrerett</h2>
            <p className="text-gray-700">
              Du har 14 dagers angrerett fra du mottar varen, i tråd med
              angrerettloven. Varen må returneres i samme stand som den ble
              mottatt. Kontakt oss på{" "}
              <a href="mailto:kontakt@vitalityboost.no" className="underline hover:no-underline">
                kontakt@vitalityboost.no
              </a>{" "}
              for å melde fra om retur.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Reklamasjon</h2>
            <p className="text-gray-700">
              Dersom varen har en mangel, kan du reklamere i henhold til
              forbrukerkjøpsloven. Ta kontakt så snart mangelen oppdages.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Tvister</h2>
            <p className="text-gray-700">
              Klager kan rettes til Forbrukertilsynet og, ved uenighet, til
              Forbrukerrådet før eventuell domstolsbehandling.
            </p>
          </section>

          <p className="text-sm text-gray-500">Sist oppdatert: [dato fylles inn ved publisering]</p>
        </div>
      </PageContainer>
    </PageSection>
  );
}

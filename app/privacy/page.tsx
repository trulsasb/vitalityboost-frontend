import PageSection from "@/components/layout/PageSection";
import PageContainer from "@/components/layout/PageContainer";

export default function PrivacyPage() {
  return (
    <PageSection>
      <PageContainer>
        <div className="max-w-3xl py-12 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Personvernerklæring</h1>
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
              Dette er et utkast basert på hvilke data nettbutikken faktisk
              samler inn i dag. Det er ikke juridisk rådgivning — få dette
              gjennomgått av noen med kompetanse på personvernrett før dere
              legger det til grunn, og fyll inn organisasjonsnummer og
              postadresse under.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Behandlingsansvarlig</h2>
            <p className="text-gray-700">
              VitalityBoost [organisasjonsnummer og postadresse fylles inn
              her] er behandlingsansvarlig for personopplysningene som samles
              inn gjennom denne nettbutikken.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Hvilke opplysninger vi samler inn</h2>
            <p className="text-gray-700">
              Når du handler hos oss samler vi inn navn, e-postadresse og
              leveringsadresse for å kunne opprette og sende ordren din. Vi
              lagrer ikke kortopplysninger selv — betaling håndteres av
              Stripe og Vipps, som behandler betalingsdata direkte.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Hvordan vi bruker opplysningene</h2>
            <p className="text-gray-700">
              Opplysningene brukes til å behandle og levere bestillingen din,
              sende ordrebekreftelse på e-post, og oppfylle regnskapsplikten
              vår. Vi bruker ikke opplysningene til markedsføring uten at du
              har samtykket til det separat.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Hvem vi deler opplysninger med</h2>
            <p className="text-gray-700">
              Vi deler nødvendige opplysninger med Stripe og Vipps
              (betaling), samt SendGrid (utsending av ordrebekreftelser). Vi
              selger ikke personopplysninger til tredjeparter.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Dine rettigheter</h2>
            <p className="text-gray-700">
              Du har rett til innsyn i, retting av og sletting av
              opplysningene vi har om deg, samt rett til å be om at vi
              begrenser behandlingen. Ta kontakt på{" "}
              <a href="mailto:kontakt@vitalityboost.no" className="underline hover:no-underline">
                kontakt@vitalityboost.no
              </a>{" "}
              for å benytte disse rettighetene.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Informasjonskapsler (cookies)</h2>
            <p className="text-gray-700">
              Nettbutikken bruker i dag ingen sporings- eller
              analysecookies. Denne siden oppdateres dersom det endrer seg.
            </p>
          </section>

          <p className="text-sm text-gray-500">Sist oppdatert: [dato fylles inn ved publisering]</p>
        </div>
      </PageContainer>
    </PageSection>
  );
}

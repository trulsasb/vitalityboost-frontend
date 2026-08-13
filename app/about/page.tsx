import PageSection from "@/components/layout/PageSection";
import PageContainer from "@/components/layout/PageContainer";

export default function AboutPage() {
  return (
    <PageSection>
      <PageContainer>
        <div className="max-w-3xl py-12 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Om oss</h1>

          <p className="text-gray-700 leading-relaxed">
            VitalityBoost lager kosttilskudd for voksne som vil ha mer energi,
            klarere fokus og en sunnere hverdag. Vi tar utgangspunkt i
            dokumentert forskning og legger vekt på rene, nordiske råvarer
            fremfor unødvendige tilsetningsstoffer.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Vi er et lite team som selv bruker produktene daglig, og vi
            utvikler dem med samme krav vi ville stilt til alt annet vi putter
            i kroppen: enkel, transparent innholdsdeklarasjon og ingen
            overdrevne løfter.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Har du spørsmål om produktene eller bestillingen din? Se{" "}
            <a href="/contact" className="text-black underline hover:no-underline">
              kontaktsiden
            </a>{" "}
            vår.
          </p>
        </div>
      </PageContainer>
    </PageSection>
  );
}

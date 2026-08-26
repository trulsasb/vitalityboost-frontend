import PageSection from "@/components/layout/PageSection";
import PageContainer from "@/components/layout/PageContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Ta kontakt med Vitalityboost ved spørsmål om bestilling eller produkter.",
};

export default function ContactPage() {
  return (
    <PageSection>
      <PageContainer>
        <div className="max-w-3xl py-12 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Kontakt</h1>

          <p className="text-gray-700 leading-relaxed">
            Har du spørsmål om en bestilling, et produkt, eller noe annet? Ta
            gjerne kontakt, så svarer vi så raskt vi kan.
          </p>

          <div className="border rounded-lg p-6 space-y-3 bg-gray-50">
            <div>
              <p className="text-sm text-gray-500">E-post</p>
              <a
                href="mailto:kontakt@vitalityboost.no"
                className="text-lg text-black underline hover:no-underline"
              >
                kontakt@vitalityboost.no
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-500">Svartid</p>
              <p className="text-gray-800">Vanligvis innen 1–2 virkedager</p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Placeholder-adresse — bytt ut med den faktiske support-e-posten
            dere ønsker å bruke.
          </p>
        </div>
      </PageContainer>
    </PageSection>
  );
}

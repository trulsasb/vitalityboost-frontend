import PageSection from "@/components/layout/PageSection";
import PageContainer from "@/components/layout/PageContainer";
import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

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
            Har du spørsmål om en bestilling, et produkt, eller noe annet? Fyll
            ut skjemaet under, så svarer vi så raskt vi kan.
          </p>

          <ContactForm />

          <p className="text-gray-800">Vanlig svartid: 1–2 virkedager</p>
        </div>
      </PageContainer>
    </PageSection>
  );
}

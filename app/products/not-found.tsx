import PageSection from "@/components/layout/PageSection";
import PageContainer from "@/components/layout/PageContainer";

export default function ProductsNotFound() {
  return (
    <PageSection>
      <PageContainer>
        <div className="py-24 text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Ingen produkter funnet
          </h1>
          <p className="text-gray-600">
            Det ser ut som denne siden ikke eksisterer eller at produktet er fjernet.
          </p>
        </div>
      </PageContainer>
    </PageSection>
  );
}

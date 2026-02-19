import { Suspense } from "react";

async function getAnalytics() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Kunne ikke hente analytics-data");
  }

  return res.json();
}

export default async function AnalyticsPage() {
  let data: any = null;
  let error = "";

  try {
    data = await getAnalytics();
  } catch (e: any) {
    error = e.message || "Ukjent feil";
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-xl font-semibold tracking-tight">Analytics</h1>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {data && (
        <>
          {/* KPI-bokser */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border rounded-md p-4 bg-white shadow-sm">
              <p className="text-gray-600">Omsetning (30 dager)</p>
              <p className="text-2xl font-semibold">{data.revenue_30d} kr</p>
            </div>

            <div className="border rounded-md p-4 bg-white shadow-sm">
              <p className="text-gray-600">Nye kunder (30 dager)</p>
              <p className="text-2xl font-semibold">{data.new_customers_30d}</p>
            </div>

            <div className="border rounded-md p-4 bg-white shadow-sm">
              <p className="text-gray-600">Nye abonnementer (30 dager)</p>
              <p className="text-2xl font-semibold">
                {data.new_subscriptions_30d}
              </p>
            </div>

            <div className="border rounded-md p-4 bg-white shadow-sm">
              <p className="text-gray-600">Totale besøk (30 dager)</p>
              <p className="text-2xl font-semibold">{data.visits_30d}</p>
            </div>
          </div>

          {/* Grafer */}
          <section className="border rounded-md p-4 bg-white shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">Omsetning siste 30 dager</h2>

            <Suspense fallback={<p>Laster graf...</p>}>
              <div className="w-full h-64 flex items-center justify-center text-gray-500">
                {/* Grafen rendres av frontend-komponenten */}
                <RevenueChart data={data.revenue_chart} />
              </div>
            </Suspense>
          </section>

          <section className="border rounded-md p-4 bg-white shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">Besøk siste 30 dager</h2>

            <Suspense fallback={<p>Laster graf...</p>}>
              <div className="w-full h-64 flex items-center justify-center text-gray-500">
                <VisitsChart data={data.visits_chart} />
              </div>
            </Suspense>
          </section>
        </>
      )}
    </div>
  );
}

/* Disse komponentene forventes å eksistere i prosjektet ditt:
   Hvis de ikke finnes, kan jeg generere dem ferdige når du sier "neste".
*/
function RevenueChart({ data }: { data: any }) {
  return <div>RevenueChart komponent</div>;
}

function VisitsChart({ data }: { data: any }) {
  return <div>VisitsChart komponent</div>;
}

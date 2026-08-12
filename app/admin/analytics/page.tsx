// The backend has no traffic/analytics tracking or a /analytics endpoint yet
// (only orders, payments, users, and products exist). The chart components
// in ../dashboard/components/ (RevenueChart, TopProducts, TrafficChart, etc.)
// were built ahead of that backend work and have nothing to render from, so
// this page says so instead of calling an endpoint that will always fail.
export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-xl font-semibold tracking-tight">Analytics</h1>

      <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-md">
        Analytics er ikke tilgjengelig ennå. Dette krever et analytics-endepunkt
        og trafikksporing på backend som ikke er bygget.
      </div>
    </div>
  );
}

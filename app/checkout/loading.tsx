export default function CheckoutLoading() {
  return (
    <div className="max-w-xl mx-auto py-24 text-center animate-pulse">
      <h1 className="text-3xl font-semibold mb-6">Laster kassen…</h1>

      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
      </div>
    </div>
  );
}

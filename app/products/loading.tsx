export default function LoadingProductsPage() {
  return (
    <div className="p-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-300 rounded mb-6" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="w-full h-40 bg-gray-300 rounded" />
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

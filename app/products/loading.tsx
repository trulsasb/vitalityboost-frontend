export default function LoadingProductPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto animate-pulse space-y-6">
      <div className="h-8 bg-gray-200 rounded w-1/3" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="w-full h-64 bg-gray-200 rounded-lg" />
          <div className="w-full h-64 bg-gray-200 rounded-lg" />
        </div>

        <div className="space-y-6">
          <div className="h-10 bg-gray-200 rounded w-2/3" />
          <div className="h-6 bg-gray-200 rounded w-full" />
          <div className="h-6 bg-gray-200 rounded w-5/6" />
          <div className="h-12 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}

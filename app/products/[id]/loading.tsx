export default function LoadingProductPage() {
  return (
    <div className="p-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-300 rounded mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="w-full h-80 bg-gray-300 rounded" />

        <div className="space-y-4">
          <div className="h-6 w-64 bg-gray-300 rounded" />
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-5/6 bg-gray-300 rounded" />
          <div className="h-10 w-40 bg-gray-300 rounded mt-6" />
        </div>
      </div>
    </div>
  );
}

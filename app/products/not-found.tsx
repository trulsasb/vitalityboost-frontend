export default function ProductNotFound() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">
        Produkt ikke funnet
      </h1>
      <p className="text-gray-600">
        Produktet du leter etter finnes ikke eller er ikke lenger tilgjengelig.
      </p>
    </div>
  );
}

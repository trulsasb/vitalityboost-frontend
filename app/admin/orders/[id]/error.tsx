"use client";

export default function ErrorPage() {
  return (
    <div className="p-6 text-center">
      <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
        <span className="text-red-600 text-4xl">!</span>
      </div>

      <h1 className="text-2xl font-semibold mb-4">Noe gikk galt</h1>

      <p className="text-gray-600 mb-8">
        Kunne ikke laste denne ordren. Dette kan være midlertidig.
      </p>

      <a
        href="/admin/orders"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg"
      >
        Tilbake til ordreoversikten
      </a>
    </div>
  );
}

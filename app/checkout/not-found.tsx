export default function CheckoutNotFound() {
  return (
    <div className="max-w-xl mx-auto py-24 text-center">
      <h1 className="text-4xl font-semibold mb-6">Siden finnes ikke</h1>

      <p className="text-gray-600 text-lg mb-10">
        Vi fant ikke siden du lette etter i checkout‑flyten.
      </p>

      <a
        href="/checkout"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg text-lg"
      >
        Til kassen
      </a>
    </div>
  );
}

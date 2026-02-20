export default function CheckoutCancelPage() {
  return (
    <div className="max-w-xl mx-auto py-24 text-center">
      <h1 className="text-4xl font-semibold mb-6">Betaling avbrutt</h1>

      <p className="text-gray-600 text-lg mb-10">
        Betalingen ble ikke fullført. Du kan prøve igjen eller gå tilbake til handlekurven.
      </p>

      <div className="flex justify-center gap-4">
        <a
          href="/checkout"
          className="bg-black text-white px-6 py-3 rounded-lg text-lg"
        >
          Prøv igjen
        </a>

        <a
          href="/cart"
          className="bg-gray-200 text-black px-6 py-3 rounded-lg text-lg"
        >
          Til handlekurven
        </a>
      </div>
    </div>
  );
}

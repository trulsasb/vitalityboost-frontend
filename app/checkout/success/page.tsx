export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-xl mx-auto py-24 text-center">
      <h1 className="text-4xl font-semibold mb-6">Takk for bestillingen!</h1>

      <p className="text-gray-600 text-lg mb-10">
        Vi har mottatt bestillingen din og sender deg en bekreftelse på e‑post.
      </p>

      <a
        href="/"
        className="inline-block bg-black text-white px-6 py-3 rounded-lg text-lg"
      >
        Tilbake til forsiden
      </a>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/cart/CartProvider";

type Status = "checking" | "paid" | "pending" | "failed" | "unverified";

const POLL_INTERVAL_MS = 2000;
const MAX_ATTEMPTS = 15; // ~30s -- generous enough for the webhook to land after the redirect back

// Shared by /checkout/success (Stripe) and /checkout/complete (Vipps) --
// landing on either page only means the browser was redirected back, not
// that payment succeeded, so this polls the backend for the real status
// instead of assuming success. Single source of truth for that check so
// the two provider return pages can't silently drift apart.
export function PaymentStatus() {
  const { clearCart } = useCart();
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    const raw = sessionStorage.getItem("vb_pending_payment");
    if (!raw) {
      setStatus("unverified");
      return;
    }

    let paymentId: number | undefined;
    let statusToken: string | undefined;
    try {
      const parsed = JSON.parse(raw);
      paymentId = parsed.paymentId;
      statusToken = parsed.statusToken;
    } catch {
      setStatus("unverified");
      return;
    }

    if (!paymentId) {
      setStatus("unverified");
      return;
    }

    let cancelled = false;
    let attempts = 0;

    async function poll() {
      attempts += 1;
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/payments/${paymentId}/status`);
        if (statusToken) url.searchParams.set("token", statusToken);

        const res = await fetch(url.toString());
        if (res.ok) {
          const data = await res.json();
          if (data.status === "completed") {
            if (cancelled) return;
            sessionStorage.removeItem("vb_pending_payment");
            clearCart();
            setStatus("paid");
            return;
          }
          if (data.status === "failed") {
            if (cancelled) return;
            sessionStorage.removeItem("vb_pending_payment");
            setStatus("failed");
            return;
          }
        }
      } catch {
        // Network hiccup -- just retry on the next tick.
      }

      if (cancelled) return;
      if (attempts >= MAX_ATTEMPTS) {
        setStatus("pending");
        return;
      }
      setTimeout(poll, POLL_INTERVAL_MS);
    }

    poll();

    return () => {
      cancelled = true;
    };
  }, [clearCart]);

  const copy = COPY[status];

  return (
    <>
      <h1 className="text-4xl font-semibold mb-6">{copy.title}</h1>
      <p className="text-gray-600 text-lg mb-10">{copy.body}</p>

      {status === "checking" ? (
        <div
          className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black"
          role="status"
          aria-label="Bekrefter betaling"
        />
      ) : (
        <a
          href={copy.href}
          className="inline-block bg-black text-white px-6 py-3 rounded-lg text-lg"
        >
          {copy.linkText}
        </a>
      )}
    </>
  );
}

const COPY: Record<Status, { title: string; body: string; href: string; linkText: string }> = {
  checking: {
    title: "Bekrefter betaling...",
    body: "Vent litt mens vi bekrefter betalingen din. Dette tar vanligvis bare noen sekunder.",
    href: "/",
    linkText: "",
  },
  paid: {
    title: "Takk for bestillingen!",
    body: "Betalingen er bekreftet, og vi har sendt en bekreftelse til e-postadressen din.",
    href: "/",
    linkText: "Tilbake til forsiden",
  },
  failed: {
    title: "Betalingen gikk ikke gjennom",
    body: "Vi kunne ikke bekrefte betalingen din. Ingenting er trukket, og du kan trygt prøve igjen.",
    href: "/cart",
    linkText: "Til handlekurven",
  },
  pending: {
    title: "Betalingen behandles",
    body: "Det tar litt lengre tid enn vanlig å bekrefte betalingen. Du får en e-post så snart den er bekreftet — ingen grunn til å prøve på nytt.",
    href: "/",
    linkText: "Tilbake til forsiden",
  },
  unverified: {
    title: "Bestilling registrert",
    body: "Vi kunne ikke bekrefte betalingsstatus i denne nettleserøkten. Sjekk e-posten din for kjøpsbekreftelse, eller ta kontakt hvis den ikke dukker opp.",
    href: "/",
    linkText: "Tilbake til forsiden",
  },
};

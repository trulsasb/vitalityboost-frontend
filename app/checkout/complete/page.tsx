import { PaymentStatus } from "@/app/checkout/PaymentStatus";

// Vipps redirects here (returnUrl in payments/router.py) after checkout --
// this page didn't exist before, so Vipps customers hit a 404 right after
// paying.
export default function CheckoutCompletePage() {
  return (
    <div className="max-w-xl mx-auto py-24 text-center">
      <PaymentStatus />
    </div>
  );
}

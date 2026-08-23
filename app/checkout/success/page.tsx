import { PaymentStatus } from "@/app/checkout/PaymentStatus";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-xl mx-auto py-24 text-center">
      <PaymentStatus />
    </div>
  );
}

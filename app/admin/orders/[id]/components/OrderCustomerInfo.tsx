"use client";

interface OrderCustomerInfoProps {
  name: string;
  email: string;
  address: string;
}

export default function OrderCustomerInfo({
  name,
  email,
  address,
}: OrderCustomerInfoProps) {
  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Kunde</h2>
      <p><strong>Navn:</strong> {name}</p>
      <p><strong>E‑post:</strong> {email}</p>
      <p><strong>Adresse:</strong> {address}</p>
    </section>
  );
}

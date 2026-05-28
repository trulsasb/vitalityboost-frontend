"use client";

interface OrderShippingAddressProps {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

export default function OrderShippingAddress({
  name,
  address,
  postalCode,
  city,
  country,
}: OrderShippingAddressProps) {
  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Leveringsadresse</h2>

      <div className="flex justify-between">
        <span>Navn</span>
        <span>{name}</span>
      </div>

      <div className="flex justify-between">
        <span>Adresse</span>
        <span>{address}</span>
      </div>

      <div className="flex justify-between">
        <span>Postnummer</span>
        <span>{postalCode}</span>
      </div>

      <div className="flex justify-between">
        <span>By</span>
        <span>{city}</span>
      </div>

      <div className="flex justify-between">
        <span>Land</span>
        <span>{country}</span>
      </div>
    </section>
  );
}

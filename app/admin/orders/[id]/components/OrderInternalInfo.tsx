"use client";

interface OrderInternalInfoProps {
  internalId: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrderInternalInfo({
  internalId,
  createdAt,
  updatedAt,
}: OrderInternalInfoProps) {
  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Intern informasjon</h2>

      <div className="flex justify-between">
        <span>Intern ID</span>
        <span>{internalId}</span>
      </div>

      <div className="flex justify-between">
        <span>Opprettet</span>
        <span>{new Date(createdAt).toLocaleString("no-NO")}</span>
      </div>

      <div className="flex justify-between">
        <span>Sist oppdatert</span>
        <span>{new Date(updatedAt).toLocaleString("no-NO")}</span>
      </div>
    </section>
  );
}

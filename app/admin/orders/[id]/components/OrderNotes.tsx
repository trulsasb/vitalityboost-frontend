"use client";

interface OrderNotesProps {
  notes?: string;
}

export default function OrderNotes({ notes }: OrderNotesProps) {
  if (!notes) {
    return (
      <section className="border rounded-md p-4">
        <h2 className="font-semibold text-lg">Notater</h2>
        <p className="text-gray-600">Ingen notater lagt inn.</p>
      </section>
    );
  }

  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Notater</h2>
      <p>{notes}</p>
    </section>
  );
}

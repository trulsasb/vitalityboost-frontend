"use client";

interface OrderAdminNotesProps {
  adminNotes?: string;
  onSave?: (value: string) => void;
}

export default function OrderAdminNotes({
  adminNotes = "",
  onSave,
}: OrderAdminNotesProps) {
  return (
    <section className="border rounded-md p-4 space-y-3">
      <h2 className="font-semibold text-lg">Interne admin‑notater</h2>

      <textarea
        defaultValue={adminNotes}
        className="w-full border rounded p-2 h-28"
      />

      {onSave && (
        <button
          onClick={() => {
            const el = document.querySelector(
              "textarea"
            ) as HTMLTextAreaElement | null;
            if (el) onSave(el.value);
          }}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Lagre
        </button>
      )}
    </section>
  );
}

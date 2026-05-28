"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-6 text-red-600">
      Det oppstod en feil ved lasting av kundedata.
      <div className="mt-2 text-sm text-gray-500">{error.message}</div>
    </div>
  );
}

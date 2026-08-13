export default function NotAvailable({ title }: { title: string }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">{title}</h1>
      <div className="border rounded-md p-6 bg-gray-50 text-gray-600">
        Denne seksjonen er ikke koblet til noe backend ennå og er ikke tilgjengelig.
      </div>
    </div>
  );
}

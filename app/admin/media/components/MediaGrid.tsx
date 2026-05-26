"use client";

export default function MediaGrid({
  files,
  onDelete,
}: {
  files: string[];
  onDelete: (filename: string) => void;
}) {
  async function handleDelete(filename: string) {
    const res = await fetch("/api/upload/delete", {
      method: "POST",
      body: JSON.stringify({ filename }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.success) onDelete(filename);
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {files.map((file) => (
        <div key={file} className="border p-2 rounded relative">
          <img
            src={`/uploads/${file}`}
            alt={file}
            className="w-full h-32 object-cover rounded"
          />

          <button
            onClick={() => handleDelete(file)}
            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

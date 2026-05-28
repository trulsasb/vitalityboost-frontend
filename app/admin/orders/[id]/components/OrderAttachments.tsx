"use client";

interface OrderAttachmentsProps {
  files: {
    id: string;
    name: string;
    url: string;
  }[];
}

export default function OrderAttachments({ files }: OrderAttachmentsProps) {
  if (!files || files.length === 0) {
    return (
      <section className="border rounded-md p-4">
        <h2 className="font-semibold text-lg">Vedlegg</h2>
        <p className="text-gray-600">Ingen vedlegg.</p>
      </section>
    );
  }

  return (
    <section className="border rounded-md p-4 space-y-3">
      <h2 className="font-semibold text-lg">Vedlegg</h2>

      <ul className="space-y-2">
        {files.map((file) => (
          <li key={file.id}>
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

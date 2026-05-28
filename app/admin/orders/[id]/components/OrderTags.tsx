"use client";

interface OrderTagsProps {
  tags: string[];
}

export default function OrderTags({ tags }: OrderTagsProps) {
  if (!tags || tags.length === 0) {
    return (
      <section className="border rounded-md p-4">
        <h2 className="font-semibold text-lg">Tagger</h2>
        <p className="text-gray-600">Ingen tagger lagt inn.</p>
      </section>
    );
  }

  return (
    <section className="border rounded-md p-4 space-y-2">
      <h2 className="font-semibold text-lg">Tagger</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface FiltersProps {
  sort: string;
  tag: string;
}

export default function Filters({ sort, tag }: FiltersProps) {
  const router = useRouter();
  const params = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(params.toString());

      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }

      router.push(`/products?${newParams.toString()}`);
    },
    [params, router]
  );

  return (
    <div className="flex items-center gap-4 mb-8">
      <select
        value={sort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="popular">Mest populære</option>
        <option value="price-asc">Pris: Lav til høy</option>
        <option value="price-desc">Pris: Høy til lav</option>
        <option value="newest">Nyeste</option>
      </select>

      <select
        value={tag}
        onChange={(e) => updateParam("tag", e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">Alle tagger</option>
        <option value="energy">Energi</option>
        <option value="focus">Fokus</option>
        <option value="sleep">Søvn</option>
        <option value="longevity">Longevity</option>
      </select>
    </div>
  );
}

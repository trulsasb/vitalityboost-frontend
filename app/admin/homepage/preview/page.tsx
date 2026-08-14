"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { defaultHomepageContent, HomepageContent } from "@/lib/homepageContent";
import { getProducts } from "@/lib/products";
import { ClassicTemplate } from "@/components/homepage/ClassicTemplate";
import { ProductForwardTemplate } from "@/components/homepage/ProductForwardTemplate";
import { LifestyleTemplate } from "@/components/homepage/LifestyleTemplate";

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: string[];
}

const TEMPLATE_NAMES: Record<string, string> = {
  classic: "Klassisk",
  "product-forward": "Produktfokusert",
  lifestyle: "Livsstil",
};

function PreviewInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = (searchParams.get("template") as HomepageContent["template"]) || "classic";
  const embed = searchParams.get("embed") === "1";

  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/homepage`, { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null),
      getProducts(),
    ]).then(([data, prods]) => {
      if (data?.content) setContent((prev) => ({ ...prev, ...data.content }));
      setProducts(prods);
      setLoading(false);
    });
  }, []);

  async function apply() {
    setApplying(true);
    setError("");

    try {
      const updated = { ...content, template: templateId };
      const res = await fetch("/api/admin/proxy/content/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: updated }),
      });

      if (!res.ok) throw new Error("Kunne ikke publisere");

      router.push(`/admin/homepage?applied=${templateId}`);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
      setApplying(false);
    }
  }

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Laster forhåndsvisning...</div>;
  }

  const previewContent = { ...content, template: templateId };

  function Body() {
    switch (templateId) {
      case "product-forward":
        return <ProductForwardTemplate content={previewContent} products={products} />;
      case "lifestyle":
        return <LifestyleTemplate content={previewContent} products={products} />;
      default:
        return <ClassicTemplate content={previewContent} products={products} />;
    }
  }

  if (embed) {
    return <Body />;
  }

  return (
    <div>
      <div className="sticky top-0 z-50 bg-black text-white px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-semibold">Forhåndsvisning: {TEMPLATE_NAMES[templateId] || templateId}</span>
          <span className="text-gray-300 text-sm ml-3">Ikke live ennå</span>
        </div>

        <div className="flex items-center gap-3">
          {error && <span className="text-red-300 text-sm">{error}</span>}
          <button
            onClick={() => router.push("/admin/homepage")}
            className="px-4 py-2 rounded-md border border-white/30 hover:bg-white/10 text-sm"
          >
            ← Tilbake til valg
          </button>
          <button
            onClick={apply}
            disabled={applying}
            className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium disabled:opacity-50"
          >
            {applying ? "Publiserer..." : "Bruk denne siden"}
          </button>
        </div>
      </div>

      <Body />
    </div>
  );
}

export default function HomepagePreviewPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Laster...</div>}>
      <PreviewInner />
    </Suspense>
  );
}

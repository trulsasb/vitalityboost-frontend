"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
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

export default function HomePage() {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/homepage`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) {
          setContent({ ...defaultHomepageContent, ...data.content });
        }
      })
      .catch(() => {
        // Keep defaults if the content endpoint isn't reachable or nothing's saved yet.
      });

    getProducts().then(setProducts);
  }, []);

  switch (content.template) {
    case "product-forward":
      return <ProductForwardTemplate content={content} products={products} />;
    case "lifestyle":
      return <LifestyleTemplate content={content} products={products} />;
    case "classic":
    default:
      return <ClassicTemplate content={content} products={products} />;
  }
}

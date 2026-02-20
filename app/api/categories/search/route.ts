import { NextResponse } from "next/server";

const products = [
  {
    id: "vitality-01",
    name: "Vitality Boost",
    price: 399,
    description: "Premium kosttilskudd for energi, fokus og velvære.",
  },
  {
    id: "vitality-02",
    name: "Omega Balance",
    price: 299,
    description: "Høykvalitets omega‑3 for hjerte, hjerne og ledd.",
  },
  {
    id: "vitality-03",
    name: "Longevity Complex",
    price: 499,
    description: "Avansert formel for aldringsoptimalisering og vitalitet.",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() ?? "";

  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );

  return NextResponse.json({
    query: q,
    results,
  });
}

import { NextResponse } from "next/server";

const products = [
  {
    id: "vitality-01",
    name: "Vitality Boost",
    price: 399,
    description: "Premium kosttilskudd for energi, fokus og velvære.",
    image: "/products/vitality-boost.jpg",
  },
  {
    id: "vitality-02",
    name: "Omega Balance",
    price: 299,
    description: "Høykvalitets omega‑3 for hjerte, hjerne og ledd.",
    image: "/products/omega-balance.jpg",
  },
];

export async function GET() {
  return NextResponse.json({
    products,
  });
}

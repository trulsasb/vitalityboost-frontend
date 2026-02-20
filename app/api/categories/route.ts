import { NextResponse } from "next/server";

const categories = [
  {
    id: "energy",
    name: "Energi & Fokus",
    description: "Kosttilskudd som øker energi, fokus og mental klarhet.",
  },
  {
    id: "omega",
    name: "Omega‑3",
    description: "Essensielle fettsyrer for hjerte, hjerne og ledd.",
  },
  {
    id: "longevity",
    name: "Longevity",
    description: "Tilskudd for langvarig helse, vitalitet og aldringsoptimalisering.",
  },
];

export async function GET() {
  return NextResponse.json({
    categories,
  });
}

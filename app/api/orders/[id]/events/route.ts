import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const event = await prisma.orderEvent.create({
    data: {
      orderId: params.id,
      label: body.label,
    },
  });

  return NextResponse.json(event);
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: true,
      customer: true,
      shippingAddress: true,
      billingAddress: true,
      events: true,
      statusHistory: true,
      paymentAttempts: true,
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.order.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}

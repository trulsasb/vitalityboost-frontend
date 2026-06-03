import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  id: string;
}

export async function GET(
  request: Request,
  context: { params: Params }
) {
  const { id } = context.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true,
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


import { prisma } from "./prisma";

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images?.map((img: { url: string }) => img.url) ?? [],
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

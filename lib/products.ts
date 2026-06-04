export async function getProductById(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const product = await res.json();

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images ?? [],
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

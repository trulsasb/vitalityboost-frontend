interface BackendProduct {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  stock: number;
}

export async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const products: BackendProduct[] = await res.json();

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.image ? [product.image] : [],
      stock: product.stock,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const product: BackendProduct = await res.json();

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.image ? [product.image] : [],
      stock: product.stock,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/api/products`);
  if (!res.ok) {
    throw new Error("Kunne ikke hente produkter");
  }
  return res.json();
}

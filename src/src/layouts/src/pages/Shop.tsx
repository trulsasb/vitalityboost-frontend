import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://vitalityboost-backend-2.onrender.com/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Kunne ikke hente produkter");
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Produkter</h1>

      {products.length === 0 && <p>Laster produkter…</p>}

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} – {p.price} kr
          </li>
        ))}
      </ul>
    </div>
  );
}


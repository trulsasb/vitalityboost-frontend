"use client";

import { useEffect, useState } from "react";

export default function ReviewDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadReview() {
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "GET" });
      if (!res.ok) throw new Error("Kunne ikke hente anmeldelse");
      const data = await res.json();
      setReview(data);
    } catch (err: any) {
      setError(err.message || "Ukjent feil");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReview();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <p>Laster anmeldelse...</p>
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error || "Fant ikke anmeldelse"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <h1 className="text-xl font-semibold tracking-tight">
        Anmeldelse #{review.id}
      </h1>

      <section className="border rounded-md p-4 space-y-2">
        <h2 className="font-semibold text-lg">Detaljer</h2>

        <p><strong>Bruker:</strong> {review.user_name || "Ukjent"}</p>
        <p><strong>Tittel:</strong> {review.title}</p>
        <p><strong>Rating:</strong> {review.rating}/5</p>

        {review.comment && (
          <p><strong>Kommentar:</strong> {review.comment}</p>
        )}

        {review.created_at && (
          <p>
            <strong>Opprettet:</strong>{" "}
            {new Date(review.created_at).toLocaleDateString("no-NO")}
          </p>
        )}
      </section>
    </div>
  );
}

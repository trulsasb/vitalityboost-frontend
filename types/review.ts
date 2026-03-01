export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number; // 1–5
  comment?: string;
  createdAt: string;
}

export interface CreateReviewPayload {
  productId: string;
  rating: number;
  comment?: string;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
}

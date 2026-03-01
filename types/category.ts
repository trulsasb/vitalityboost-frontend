export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryWithProducts extends Category {
  productIds: string[];
}

export interface CreateCategoryPayload {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

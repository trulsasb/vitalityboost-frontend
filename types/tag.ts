export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TagAssignment {
  productId: string;
  tagId: string;
}

export interface CreateTagPayload {
  name: string;
  slug: string;
}

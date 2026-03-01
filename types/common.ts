export type ID = string;

export interface Timestamped {
  createdAt?: string;
  updatedAt?: string;
}

export interface Slugged {
  slug: string;
}

export interface WithImage {
  image?: string;
}

export interface WithSeo {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

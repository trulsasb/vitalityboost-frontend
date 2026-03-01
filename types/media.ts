export interface Media {
  id: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MediaUploadPayload {
  file: File;
  alt?: string;
}

export interface MediaGalleryItem extends Media {
  featured?: boolean;
}

export interface ProductFilter {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  sort?: "price-asc" | "price-desc" | "newest" | "popular";
  page?: number;
  pageSize?: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface FilterResult<T> {
  items: T[];
  pagination: Pagination;
}

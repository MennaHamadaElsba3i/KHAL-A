export type FragranceFamily =
  | "Floral"
  | "Amber"
  | "Woody"
  | "Fresh"
  | "Musk";

export type FragranceMood =
  | "Soft"
  | "Romantic"
  | "Sensual"
  | "Mysterious"
  | "Bold"
  | "Fresh";

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  tagline: string;
  description: string;
  story: string;
  price: number;
  currency: string;
  images: string[];
  family: FragranceFamily;
  mood: FragranceMood;
  size: string;
  concentration: string;
  notes: FragranceNotes;
  shortNotes: string;
  featured: boolean;
  featuredOrder?: number;
  intensity: "Subtle" | "Moderate" | "Intense";
  longevity: string;
  sillage: string;
  ritual: string;
  createdAt: string;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc";

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  family?: string;
  mood?: string;
  sort?: SortOption;
  order?: "asc" | "desc";
  minPrice?: number;
  maxPrice?: number;
}

export interface PaginatedProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  facets: {
    familyCounts: Record<string, number>;
    moodCounts: Record<string, number>;
    priceRange: {
      min: number;
      max: number;
    };
  };
}

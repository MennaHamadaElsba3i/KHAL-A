import { z } from "zod";

export const FragranceFamilyEnum = z.enum([
  "Floral",
  "Amber",
  "Woody",
  "Fresh",
  "Musk",
]);

export const FragranceMoodEnum = z.enum([
  "Soft",
  "Romantic",
  "Sensual",
  "Mysterious",
  "Bold",
  "Fresh",
]);

export const FragranceNotesSchema = z.object({
  top: z.array(z.string()),
  heart: z.array(z.string()),
  base: z.array(z.string()),
});

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  subtitle: z.string().optional(),
  tagline: z.string(),
  description: z.string(),
  story: z.string(),
  price: z.number().positive(),
  currency: z.string().default("USD"),
  images: z.array(z.string()),
  family: FragranceFamilyEnum,
  mood: FragranceMoodEnum,
  size: z.string(),
  concentration: z.string(),
  notes: FragranceNotesSchema,
  shortNotes: z.string(),
  featured: z.boolean(),
  featuredOrder: z.number().optional(),
  intensity: z.enum(["Subtle", "Moderate", "Intense"]),
  longevity: z.string(),
  sillage: z.string(),
  ritual: z.string(),
  createdAt: z.string(),
});

export const SortOptionEnum = z.enum([
  "featured",
  "newest",
  "price-asc",
  "price-desc",
  "name-asc",
]);

export const ProductQueryParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(8),
  search: z.string().optional(),
  family: z.string().optional(),
  mood: z.string().optional(),
  sort: SortOptionEnum.default("featured"),
  order: z.enum(["asc", "desc"]).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});

export const PaginatedProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
  }),
  facets: z.object({
    familyCounts: z.record(z.string(), z.number()),
    moodCounts: z.record(z.string(), z.number()),
    priceRange: z.object({
      min: z.number(),
      max: z.number(),
    }),
  }),
});

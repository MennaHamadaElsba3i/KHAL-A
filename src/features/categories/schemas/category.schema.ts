import { z } from "zod";
import { FragranceFamilyEnum } from "@/features/products/schemas/product.schema";

export const CategorySchema = z.object({
  id: z.string(),
  name: FragranceFamilyEnum,
  slug: z.string(),
  number: z.string(),
  subtitle: z.string(),
  description: z.string(),
  keyNotes: z.string(),
  count: z.number(),
});

export const CategoriesResponseSchema = z.array(CategorySchema);

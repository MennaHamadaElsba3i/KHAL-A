import { apiClient } from "@/lib/axios";
import { FragranceFamilyCategory } from "@/types/category";
import { CategoriesResponseSchema } from "@/features/categories/schemas/category.schema";
import { mockServer } from "@/mocks/server";

export const categoriesService = {
  async getCategories(): Promise<FragranceFamilyCategory[]> {
    if (typeof window === "undefined") {
      const categories = await mockServer.getCategories();
      const validated = CategoriesResponseSchema.safeParse(categories);
      if (!validated.success) {
        throw new Error("Invalid response format from categories mock engine");
      }
      return validated.data;
    }

    const response = await apiClient.get<FragranceFamilyCategory[]>(
      "/api/categories"
    );

    const validated = CategoriesResponseSchema.safeParse(response.data);
    if (!validated.success) {
      throw new Error("Invalid response format from categories API");
    }

    return validated.data;
  },
};

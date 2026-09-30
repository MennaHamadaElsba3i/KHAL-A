import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "@/services/categories.service";
import { FragranceFamilyCategory } from "@/types/category";

export const CATEGORIES_QUERY_KEY = ["categories"] as const;

export function useCategories() {
  return useQuery<FragranceFamilyCategory[], Error>({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: () => categoriesService.getCategories(),
    staleTime: 10 * 60 * 1000,
  });
}

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { productsService } from "@/services/products.service";
import {
  ProductQueryParams,
  PaginatedProductsResponse,
} from "@/types/product";

export function getProductsQueryKey(params: ProductQueryParams) {
  return [
    "products",
    {
      page: params.page ?? 1,
      limit: params.limit ?? 8,
      search: params.search?.trim().toLowerCase() || "",
      family: params.family?.toLowerCase() || "",
      mood: params.mood?.toLowerCase() || "",
      sort: params.sort || "featured",
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
    },
  ] as const;
}

export function useProducts(params: ProductQueryParams) {
  return useQuery<PaginatedProductsResponse, Error>({
    queryKey: getProductsQueryKey(params),
    queryFn: () => productsService.getProducts(params),
    placeholderData: keepPreviousData, // Smooth UX during page and filter transitions
    staleTime: 3 * 60 * 1000,
  });
}

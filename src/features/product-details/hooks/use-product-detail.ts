import { useQuery } from "@tanstack/react-query";
import { productsService, ProductDetailResponse } from "@/services/products.service";

export const getProductDetailQueryKey = (slug: string) =>
  ["product-detail", slug.toLowerCase()] as const;

export function useProductDetail(slug: string) {
  return useQuery<ProductDetailResponse, Error>({
    queryKey: getProductDetailQueryKey(slug),
    queryFn: () => productsService.getProductBySlug(slug),
    enabled: Boolean(slug && slug.trim()),
    staleTime: 5 * 60 * 1000,
  });
}

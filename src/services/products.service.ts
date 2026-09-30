import { apiClient } from "@/lib/axios";
import {
  Product,
  ProductQueryParams,
  PaginatedProductsResponse,
} from "@/types/product";
import {
  PaginatedProductsResponseSchema,
  ProductSchema,
} from "@/features/products/schemas/product.schema";
import { mockServer } from "@/mocks/server";
import { z } from "zod";

const ProductDetailResponseSchema = z.object({
  product: ProductSchema,
  relatedProducts: z.array(ProductSchema),
});

export interface ProductDetailResponse {
  product: Product;
  relatedProducts: Product[];
}

export const productsService = {
  async getProducts(
    params: ProductQueryParams = {}
  ): Promise<PaginatedProductsResponse> {
    // If executing during server-side render or build time, resolve directly from mock engine
    if (typeof window === "undefined") {
      const data = await mockServer.getProducts(params);
      const validated = PaginatedProductsResponseSchema.safeParse(data);
      if (!validated.success) {
        throw new Error("Invalid response format from products mock engine");
      }
      return validated.data;
    }

    // Client-side execution uses Axios HTTP client
    const queryParams: Record<string, string | number> = {};

    if (params.page !== undefined) queryParams.page = params.page;
    if (params.limit !== undefined) queryParams.limit = params.limit;
    if (params.search && params.search.trim())
      queryParams.search = params.search.trim();
    if (params.family && params.family !== "all")
      queryParams.family = params.family;
    if (params.mood && params.mood !== "all") queryParams.mood = params.mood;
    if (params.sort) queryParams.sort = params.sort;
    if (params.minPrice !== undefined) queryParams.minPrice = params.minPrice;
    if (params.maxPrice !== undefined) queryParams.maxPrice = params.maxPrice;

    const response = await apiClient.get<PaginatedProductsResponse>(
      "/api/products",
      { params: queryParams }
    );

    const validated = PaginatedProductsResponseSchema.safeParse(response.data);
    if (!validated.success) {
      throw new Error("Invalid response format from fragrance collection API");
    }

    return validated.data;
  },

  async getProductBySlug(slug: string): Promise<ProductDetailResponse> {
    // Server-side execution
    if (typeof window === "undefined") {
      const product = await mockServer.getProductBySlug(slug);
      if (!product) {
        throw new Error(`Fragrance with slug '${slug}' not found`);
      }
      const relatedProducts = await mockServer.getRelatedProducts(slug, 3);
      const validated = ProductDetailResponseSchema.safeParse({
        product,
        relatedProducts,
      });
      if (!validated.success) {
        throw new Error(
          `Invalid response format for fragrance '${slug}': ${validated.error.message}`
        );
      }
      return validated.data;
    }

    // Client-side execution uses Axios HTTP client
    const response = await apiClient.get<ProductDetailResponse>(
      `/api/products/${encodeURIComponent(slug)}`
    );

    const validated = ProductDetailResponseSchema.safeParse(response.data);
    if (!validated.success) {
      throw new Error(
        `Invalid response format for fragrance '${slug}': ${validated.error.message}`
      );
    }

    return validated.data;
  },
};

import {
  handleGetProducts,
  handleGetProductBySlug,
  handleGetRelatedProducts,
} from "./handlers/products.handler";
import { handleGetCategories } from "./handlers/categories.handler";
import { handleGetHomeData } from "./handlers/home.handler";
import { ProductQueryParams } from "@/types/product";

export interface MockRequestOptions {
  delay?: number;
  simError?: string | null;
}

export const mockServer = {
  async getHome(options?: MockRequestOptions) {
    if (options?.delay) {
      await new Promise((resolve) => setTimeout(resolve, options.delay));
    }
    if (options?.simError) {
      throw new Error(`Simulated Error: ${options.simError}`);
    }
    return handleGetHomeData();
  },

  async getProducts(params: ProductQueryParams, options?: MockRequestOptions) {
    if (options?.delay) {
      await new Promise((resolve) => setTimeout(resolve, options.delay));
    }
    if (options?.simError) {
      throw new Error(`Simulated Error: ${options.simError}`);
    }
    return handleGetProducts(params);
  },

  async getProductBySlug(slug: string, options?: MockRequestOptions) {
    if (options?.delay) {
      await new Promise((resolve) => setTimeout(resolve, options.delay));
    }
    if (options?.simError) {
      throw new Error(`Simulated Error: ${options.simError}`);
    }
    return handleGetProductBySlug(slug);
  },

  async getRelatedProducts(
    slug: string,
    limit: number = 3,
    options?: MockRequestOptions
  ) {
    if (options?.delay) {
      await new Promise((resolve) => setTimeout(resolve, options.delay));
    }
    if (options?.simError) {
      throw new Error(`Simulated Error: ${options.simError}`);
    }
    return handleGetRelatedProducts(slug, limit);
  },

  async getCategories(options?: MockRequestOptions) {
    if (options?.delay) {
      await new Promise((resolve) => setTimeout(resolve, options.delay));
    }
    if (options?.simError) {
      throw new Error(`Simulated Error: ${options.simError}`);
    }
    return handleGetCategories();
  },
};

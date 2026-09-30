import { apiClient } from "@/lib/axios";
import { HomeApiResponse } from "@/types/home";
import { HomeApiResponseSchema } from "@/features/home/schemas/home.schema";
import { mockServer } from "@/mocks/server";

export const homeService = {
  async getHome(): Promise<HomeApiResponse> {
    // If executing during server-side render or build time, resolve directly from mock engine
    if (typeof window === "undefined") {
      const data = await mockServer.getHome();
      const validated = HomeApiResponseSchema.safeParse(data);
      if (!validated.success) {
        throw new Error("Invalid response format from home mock engine");
      }
      return validated.data;
    }

    // Client-side execution uses Axios HTTP client
    const response = await apiClient.get<HomeApiResponse>("/api/home");
    const validated = HomeApiResponseSchema.safeParse(response.data);
    if (!validated.success) {
      throw new Error("Invalid response format from home API");
    }

    return validated.data;
  },
};

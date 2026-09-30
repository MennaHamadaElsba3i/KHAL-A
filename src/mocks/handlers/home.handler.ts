import { MOCK_HOME_DATA } from "../data/home";
import { handleGetCategories } from "./categories.handler";
import { MOCK_PRODUCTS } from "../data/products";
import { HomeApiResponse } from "@/types/home";

export function handleGetHomeData(): HomeApiResponse {
  const updatedCategories = handleGetCategories();
  const featured = MOCK_PRODUCTS.filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99))
    .slice(0, 4);

  return {
    ...MOCK_HOME_DATA,
    signatureCollection: {
      ...MOCK_HOME_DATA.signatureCollection,
      featuredProducts: featured,
    },
    fragranceFamilies: {
      ...MOCK_HOME_DATA.fragranceFamilies,
      families: updatedCategories,
    },
  };
}

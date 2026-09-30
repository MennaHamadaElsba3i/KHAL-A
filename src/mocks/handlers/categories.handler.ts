import { MOCK_CATEGORIES } from "../data/categories";
import { MOCK_PRODUCTS } from "../data/products";
import { FragranceFamilyCategory } from "@/types/category";

export function handleGetCategories(): FragranceFamilyCategory[] {
  return MOCK_CATEGORIES.map((cat) => {
    const productCount = MOCK_PRODUCTS.filter(
      (p) => p.family.toLowerCase() === cat.name.toLowerCase()
    ).length;
    return {
      ...cat,
      count: productCount,
    };
  });
}

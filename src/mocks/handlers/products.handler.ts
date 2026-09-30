import { MOCK_PRODUCTS } from "../data/products";
import {
  Product,
  ProductQueryParams,
  PaginatedProductsResponse,
} from "@/types/product";

export function handleGetProducts(
  params: ProductQueryParams
): PaginatedProductsResponse {
  let filtered = [...MOCK_PRODUCTS];

  // 1. Search filter (name, shortNotes, description, notes)
  if (params.search && params.search.trim() !== "") {
    const query = params.search.trim().toLowerCase();
    filtered = filtered.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const shortNotesMatch = product.shortNotes.toLowerCase().includes(query);
      const descMatch = product.description.toLowerCase().includes(query);
      const notesMatch = [
        ...product.notes.top,
        ...product.notes.heart,
        ...product.notes.base,
      ].some((note) => note.toLowerCase().includes(query));

      return nameMatch || shortNotesMatch || descMatch || notesMatch;
    });
  }

  // 2. Family filter (case-insensitive match)
  if (params.family && params.family.trim() !== "" && params.family !== "all") {
    const familyQuery = params.family.trim().toLowerCase();
    filtered = filtered.filter(
      (product) => product.family.toLowerCase() === familyQuery
    );
  }

  // 3. Mood filter (case-insensitive match)
  if (params.mood && params.mood.trim() !== "" && params.mood !== "all") {
    const moodQuery = params.mood.trim().toLowerCase();
    filtered = filtered.filter(
      (product) => product.mood.toLowerCase() === moodQuery
    );
  }

  // 4. Price range filter
  if (params.minPrice !== undefined && !isNaN(params.minPrice)) {
    filtered = filtered.filter((product) => product.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined && !isNaN(params.maxPrice)) {
    filtered = filtered.filter((product) => product.price <= params.maxPrice!);
  }

  // 5. Sorting
  const sort = params.sort || "featured";
  filtered.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "featured":
      default:
        // Featured products first, then by featuredOrder or createdAt
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (a.featuredOrder || 99) - (b.featuredOrder || 99);
    }
  });

  // Calculate facets across all products for filter counts
  const familyCounts: Record<string, number> = {};
  const moodCounts: Record<string, number> = {};
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  MOCK_PRODUCTS.forEach((product) => {
    familyCounts[product.family] = (familyCounts[product.family] || 0) + 1;
    moodCounts[product.mood] = (moodCounts[product.mood] || 0) + 1;
    if (product.price < minPrice) minPrice = product.price;
    if (product.price > maxPrice) maxPrice = product.price;
  });

  // 6. Pagination
  const total = filtered.length;
  const page = Math.max(1, Number(params.page) || 1);
  // Default to 8 or 9 items per page (user's mockup shows 8 cards per page with 1 2 Next)
  const limit = Math.max(1, Number(params.limit) || 8);
  const totalPages = Math.ceil(total / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filtered.slice(startIndex, startIndex + limit);

  return {
    products: paginatedProducts,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
    facets: {
      familyCounts,
      moodCounts,
      priceRange: {
        min: minPrice === Infinity ? 0 : minPrice,
        max: maxPrice === -Infinity ? 300 : maxPrice,
      },
    },
  };
}

export function handleGetProductBySlug(slug: string): Product | null {
  const normalizedSlug = slug.toLowerCase().trim();
  const product = MOCK_PRODUCTS.find(
    (p) => p.slug.toLowerCase() === normalizedSlug
  );
  return product || null;
}

export function handleGetRelatedProducts(
  currentSlug: string,
  limit: number = 3
): Product[] {
  const current = handleGetProductBySlug(currentSlug);
  if (!current) return MOCK_PRODUCTS.slice(0, limit);

  // Find products in the same family or mood first, excluding current
  const related = MOCK_PRODUCTS.filter(
    (p) =>
      p.slug !== current.slug &&
      (p.family === current.family || p.mood === current.mood)
  );

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  // Backfill with other products if needed
  const remaining = MOCK_PRODUCTS.filter(
    (p) => p.slug !== current.slug && !related.includes(p)
  );

  return [...related, ...remaining].slice(0, limit);
}

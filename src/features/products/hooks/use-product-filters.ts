"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ProductQueryParams, SortOption } from "@/types/product";

export function useProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Derive filters directly from URL search parameters (Single Source of Truth)
  const filters: ProductQueryParams = useMemo(() => {
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 8;
    const search = searchParams.get("search") || "";
    const family = searchParams.get("family") || "";
    const mood = searchParams.get("mood") || "";
    const sort = (searchParams.get("sort") as SortOption) || "featured";
    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined;

    return {
      page,
      limit,
      search,
      family,
      mood,
      sort,
      minPrice,
      maxPrice,
    };
  }, [searchParams]);

  const updateUrl = useCallback(
    (newParams: Record<string, string | number | null | undefined>) => {
      const current = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "" || value === "all") {
          current.delete(key);
        } else {
          current.set(key, String(value));
        }
      });

      const queryString = current.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;

      // Use router.push to ensure natural browser Back and Forward history navigation
      router.push(targetUrl, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const setSearch = useCallback(
    (search: string) => {
      updateUrl({
        search: search.trim() ? search.trim() : null,
        page: 1, // Always reset to page 1 on new search
      });
    },
    [updateUrl]
  );

  const setFamily = useCallback(
    (family: string) => {
      // Toggle off if already selected
      const isSelected =
        filters.family?.toLowerCase() === family.toLowerCase();
      updateUrl({
        family: isSelected ? null : family.toLowerCase(),
        page: 1,
      });
    },
    [filters.family, updateUrl]
  );

  const setMood = useCallback(
    (mood: string) => {
      // Toggle off if already selected
      const isSelected = filters.mood?.toLowerCase() === mood.toLowerCase();
      updateUrl({
        mood: isSelected ? null : mood.toLowerCase(),
        page: 1,
      });
    },
    [filters.mood, updateUrl]
  );

  const setSort = useCallback(
    (sort: SortOption) => {
      updateUrl({
        sort: sort === "featured" ? null : sort,
        page: 1,
      });
    },
    [updateUrl]
  );

  const setPage = useCallback(
    (page: number) => {
      updateUrl({
        page: page > 1 ? page : null,
      });
    },
    [updateUrl]
  );

  const setPriceRange = useCallback(
    (minPrice?: number, maxPrice?: number) => {
      updateUrl({
        minPrice: minPrice !== undefined ? minPrice : null,
        maxPrice: maxPrice !== undefined ? maxPrice : null,
        page: 1,
      });
    },
    [updateUrl]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const hasActiveFilters = useMemo(() => {
    return Boolean(
      filters.search ||
        filters.family ||
        filters.mood ||
        filters.minPrice !== undefined ||
        filters.maxPrice !== undefined ||
        (filters.sort && filters.sort !== "featured")
    );
  }, [filters]);

  return {
    filters,
    setSearch,
    setFamily,
    setMood,
    setSort,
    setPage,
    setPriceRange,
    clearFilters,
    hasActiveFilters,
  };
}

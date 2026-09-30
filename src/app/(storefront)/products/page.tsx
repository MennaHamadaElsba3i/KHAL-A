"use client";

import { Suspense, useState } from "react";
import { ProductsHeader } from "@/features/products/components/products-header";
import { ProductsSearchBar } from "@/features/products/components/products-search-bar";
import { ProductsFilterSidebar } from "@/features/products/components/products-filter-sidebar";
import { ProductsGrid } from "@/features/products/components/products-grid";
import { useProductFilters } from "@/features/products/hooks/use-product-filters";
import { useProducts } from "@/features/products/hooks/use-products";
import { ProductGridSkeleton } from "@/components/shared/skeleton";

function ProductsCatalogContent() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const {
    filters,
    setSearch,
    setFamily,
    setMood,
    setSort,
    setPage,
    clearFilters,
    hasActiveFilters,
  } = useProductFilters();

  const { data, isLoading, isError, error, refetch } = useProducts(filters);

  const activeFilterCount =
    (filters.search ? 1 : 0) +
    (filters.family ? 1 : 0) +
    (filters.mood ? 1 : 0) +
    (filters.sort && filters.sort !== "featured" ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* 1. Header (The Collection) */}
      <ProductsHeader />

      {/* 2. Search & Sort Bar */}
      <ProductsSearchBar
        searchQuery={filters.search || ""}
        onSearchChange={setSearch}
        selectedSort={filters.sort || "featured"}
        onSortChange={setSort}
        onOpenMobileFilters={() => setMobileDrawerOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      {/* 3. Main Catalog Layout: Sidebar + Grid */}
      <div className="pt-10 flex flex-col lg:flex-row gap-12">
        {/* Desktop Filter Sidebar */}
        <ProductsFilterSidebar
          selectedFamily={filters.family || ""}
          onFamilySelect={setFamily}
          selectedMood={filters.mood || ""}
          onMoodSelect={setMood}
          familyCounts={data?.facets?.familyCounts}
          moodCounts={data?.facets?.moodCounts}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Mobile Filter Drawer */}
        {mobileDrawerOpen && (
          <ProductsFilterSidebar
            selectedFamily={filters.family || ""}
            onFamilySelect={setFamily}
            selectedMood={filters.mood || ""}
            onMoodSelect={setMood}
            familyCounts={data?.facets?.familyCounts}
            moodCounts={data?.facets?.moodCounts}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
            isMobileDrawer={true}
            onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
          />
        )}

        {/* Products Grid */}
        <ProductsGrid
          products={data?.products}
          total={data?.pagination?.total ?? 0}
          currentPage={data?.pagination?.page ?? 1}
          totalPages={data?.pagination?.totalPages ?? 1}
          limit={filters.limit ?? 8}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onPageChange={setPage}
          onClearFilters={clearFilters}
          onRetry={refetch}
        />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="h-20 w-72 skeleton-shimmer mb-12" />
          <ProductGridSkeleton count={8} />
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}

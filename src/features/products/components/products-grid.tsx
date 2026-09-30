"use client";

import { Product } from "@/types/product";
import { ProductCard } from "@/components/shared/product-card";
import { ProductGridSkeleton } from "@/components/shared/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { Pagination } from "@/components/shared/pagination";

interface ProductsGridProps {
  products?: Product[];
  total: number;
  currentPage: number;
  totalPages: number;
  limit: number;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
  onRetry: () => void;
}

export function ProductsGrid({
  products = [],
  total,
  currentPage,
  totalPages,
  limit,
  isLoading,
  isError,
  error,
  onPageChange,
  onClearFilters,
  onRetry,
}: ProductsGridProps) {
  if (isError) {
    return (
      <div className="flex-1">
        <ErrorState
          title="Unable to load the fragrance collection"
          message={error?.message}
          onRetry={onRetry}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1">
        <div className="mb-8">
          <div className="h-4 w-28 skeleton-shimmer" />
        </div>
        <ProductGridSkeleton count={limit} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex-1">
        <EmptyState
          title="No fragrances match your selection"
          description="We couldn't find any fragrances matching your criteria. Try adjusting your mood or olfactory family filters."
          onClear={onClearFilters}
          clearLabel="RESET FILTERS"
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        {/* Fragrance Count Header matching Image 1 */}
        <div className="mb-8">
          <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#78716C]">
            {total} {total === 1 ? "FRAGRANCE" : "FRAGRANCES"}
          </span>
        </div>

        {/* 3-Column Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product, idx) => {
            const globalIndex = (currentPage - 1) * limit + idx;
            return (
              <ProductCard
                key={product.id}
                product={product}
                index={globalIndex}
                priority={idx < 3}
              />
            );
          })}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mt-12">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

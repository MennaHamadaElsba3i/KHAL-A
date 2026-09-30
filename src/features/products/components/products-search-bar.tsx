"use client";

import { useState, useEffect, useTransition } from "react";
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { SortOption } from "@/types/product";

interface ProductsSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenMobileFilters: () => void;
  activeFilterCount: number;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A → Z", value: "name-asc" },
];

export function ProductsSearchBar({
  searchQuery,
  onSearchChange,
  selectedSort,
  onSortChange,
  onOpenMobileFilters,
  activeFilterCount,
}: ProductsSearchBarProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [, startTransition] = useTransition();

  // Keep local input in sync if URL search changes externally (e.g. back/forward navigation)
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Debounced update to the URL search parameter
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchQuery) {
        startTransition(() => {
          onSearchChange(localSearch);
        });
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [localSearch, searchQuery, onSearchChange]);

  const clearSearch = () => {
    setLocalSearch("");
    onSearchChange("");
  };

  return (
    <div className="py-6 border-b border-[#E8E1D5]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Search Input matching Image 1 */}
      <div className="relative w-full sm:max-w-xs">
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search fragrances..."
          aria-label="Search fragrances"
          className="w-full bg-transparent border-b border-[#D6D0C4] focus:border-[#1C1917] py-2 pl-0 pr-8 text-xs text-[#1C1917] placeholder-[#A8A29E] tracking-wider transition-colors focus:outline-hidden"
        />
        {localSearch ? (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[#78716C] hover:text-[#1C1917] focus:outline-hidden"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <Search className="w-3.5 h-3.5 text-[#78716C] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
        )}
      </div>

      {/* Right: Mobile Filter Trigger & Sort Dropdown */}
      <div className="flex items-center justify-between sm:justify-end gap-6">
        {/* Mobile Filter Sheet Trigger */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#1C1917] hover:text-[#3E1C27] focus:outline-hidden"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>FILTERS</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#3E1C27] text-[#FAF7F2] text-[10px] flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort Select Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#78716C]">
            SORT BY
          </span>
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort fragrances by"
              className="appearance-none bg-transparent pr-7 pl-1 py-1 text-xs font-medium text-[#1C1917] hover:text-[#3E1C27] tracking-wider border-b border-transparent hover:border-[#D6D0C4] cursor-pointer focus:outline-hidden focus:border-[#1C1917]"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#FAF7F2] text-[#1C1917]">
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#78716C] absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

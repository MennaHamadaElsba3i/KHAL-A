"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { Search, ChevronDown, SlidersHorizontal, X, Check } from "lucide-react";
import { SortOption } from "@/types/product";
import { cn } from "@/lib/utils";

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
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
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

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setSortDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSortDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const clearSearch = () => {
    setLocalSearch("");
    onSearchChange("");
  };

  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === selectedSort)?.label || "Featured";

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

      {/* Right: Mobile Filter Trigger & Luxury Sort Dropdown */}
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

        {/* Refined Luxury Sort Dropdown */}
        <div className="flex items-center space-x-2.5" ref={sortDropdownRef}>
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#78716C] select-none">
            SORT BY
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setSortDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={sortDropdownOpen}
              aria-label={`Sort fragrances by. Currently sorted by ${currentSortLabel}`}
              className={cn(
                "group inline-flex items-center justify-between gap-3 px-3.5 py-1.5 bg-[#FAF7F2] border text-xs tracking-wider transition-all duration-300 focus:outline-hidden cursor-pointer",
                sortDropdownOpen
                  ? "border-[#3E1C27] ring-1 ring-[#3E1C27]/20 shadow-xs"
                  : "border-[#E5DDD1] hover:border-[#3E1C27]/40 hover:bg-[#F7F2EB]"
              )}
            >
              <span className="font-medium text-[#1C1917] group-hover:text-[#3E1C27] transition-colors">
                {currentSortLabel}
              </span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-[#78716C] transition-transform duration-300",
                  sortDropdownOpen
                    ? "rotate-180 text-[#3E1C27]"
                    : "group-hover:text-[#3E1C27]"
                )}
              />
            </button>

            {/* Dropdown Popover */}
            {sortDropdownOpen && (
              <div
                role="listbox"
                aria-label="Sort options"
                className="absolute right-0 top-full mt-1.5 z-30 w-52 bg-[#FAF7F2] border border-[#E5DDD1] shadow-lg shadow-black/8 py-1.5 animate-subtle-fade origin-top-right focus:outline-hidden"
              >
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = opt.value === selectedSort;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onSortChange(opt.value);
                        setSortDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full px-3.5 py-2 text-left text-xs tracking-wider transition-colors duration-200 flex items-center justify-between group focus:outline-hidden cursor-pointer",
                        isSelected
                          ? "bg-[#F3ECE2] text-[#3E1C27] font-semibold"
                          : "text-[#57534E] hover:text-[#1C1917] hover:bg-[#F7F2EA]"
                      )}
                    >
                      <span>{opt.label}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-[#3E1C27]" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#C5A880]/50 transition-colors" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

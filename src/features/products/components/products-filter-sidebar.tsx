"use client";

import { X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductsFilterSidebarProps {
  selectedFamily: string;
  onFamilySelect: (family: string) => void;
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
  familyCounts?: Record<string, number>;
  moodCounts?: Record<string, number>;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

const FAMILIES = ["Floral", "Amber", "Woody", "Fresh", "Musk"] as const;
const MOODS = [
  "Soft",
  "Romantic",
  "Sensual",
  "Mysterious",
  "Bold",
  "Fresh",
] as const;

export function ProductsFilterSidebar({
  selectedFamily,
  onFamilySelect,
  selectedMood,
  onMoodSelect,
  familyCounts = {},
  moodCounts = {},
  onClearFilters,
  hasActiveFilters,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}: ProductsFilterSidebarProps) {
  const content = (
    <div className="space-y-10">
      {/* Active Filters Clear Button */}
      {hasActiveFilters && (
        <div className="pb-4 border-b border-[#E8E1D5]">
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.18em] uppercase text-[#3E1C27] hover:underline focus:outline-hidden"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET ALL FILTERS</span>
          </button>
        </div>
      )}

      {/* Fragrance Family Filter Section */}
      <div className="space-y-4">
        <h3 className="font-display text-base font-light tracking-wide text-[#1C1917]">
          Fragrance family
        </h3>
        <ul className="space-y-2.5">
          {FAMILIES.map((fam) => {
            const isSelected =
              selectedFamily.toLowerCase() === fam.toLowerCase();
            const count = familyCounts[fam] ?? 0;

            return (
              <li key={fam}>
                <button
                  type="button"
                  onClick={() => onFamilySelect(fam)}
                  className={cn(
                    "w-full flex items-center justify-between text-xs tracking-wider transition-colors py-1 group focus:outline-hidden",
                    isSelected
                      ? "text-[#3E1C27] font-semibold"
                      : "text-[#57534E] hover:text-[#1C1917]"
                  )}
                  aria-pressed={isSelected}
                >
                  <span className="flex items-center gap-2">
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3E1C27]" />
                    )}
                    <span className={cn(isSelected && "underline underline-offset-4")}>
                      {fam}
                    </span>
                  </span>
                  <span className="font-serif italic text-xs text-[#78716C] group-hover:text-[#1C1917]">
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mood Filter Section */}
      <div className="space-y-4">
        <h3 className="font-display text-base font-light tracking-wide text-[#1C1917]">
          Mood
        </h3>
        <ul className="space-y-2.5">
          {MOODS.map((mood) => {
            const isSelected =
              selectedMood.toLowerCase() === mood.toLowerCase();
            const count = moodCounts[mood] ?? 0;

            return (
              <li key={mood}>
                <button
                  type="button"
                  onClick={() => onMoodSelect(mood)}
                  className={cn(
                    "w-full flex items-center justify-between text-xs tracking-wider transition-colors py-1 group focus:outline-hidden",
                    isSelected
                      ? "text-[#3E1C27] font-semibold"
                      : "text-[#57534E] hover:text-[#1C1917]"
                  )}
                  aria-pressed={isSelected}
                >
                  <span className="flex items-center gap-2">
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3E1C27]" />
                    )}
                    <span className={cn(isSelected && "underline underline-offset-4")}>
                      {mood}
                    </span>
                  </span>
                  <span className="font-serif italic text-xs text-[#78716C] group-hover:text-[#1C1917]">
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  // If rendered as mobile slide-out drawer
  if (isMobileDrawer) {
    return (
      <div
        className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-subtle-fade"
        role="dialog"
        aria-modal="true"
        aria-label="Filter Options"
      >
        <div className="w-full max-w-xs bg-[#FAF7F2] h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E8E1D5]">
              <h2 className="font-display text-xl font-light tracking-wider text-[#1C1917]">
                FILTERS
              </h2>
              <button
                type="button"
                onClick={onCloseMobileDrawer}
                className="p-1 text-[#1C1917] hover:text-[#3E1C27] focus:outline-hidden"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>

          <div className="pt-8 border-t border-[#E8E1D5] mt-8">
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              className="w-full py-3 bg-[#3E1C27] text-[#FAF7F2] text-xs font-medium tracking-[0.2em] uppercase focus:outline-hidden"
            >
              VIEW RESULTS
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop sidebar
  return (
    <aside
      aria-label="Fragrance catalog filters"
      className="hidden lg:block w-52 shrink-0 pr-6"
    >
      {content}
    </aside>
  );
}

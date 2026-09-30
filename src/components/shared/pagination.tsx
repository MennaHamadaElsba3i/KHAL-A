import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Fragrance catalog pagination"
      className="flex items-center justify-center space-x-6 py-12 text-xs tracking-[0.2em] animate-subtle-fade"
    >
      {/* Previous */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "inline-flex items-center gap-1.5 uppercase transition-all duration-300 focus:outline-hidden group",
          currentPage <= 1
            ? "text-[#D6D3D1] cursor-not-allowed opacity-40"
            : "text-[#78716C] hover:text-[#1C1917] hover:-translate-x-0.5"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
        <span className="hidden sm:inline">PREVIOUS</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-3">
        {pages.map((page) => {
          const isCurrent = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isCurrent ? "page" : undefined}
              className={cn(
                "w-8 h-8 flex items-center justify-center font-display text-sm transition-all duration-300 focus:outline-hidden relative",
                isCurrent
                  ? "text-[#1C1917] font-semibold scale-105"
                  : "text-[#78716C] hover:text-[#1C1917] hover:scale-105"
              )}
            >
              {page}
              <span
                className={cn(
                  "absolute bottom-0 left-1.5 right-1.5 h-[1.5px] bg-[#1C1917] transition-all duration-300",
                  isCurrent ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "inline-flex items-center gap-1.5 uppercase transition-all duration-300 focus:outline-hidden group",
          currentPage >= totalPages
            ? "text-[#D6D3D1] cursor-not-allowed opacity-40"
            : "text-[#78716C] hover:text-[#1C1917] hover:translate-x-0.5"
        )}
        aria-label="Next page"
      >
        <span>NEXT</span>
        <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </nav>
  );
}

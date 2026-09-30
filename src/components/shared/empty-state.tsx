import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onClear?: () => void;
  clearLabel?: string;
}

export function EmptyState({
  title = "No fragrances found.",
  description = "Try adjusting your search or filters to discover other olfactory creations.",
  onClear,
  clearLabel = "Clear All Filters",
}: EmptyStateProps) {
  return (
    <div className="py-20 px-4 text-center max-w-md mx-auto flex flex-col items-center justify-center animate-subtle-fade">
      <div className="w-12 h-12 rounded-full border border-[#E5DDD1] flex items-center justify-center text-[#9E8062] mb-6">
        <Sparkles className="w-5 h-5 stroke-[1.5]" />
      </div>

      <h3 className="font-display text-2xl font-light tracking-[0.08em] text-[#1C1917] mb-3">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed mb-8">
        {description}
      </p>

      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center justify-center px-6 py-3 bg-[#3E1C27] hover:bg-[#2B121B] text-[#FAF7F2] text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 focus:outline-hidden"
        >
          {clearLabel}
        </button>
      )}
    </div>
  );
}

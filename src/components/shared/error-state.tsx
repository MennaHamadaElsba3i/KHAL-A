import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "We couldn't load the collection.",
  message = "An unexpected error occurred while communicating with the KHALÉA fragrance maison.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="py-20 px-4 text-center max-w-md mx-auto flex flex-col items-center justify-center animate-subtle-fade">
      <div className="w-12 h-12 rounded-full border border-[#D97706]/30 flex items-center justify-center text-[#B45309] mb-6">
        <AlertCircle className="w-5 h-5 stroke-[1.5]" />
      </div>

      <h3 className="font-display text-2xl font-light tracking-[0.08em] text-[#1C1917] mb-3">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed mb-8">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#3E1C27] text-[#3E1C27] hover:bg-[#3E1C27] hover:text-[#FAF7F2] text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 focus:outline-hidden"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>TRY AGAIN</span>
        </button>
      )}
    </div>
  );
}

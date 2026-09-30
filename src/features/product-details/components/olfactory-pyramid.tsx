import { FragranceNotes } from "@/types/product";

interface OlfactoryPyramidProps {
  notes: FragranceNotes;
}

export function OlfactoryPyramid({ notes }: OlfactoryPyramidProps) {
  return (
    <div className="pt-8 border-t border-[#E8E1D5]/70 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-[#1C1917]">
          OLFACTORY COMPOSITION
        </h3>
        <span className="text-[11px] font-serif italic text-[#78716C]">
          The Fragrance Pyramid
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Top Notes */}
        <div className="p-4 bg-[#F5EFE6]/60 border border-[#E5DDD1] hover:border-[#3E1C27]/30 hover:bg-[#F5EFE6]/90 transition-all duration-300 space-y-2 group animate-subtle-fade delay-100">
          <div className="flex items-baseline justify-between border-b border-[#E5DDD1] pb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3E1C27]">
              TOP NOTES
            </span>
            <span className="text-[10px] text-[#78716C] italic font-serif">
              Initial 20m
            </span>
          </div>
          <ul className="space-y-1 pt-1">
            {notes.top.map((note) => (
              <li
                key={note}
                className="text-xs text-[#57534E] font-light tracking-wide group-hover:text-[#1C1917] transition-colors"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Heart Notes */}
        <div className="p-4 bg-[#F5EFE6]/60 border border-[#E5DDD1] hover:border-[#3E1C27]/30 hover:bg-[#F5EFE6]/90 transition-all duration-300 space-y-2 group animate-subtle-fade delay-200">
          <div className="flex items-baseline justify-between border-b border-[#E5DDD1] pb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3E1C27]">
              HEART NOTES
            </span>
            <span className="text-[10px] text-[#78716C] italic font-serif">
              2 to 6 Hours
            </span>
          </div>
          <ul className="space-y-1 pt-1">
            {notes.heart.map((note) => (
              <li
                key={note}
                className="text-xs text-[#57534E] font-light tracking-wide group-hover:text-[#1C1917] transition-colors"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Base Notes */}
        <div className="p-4 bg-[#F5EFE6]/60 border border-[#E5DDD1] hover:border-[#3E1C27]/30 hover:bg-[#F5EFE6]/90 transition-all duration-300 space-y-2 group animate-subtle-fade delay-300">
          <div className="flex items-baseline justify-between border-b border-[#E5DDD1] pb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3E1C27]">
              BASE NOTES
            </span>
            <span className="text-[10px] text-[#78716C] italic font-serif">
              Enduring Signature
            </span>
          </div>
          <ul className="space-y-1 pt-1">
            {notes.base.map((note) => (
              <li
                key={note}
                className="text-xs text-[#57534E] font-light tracking-wide group-hover:text-[#1C1917] transition-colors"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

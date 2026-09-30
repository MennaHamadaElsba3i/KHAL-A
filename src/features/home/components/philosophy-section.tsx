import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhilosophyData } from "@/types/home";

interface PhilosophySectionProps {
  data: PhilosophyData;
}

export function PhilosophySection({ data }: PhilosophySectionProps) {
  return (
    <section
      id="philosophy"
      aria-label="Philosophy"
      className="py-20 lg:py-32 border-b border-[#E8E1D5]/70 bg-[#FAF7F2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 max-w-4xl">
          <span className="text-[11px] sm:text-xs font-medium tracking-[0.25em] text-[#78716C] uppercase">
            {data.badge}
          </span>

          <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1C1917] leading-[1.2]">
            <p>{data.quotePart1}</p>
            <p className="font-serif italic font-normal text-[#3E1C27] mt-1">
              {data.quoteItalic}
            </p>
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-4">
            <div className="md:col-span-8">
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed font-light">
                {data.content}
              </p>
            </div>

            <div className="md:col-span-4 md:text-right">
              <Link
                href={data.ctaHref}
                className="group inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-[#1C1917] hover:text-[#3E1C27] transition-colors"
              >
                <span>{data.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

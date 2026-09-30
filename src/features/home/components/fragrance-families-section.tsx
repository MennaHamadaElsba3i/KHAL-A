import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FragranceFamiliesSectionData } from "@/types/home";

interface FragranceFamiliesSectionProps {
  data: FragranceFamiliesSectionData;
}

export function FragranceFamiliesSection({
  data,
}: FragranceFamiliesSectionProps) {
  return (
    <section
      id="fragrance-families"
      aria-label="Fragrance Families"
      className="py-20 lg:py-28 bg-[#3E1C27] text-[#FAF7F2] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#522536]">
          <div className="space-y-3">
            <span className="text-[11px] sm:text-xs font-medium tracking-[0.25em] text-[#D4AF37] uppercase">
              {data.badge}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#FAF7F2]">
              <span>{data.titleRegular}</span>{" "}
              <span className="font-serif italic font-normal text-[#E8D0D8]">
                {data.titleItalic}
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-[#D8C7CD] leading-relaxed font-light">
              {data.description}
            </p>
          </div>
        </div>

        {/* 5 Fragrance Families Grid with Refined Luxury Hover Interactions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {data.families.map((family, idx) => (
            <Link
              key={family.id}
              href={`/products?family=${family.slug}`}
              className="group flex flex-col justify-between p-6 sm:p-5 rounded-xs bg-[#2B121B]/40 hover:bg-[#2B121B]/85 border border-[#522536] hover:border-[#D4AF37]/60 hover:shadow-lg hover:shadow-black/25 transform hover:-translate-y-1.5 transition-all duration-400 ease-out focus:outline-hidden relative"
              aria-label={`Explore ${family.name} fragrance family`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="space-y-4">
                {/* Number tag */}
                <span className="font-serif italic text-xs text-[#D4AF37]/80 group-hover:text-[#D4AF37] transition-colors">
                  {family.number}
                </span>

                <div>
                  <h3 className="font-display text-2xl font-light tracking-wide text-[#FAF7F2] group-hover:text-[#D4AF37] transition-colors duration-300">
                    {family.name}
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#B89CA5] group-hover:text-[#E8D0D8] transition-colors duration-300 mt-1">
                    {family.subtitle}
                  </p>
                </div>

                <p className="text-xs text-[#D8C7CD] font-light leading-relaxed group-hover:text-[#FAF7F2] transition-colors duration-300">
                  {family.description}
                </p>
              </div>

              {/* Arrow and count */}
              <div className="pt-6 mt-6 border-t border-[#522536]/80 flex items-center justify-between text-xs">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#B89CA5] group-hover:text-[#FAF7F2] transition-colors">
                  {family.count} {family.count === 1 ? "SCENT" : "SCENTS"}
                </span>
                <span className="w-7 h-7 rounded-full border border-[#522536] group-hover:border-[#D4AF37] group-hover:bg-[#FAF7F2] group-hover:text-[#3E1C27] flex items-center justify-center text-[#D8C7CD] transition-all duration-300 group-hover:scale-105">
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

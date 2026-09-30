import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shared/product-card";
import { SignatureCollectionData } from "@/types/home";

interface SignatureCollectionSectionProps {
  data: SignatureCollectionData;
}

export function SignatureCollectionSection({
  data,
}: SignatureCollectionSectionProps) {
  return (
    <section
      aria-label="Signature Collection"
      className="py-20 lg:py-28 border-b border-[#E8E1D5]/70 bg-[#F5EFE6]/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            <span className="text-[11px] sm:text-xs font-medium tracking-[0.25em] text-[#78716C] uppercase">
              {data.badge}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1917] tracking-tight">
              <span>{data.titleRegular}</span>{" "}
              <span className="font-serif italic font-normal text-[#3E1C27]">
                {data.titleItalic}
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed font-light">
              {data.description}
            </p>
          </div>
        </div>

        {/* 4 Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {data.featuredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              priority={idx < 2}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            href={data.viewAllCta.href}
            className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-[#3E1C27] hover:bg-[#3E1C27] text-[#3E1C27] hover:text-[#FAF7F2] text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 focus:outline-hidden"
          >
            <span>{data.viewAllCta.label}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

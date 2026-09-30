import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatPrice, formatIndex } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
  priority?: boolean;
}

export function ProductCard({ product, index, priority = false }: ProductCardProps) {
  const displayIndex = index !== undefined ? formatIndex(index + 1) : null;
  const staggerDelay = index !== undefined ? `${Math.min(index * 60, 480)}ms` : "0ms";

  return (
    <article
      className="group flex flex-col justify-between animate-subtle-fade"
      style={{ animationDelay: staggerDelay }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#3E1C27]"
        aria-label={`View details for ${product.name} fragrance`}
      >
        {/* Product Image Container with subtle border transition & zoom */}
        <div className="relative aspect-4/5 w-full overflow-hidden bg-[#EFE9DF] border border-[#E5DDD1]/70 group-hover:border-[#3E1C27]/40 mb-4 transition-colors duration-500">
          {/* Top Left Number Label */}
          {displayIndex && (
            <span
              className="absolute top-3 left-3 z-10 font-serif italic text-xs md:text-sm text-[#78716C] bg-[#FAF7F2]/85 backdrop-blur-xs px-2 py-0.5 border border-[#E5DDD1]/40"
              aria-hidden="true"
            >
              {displayIndex}
            </span>
          )}

          {/* Perfume Bottle Image */}
          <Image
            src={product.images[0] || "/images/perfumes/hero-perfume.jpg"}
            alt={`${product.name} luxury perfume bottle by KHALÉA`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#3E1C27]/0 group-hover:bg-[#3E1C27]/5 transition-colors duration-500" />
        </div>

        {/* Perfume Details */}
        <div className="space-y-1.5">
          {/* Name & Price */}
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-lg sm:text-xl font-light tracking-[0.12em] text-[#1C1917] group-hover:text-[#3E1C27] transition-colors duration-300">
              {product.name}
            </h3>
            <span className="text-xs sm:text-sm font-medium tracking-wide text-[#57534E]">
              {formatPrice(product.price, product.currency)}
            </span>
          </div>

          {/* Family & Mood */}
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium text-[#78716C]">
            {product.family} • {product.mood}
          </p>

          {/* Short Notes */}
          <p className="text-xs text-[#78716C] line-clamp-1 font-light italic">
            {product.shortNotes}
          </p>
        </div>
      </Link>

      {/* View Details Link */}
      <div className="pt-2">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#9E8062] group-hover:text-[#3E1C27] transition-colors duration-300 gap-1.5 group/link"
        >
          <span className="relative">
            VIEW DETAILS
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3E1C27] transition-all duration-300 group-hover:w-full" />
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-xs">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

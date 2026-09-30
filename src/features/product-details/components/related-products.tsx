import { Product } from "@/types/product";
import { ProductCard } from "@/components/shared/product-card";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section
      aria-label="Related fragrances"
      className="mt-24 pt-16 border-t border-[#E8E1D5]/70 animate-subtle-fade"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div className="space-y-2">
          <span className="text-[11px] sm:text-xs font-medium tracking-[0.25em] text-[#78716C] uppercase block">
            YOU MAY ALSO RESONATE WITH
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-[#1C1917]">
            Complementary{" "}
            <span className="font-serif italic text-[#3E1C27]">signatures</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {products.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
    </section>
  );
}

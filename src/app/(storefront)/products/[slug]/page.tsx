import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productsService } from "@/services/products.service";
import { ProductGallery } from "@/features/product-details/components/product-gallery";
import { ProductInfo } from "@/features/product-details/components/product-info";
import { RelatedProducts } from "@/features/product-details/components/related-products";
import { ChevronRight } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const { products } = await productsService.getProducts({ limit: 50 });
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await productsService.getProductBySlug(slug);
    return {
      title: `${data.product.name} — ${data.product.subtitle || data.product.tagline}`,
      description: data.product.description,
      openGraph: {
        title: `${data.product.name} | KHALÉA Haute Parfumerie`,
        description: data.product.description,
        images: data.product.images.map((img) => ({
          url: img,
          width: 800,
          height: 1000,
          alt: data.product.name,
        })),
      },
    };
  } catch {
    return {
      title: "Fragrance Not Found",
    };
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  let productData;
  try {
    productData = await productsService.getProductBySlug(slug);
  } catch {
    notFound();
  }

  const { product, relatedProducts } = productData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Editorial Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-10 sm:mb-12">
        <ol className="flex items-center space-x-2 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#78716C]">
          <li>
            <Link href="/" className="hover:text-[#1C1917] transition-colors">
              HOME
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3 h-3 text-[#B8B0A2]" />
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-[#1C1917] transition-colors"
            >
              COLLECTION
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3 h-3 text-[#B8B0A2]" />
          </li>
          <li className="text-[#3E1C27] font-semibold" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* 2-Column Product Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Gallery (Left: 6 cols) */}
        <div className="lg:col-span-6 lg:sticky lg:top-28">
          <ProductGallery
            images={product.images}
            productName={product.name}
          />
        </div>

        {/* Info & Olfactory breakdown (Right: 6 cols) */}
        <div className="lg:col-span-6">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Related Fragrances Section */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}

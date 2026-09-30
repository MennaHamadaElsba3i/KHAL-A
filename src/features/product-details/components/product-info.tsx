"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { OlfactoryPyramid } from "./olfactory-pyramid";
import { Sparkles, Clock, Wind, ShoppingBag, Check } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [added, setAdded] = useState(false);

  const handleAddToBag = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <div className="space-y-8 animate-subtle-fade">
      {/* Category & Mood Badges */}
      <div className="flex items-center gap-3">
        <Link
          href={`/products?family=${product.family.toLowerCase()}`}
          className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase px-2.5 py-1 bg-[#F2ECE4] hover:bg-[#EAE2D8] text-[#3E1C27] border border-[#E5DDD1] transition-all duration-300 hover:scale-102"
        >
          {product.family}
        </Link>
        <Link
          href={`/products?mood=${product.mood.toLowerCase()}`}
          className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase px-2.5 py-1 bg-[#FAF7F2] hover:bg-[#F2ECE4] text-[#78716C] border border-[#E5DDD1] transition-all duration-300 hover:scale-102"
        >
          {product.mood}
        </Link>
        <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-[#78716C] ml-auto">
          {product.concentration}
        </span>
      </div>

      {/* Title & Price */}
      <div className="space-y-2 border-b border-[#E8E1D5]/70 pb-6 animate-subtle-fade delay-100">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#1C1917]">
          {product.name}
        </h1>
        {product.subtitle && (
          <p className="font-serif italic text-lg sm:text-xl text-[#78716C]">
            {product.subtitle}
          </p>
        )}
        <div className="pt-2 flex items-baseline justify-between">
          <span className="text-2xl font-light text-[#1C1917]">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-xs text-[#78716C] tracking-widest uppercase">
            {product.size}
          </span>
        </div>
      </div>

      {/* Luxury Add to Bag CTA with Refined Press / Feedback Interaction */}
      <div className="pt-1 animate-subtle-fade delay-150">
        <button
          type="button"
          onClick={handleAddToBag}
          className="group w-full py-4 px-6 bg-[#3E1C27] hover:bg-[#2B121B] active:scale-[0.99] text-[#FAF7F2] text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 shadow-xs hover:shadow-md flex items-center justify-center gap-3 focus:outline-hidden"
        >
          {added ? (
            <>
              <Check className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[#D4AF37] tracking-[0.2em]">ADDED TO SIGNATURE BAG</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 stroke-[1.6] group-hover:scale-105 transition-transform duration-300" />
              <span>ACQUIRE EXTRAIT — {formatPrice(product.price, product.currency)}</span>
            </>
          )}
        </button>
        <p className="text-[10px] text-center text-[#78716C] tracking-widest uppercase mt-2.5">
          COMPLIMENTARY SHIPPING & SIGNATURE SAMPLE SET INCLUDED
        </p>
      </div>

      {/* Tagline & Story */}
      <div className="space-y-4 animate-subtle-fade delay-200">
        <p className="text-sm sm:text-base font-serif italic text-[#3E1C27] leading-relaxed">
          &ldquo;{product.tagline}&rdquo;
        </p>

        <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-light">
          {product.description}
        </p>

        <div className="p-4 bg-[#F5EFE6]/50 border-l-2 border-[#3E1C27] my-4 transition-colors hover:bg-[#F5EFE6]/80">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3E1C27] block mb-1">
            THE HOUSE STORY
          </span>
          <p className="text-xs text-[#78716C] italic font-serif leading-relaxed">
            {product.story}
          </p>
        </div>
      </div>

      {/* Olfactory Specs: Longevity, Sillage, Intensity */}
      <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#E8E1D5]/70 text-center animate-subtle-fade delay-300">
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1 text-[#78716C]">
            <Clock className="w-3.5 h-3.5 text-[#3E1C27]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
              LONGEVITY
            </span>
          </div>
          <p className="text-xs font-medium text-[#1C1917]">
            {product.longevity}
          </p>
        </div>

        <div className="space-y-1 border-x border-[#E8E1D5]/70">
          <div className="flex items-center justify-center gap-1 text-[#78716C]">
            <Wind className="w-3.5 h-3.5 text-[#3E1C27]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
              SILLAGE
            </span>
          </div>
          <p className="text-xs font-medium text-[#1C1917]">
            {product.sillage}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1 text-[#78716C]">
            <Sparkles className="w-3.5 h-3.5 text-[#3E1C27]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
              INTENSITY
            </span>
          </div>
          <p className="text-xs font-medium text-[#1C1917]">
            {product.intensity}
          </p>
        </div>
      </div>

      {/* Olfactory Pyramid with staggered note reveals */}
      <OlfactoryPyramid notes={product.notes} />

      {/* Application Ritual */}
      <div className="pt-6 border-t border-[#E8E1D5]/70 space-y-2 animate-subtle-fade delay-400">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#78716C]">
          THE RITUAL OF APPLICATION
        </span>
        <p className="text-xs text-[#57534E] leading-relaxed font-light">
          {product.ritual}
        </p>
      </div>
    </div>
  );
}

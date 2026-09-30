"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const displayImages =
    images.length > 0 ? images : ["/images/perfumes/hero-perfume.jpg"];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 animate-subtle-fade">
      {/* Thumbnail Selector */}
      {displayImages.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(idx)}
              className={cn(
                "relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 overflow-hidden border transition-all duration-300 focus:outline-hidden group",
                selectedImage === idx
                  ? "border-[#3E1C27] ring-1 ring-[#3E1C27] shadow-xs"
                  : "border-[#E5DDD1] opacity-70 hover:opacity-100 hover:border-[#78716C]"
              )}
              aria-label={`View image ${idx + 1} of ${productName}`}
              aria-current={selectedImage === idx}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="100px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Large Image with smooth image switch and subtle hover zoom */}
      <div className="relative aspect-4/5 w-full flex-1 overflow-hidden bg-[#ECE4D8] border border-[#E5DDD1] group">
        <div key={selectedImage} className="w-full h-full animate-subtle-fade">
          <Image
            src={displayImages[selectedImage] || displayImages[0]}
            alt={`${productName} luxury perfume flacon`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

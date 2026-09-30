import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroData } from "@/types/home";

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden border-b border-[#E8E1D5]/70 pt-8 pb-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Staggered Editorial Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <span className="text-[11px] sm:text-xs font-medium tracking-[0.25em] text-[#78716C] uppercase animate-hero-fade">
              {data.badge}
            </span>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-light leading-[1.05] tracking-tight text-[#1C1917] animate-hero-fade delay-100">
              <span>{data.headlinePart1}</span>
              <br />
              <span>{data.headlinePart2}</span>{" "}
              <span className="font-serif italic font-normal text-[#3E1C27] inline-block transition-transform duration-500 hover:scale-102">
                {data.headlineItalic}
              </span>
            </h1>

            <p className="text-xs sm:text-sm tracking-[0.2em] font-medium text-[#78716C] uppercase max-w-md animate-hero-fade delay-200">
              {data.subheadline}
            </p>

            {/* CTAs with refined hover interactions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2 animate-hero-fade delay-300">
              <Link
                href={data.primaryCta.href}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#3E1C27] hover:bg-[#2B121B] text-[#FAF7F2] text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-xs hover:shadow-md focus:outline-hidden hover:tracking-[0.23em]"
              >
                <span>{data.primaryCta.label}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>

              <Link
                href={data.secondaryCta.href}
                className="group inline-flex items-center gap-2 px-3 py-3.5 text-xs font-medium tracking-[0.2em] uppercase text-[#1C1917] hover:text-[#3E1C27] transition-all duration-300 focus:outline-hidden hover:tracking-[0.23em]"
              >
                <span>{data.secondaryCta.label}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Perfume Imagery with subtle float and hover zoom */}
          <div className="lg:col-span-6 relative animate-hero-fade delay-200">
            <div className="relative aspect-4/3 sm:aspect-5/4 lg:aspect-4/3 w-full overflow-hidden bg-[#ECE4D8] border border-[#E5DDD1] shadow-xs group">
              <div className="w-full h-full animate-float-slow">
                <Image
                  src={data.image}
                  alt="KHALÉA signature perfume bottle bathed in golden sunlight on travertine marble"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transform group-hover:scale-104 transition-transform duration-1000 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Image caption */}
            <div className="mt-3 text-right">
              <span className="text-[10px] tracking-[0.2em] font-medium text-[#78716C] uppercase">
                {data.imageCaption}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

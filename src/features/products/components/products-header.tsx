export function ProductsHeader() {
  return (
    <div className="pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-[#E8E1D5]/70 animate-subtle-fade">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        {/* Left Column: House Signatures & Title */}
        <div className="md:col-span-8 space-y-3">
          <span className="text-[11px] sm:text-xs font-medium tracking-[0.25em] text-[#78716C] uppercase block">
            THE HOUSE SIGNATURES
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-light leading-[1.05] tracking-tight text-[#1C1917]">
            <span>The</span>
            <br />
            <span className="font-serif italic font-normal text-[#1C1917] hover:text-[#3E1C27] transition-colors duration-500">
              collection
            </span>
          </h1>
        </div>

        {/* Right Column: Editorial description */}
        <div className="md:col-span-4">
          <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed font-light max-w-sm">
            Discover fragrances created to become your invisible signature.
          </p>
        </div>
      </div>
    </div>
  );
}

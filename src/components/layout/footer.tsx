import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-[#121110] text-[#D6D3D1] border-t border-[#292524] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <span className="font-display text-2xl tracking-[0.3em] text-[#FAF7F2] font-light">
              {siteConfig.name}
            </span>
            <p className="text-sm font-serif italic text-[#A8A29E] max-w-sm">
              &ldquo;{siteConfig.tagline}&rdquo;
            </p>
            <p className="text-xs text-[#78716C] leading-relaxed max-w-md pt-2">
              A fictional luxury feminine fragrance house dedicated to scent as
              an invisible signature. Formulated with rare botanicals and aged
              woods in limited seasonal extraits.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-medium tracking-[0.25em] text-[#FAF7F2] uppercase mb-5">
              EXPLORATION
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-xs text-[#A8A29E] hover:text-[#FAF7F2] transition-colors tracking-wider"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-xs text-[#A8A29E] hover:text-[#FAF7F2] transition-colors tracking-wider"
                >
                  The Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/#fragrance-families"
                  className="text-xs text-[#A8A29E] hover:text-[#FAF7F2] transition-colors tracking-wider"
                >
                  Fragrance Families
                </Link>
              </li>
              <li>
                <Link
                  href="/#philosophy"
                  className="text-xs text-[#A8A29E] hover:text-[#FAF7F2] transition-colors tracking-wider"
                >
                  Our Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Fragrance Families Links */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] font-medium tracking-[0.25em] text-[#FAF7F2] uppercase mb-5">
              OLFACTORY FAMILIES
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {siteConfig.fragranceFamilies.map((family) => (
                <Link
                  key={family.id}
                  href={`/products?family=${family.slug}`}
                  className="text-xs text-[#A8A29E] hover:text-[#FAF7F2] transition-colors tracking-wider"
                >
                  {family.name}
                </Link>
              ))}
            </div>
            <p className="text-[11px] text-[#78716C] mt-6 tracking-wide">
              PARIS • GRASSE • WORLDWIDE
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#292524] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#78716C] space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} KHALÉA HAUTE PARFUMERIE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 text-[11px] tracking-wider">
            <span className="hover:text-[#A8A29E] cursor-pointer">TERMS</span>
            <span className="hover:text-[#A8A29E] cursor-pointer">PRIVACY</span>
            <span className="hover:text-[#A8A29E] cursor-pointer">LEGAL NOTICE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

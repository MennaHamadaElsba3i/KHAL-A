"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Menu, X, ArrowRight, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setCartDrawerOpen(false);
  }, [pathname]);

  // Handle escape key to close drawers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setCartDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isProductsPage = pathname.startsWith("/products");

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 bg-[#FAF7F2]/95 backdrop-blur-md",
          scrolled
            ? "border-b border-[#E8E1D5] shadow-xs py-3.5"
            : "border-b border-[#E8E1D5]/60 py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div className="flex-1 flex items-center">
              <Link
                href="/"
                className="group inline-block focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#3E1C27]"
              >
                <span className="font-display text-2xl sm:text-3xl font-light tracking-[0.25em] text-[#1C1917] group-hover:text-[#3E1C27] transition-colors duration-300">
                  KHALÉA
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden md:flex items-center space-x-8 lg:space-x-12"
            >
              {siteConfig.navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "text-xs tracking-[0.2em] font-medium transition-colors duration-200 py-1 relative group",
                      isActive
                        ? "text-[#3E1C27] font-semibold"
                        : "text-[#57534E] hover:text-[#1C1917]"
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#3E1C27] transition-all duration-300",
                        isActive
                          ? "w-full opacity-100"
                          : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Search / Return Home + Shopping Bag Detail + Mobile Menu */}
            <div className="flex-1 flex items-center justify-end space-x-4 sm:space-x-5">
              {isProductsPage ? (
                <Link
                  href="/"
                  className="hidden sm:inline-flex items-center text-xs tracking-[0.18em] font-medium text-[#78716C] hover:text-[#3E1C27] transition-colors duration-200 gap-1.5 group"
                >
                  <span>RETURN HOME</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              ) : (
                <Link
                  href="/products"
                  className="hidden sm:inline-flex items-center text-xs tracking-[0.18em] font-medium text-[#78716C] hover:text-[#3E1C27] transition-colors duration-200 gap-1.5 group"
                >
                  <Search className="w-3.5 h-3.5 text-[#78716C] group-hover:text-[#3E1C27] transition-colors" />
                  <span>SEARCH</span>
                </Link>
              )}

              {/* Shopping Bag Icon with Luxury Badge Indicator */}
              <button
                type="button"
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-1.5 text-[#1C1917] hover:text-[#3E1C27] transition-colors duration-200 focus:outline-hidden group"
                aria-label="View shopping bag (0 items)"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.6] group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#3E1C27] text-[#FAF7F2] text-[8px] font-semibold flex items-center justify-center tracking-tighter">
                  0
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 text-[#1C1917] hover:text-[#3E1C27] transition-colors focus:outline-hidden"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-full bg-[#FAF7F2] border-b border-[#E8E1D5] shadow-lg px-6 py-8 animate-subtle-fade">
            <nav className="flex flex-col space-y-6">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm tracking-[0.25em] font-medium text-[#1C1917] hover:text-[#3E1C27] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#E8E1D5]/70 flex flex-col space-y-4">
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center text-xs tracking-[0.2em] font-medium text-[#3E1C27] gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>EXPLORE ALL FRAGRANCES</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Luxury Cart Drawer (Quiet Luxury E-Commerce Detail) */}
      {cartDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-subtle-fade"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag"
        >
          <div className="w-full max-w-sm bg-[#FAF7F2] h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl animate-subtle-fade">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E1D5]">
                <div className="flex items-center space-x-2">
                  <span className="font-display text-lg tracking-[0.2em] text-[#1C1917]">
                    YOUR BAG
                  </span>
                  <span className="text-xs font-serif italic text-[#78716C]">
                    (0 items)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-1 text-[#78716C] hover:text-[#1C1917] transition-colors focus:outline-hidden"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Empty Bag State */}
              <div className="py-16 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border border-[#E5DDD1] flex items-center justify-center text-[#78716C] mx-auto mb-3">
                  <ShoppingBag className="w-5 h-5 stroke-[1.3]" />
                </div>
                <h3 className="font-display text-xl font-light tracking-wide text-[#1C1917]">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#78716C] font-light leading-relaxed max-w-xs mx-auto">
                  Fragrances selected during your journey through the collection
                  will appear here.
                </p>
              </div>

              {/* Complimentary shipping detail */}
              <div className="p-4 bg-[#F5EFE6]/60 border border-[#E5DDD1] space-y-1 text-center">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3E1C27] block">
                  THE KHALÉA COMPLIMENTARY PLEDGE
                </span>
                <p className="text-[11px] text-[#78716C] leading-relaxed">
                  Complimentary worldwide shipping on all orders over $150,
                  complete with two curated discovery miniatures.
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-8 border-t border-[#E8E1D5]">
              <Link
                href="/products"
                onClick={() => setCartDrawerOpen(false)}
                className="w-full py-3.5 bg-[#3E1C27] hover:bg-[#2B121B] text-[#FAF7F2] text-xs font-medium tracking-[0.2em] uppercase text-center block transition-all duration-300 focus:outline-hidden"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

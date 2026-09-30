export const siteConfig = {
  name: "KHALÉA",
  tagline: "The Essence of Her.",
  description:
    "A fictional luxury feminine fragrance house centered around fragrance as an invisible signature. Modern niche perfumery crafted with quiet elegance.",
  url: "https://khalea-perfume.vercel.app",
  author: "KHALÉA Haute Parfumerie",
  announcement:
    "COMPLIMENTARY SHIPPING ON ORDERS OVER $150 — DISCOVER YOUR SIGNATURE SCENT",
  links: {
    home: "/",
    collection: "/products",
    families: "/#fragrance-families",
    about: "/#philosophy",
    newsletter: "/#newsletter",
  },
  navItems: [
    { label: "HOME", href: "/" },
    { label: "COLLECTION", href: "/products" },
    { label: "FAMILIES", href: "/#fragrance-families" },
    { label: "ABOUT", href: "/#philosophy" },
  ],
  fragranceFamilies: [
    { id: "floral", name: "Floral", slug: "floral" },
    { id: "amber", name: "Amber", slug: "amber" },
    { id: "woody", name: "Woody", slug: "woody" },
    { id: "fresh", name: "Fresh", slug: "fresh" },
    { id: "musk", name: "Musk", slug: "musk" },
  ] as const,
  moods: [
    "Soft",
    "Romantic",
    "Sensual",
    "Mysterious",
    "Bold",
    "Fresh",
  ] as const,
};

export type SiteConfig = typeof siteConfig;

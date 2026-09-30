import { HomeApiResponse } from "@/types/home";
import { MOCK_PRODUCTS } from "./products";
import { MOCK_CATEGORIES } from "./categories";

export const MOCK_HOME_DATA: HomeApiResponse = {
  announcement:
    "COMPLIMENTARY SHIPPING ON ORDERS OVER $150 — DISCOVER YOUR SIGNATURE SCENT",
  hero: {
    badge: "HAUTE PARFUMERIE • PARIS",
    headlinePart1: "The",
    headlinePart2: "Essence",
    headlineItalic: "of Her.",
    subheadline: "A REFLECTION OF BEAUTY & FORM — LUXURY PERFUME HOUSE",
    image: "/images/perfumes/hero-perfume.jpg",
    imageCaption: "L'AURA EXTRAIT — THE 2026 EDITION",
    primaryCta: {
      label: "DISCOVER COLLECTION",
      href: "/products",
    },
    secondaryCta: {
      label: "EXPLORE BY MOOD",
      href: "/products?mood=Romantic",
    },
  },
  philosophy: {
    badge: "— PHILOSOPHY",
    quotePart1: "A fragrance is more than a scent.",
    quoteItalic: "It is a memory, a mood, a signature.",
    content:
      "We craft each scent with bespoke care, weaving the warmth of rare woods with luminous botanicals—creating an invisible aura that leaves an indelible imprint wherever you step.",
    ctaText: "READ MORE",
    ctaHref: "/products",
  },
  signatureCollection: {
    badge: "— HOUSE SIGNATURES",
    titleRegular: "Signature",
    titleItalic: "collection",
    description:
      "A curated edit of our most celebrated extraits de parfum, crafted in limited batches in Grasse and Paris.",
    featuredProducts: MOCK_PRODUCTS.filter((p) => p.featured).slice(0, 4),
    viewAllCta: {
      label: "VIEW ALL FRAGRANCES",
      href: "/products",
    },
  },
  fragranceFamilies: {
    badge: "FIND YOUR SIGNATURE",
    titleRegular: "Fragrance",
    titleItalic: "families",
    description:
      "Explore our five olfactory territories, each composed to evoke distinct emotional landscapes and invisible presence.",
    families: MOCK_CATEGORIES,
  },
  newsletter: {
    badge: "— INVITATION",
    titlePart1: "Stay in her",
    titleItalic: "world.",
    description:
      "Receive private invitations to new extraits, private salon evenings, & olfactory letters from the house.",
    placeholder: "Your email address",
    buttonLabel: "SUBSCRIBE",
  },
};

import { Product } from "./product";
import { FragranceFamilyCategory } from "./category";

export interface HeroData {
  badge: string;
  headlinePart1: string;
  headlinePart2: string;
  headlineItalic: string;
  subheadline: string;
  image: string;
  imageCaption: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

export interface PhilosophyData {
  badge: string;
  quotePart1: string;
  quoteItalic: string;
  content: string;
  ctaText: string;
  ctaHref: string;
}

export interface SignatureCollectionData {
  badge: string;
  titleRegular: string;
  titleItalic: string;
  description: string;
  featuredProducts: Product[];
  viewAllCta: {
    label: string;
    href: string;
  };
}

export interface FragranceFamiliesSectionData {
  badge: string;
  titleRegular: string;
  titleItalic: string;
  description: string;
  families: FragranceFamilyCategory[];
}

export interface NewsletterData {
  badge: string;
  titlePart1: string;
  titleItalic: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
}

export interface HomeApiResponse {
  announcement: string;
  hero: HeroData;
  philosophy: PhilosophyData;
  signatureCollection: SignatureCollectionData;
  fragranceFamilies: FragranceFamiliesSectionData;
  newsletter: NewsletterData;
}

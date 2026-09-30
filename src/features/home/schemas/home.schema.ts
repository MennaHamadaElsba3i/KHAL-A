import { z } from "zod";
import { ProductSchema } from "@/features/products/schemas/product.schema";
import { CategorySchema } from "@/features/categories/schemas/category.schema";

export const HeroSchema = z.object({
  badge: z.string(),
  headlinePart1: z.string(),
  headlinePart2: z.string(),
  headlineItalic: z.string(),
  subheadline: z.string(),
  image: z.string(),
  imageCaption: z.string(),
  primaryCta: z.object({
    label: z.string(),
    href: z.string(),
  }),
  secondaryCta: z.object({
    label: z.string(),
    href: z.string(),
  }),
});

export const PhilosophySchema = z.object({
  badge: z.string(),
  quotePart1: z.string(),
  quoteItalic: z.string(),
  content: z.string(),
  ctaText: z.string(),
  ctaHref: z.string(),
});

export const SignatureCollectionSchema = z.object({
  badge: z.string(),
  titleRegular: z.string(),
  titleItalic: z.string(),
  description: z.string(),
  featuredProducts: z.array(ProductSchema),
  viewAllCta: z.object({
    label: z.string(),
    href: z.string(),
  }),
});

export const FragranceFamiliesSectionSchema = z.object({
  badge: z.string(),
  titleRegular: z.string(),
  titleItalic: z.string(),
  description: z.string(),
  families: z.array(CategorySchema),
});

export const NewsletterSchema = z.object({
  badge: z.string(),
  titlePart1: z.string(),
  titleItalic: z.string(),
  description: z.string(),
  placeholder: z.string(),
  buttonLabel: z.string(),
});

export const HomeApiResponseSchema = z.object({
  announcement: z.string(),
  hero: HeroSchema,
  philosophy: PhilosophySchema,
  signatureCollection: SignatureCollectionSchema,
  fragranceFamilies: FragranceFamiliesSectionSchema,
  newsletter: NewsletterSchema,
});

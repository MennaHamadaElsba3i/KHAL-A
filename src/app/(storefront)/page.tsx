import { homeService } from "@/services/home.service";
import { HeroSection } from "@/features/home/components/hero-section";
import { PhilosophySection } from "@/features/home/components/philosophy-section";
import { SignatureCollectionSection } from "@/features/home/components/signature-collection-section";
import { FragranceFamiliesSection } from "@/features/home/components/fragrance-families-section";
import { NewsletterSection } from "@/features/home/components/newsletter-section";

// Revalidate page content periodically or statically render
export const revalidate = 3600;

export default async function HomePage() {
  const homeData = await homeService.getHome();

  return (
    <div className="flex flex-col">
      <HeroSection data={homeData.hero} />
      <PhilosophySection data={homeData.philosophy} />
      <SignatureCollectionSection data={homeData.signatureCollection} />
      <FragranceFamiliesSection data={homeData.fragranceFamilies} />
      <NewsletterSection data={homeData.newsletter} />
    </div>
  );
}

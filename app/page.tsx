import Hero from "@/components/Hero";
import FeaturedResearch from "@/components/FeaturedResearch";
import LatestResearch from "@/components/LatestResearch";
import CategoryRail from "@/components/CategoryRail";
import AboutTeaser from "@/components/AboutTeaser";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedResearch />
      <LatestResearch />
      <CategoryRail />
      <AboutTeaser />
      <Newsletter />
    </>
  );
}

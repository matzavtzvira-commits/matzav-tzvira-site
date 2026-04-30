import IntroSplash from "@/components/IntroSplash";
import Navigation from "@/components/Navigation";
import HomeHero from "@/components/home/HomeHero";
import SocialProof from "@/components/home/SocialProof";
import FivePillars from "@/components/home/FivePillars";
import HomeAbout from "@/components/home/HomeAbout";
import FeaturedCourse from "@/components/home/FeaturedCourse";
import ArticlesPreview from "@/components/home/ArticlesPreview";
import CalculatorsPreview from "@/components/home/CalculatorsPreview";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import PreFooter from "@/components/home/PreFooter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <IntroSplash />
      <Navigation />
      <main>
        <HomeHero />
        <SocialProof />
        <FivePillars />
        <HomeAbout />
        <FeaturedCourse />
        <ArticlesPreview />
        <CalculatorsPreview />
        <HomeTestimonials />
        <PreFooter />
      </main>
      <Footer />
    </>
  );
}

import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Hook from "@/components/sections/Hook";
import About from "@/components/sections/About";
import Magazine from "@/components/sections/Magazine";
import Testimonials from "@/components/sections/Testimonials";
import WhatsIncluded from "@/components/sections/WhatsIncluded";
import Syllabus from "@/components/sections/Syllabus";
import Pricing from "@/components/sections/Pricing";
import Bonus from "@/components/sections/Bonus";
import FAQ from "@/components/sections/FAQ";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/Footer";

export const metadata = {
  title: "הכסף ישתדל, ואת תנוחי | מצב צבירה",
  description: "תוכנית לידע פיננסי ושוק ההון לנשים חרדיות — רבקי וייס",
};

export default function CoursePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Hook />
        <About />
        <Magazine />
        <Testimonials />
        <WhatsIncluded />
        <Syllabus />
        <Pricing />
        <Bonus />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

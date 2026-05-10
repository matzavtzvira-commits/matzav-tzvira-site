import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/home/SocialProof";
import Hook from "@/components/sections/Hook";
import ContrastCard from "@/components/sections/ContrastCard";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import WhatsIncluded from "@/components/sections/WhatsIncluded";
import DashboardShowcase from "@/components/sections/DashboardShowcase";
import Syllabus from "@/components/sections/Syllabus";
import Bonus from "@/components/sections/Bonus";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import MidCTA from "@/components/sections/MidCTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "תוכנית המאסטריות | מצב צבירה",
  description: "הידע הפיננסי שהיה צריך ללמד אותנו בבית הספר - שוק ההון, פנסיה, השקעות, בשפה שלנו.",
};

export default function CoursePage() {
  return (
    <>
      <Navigation />

      {/* Floating CTA */}
      <a
        href="#pricing"
        aria-label="עבור לרכישת התוכנית"
        style={{
          position: "fixed",
          bottom: 32,
          left: 24,
          zIndex: 999,
          background: "#FFFFFF",
          color: "#124AF0",
          border: "2.5px solid #124AF0",
          padding: "14px 28px",
          borderRadius: 50,
          fontWeight: 800,
          fontSize: "0.95rem",
          textDecoration: "none",
          boxShadow: "0 6px 28px rgba(18,74,240,0.25)",
          whiteSpace: "nowrap",
          animation: "floatBtn 3s ease-in-out infinite",
        }}
      >
        אני מצטרפת ←
      </a>
      <style>{`@keyframes floatBtn { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>

      <main>
        <Hero />
        {/* dark navy → blue */}
        <div style={{ height: 56, background: "#124AF0", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,56" fill="#060D3C"/>
          </svg>
        </div>
        <SocialProof />
        <Hook />
        {/* blue → dark navy */}
        <div style={{ height: 56, background: "#060D3C", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,56" fill="#124AF0"/>
          </svg>
        </div>
        <ContrastCard />
        {/* dark navy → white */}
        <div style={{ height: 56, background: "#FFFFFF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,56" fill="#060D3C"/>
          </svg>
        </div>
        <About />
        {/* white → white: no divider needed */}
        <Testimonials />
        {/* white → blue */}
        <div style={{ height: 56, background: "#124AF0", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,56" fill="#FFFFFF"/>
          </svg>
        </div>
        {/* CTA #2 - after testimonials */}
        <MidCTA />
        {/* blue → dark navy */}
        <div style={{ height: 56, background: "#060D3C", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,56" fill="#124AF0"/>
          </svg>
        </div>
        <WhatsIncluded />
        {/* dark navy → light */}
        <div style={{ height: 56, background: "#F4F7FF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,56" fill="#060D3C"/>
          </svg>
        </div>
        <DashboardShowcase />
        {/* light → white */}
        <div style={{ height: 40, background: "#FFFFFF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,40" fill="#F4F7FF"/>
          </svg>
        </div>
        <Syllabus />
        <Bonus />
        {/* white → light */}
        <div style={{ height: 40, background: "#F4F7FF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,40" fill="#FFFFFF"/>
          </svg>
        </div>
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

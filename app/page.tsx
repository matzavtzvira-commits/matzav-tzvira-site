import Navigation from "@/components/Navigation";
import HomeHero from "@/components/home/HomeHero";
import SocialProof from "@/components/home/SocialProof";
import ToggleSection from "@/components/home/ToggleSection";
import HomeAbout from "@/components/home/HomeAbout";
import CardsSection from "@/components/home/CardsSection";
import MUSTSection from "@/components/home/MUSTSection";
import LibrarySection from "@/components/home/LibrarySection";
import CommunitySection from "@/components/home/CommunitySection";
import VIPSection from "@/components/home/VIPSection";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import UrgencySection from "@/components/home/UrgencySection";
import MediaSection from "@/components/home/MediaSection";
import BrushstrokeSection from "@/components/home/BrushstrokeSection";
import PreFooter from "@/components/home/PreFooter";
import Popups from "@/components/home/Popups";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      {/* Floating CTA */}
      <a
        href="/course"
        aria-label="עבור לתוכנית ה-MUSTריות"
        className="floating-cta"
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
          minHeight: 44,
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        לתוכנית ה-MUSTריות <span className="arrow-anim">←</span>
      </a>
      <style>{`
        @keyframes floatBtn { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @media(max-width:640px){
          .floating-cta { bottom: 16px !important; left: 12px !important; padding: 12px 20px !important; font-size: 0.85rem !important; }
        }
      `}</style>

      <main id="main-content" tabIndex={-1}>
        <HomeHero />
        <SocialProof />
        <ToggleSection />
        {/* diagonal: blue → white */}
        <div style={{ height: 56, background: "#FFFFFF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,56" fill="#124AF0"/>
          </svg>
        </div>
        <HomeAbout />
        <CardsSection />
        <MUSTSection />
        {/* diagonal ↘ */}
        <div style={{ height: 40, background: "#FFFFFF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,40" fill="#060D3C"/>
          </svg>
        </div>
        <VIPSection />
        {/* diagonal ↙ */}
        <div style={{ height: 40, background: "#FFFFFF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,40" fill="#060D3C"/>
          </svg>
        </div>
        <LibrarySection />
        {/* diagonal ↘ */}
        <div style={{ height: 40, background: "#FFFFFF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,40" fill="#060D3C"/>
          </svg>
        </div>
        <CommunitySection />
        {/* convex arch: dark blue → white */}
        <div style={{ height: 140, background: "#FFFFFF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <path d="M0,0 L1440,0 L1440,20 Q720,140 0,20 Z" fill="#060D3C" />
          </svg>
        </div>
        <HomeTestimonials />
        {/* diagonal: white → dark blue */}
        <div style={{ height: 56, background: "#060D3C", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,56" fill="#FFFFFF"/>
          </svg>
        </div>
        <UrgencySection />
        {/* diagonal: dark → white */}
        <div style={{ height: 56, background: "#FFFFFF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,56" fill="#070C24"/>
          </svg>
        </div>
        <MediaSection />
        {/* diagonal: white → dark blue */}
        <div style={{ height: 56, background: "#060D3C", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,56" fill="#FFFFFF"/>
          </svg>
        </div>
        <BrushstrokeSection />
        <PreFooter />
      </main>
      <Footer />
      <Popups />
    </>
  );
}

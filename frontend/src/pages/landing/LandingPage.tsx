import { AISection } from "../../components/landing/AISection";
import { CTASection } from "../../components/landing/CTASection";
import { FeaturesSection } from "../../components/landing/FeaturesSection";
import { Footer } from "../../components/landing/Footer";
import { HeroSection } from "../../components/landing/HeroSection";
import { Navbar } from "../../components/landing/Navbar";
import { SocialProof } from "../../components/landing/SocialProof";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black selection:bg-blue-500/30">
      <Navbar />
      <main>
        <HeroSection />
        <SocialProof />
        <FeaturesSection />
        <AISection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

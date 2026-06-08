import HeroSection from "./HeroSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import BranchSection from "./BranchSection";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import CitySEOContent from "./CitySEOContent";
import CTASection from "./CTASection";

export default function LandingPage() {
  return (
    <main
      id="main-content"
      className="font-body bg-[#FDFAF6] antialiased"
    >
      <HeroSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <AboutSection />
      <BranchSection />
      <TestimonialsSection />
      <FAQSection />
      <CitySEOContent />
      <CTASection />
    </main>
  );
}
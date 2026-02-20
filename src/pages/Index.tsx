import { useState, useCallback, lazy, Suspense } from "react";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import HowItWorks from "@/components/HowItWorks";
import Calculator from "@/components/Calculator";
import MobileStickyCTA from "@/components/MobileStickyCTA";

// Lazy load below-fold components
const CaseStudy = lazy(() => import("@/components/CaseStudy"));
const ConversionSection = lazy(() => import("@/components/ConversionSection"));
const EngineeringStandard = lazy(() => import("@/components/EngineeringStandard"));
const GuaranteeSection = lazy(() => import("@/components/GuaranteeSection"));
const TechnicalSpecs = lazy(() => import("@/components/TechnicalSpecs"));
const FAQ = lazy(() => import("@/components/FAQ"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const Footer = lazy(() => import("@/components/Footer"));
const BookCallModal = lazy(() => import("@/components/BookCallModal"));

interface CalculatorInputs {
  teamSize: number;
  timePerTask: number;
  frequencyType: "day" | "week";
  frequencyValue: number;
  workingDays: number;
  hourlyCost: number;
  automationPotential: number;
}

interface CalculatorResults {
  annualHours: number;
  annualCost: number;
  potentialSavingsHours: number;
  potentialSavingsCost: number;
}

const SectionFallback = () => (
  <div className="py-12 sm:py-16 lg:py-24 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const [isBookCallModalOpen, setIsBookCallModalOpen] = useState(false);
  const [calculatorResults, setCalculatorResults] = useState<CalculatorResults | null>(null);
  const [calculatorInputs, setCalculatorInputs] = useState<CalculatorInputs | null>(null);

  const handleResultsChange = useCallback((results: CalculatorResults, inputs: CalculatorInputs) => {
    setCalculatorResults(results);
    setCalculatorInputs(inputs);
  }, []);

  const openBookCallModal = useCallback(() => setIsBookCallModalOpen(true), []);
  const closeBookCallModal = useCallback(() => setIsBookCallModalOpen(false), []);

  useScrollTracking({
    sectionIds: [
      'hero', 'tech-stack', 'how-it-works', 'calculator',
      'conversion', 'case-study', 'technical-specs',
      'engineering-standard', 'guarantee', 'faq', 'final-cta'
    ],
    threshold: 0.3
  });

  return (
    <div className="overflow-x-hidden w-full max-w-[100vw] min-h-screen-dynamic">
      <Navbar onBookCallClick={openBookCallModal} />
      
      <main className="overflow-x-hidden w-full gpu-accelerated">
        {/* Hero - untouched */}
        <section id="hero" className="section-solid">
          <Hero onBlueprintClick={openBookCallModal} />
        </section>
        <section id="tech-stack" className="section-alt">
          <TechStack />
        </section>
        <section id="how-it-works" className="section-solid">
          <HowItWorks />
        </section>
        <section className="section-alt" id="calculator">
          <Calculator onResultsChange={handleResultsChange} />
        </section>
        
        {/* Below-fold */}
        <Suspense fallback={<SectionFallback />}>
          <section id="conversion" className="section-solid">
            <ConversionSection results={calculatorResults} inputs={calculatorInputs} onBookCallClick={openBookCallModal} />
          </section>
          <section id="case-study" className="section-alt">
            <CaseStudy />
          </section>
          <section id="technical-specs" className="section-solid">
            <TechnicalSpecs />
          </section>
          <section id="engineering-standard" className="section-alt">
            <EngineeringStandard />
          </section>
          <section id="guarantee" className="section-solid">
            <GuaranteeSection />
          </section>
          <section id="faq" className="section-alt">
            <FAQ />
          </section>
          <section id="final-cta" className="section-solid">
            <FinalCTA onBookCallClick={openBookCallModal} />
          </section>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      <MobileStickyCTA />
      
      {isBookCallModalOpen && (
        <Suspense fallback={null}>
          <BookCallModal isOpen={isBookCallModalOpen} onClose={closeBookCallModal} />
        </Suspense>
      )}
    </div>
  );
};

export default Index;

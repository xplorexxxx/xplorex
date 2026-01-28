import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import HowItWorks from "@/components/HowItWorks";
import Calculator from "@/components/Calculator";
import ConversionSection from "@/components/ConversionSection";
import EngineeringStandard from "@/components/EngineeringStandard";
import GuaranteeSection from "@/components/GuaranteeSection";
import CommonLeaks from "@/components/CommonLeaks";
import WhatYouCanAutomate from "@/components/WhatYouCanAutomate";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import BookCallModal from "@/components/BookCallModal";
import MobileStickyCTA from "@/components/MobileStickyCTA";

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

const Index = () => {
  const [isBookCallModalOpen, setIsBookCallModalOpen] = useState(false);
  const [calculatorResults, setCalculatorResults] = useState<CalculatorResults | null>(null);
  const [calculatorInputs, setCalculatorInputs] = useState<CalculatorInputs | null>(null);

  const handleResultsChange = useCallback((results: CalculatorResults, inputs: CalculatorInputs) => {
    setCalculatorResults(results);
    setCalculatorInputs(inputs);
  }, []);

  const openBookCallModal = () => setIsBookCallModalOpen(true);
  const closeBookCallModal = () => setIsBookCallModalOpen(false);

  return (
    <div className="overflow-x-hidden w-full max-w-[100vw] min-h-screen-dynamic">
      <Navbar onBookCallClick={openBookCallModal} />
      
      <main className="overflow-x-hidden w-full gpu-accelerated">
        <section className="section-solid">
          <Hero onBlueprintClick={openBookCallModal} />
        </section>
        <section className="section-alt">
          <TechStack />
        </section>
        <section className="section-solid">
          <HowItWorks />
        </section>
        <section className="section-alt" id="calculator">
          <Calculator onResultsChange={handleResultsChange} />
        </section>
        <section className="section-solid">
          <ConversionSection results={calculatorResults} inputs={calculatorInputs} onBookCallClick={openBookCallModal} />
        </section>
        <section className="section-alt">
          <EngineeringStandard />
        </section>
        <section className="section-solid">
          <GuaranteeSection />
        </section>
        <section className="section-alt">
          <CommonLeaks />
        </section>
        <section className="section-solid">
          <WhatYouCanAutomate />
        </section>
        <section className="section-alt">
          <FAQ />
        </section>
        <section className="section-solid">
          <FinalCTA onBookCallClick={openBookCallModal} />
        </section>
      </main>

      <Footer />
      
      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />
      
      <BookCallModal isOpen={isBookCallModalOpen} onClose={closeBookCallModal} />
    </div>
  );
};

export default Index;

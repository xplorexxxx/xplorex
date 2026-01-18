import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Calculator from "@/components/Calculator";
import ConversionSection from "@/components/ConversionSection";
import CommonLeaks from "@/components/CommonLeaks";
import WhatYouCanAutomate from "@/components/WhatYouCanAutomate";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import BookCallModal from "@/components/BookCallModal";

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
    <>
      <Navbar onBookCallClick={openBookCallModal} />
      
      <main>
        <Hero />
        <HowItWorks />
        <Calculator onResultsChange={handleResultsChange} />
        <ConversionSection results={calculatorResults} inputs={calculatorInputs} onBookCallClick={openBookCallModal} />
        <CommonLeaks />
        <WhatYouCanAutomate />
        <FAQ />
        <FinalCTA onBookCallClick={openBookCallModal} />
      </main>

      <Footer />
      
      <BookCallModal isOpen={isBookCallModalOpen} onClose={closeBookCallModal} />
    </>
  );
};

export default Index;

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

interface CalculatorResults {
  annualHours: number;
  annualCost: number;
  potentialSavingsHours: number;
  potentialSavingsCost: number;
}

const Index = () => {
  const [isBookCallModalOpen, setIsBookCallModalOpen] = useState(false);
  const [calculatorResults, setCalculatorResults] = useState<CalculatorResults | null>(null);

  const handleResultsChange = useCallback((results: CalculatorResults) => {
    setCalculatorResults(results);
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
        <ConversionSection results={calculatorResults} onBookCallClick={openBookCallModal} />
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

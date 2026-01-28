import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const MobileStickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtCalculator, setIsAtCalculator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);

      // Check if we're at the calculator section
      const calculator = document.querySelector("#calculator");
      if (calculator) {
        const rect = calculator.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsAtCalculator(isInView);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCalculator = () => {
    const element = document.querySelector("#calculator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Don't show when at calculator or not visible
  if (!isVisible || isAtCalculator) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      {/* Gradient fade effect */}
      <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
      {/* CTA Container */}
      <div className="bg-background/95 backdrop-blur-xl border-t border-border/50 px-4 py-3 safe-area-bottom">
        <button
          onClick={scrollToCalculator}
          className="w-full btn-primary text-base py-4 touch-manipulation active:scale-[0.98] transition-transform"
        >
          Calculer mon ROI
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MobileStickyCTA;

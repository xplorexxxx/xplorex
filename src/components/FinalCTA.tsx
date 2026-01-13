import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onBookCallClick: () => void;
}

const FinalCTA = ({ onBookCallClick }: FinalCTAProps) => {
  const scrollToCalculator = () => {
    const element = document.querySelector("#calculator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div 
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16 text-center"
          style={{ background: "var(--gradient-primary)" }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Ready to stop the leak?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Calculate your potential savings in 30 seconds, or book a free call to discuss your specific automation opportunities.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={scrollToCalculator} className="btn-primary text-base py-3.5 px-8">
                Calculate My ROI
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onBookCallClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 font-semibold text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-xl border border-primary-foreground/20 transition-all duration-200"
              >
                Book a Free Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

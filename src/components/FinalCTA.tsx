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
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Prêt à structurer votre intelligence commerciale ?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Quantifiez vos pertes de valeur en 30 secondes, ou échangez directement 
              avec un expert pour évaluer votre potentiel d'Account-Based Excellence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#calculator"
                onClick={(e) => { e.preventDefault(); scrollToCalculator(); }}
                className="btn-primary text-base py-3.5 px-8"
                style={{ touchAction: "manipulation" }}
              >
                Lancer le diagnostic
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onBookCallClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 font-semibold text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-xl border border-primary-foreground/20 transition-all duration-200"
                style={{ touchAction: "manipulation" }}
              >
                Réserver un échange stratégique
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

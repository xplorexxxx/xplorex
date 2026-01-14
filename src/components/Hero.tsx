import { ArrowDown, Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToCalculator = () => {
    const element = document.querySelector("#calculator");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "var(--gradient-hero)",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-narrow text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-secondary border border-border text-sm text-muted-foreground">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Outil d'évaluation du ROI</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
          Identifiez les heures cachées et les <span className="text-accent">€ perdus</span> dans vos opérations instantanément.
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
          Quantifiez le vrai coût des tâches répétitives. Découvrez où l'automatisation et l'IA peuvent faire économiser
          des milliers d'heures et d'euros à votre équipe chaque année.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={scrollToCalculator} className="btn-primary text-base py-3.5 px-8">
            Calculer mon ROI
            <ArrowDown className="w-4 h-4" />
          </button>
          <p className="text-sm text-muted-foreground">Entrées simples. Calculs transparents. Résultats instantanés.</p>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">Conçu pour les opérateurs occupés</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-foreground/70">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Équipes Support
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Opérations
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Ventes
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Administration
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

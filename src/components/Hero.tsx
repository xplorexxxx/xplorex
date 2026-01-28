import { ArrowDown, FileText, Building2, Wallet, Rocket } from "lucide-react";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";

interface HeroProps {
  onBlueprintClick?: () => void;
}

const Hero = ({ onBlueprintClick }: HeroProps) => {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  const scrollToCalculator = () => {
    const element = document.querySelector("#calculator");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const personas = [
    { id: "ops", label: "Ops / COO", fullLabel: "Je pilote les Ops / COO", icon: Building2 },
    { id: "finance", label: "Finance / Admin", fullLabel: "Je gère Finance / Admin", icon: Wallet },
    { id: "saas", label: "SaaS / Tech", fullLabel: "Je scale un SaaS / Tech", icon: Rocket },
  ];

  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "var(--gradient-hero)",
        }}
      />

      {/* Decorative elements - hidden on small mobile for performance */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl hidden sm:block" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl hidden sm:block" />

      <div className="container-narrow text-center px-4">
        {/* Institutional badge */}
        <AnimatedSection delay={0}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-6 sm:mb-8 rounded-full bg-secondary border border-border text-xs sm:text-sm font-medium text-foreground">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>Résultat garanti ou 0€ facturé</span>
          </div>
        </AnimatedSection>

        {/* Headline - optimized for mobile */}
        <AnimatedSection delay={100}>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight text-balance leading-tight">
            Vous payez une <span className="text-accent">taxe invisible</span> sur chaque opération.
          </h1>
        </AnimatedSection>

        {/* Subheadline */}
        <AnimatedSection delay={200}>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-10 text-balance">
            On la supprime en 15 jours. Résultat mesuré ou 0€ facturé. Lancez le diagnostic.
          </p>
        </AnimatedSection>

        {/* Persona Segment Buttons - compact on mobile */}
        <AnimatedSection delay={300}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-10">
            {personas.map((persona) => {
              const Icon = persona.icon;
              const isSelected = selectedPersona === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => {
                    setSelectedPersona(persona.id);
                    scrollToCalculator();
                  }}
                  className={`
                    inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-200 touch-manipulation active:scale-[0.97]
                    ${isSelected 
                      ? "bg-primary text-primary-foreground border-primary shadow-lg" 
                      : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-secondary"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{persona.fullLabel}</span>
                  <span className="sm:hidden">{persona.label}</span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Dual CTA - stacked on mobile */}
        <AnimatedSection delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button 
              onClick={scrollToCalculator} 
              className="btn-primary text-base py-4 px-6 sm:px-8 w-full sm:w-auto"
            >
              Lancer mon diagnostic gratuit
              <ArrowDown className="w-4 h-4" />
            </button>
            <button 
              onClick={onBlueprintClick}
              className="btn-secondary text-base py-4 px-6 sm:px-8 w-full sm:w-auto"
            >
              <FileText className="w-4 h-4" />
              Recevoir un Blueprint technique
            </button>
          </div>
        </AnimatedSection>

        {/* Trust line */}
        <AnimatedSection delay={500}>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground">
            Diagnostic en 2 minutes. Rapport immédiat. Sans engagement.
          </p>
        </AnimatedSection>

        {/* Core offer reminder */}
        <AnimatedSection delay={600}>
          <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50">
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-2xl bg-success/10 border border-success/20">
              <span className="text-success font-semibold text-sm sm:text-base">20% d'économie en 15 jours</span>
              <span className="text-muted-foreground text-xs sm:text-sm">ou vous ne payez rien</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;

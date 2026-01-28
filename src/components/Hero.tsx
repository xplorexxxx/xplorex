import { ArrowDown, FileText, Building2, Wallet, Rocket } from "lucide-react";
import { useState } from "react";

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
    { id: "ops", label: "Je pilote les Ops / COO", icon: Building2 },
    { id: "finance", label: "Je gère Finance / Admin", icon: Wallet },
    { id: "saas", label: "Je scale un SaaS / Tech", icon: Rocket },
  ];

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
        {/* Institutional badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-secondary border border-border text-sm font-medium text-foreground">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>Résultat garanti ou 0€ facturé</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
          Vous payez une <span className="text-accent">taxe invisible</span> sur chaque opération.
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
          On la supprime en 15 jours. Résultat mesuré ou 0€ facturé. Lancez le diagnostic.
        </p>

        {/* Persona Segment Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
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
                  inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200
                  ${isSelected 
                    ? "bg-primary text-primary-foreground border-primary shadow-lg" 
                    : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-secondary"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {persona.label}
              </button>
            );
          })}
        </div>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={scrollToCalculator} className="btn-primary text-base py-3.5 px-8">
            Lancer mon diagnostic gratuit
            <ArrowDown className="w-4 h-4" />
          </button>
          <button 
            onClick={onBlueprintClick}
            className="btn-secondary text-base py-3.5 px-8"
          >
            <FileText className="w-4 h-4" />
            Recevoir un Blueprint technique
          </button>
        </div>

        {/* Trust line */}
        <p className="mt-6 text-sm text-muted-foreground">
          Diagnostic en 2 minutes. Rapport immédiat. Sans engagement.
        </p>

        {/* Core offer reminder */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-success/10 border border-success/20">
            <span className="text-success font-semibold">20% d'économie en 15 jours</span>
            <span className="text-muted-foreground">ou vous ne payez rien</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

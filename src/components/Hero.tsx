import { ArrowDown, FileText, Building2, Wallet, Rocket, TrendingUp, Clock, ShieldCheck } from "lucide-react";
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
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const personas = [
    { id: "ops", label: "Ops / COO", fullLabel: "Je pilote les Ops / COO", icon: Building2 },
    { id: "finance", label: "Finance / Admin", fullLabel: "Je gère Finance / Admin", icon: Wallet },
    { id: "saas", label: "SaaS / Tech", fullLabel: "Je scale un SaaS / Tech", icon: Rocket },
  ];

  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl hidden sm:block" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl hidden sm:block" />

      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content — 7 cols */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <AnimatedSection delay={0}>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 mb-6 sm:mb-8 rounded-full bg-secondary border border-border text-xs sm:text-sm font-medium text-foreground">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>Résultat garanti ou 0€ facturé</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-heading text-foreground mb-4 sm:mb-6 tracking-tight text-balance leading-[1.1]">
                Agence IA pour entreprises : supprimez la{" "}
                <span className="text-primary">taxe invisible</span>{" "}
                sur vos opérations.
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mb-6 sm:mb-10 text-balance mx-auto lg:mx-0">
                On la supprime en 15 jours. Résultat mesuré ou 0€ facturé. Lancez le diagnostic.
              </p>
            </AnimatedSection>

            {/* Persona Segment Buttons */}
            <AnimatedSection delay={300}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-10">
                {personas.map((persona) => {
                  const Icon = persona.icon;
                  const isSelected = selectedPersona === persona.id;
                  return (
                    <a
                      href="#calculator"
                      key={persona.id}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedPersona(persona.id);
                        scrollToCalculator();
                      }}
                      style={{ touchAction: "manipulation" }}
                      className={`
                        inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.97]
                        ${isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-lg"
                          : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-secondary"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{persona.fullLabel}</span>
                      <span className="sm:hidden">{persona.label}</span>
                    </a>
                  );
                })}
              </div>
            </AnimatedSection>

            {/* Dual CTA */}
            <AnimatedSection delay={400}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <a
                  href="#calculator"
                  onClick={(e) => { e.preventDefault(); scrollToCalculator(); }}
                  className="btn-primary text-base py-4 px-6 sm:px-8 w-full sm:w-auto"
                  style={{ touchAction: "manipulation" }}
                >
                  Lancer mon diagnostic gratuit
                  <ArrowDown className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={onBlueprintClick}
                  className="btn-secondary text-base py-4 px-6 sm:px-8 w-full sm:w-auto"
                  style={{ touchAction: "manipulation" }}
                >
                  <FileText className="w-4 h-4" />
                  Blueprint technique
                </button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground">
                Diagnostic en 2 minutes · Rapport immédiat · Sans engagement
              </p>
            </AnimatedSection>
          </div>

          {/* Right Visual — 5 cols (desktop only) */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
            <AnimatedSection delay={300} direction="left">
              <div className="relative w-full max-w-sm">
                {/* Floating metric cards */}
                <div className="space-y-4">
                  <div className="animate-organic-float bg-card rounded-2xl border border-border/50 p-5 flex items-center gap-4" style={{ boxShadow: "var(--shadow-lg)" }}>
                    <div className="w-11 h-11 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading text-foreground">+340%</p>
                      <p className="text-xs text-muted-foreground">ROI moyen mesuré</p>
                    </div>
                  </div>

                  <div className="animate-organic-float-delayed bg-card rounded-2xl border border-border/50 p-5 flex items-center gap-4 ml-8" style={{ boxShadow: "var(--shadow-lg)" }}>
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading text-foreground">15 jours</p>
                      <p className="text-xs text-muted-foreground">Premier résultat mesurable</p>
                    </div>
                  </div>

                  <div className="animate-organic-float-slow bg-card rounded-2xl border border-border/50 p-5 flex items-center gap-4 ml-2" style={{ boxShadow: "var(--shadow-lg)" }}>
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading text-foreground">0€ risque</p>
                      <p className="text-xs text-muted-foreground">Si pas de résultat, pas de facture</p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-dashed border-primary/10 animate-[spin_20s_linear_infinite]" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border border-dashed border-success/10 animate-[spin_25s_linear_infinite_reverse]" />
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Core offer reminder — full width */}
        <AnimatedSection delay={600}>
          <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50">
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-2xl bg-success/10 border border-success/20">
                <span className="text-success font-semibold text-sm sm:text-base">20% d'économie en 15 jours</span>
                <span className="text-muted-foreground text-xs sm:text-sm">ou vous ne payez rien</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;

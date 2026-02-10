import { Search, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Audit stratégique",
    description: "Cartographie de vos processus commerciaux, identification des goulots d'étranglement et quantification des pertes de valeur invisibles.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Architecture sur mesure",
    description: "Conception d'une infrastructure d'intelligence commerciale adaptée à votre stack, votre marché et vos exigences de conformité.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Déploiement & mesure",
    description: "Mise en production en 15 jours avec KPIs prédéfinis. ROI prédictif mesuré dès la première itération, pas de promesses — des preuves.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 font-poppins">
            Notre méthodologie
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            De l'audit au ROI mesurable en 15 jours
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Un processus éprouvé conçu pour les organisations exigeantes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative p-8 rounded-2xl bg-card border border-border/50 group hover:border-primary/30 transition-all duration-300"
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                <div className="text-5xl font-bold text-primary/10 absolute top-4 right-6">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

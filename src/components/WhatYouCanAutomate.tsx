import { Workflow, Bot, BookOpen, Brain, CheckCircle } from "lucide-react";

const solutions = [
  {
    icon: Brain,
    title: "Intelligence de comptes prédictive",
    description: "Scoring dynamique de vos comptes stratégiques basé sur des signaux d'intention, des données firmographiques et l'historique d'engagement.",
  },
  {
    icon: Workflow,
    title: "Orchestration ABM souveraine",
    description: "Campagnes Account-Based pilotées par IA, personnalisées à l'échelle, avec traçabilité RGPD native sur chaque interaction.",
  },
  {
    icon: Bot,
    title: "Assistants IA contextuels",
    description: "Agents conversationnels spécialisés qui qualifient, enrichissent et engagent vos prospects 24h/24 — dans le respect de votre charte de marque.",
  },
  {
    icon: BookOpen,
    title: "Base de connaissances stratégique",
    description: "Centralisation et exploitation intelligente de votre capital informationnel. L'IA répond avec précision en s'appuyant sur vos données propriétaires.",
  },
];

const WhatYouCanAutomate = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 font-poppins">
            Capacités
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Account-Based Excellence, propulsé par l'IA souveraine
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une infrastructure complète d'intelligence commerciale qui augmente vos équipes 
            sans les remplacer — et sans compromettre la souveraineté de vos données.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 group overflow-hidden"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, hsl(216 94% 55% / 0.02) 0%, hsl(216 94% 55% / 0.05) 100%)" }} />
              
              <div className="relative flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <solution.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mt-12 p-6 rounded-2xl bg-secondary/50 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">
            Conçu pour les organisations qui exigent performance et conformité
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Réduction de 40 à 80% de la charge manuelle commerciale",
              "Pénétration accélérée des comptes stratégiques",
              "Gouvernance IA documentée et auditable",
              "Scalabilité sans augmentation des effectifs",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouCanAutomate;

import { Shield, Zap, RefreshCw, Check, X, ArrowRight } from "lucide-react";

const EngineeringStandard = () => {
  const scrollToCalculator = () => {
    const element = document.querySelector("#calculator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pillars = [
    {
      icon: Zap,
      title: "Stabilité opérationnelle",
      description: "Chaque système est conçu pour fonctionner en autonomie 30 jours minimum — sans intervention humaine, sans dégradation.",
    },
    {
      icon: Shield,
      title: "Conformité native",
      description: "RGPD, ePrivacy, SOC2-ready. Données chiffrées, accès tracés, aucune fuite vers des tiers non validés par votre DPO.",
    },
    {
      icon: RefreshCw,
      title: "Auto-correction intelligente",
      description: "En cas d'anomalie, le système détecte, alerte et corrige. Chaque incident est documenté et enrichit le modèle.",
    },
  ];

  const testsBeforeDeployment = [
    "Simulation sur 1 000+ cas réels issus de vos données",
    "Stress-test sur scénarios d'exception et cas limites",
    "Audit de sécurité par checklist SOC2-ready",
    "Validation du respect des protocoles RGPD/ePrivacy",
  ];

  const whatWeRefuse = [
    "Des systèmes « boîte noire » sans traçabilité des décisions IA",
    "Des solutions sans monitoring ni gouvernance intégrée",
    "Des architectures dépendantes d'un fournisseur non-souverain",
    "Des déploiements sans mesure de ROI objectif et auditable",
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Gouvernance & standards
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            IA éthique, conformité sans compromis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chaque système passe nos protocoles de validation avant d'entrer en production. 
            La performance ne justifie jamais un raccourci sur la sécurité.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="glass-card p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm">{pillar.description}</p>
              </div>
            );
          })}
        </div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              Protocoles de validation
            </h4>
            <ul className="space-y-3">
              {testsBeforeDeployment.map((test, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-success" />
                  </span>
                  {test}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <X className="w-5 h-5 text-destructive" />
              Ce que nous refusons de livrer
            </h4>
            <ul className="space-y-3">
              {whatWeRefuse.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-destructive" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Votre infrastructure actuelle passe-t-elle ces standards ?
          </p>
          <button onClick={scrollToCalculator} className="btn-primary">
            Lancer le diagnostic
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EngineeringStandard;

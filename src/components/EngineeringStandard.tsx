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
      title: "Stabilité",
      description: "Le système tourne sans intervention humaine pendant 30 jours minimum.",
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Données chiffrées, accès tracés, aucune fuite vers des tiers non validés.",
    },
    {
      icon: RefreshCw,
      title: "Auto-correction",
      description: "En cas d'erreur, le système détecte, alerte, et propose une correction.",
    },
  ];

  const testsBeforeDeployment = [
    "Simulation de 1 000 cas réels sur vos données",
    "Stress-test sur les scénarios d'exception",
    "Audit de sécurité par checklist SOC2-ready",
  ];

  const whatWeRefuse = [
    "Des automatisations \"rigides\" qui cassent au premier cas imprévu",
    "Des systèmes sans monitoring ni alertes",
    "Des solutions dépendantes d'un seul fournisseur cloud",
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Notre standard d'ingénierie
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chaque système passe 3 tests avant d'entrer en production.
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

        {/* Two columns: Tests + Refusals */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Tests before deployment */}
          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              Nos tests avant déploiement
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

          {/* What we refuse */}
          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <X className="w-5 h-5 text-destructive" />
              Ce qu'on refuse de livrer
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

        {/* Closing CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Vous voulez savoir si votre process actuel passerait ces tests ?
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

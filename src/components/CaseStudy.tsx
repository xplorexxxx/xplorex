import { TrendingUp, Target, Users, BarChart3 } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    value: "+340%",
    label: "ROI sur 6 mois",
    detail: "Retour sur investissement mesuré et auditable",
  },
  {
    icon: Target,
    value: "87%",
    label: "Taux de pénétration",
    detail: "Des comptes stratégiques ciblés convertis",
  },
  {
    icon: Users,
    value: "12→3",
    label: "Jours de cycle",
    detail: "Réduction du cycle de qualification comptes",
  },
  {
    icon: BarChart3,
    value: "2,4M€",
    label: "Pipeline généré",
    detail: "En opportunités qualifiées sur comptes nommés",
  },
];

const CaseStudy = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 font-poppins">
            Preuve de valeur
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            ROI stratégique, pas vanity metrics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nos clients ne mesurent pas des "leads". Ils mesurent la pénétration de comptes stratégiques, 
            le pipeline qualifié et le ROI prédictif de chaque action commerciale.
          </p>
        </div>

        {/* Case Study Card */}
        <div
          className="relative rounded-2xl border border-border/50 bg-card overflow-hidden mb-10"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-success" />

          <div className="p-6 sm:p-10">
            {/* Context */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  Étude de cas — Éditeur SaaS B2B (série B)
                </h3>
                <p className="text-muted-foreground text-sm">
                  Déploiement d'une infrastructure d'Account-Based Excellence pour pénétrer 
                  les comptes du CAC 40 sans augmenter les effectifs commerciaux.
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="p-5 rounded-xl bg-secondary/50 border border-border/50 text-center"
                  >
                    <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-bold text-foreground mb-1">{metric.value}</p>
                    <p className="text-sm font-semibold text-foreground mb-0.5">{metric.label}</p>
                    <p className="text-xs text-muted-foreground">{metric.detail}</p>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
              <blockquote className="text-muted-foreground italic text-sm">
                "Nous avons remplacé 4 outils et 2 postes de SDR par une infrastructure d'intelligence 
                commerciale qui identifie, qualifie et engage nos comptes stratégiques de manière autonome. 
                Le ROI a été mesurable dès la troisième semaine."
              </blockquote>
              <p className="text-sm font-semibold text-foreground mt-3">
                — Directeur Commercial, Éditeur SaaS (confidentiel)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;

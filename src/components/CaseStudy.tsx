import { TrendingUp, Target, Users, BarChart3, ArrowRight, Shield, Lock } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const CaseStudy = () => {
  return (
    <section className="section-padding bg-background data-particles">
      <div className="container-narrow relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Étude de cas approfondie
          </p>
          <h2 className="heading-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4">
            Du Challenge au ROI stratégique
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Méthodologie "Architectural Deep Dive" — chaque déploiement documenté, chaque résultat auditable.
          </p>
        </div>

        {/* Deep Dive Card */}
        <AnimatedSection>
          <div
            className="relative rounded-2xl border border-border/50 bg-card overflow-hidden"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            {/* Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy via-primary to-success" />

            <div className="p-6 sm:p-10">
              {/* Case context */}
              <div className="flex items-start gap-4 mb-10">
                <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-steel mb-1">Éditeur SaaS B2B · Série B · 120 collaborateurs</p>
                  <h3 className="heading-serif text-xl sm:text-2xl font-bold text-foreground">
                    Pénétration des comptes CAC 40 sans augmenter les effectifs commerciaux
                  </h3>
                </div>
              </div>

              {/* 4-phase deep dive */}
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {/* Challenge */}
                <div className="p-5 rounded-xl border border-border/50 bg-secondary/30">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-md bg-destructive/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-destructive">01</span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Challenge</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cycle de qualification de 12 jours par compte. SDR saturés sur des tâches manuelles de recherche 
                    et d'enrichissement. Taux de pénétration des comptes stratégiques inférieur à 15%.
                  </p>
                </div>

                {/* Solution */}
                <div className="p-5 rounded-xl border border-border/50 bg-secondary/30">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">02</span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Solution</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Déploiement d'un système RAG propriétaire connecté aux bases de connaissances internes 
                    et aux signaux de marché. Orchestration ABM automatisée avec scoring prédictif.
                  </p>
                </div>

                {/* Sécurité */}
                <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 security-scan-hover">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Sécurité</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cloisonnement strict des LLM. Anonymisation des données personnelles avant traitement. 
                    Chiffrement AES-256 au repos, aucune donnée transmise hors UE.
                  </p>
                </div>

                {/* Résultat */}
                <div className="p-5 rounded-xl border border-success/20 bg-success/5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-md bg-success/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-success">04</span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Résultat</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    ROI mesuré dès la 3ème semaine. Remplacement de 4 outils et 2 postes SDR par une infrastructure 
                    d'intelligence commerciale autonome et auditable.
                  </p>
                </div>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-reveal">
                {[
                  { icon: TrendingUp, value: "+340%", label: "ROI sur 6 mois", color: "text-success" },
                  { icon: Target, value: "87%", label: "Taux de pénétration", color: "text-primary" },
                  { icon: Users, value: "12→3", label: "Jours de cycle", color: "text-foreground" },
                  { icon: BarChart3, value: "2,4M€", label: "Pipeline généré", color: "text-success" },
                ].map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={kpi.label} className="text-center p-4 rounded-xl bg-secondary/50 border border-border/50">
                      <Icon className="w-4 h-4 text-steel mx-auto mb-2" />
                      <p className={`text-2xl sm:text-3xl font-bold ${kpi.color} mb-0.5`}>{kpi.value}</p>
                      <p className="text-xs text-muted-foreground">{kpi.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Quote */}
              <div className="p-6 rounded-xl bg-navy/5 border border-navy/10">
                <blockquote className="font-serif italic text-muted-foreground text-base leading-relaxed">
                  "Nous avons remplacé 4 outils et 2 postes de SDR par une infrastructure d'intelligence 
                  commerciale qui identifie, qualifie et engage nos comptes stratégiques de manière autonome. 
                  Le ROI a été mesurable dès la troisième semaine."
                </blockquote>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-navy" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Directeur Commercial</p>
                    <p className="text-xs text-muted-foreground">Éditeur SaaS B2B · Confidentiel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CaseStudy;

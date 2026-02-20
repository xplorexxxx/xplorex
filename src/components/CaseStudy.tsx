import { TrendingUp, Target, Users, BarChart3, Shield, Lock } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const kpis = [
  { icon: TrendingUp, value: "+65%", label: "Placements supplémentaires", color: "text-success" },
  { icon: Target, value: "×5", label: "Profils sourcés par recruteur/jour", color: "text-primary" },
  { icon: Users, value: "12→4j", label: "Time-to-shortlist", color: "text-foreground" },
  { icon: BarChart3, value: "23%", label: "Taux de réponse (vs 8% avant)", color: "text-success" },
];

const CaseStudy = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        {/* Header — left-aligned for asymmetry */}
        <AnimatedSection>
          <div className="max-w-2xl mb-12 lg:mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Étude de cas
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading text-foreground mb-4 leading-tight">
              D'un sourcing manuel à une machine à placer
            </h2>
            <p className="text-lg text-muted-foreground">
              Comment un cabinet de recrutement IT a augmenté ses placements de 65% en 60 jours avec notre infrastructure IA.
            </p>
          </div>
        </AnimatedSection>

        {/* Asymmetric Grid: Main content (7 cols) + KPIs (5 cols offset) */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main narrative — 7 cols */}
          <div className="lg:col-span-7">
            <AnimatedSection>
              {/* Context badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-steel">Cabinet de recrutement IT · 8 recruteurs · Paris & Lyon</p>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-heading text-foreground mb-8">
                Diviser le time-to-hire par 3 sans recruter un seul sourceur supplémentaire
              </h3>
            </AnimatedSection>

            {/* Phases — stacked cards, not grid */}
            <div className="space-y-4">
              <AnimatedSection delay={100}>
                <div className="p-5 rounded-xl border border-border/50 bg-secondary/30">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center text-xs font-bold text-destructive">01</span>
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Challenge</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    8 recruteurs passant 75% de leur temps sur du sourcing LinkedIn manuel. Taux de réponse aux InMails en chute libre (8%). Pipeline clients dépendant de 3 comptes historiques. Vivier de 12 000 candidats inexploité dans un ATS vieillissant.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={180}>
                <div className="p-5 rounded-xl border border-border/50 bg-secondary/30">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">02</span>
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Solution XPLORE X</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Déploiement d'un système de sourcing IA (n8n + Claude) connecté à LinkedIn et au vivier existant. Scoring automatique des candidats, messages d'approche hyper-personnalisés, et pipeline business dev automatisé pour générer de nouveaux mandats.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={260}>
                <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 security-scan-hover">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                    </span>
                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Sécurité</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Conformité RGPD native et AI Act. Données candidats hébergées en UE, chiffrement AES-256, aucun scraping agressif. Traçabilité complète de chaque décision algorithmique.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Quote — full width within the 7 cols */}
            <AnimatedSection delay={340}>
              <div className="mt-8 p-6 rounded-xl bg-secondary/50 border border-border/50">
                <blockquote className="italic text-muted-foreground text-base leading-relaxed">
                  "On a remplacé Waalaxy, 3 licences LinkedIn Recruiter et un tableur Excel par une seule infrastructure. Mes recruteurs sourçent 5 fois plus de profils qualifiés et le taux de réponse a triplé. Le ROI était visible dès le premier mois."
                </blockquote>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-navy" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Fondateur & Associé</p>
                    <p className="text-xs text-muted-foreground">Cabinet de recrutement IT · Confidentiel</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* KPI Sidebar — 5 cols, offset down */}
          <div className="lg:col-span-5 lg:pt-20">
            <div className="lg:sticky lg:top-24 space-y-4">
              {kpis.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <AnimatedSection key={kpi.label} delay={100 + index * 100} direction="left">
                    <div
                      className="p-5 rounded-2xl bg-card border border-border/50 flex items-center gap-4 hover:border-primary/30 transition-all duration-300"
                      style={{ boxShadow: "var(--shadow-sm)" }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-steel" />
                      </div>
                      <div>
                        <p className={`text-2xl sm:text-3xl font-heading ${kpi.color}`}>{kpi.value}</p>
                        <p className="text-xs text-muted-foreground">{kpi.label}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}

              {/* Result badge */}
              <AnimatedSection delay={600} direction="left">
                <div className="p-5 rounded-2xl border-2 border-success/20 bg-success/5 text-center">
                  <p className="text-sm font-semibold text-foreground mb-1">Résultat</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    ROI positif dès le premier mois. 3 licences LinkedIn Recruiter économisées. Pipeline clients doublé.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>

          <div className="lg:col-span-12 mt-12 lg:mt-16">
            <AnimatedSection>
              <h3 className="text-xl sm:text-2xl font-heading text-foreground mb-8">
                Résultats documentés par secteur
              </h3>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Case Study Ops / COO */}
              <AnimatedSection delay={100}>
                <div className="p-6 rounded-2xl border border-border/50 bg-card h-full" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">OPS</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Direction des Opérations</p>
                      <p className="text-xs text-muted-foreground">Groupe industriel · 450 collaborateurs</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Automatisation du traitement et du routage des commandes fournisseurs. 
                    L'IA extrait, valide et réconcilie les bons de commande avec les contrats-cadres existants.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-success/10">
                      <p className="text-lg font-heading text-success">-65%</p>
                      <p className="text-[10px] text-muted-foreground">Temps de traitement</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-primary/10">
                      <p className="text-lg font-heading text-primary">4,2 ETP</p>
                      <p className="text-[10px] text-muted-foreground">Réalloués à la stratégie</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-success/10">
                      <p className="text-lg font-heading text-success">8 sem.</p>
                      <p className="text-[10px] text-muted-foreground">Déploiement complet</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground/60 mt-4">
                    Méthodologie alignée McKinsey — « 60 à 70% du temps de travail est automatisable par l'IA » (McKinsey, The Economic Potential of Generative AI, 2023)
                  </p>
                </div>
              </AnimatedSection>

              {/* Case Study Finance / DAF */}
              <AnimatedSection delay={200}>
                <div className="p-6 rounded-2xl border border-border/50 bg-card h-full" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">FIN</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Direction Financière</p>
                      <p className="text-xs text-muted-foreground">Scale-up e-commerce · 80 collaborateurs</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Déploiement d'un pipeline IA de réconciliation comptable et de détection d'anomalies 
                    sur les flux de trésorerie. Intégration native avec l'ERP existant.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-success/10">
                      <p className="text-lg font-heading text-success">-91%</p>
                      <p className="text-[10px] text-muted-foreground">Traitement factures</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-primary/10">
                      <p className="text-lg font-heading text-primary">500h/mois</p>
                      <p className="text-[10px] text-muted-foreground">Économisées</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-success/10">
                      <p className="text-lg font-heading text-success">+25%</p>
                      <p className="text-[10px] text-muted-foreground">Productivité FP&A</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground/60 mt-4">
                    KPIs alignés sur les benchmarks IBM/SAP et le rapport Deloitte « Directions financières : comment tirer parti de l'IA ? » (2025) — productivité comptable +20 à 30%.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;

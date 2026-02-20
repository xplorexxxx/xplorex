import { useState, useCallback, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Cog, BarChart3, Rocket, ClipboardCheck, Search, PenTool, Play, ShieldCheck, ArrowRight, Brain } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";

const Footer = lazy(() => import("@/components/Footer"));
const BookCallModal = lazy(() => import("@/components/BookCallModal"));

const pillars = [
  {
    badge: "SRC",
    title: "Sourcing LinkedIn IA",
    subtitle: "Chasse automatisée",
    icon: Search,
    items: [
      "Extraction et enrichissement automatique de profils LinkedIn",
      "Scoring IA des candidats selon le brief du mandat",
      "Messages d'approche hyper-personnalisés générés par IA",
    ],
    kpiValue: "×5",
    kpiLabel: "profils qualifiés par recruteur/jour",
    kpiColor: "text-success",
    bgColor: "bg-success/10",
  },
  {
    badge: "BIZ",
    title: "Business Dev Automatique",
    subtitle: "Acquisition de mandats",
    icon: Rocket,
    items: [
      "Identification automatisée des entreprises qui vont recruter",
      "Séquences multi-canal personnalisées (LinkedIn + email)",
      "Pipeline clients avec relances automatiques",
    ],
    kpiValue: "+120%",
    kpiLabel: "nouveaux mandats générés",
    kpiColor: "text-success",
    bgColor: "bg-success/10",
  },
  {
    badge: "RAG",
    title: "Intelligence Vivier",
    subtitle: "RAG sur votre base candidats",
    icon: Brain,
    items: [
      "Interrogez votre vivier en langage naturel",
      "Réactivation automatique des candidats dormants",
      "Matching intelligent brief ↔ profils existants",
    ],
    kpiValue: "30%",
    kpiLabel: "des placements depuis le vivier existant",
    kpiColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    badge: "VEI",
    title: "Audit Sectoriel",
    subtitle: "Intelligence marché",
    icon: BarChart3,
    items: [
      "Veille automatisée : levées de fonds, départs clés, restructurations",
      "Rapport hebdomadaire des entreprises en phase de recrutement",
      "Signaux faibles détectés par IA pour anticiper les mandats",
    ],
    kpiValue: "3 mois",
    kpiLabel: "d'avance sur la concurrence",
    kpiColor: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const steps = [
  { icon: ClipboardCheck, title: "Diagnostic", duration: "30 min", description: "Audit de votre stack actuel et de vos process de sourcing" },
  { icon: Search, title: "Architecture", duration: "48h", description: "Design des workflows n8n + IA adaptés à vos mandats" },
  { icon: PenTool, title: "Déploiement", duration: "15 jours", description: "Mise en production avec formation de vos recruteurs" },
  { icon: Play, title: "Résultats", duration: "Mois 1", description: "Premiers placements supplémentaires mesurés" },
];

const Services = () => {
  const [isBookCallModalOpen, setIsBookCallModalOpen] = useState(false);
  const openBookCallModal = useCallback(() => setIsBookCallModalOpen(true), []);
  const closeBookCallModal = useCallback(() => setIsBookCallModalOpen(false), []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookCallClick={openBookCallModal} />

      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding bg-background">
          <div className="container-narrow text-center">
            <AnimatedSection>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Nos solutions</p>
              <h1 className="font-heading text-foreground mb-6">
                4 modules IA conçus pour les cabinets de recrutement
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Du sourcing automatisé à l'intelligence vivier, chaque module se déploie en 15 jours et génère des résultats mesurables dès le premier mois.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* 3 Piliers */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <AnimatedSection>
              <div className="text-center mb-12">
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Expertise</p>
                <h2 className="font-heading text-foreground mb-4">Nos 4 modules d'intervention</h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <AnimatedSection key={pillar.badge} delay={index * 100}>
                    <div className="p-6 rounded-2xl bg-card border border-border/50 h-full flex flex-col" style={{ boxShadow: "var(--shadow-card)" }}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </span>
                        <div>
                          <p className="text-sm font-heading text-foreground">{pillar.title}</p>
                          <p className="text-xs text-muted-foreground">{pillar.subtitle}</p>
                        </div>
                      </div>

                      <ul className="space-y-2.5 mb-6 flex-grow">
                        {pillar.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className={`px-4 py-3 rounded-xl ${pillar.bgColor}`}>
                        <p className={`text-xl font-heading ${pillar.kpiColor}`}>{pillar.kpiValue}</p>
                        <p className="text-[11px] text-muted-foreground">{pillar.kpiLabel}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Méthodologie */}
        <section className="section-padding bg-background">
          <div className="container-narrow">
            <AnimatedSection>
              <div className="text-center mb-12">
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Processus</p>
                <h2 className="font-heading text-foreground mb-4">Notre méthodologie</h2>
              </div>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <AnimatedSection key={step.title} delay={index * 80}>
                    <div className="p-5 rounded-2xl bg-card border border-border/50 text-center h-full" style={{ boxShadow: "var(--shadow-sm)" }}>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-xs font-semibold text-primary mb-1">Étape {index + 1}</p>
                      <h3 className="text-base font-heading text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm font-semibold text-foreground mb-2">{step.duration}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Garantie */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <AnimatedSection>
              <div className="text-center p-8 sm:p-12 rounded-2xl bg-card border border-border/50" style={{ boxShadow: "var(--shadow-card)" }}>
                <ShieldCheck className="w-10 h-10 text-success mx-auto mb-4" />
                <h2 className="font-heading text-foreground mb-4">Garantie résultat</h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-3">
                  Si nos solutions ne génèrent pas <span className="font-semibold text-foreground">des placements supplémentaires mesurables dès le premier mois</span>, vous ne payez rien.
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Basé sur les résultats mesurés chez nos clients cabinets de recrutement.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Final */}
        <section className="section-padding bg-background">
          <div className="container-narrow text-center">
            <AnimatedSection>
              <h2 className="font-heading text-foreground mb-4">Prêt à transformer votre cabinet ?</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Estimez vos placements supplémentaires en 2 minutes ou échangez directement avec un spécialiste IA recrutement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/#calculator" className="btn-primary">
                  Calculer mon ROI
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button type="button" onClick={openBookCallModal} className="btn-secondary">
                  Réserver un créneau
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {isBookCallModalOpen && (
        <Suspense fallback={null}>
          <BookCallModal isOpen={isBookCallModalOpen} onClose={closeBookCallModal} />
        </Suspense>
      )}
    </div>
  );
};

export default Services;

import { useState, useCallback, lazy, Suspense } from "react";
import { Shield, Target, Users, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";

const Footer = lazy(() => import("@/components/Footer"));
const BookCallModal = lazy(() => import("@/components/BookCallModal"));

const values = [
  { icon: Shield, title: "Conformité native", description: "RGPD + AI Act. Chaque décision algorithmique est traçable et auditable." },
  { icon: Target, title: "ROI mesurable", description: "Placements supplémentaires, time-to-hire réduit, CA par recruteur en hausse." },
  { icon: Users, title: "L'humain d'abord", description: "L'IA automatise le sourcing. Le recruteur se concentre sur l'évaluation et la relation." },
  { icon: Award, title: "Résultat garanti", description: "Si pas de placements supplémentaires le premier mois, vous ne payez rien." },
];

const About = () => {
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
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">À propos</p>
              <h1 className="font-heading text-foreground mb-6">
                L'IA au service des recruteurs, pas à leur place
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                XPLORE X conçoit et déploie des systèmes d'automatisation IA dédiés aux cabinets de recrutement. Notre mission : libérer vos recruteurs des tâches répétitives pour qu'ils se concentrent sur ce qui fait vraiment la différence — la relation humaine.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Notre mission</p>
                <h2 className="font-heading text-foreground mb-6">Pourquoi les cabinets de recrutement ?</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Parce que 70% du temps d'un recruteur est englouti dans du sourcing manuel, des copier-coller et des relances. Parce que 1 cabinet sur 5 a fait faillite ces 3 dernières années. Et parce que les outils existants — LinkedIn Recruiter, Waalaxy, les ATS — sont des briques isolées qui ne communiquent pas entre elles.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  XPLORE X remplace le patchwork par une infrastructure IA intégrée. Un seul système qui source, contacte, qualifie et génère des mandats clients. Déployé sur-mesure pour votre cabinet en 15 jours.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Valeurs */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <AnimatedSection>
              <div className="text-center mb-12">
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Nos engagements</p>
                <h2 className="font-heading text-foreground mb-4">Ce qui nous guide</h2>
              </div>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <AnimatedSection key={value.title} delay={index * 100}>
                    <div className="p-6 rounded-2xl bg-card border border-border/50 text-center h-full" style={{ boxShadow: "var(--shadow-card)" }}>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-base font-heading text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <AnimatedSection>
              <div className="text-center mb-12">
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Le fondateur</p>
                <h2 className="font-heading text-foreground mb-4">Qui est derrière XPLORE X</h2>
              </div>
            </AnimatedSection>

            <div className="flex justify-center">
              <AnimatedSection delay={100}>
                <div className="p-6 rounded-2xl bg-card border border-border/50 text-center max-w-sm" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-heading text-primary">RG</span>
                  </div>
                  <h3 className="text-base font-heading text-foreground mb-1">Raphaël Genin</h3>
                  <p className="text-sm text-primary font-medium mb-3">Fondateur & CEO</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Spécialiste en automatisation IA et workflows n8n. Construit des systèmes de sourcing et de business dev automatisés pour les cabinets de recrutement. Passionné par l'intersection entre technologie et relations humaines.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-background">
          <div className="container-narrow text-center">
            <AnimatedSection>
              <h2 className="font-heading text-foreground mb-4">Prêt à transformer votre cabinet ?</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Échangez avec nous pour découvrir comment l'IA peut multiplier vos placements.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/#calculator" className="btn-primary">
                  Estimer mes placements
                </a>
                <button type="button" onClick={openBookCallModal} className="btn-secondary">
                  Réserver un audit gratuit
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

export default About;

import { Shield, Server, Eye, Lock, FileCheck, Database, Brain, Workflow, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ragSteps = [
  {
    icon: Database,
    title: "Ingestion & Embedding",
    description: "Vos données (CRM, emails, documents) sont transformées en vecteurs sémantiques et indexées dans une base vectorielle souveraine.",
  },
  {
    icon: Brain,
    title: "Retrieval-Augmented Generation",
    description: "Chaque requête interroge votre base de connaissances propriétaire. Le LLM ne génère que sur la base de vos données — pas d'hallucination.",
  },
  {
    icon: Shield,
    title: "Cloisonnement & Anonymisation",
    description: "Les données sont anonymisées avant traitement. Chaque tenant est isolé. Aucune donnée ne transite hors de l'infrastructure UE.",
  },
  {
    icon: Workflow,
    title: "Orchestration & Scoring",
    description: "Les résultats alimentent vos workflows ABM : scoring prédictif, personnalisation d'engagement, alertes en temps réel.",
  },
];

const specs = [
  {
    icon: Shield,
    title: "RGPD native",
    description: "Consentement tracé, droit à l'oubli automatisé, registre de traitement intégré.",
  },
  {
    icon: Server,
    title: "Hébergement UE",
    description: "Infrastructure souveraine, aucun transfert vers des juridictions non-adéquates.",
  },
  {
    icon: Eye,
    title: "Auditabilité complète",
    description: "Chaque action IA tracée, horodatée et explicable. Logs d'audit en temps réel.",
  },
  {
    icon: Lock,
    title: "Chiffrement AES-256",
    description: "Données chiffrées au repos et en transit (TLS 1.3). Clés gérées par client.",
  },
  {
    icon: FileCheck,
    title: "Gouvernance IA",
    description: "Modèles versionnés, biais monitorés, décisions explicables à chaque étape.",
  },
  {
    icon: Database,
    title: "Souveraineté des données",
    description: "Aucune utilisation pour l'entraînement de modèles tiers. Export complet sur demande.",
  },
];

const TechnicalSpecs = () => {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Infrastructure technique
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading text-foreground mb-4 leading-tight">
              Pipeline RAG sécurisé & souverain
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comment vos données sont traitées via RAG et LLM dans un environnement cloisonné, auditable et conforme.
            </p>
          </div>
        </AnimatedSection>

        {/* Full-width RAG pipeline — immersive horizontal flow */}
        <div className="mb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {ragSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={step.title} delay={index * 120}>
                  <div className="relative p-6 lg:p-8 border border-border/50 bg-card first:rounded-t-2xl sm:first:rounded-l-2xl sm:first:rounded-tr-none last:rounded-b-2xl sm:last:rounded-r-2xl sm:last:rounded-bl-none group hover:bg-primary/5 transition-colors duration-300">
                    {/* Step number */}
                    <span className="text-[4rem] font-heading text-primary/[0.07] absolute top-2 right-4 leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-heading text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>

                    {/* Connector arrow (not on last item) */}
                    {index < ragSteps.length - 1 && (
                      <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-primary/10 items-center justify-center border border-border/50 bg-card">
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

        {/* Specs Grid — 2-column asymmetric */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <AnimatedSection>
              <h3 className="text-2xl font-heading text-foreground mb-4">
                Conformité & sécurité
              </h3>
              <p className="text-muted-foreground mb-6">
                Nous n'avons rien à cacher. Voici les standards appliqués à chaque déploiement.
              </p>
              <p className="text-muted-foreground text-sm">
                Besoin de documentation complète ?{" "}
                <a href="mailto:security@xplorex.io" className="text-primary hover:underline font-medium">
                  Contactez notre équipe conformité
                </a>
              </p>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {specs.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <AnimatedSection key={spec.title} delay={index * 80}>
                    <div className="p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group security-scan-hover h-full" style={{ boxShadow: "var(--shadow-sm)" }}>
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">{spec.title}</h4>
                          <p className="text-muted-foreground text-xs leading-relaxed">{spec.description}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;

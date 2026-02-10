import { Search, Cpu, Rocket, Database, Brain, Shield, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

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
    description: "Mise en production en 15 jours avec KPIs prédéfinis. ROI prédictif mesuré dès la première itération.",
  },
];

const pipelineNodes = [
  { icon: Database, label: "Ingestion", desc: "CRM, emails, documents" },
  { icon: Brain, label: "RAG Processing", desc: "Embedding & retrieval" },
  { icon: Shield, label: "LLM sécurisé", desc: "Cloisonnement strict" },
  { icon: ArrowRight, label: "Intelligence", desc: "Scoring & engagement" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Content */}
          <div>
            <AnimatedSection>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                Notre méthodologie
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading text-foreground mb-4 leading-tight">
                De l'audit au ROI mesurable en 15 jours
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mb-10">
                Un processus éprouvé conçu pour les organisations exigeantes.
              </p>
            </AnimatedSection>

            {/* Steps — vertical timeline */}
            <div className="space-y-0">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <AnimatedSection key={step.step} delay={index * 120}>
                    <div className="flex gap-5">
                      {/* Timeline line + dot */}
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 relative z-10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        {index < steps.length - 1 && (
                          <div className="w-px h-full bg-gradient-to-b from-primary/20 to-transparent min-h-[2rem]" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="pb-8">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                          Jour {step.step === "01" ? "1" : step.step === "02" ? "5" : "15"}
                        </span>
                        <h3 className="text-xl font-heading text-foreground mt-1 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>

          {/* Right: RAG Pipeline Visual */}
          <div className="lg:sticky lg:top-24">
            <AnimatedSection delay={200} direction="left">
              <div
                className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8"
                style={{ boxShadow: "var(--shadow-lg)" }}
              >
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-6">
                  Pipeline d'intelligence
                </p>

                {/* Pipeline nodes */}
                <div className="space-y-0">
                  {pipelineNodes.map((node, index) => {
                    const Icon = node.icon;
                    return (
                      <div key={node.label}>
                        <div className="flex items-center gap-4 py-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-foreground text-sm">{node.label}</p>
                            <p className="text-xs text-muted-foreground">{node.desc}</p>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        </div>
                        {index < pipelineNodes.length - 1 && (
                          <div className="ml-6 h-6 relative">
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 to-primary/5" />
                            <div className="pipeline-dot" style={{ top: "25%", animationDelay: `${index * 0.5}s` }} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Status bar */}
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs text-muted-foreground">Hébergement UE · Chiffrement AES-256</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

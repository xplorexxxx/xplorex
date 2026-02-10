import { Shield, Server, Eye, Lock, FileCheck, Database } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const specs = [
  {
    icon: Shield,
    title: "Conformité RGPD native",
    description: "Consentement tracé, droit à l'oubli automatisé, registre de traitement intégré. Chaque flux respecte ePrivacy et les directives CNIL.",
  },
  {
    icon: Server,
    title: "Hébergement souverain UE",
    description: "Infrastructure hébergée exclusivement dans l'Union Européenne. Aucun transfert de données vers des juridictions non-adéquates.",
  },
  {
    icon: Eye,
    title: "Auditabilité complète",
    description: "Chaque action IA est tracée, horodatée et explicable. Logs d'audit accessibles en temps réel pour vos équipes compliance.",
  },
  {
    icon: Lock,
    title: "Chiffrement de bout en bout",
    description: "Données chiffrées au repos (AES-256) et en transit (TLS 1.3). Clés de chiffrement gérées par client sur demande.",
  },
  {
    icon: FileCheck,
    title: "Gouvernance de l'IA documentée",
    description: "Politique d'utilisation de l'IA formalisée. Modèles versionnés, biais monitorés, décisions explicables à chaque étape.",
  },
  {
    icon: Database,
    title: "Souveraineté des données",
    description: "Vos données restent les vôtres. Aucune utilisation pour l'entraînement de modèles tiers. Export complet sur demande.",
  },
];

const TechnicalSpecs = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Documentation de sécurité
          </p>
          <h2 className="heading-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-4">
            Spécifications techniques & conformité
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nous n'avons rien à cacher. Voici les standards que nous appliquons à chaque déploiement — 
            parce que la confiance se construit sur la transparence.
          </p>
        </div>

        {/* Specs Grid with stagger + scan hover */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-reveal">
          {specs.map((spec) => {
            const Icon = spec.icon;
            return (
              <AnimatedSection key={spec.title}>
                <div
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group security-scan-hover h-full"
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {spec.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {spec.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-muted-foreground text-sm">
            Besoin de notre documentation complète de sécurité ?{" "}
            <a
              href="mailto:security@xplorex.io"
              className="text-primary hover:underline font-medium"
            >
              Contactez notre équipe conformité
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;

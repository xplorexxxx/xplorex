import { ShieldCheck, CheckCircle2, Clock, BadgeEuro } from "lucide-react";

const GuaranteeSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative p-8 sm:p-12 rounded-2xl bg-card border border-border/50 overflow-hidden"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-primary/5 pointer-events-none" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7 text-success" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                    Engagement de résultat, pas de moyens
                  </h2>
                  <p className="text-muted-foreground">
                    Un modèle aligné sur votre succès. Pas de consulting à l'heure, pas de surprise.
                  </p>
                </div>
              </div>

              {/* Promise Box */}
              <div className="p-6 rounded-xl bg-success/5 border border-success/20 mb-8">
                <p className="text-lg sm:text-xl font-semibold text-foreground text-center">
                  Si nous ne livrons pas <span className="text-success">20% d'économie mesurable</span> en 15 jours,{" "}
                  <span className="text-success">vous ne payez rien.</span>
                </p>
              </div>

              {/* How it works */}
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">15 jours chrono</h3>
                    <p className="text-sm text-muted-foreground">
                      Premier workflow mesurable déployé, KPIs définis conjointement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Mesure objective</h3>
                    <p className="text-sm text-muted-foreground">
                      ROI prédictif calculé, chiffres auditables par votre DAF.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <BadgeEuro className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Facturation au résultat</h3>
                    <p className="text-sm text-muted-foreground">
                      Pas d'économie constatée, pas de facture. Alignement total.
                    </p>
                  </div>
                </div>
              </div>

              {/* Fine print */}
              <div className="pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground text-center">
                  <span className="font-medium text-foreground">Pourquoi cet engagement ?</span>{" "}
                  Nous sélectionnons nos clients. Si nous acceptons une mission, c'est que nous savons livrer. 
                  Ce modèle élimine le risque pour vous — et nous force à l'excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;

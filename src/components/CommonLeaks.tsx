import { Clock, Zap, RefreshCw, FileSearch, MessageSquare, Database } from "lucide-react";

const leaks = [
  {
    icon: Clock,
    title: "Intelligence commerciale dispersée",
    description: "Vos équipes passent 40% de leur temps à chercher des informations au lieu de vendre. Les données prospects sont fragmentées entre CRM, emails et tableurs.",
  },
  {
    icon: Zap,
    title: "Cycles de décision rallongés",
    description: "Sans scoring prédictif ni signaux d'intention automatisés, vos commerciaux investissent sur des comptes qui ne signeront jamais.",
  },
  {
    icon: RefreshCw,
    title: "Processus de qualification manuels",
    description: "Chaque lead passe par les mêmes étapes manuelles : recherche, enrichissement, scoring. Un travail que l'IA souveraine exécute en quelques secondes.",
  },
  {
    icon: FileSearch,
    title: "Absence de ROI prédictif",
    description: "Impossible de prédire quels comptes généreront du revenu. Les décisions commerciales restent basées sur l'intuition plutôt que sur la donnée.",
  },
  {
    icon: MessageSquare,
    title: "Engagement personnalisé inexistant",
    description: "Les communications de masse diluent votre marque. L'Account-Based Excellence exige une personnalisation que seule l'IA contextuelle peut délivrer à l'échelle.",
  },
  {
    icon: Database,
    title: "Données non souveraines",
    description: "Vos données commerciales transitent par des plateformes hors UE sans contrôle de gouvernance. Un risque réglementaire et concurrentiel sous-estimé.",
  },
];

const CommonLeaks = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 font-poppins">
            Diagnostic
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Les fuites de valeur que nous identifions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ces inefficiences coûtent des centaines de milliers d'euros par an aux organisations 
            qui n'ont pas encore structuré leur intelligence commerciale.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaks.map((leak, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <leak.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {leak.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {leak.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonLeaks;

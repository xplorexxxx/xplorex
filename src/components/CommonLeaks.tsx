import { Clock, Zap, RefreshCw, FileSearch, MessageSquare, Database } from "lucide-react";

const leaks = [
  {
    icon: Clock,
    title: "Temps perdu en saisie manuelle",
    description: "Copier-coller des données entre systèmes, remplir des formulaires, mettre à jour des tableurs manuellement.",
  },
  {
    icon: Zap,
    title: "Prise de décision lente",
    description: "Attendre des approbations, relancer des parties prenantes, retards de réponse qui bloquent les projets.",
  },
  {
    icon: RefreshCw,
    title: "Processus répétitifs",
    description: "Exécuter les mêmes rapports, envoyer des emails similaires, effectuer des vérifications identiques chaque jour.",
  },
  {
    icon: FileSearch,
    title: "Recherche d'informations",
    description: "Chercher des documents, traquer des réponses, naviguer dans des bases de connaissances dispersées.",
  },
  {
    icon: MessageSquare,
    title: "Répondre aux mêmes questions",
    description: "Mêmes questions clients, FAQ internes, questions d'intégration posées encore et encore.",
  },
  {
    icon: Database,
    title: "Réconciliation de données",
    description: "Faire correspondre des enregistrements entre systèmes, corriger des incohérences, valider l'intégrité des données.",
  },
];

const CommonLeaks = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Les pertes courantes que nous observons
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Ce sont les pertes de temps cachées qui coûtent silencieusement des milliers d'euros aux entreprises chaque année.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaks.map((leak, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-300 group"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <leak.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {leak.title}
              </h3>
              <p className="text-muted-foreground text-sm">
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

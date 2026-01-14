import { Workflow, Bot, BookOpen, Brain, CheckCircle } from "lucide-react";

const solutions = [
  {
    icon: Workflow,
    title: "Workflows n8n",
    description: "Connectez vos outils et automatisez des processus multi-étapes sans code.",
  },
  {
    icon: Bot,
    title: "Chatbots LLM",
    description: "Déployez des assistants IA pour gérer les questions clients et internes 24h/24.",
  },
  {
    icon: BookOpen,
    title: "Base de connaissances RAG",
    description: "Donnez à l'IA accès à vos documents pour qu'elle réponde avec précision.",
  },
  {
    icon: Brain,
    title: "Agents IA",
    description: "Systèmes autonomes capables de rechercher, analyser et exécuter des tâches pour vous.",
  },
];

const WhatYouCanAutomate = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ce que vous pouvez automatiser ensuite
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Une fois la perte identifiée, voici comment l'automatisation moderne et l'IA peuvent la combler.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 transition-all duration-300 group overflow-hidden"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, hsl(216 94% 55% / 0.02) 0%, hsl(216 94% 55% / 0.05) 100%)" }} />
              
              <div className="relative flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <solution.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {solution.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits list */}
        <div className="mt-12 p-6 rounded-2xl bg-secondary/50 border border-border/50">
          <h3 className="font-semibold text-foreground mb-4">
            Conçu pour vous aider à identifier les opportunités d'automatisation et d'IA
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Réduisez la charge de travail manuelle de 40 à 80%",
              "Temps de réponse plus rapides pour les clients",
              "Libérez votre équipe pour des tâches à haute valeur",
              "Développez les opérations sans augmenter les effectifs",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouCanAutomate;

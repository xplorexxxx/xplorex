import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Cette estimation est-elle précise ?",
    answer: "Ce calculateur fournit une estimation fiable basée sur les données que vous fournissez. Les résultats réels peuvent varier en fonction de la complexité des tâches, des interruptions et d'autres facteurs. L'objectif est de mettre en évidence l'ampleur des économies potentielles — même si les chiffres réels diffèrent de 20-30%, l'opportunité est généralement significative.",
  },
  {
    question: "Quel coût horaire dois-je utiliser ?",
    answer: "Utilisez le coût chargé — pas seulement le salaire. Cela inclut les avantages sociaux, les taxes, l'espace de bureau, l'équipement et les frais généraux. Une bonne règle : multipliez le salaire brut par 1,3-1,5 et divisez par les heures de travail annuelles (généralement 1 800-2 000). La plupart des entreprises se situent entre 35€ et 70€ de l'heure pour les postes opérationnels.",
  },
  {
    question: "Quels types de tâches sont les meilleurs pour l'automatisation ?",
    answer: "Les tâches à fort volume, basées sur des règles et répétitives sont les meilleures candidates. Exemples : saisie de données, génération de rapports, réponses aux emails, mises à jour de statut, traitement de factures et gestion des FAQ clients. Si vous pouvez écrire une checklist claire pour une tâche, elle est probablement automatisable.",
  },
  {
    question: "Ai-je besoin d'IA, ou juste d'automatisation ?",
    answer: "Cela dépend de la tâche. Les tâches simples et structurées (comme déplacer des données entre systèmes) n'ont besoin que d'automatisation de workflow. Les tâches nécessitant du jugement, de la compréhension du langage ou le traitement de données non structurées bénéficient de l'IA. Beaucoup de solutions combinent les deux — l'automatisation pour le flux, l'IA pour les décisions.",
  },
  {
    question: "Quelle est la rapidité de mise en œuvre d'un pilote ?",
    answer: "La plupart des pilotes d'automatisation peuvent être définis, construits et testés en 2-4 semaines. Les intégrations simples peuvent ne prendre que quelques jours. La clé est de commencer par un processus bien défini et mesurable. Nous recommandons de commencer par votre plus grande perte de temps — c'est là que le ROI est le plus rapide.",
  },
  {
    question: "Mes données sont-elles en sécurité ?",
    answer: "Ce calculateur fonctionne entièrement dans votre navigateur — aucune donnée n'est envoyée à un serveur. Lorsque vous demandez un rapport, les données sont stockées localement sur votre appareil. Si vous réservez un appel, seules les informations que vous fournissez explicitement sont partagées avec notre équipe.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Questions fréquentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Tout ce que vous devez savoir sur le calculateur et les opportunités d'automatisation.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:border-accent/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

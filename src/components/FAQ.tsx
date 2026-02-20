import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Nos consultants devront-ils changer d'ATS ou de méthodes de travail ?",
    answer: "Absolument pas. L'avantage de notre infrastructure (basée sur n8n) est qu'elle s'intègre silencieusement à votre écosystème existant. Nos agents IA travaillent en arrière-plan pour scrapper LinkedIn, enrichir les données, et pousser les profils ultra-qualifiés directement dans votre ATS actuel. Vos recruteurs ne changent pas d'outil, ils reçoivent simplement de meilleurs candidats, plus vite.",
  },
  {
    question: "Comment garantissez-vous la conformité RGPD des données candidats ?",
    answer: "C'est notre priorité absolue. Contrairement aux outils SaaS américains soumis au CLOUD Act, nos solutions d'automatisation et de matching garantissent une souveraineté totale de vos données. Nous sommes 100% alignés avec l'EU AI Act de 2026. Les données de vos candidats et de vos clients ne servent jamais à entraîner des modèles publics.",
  },
  {
    question: "Comment réactivez-vous notre « vivier dormant » ?",
    answer: "La recherche booléenne classique par mots-clés est obsolète. Nous connectons votre ATS à une base vectorielle (RAG). Quand vous avez une nouvelle fiche de poste, notre IA analyse sémantiquement vos milliers de CV archivés pour trouver les candidats qui ont les bonnes compétences, même si le mot-clé exact n'est pas dans le CV. Vous divisez par deux vos coûts de sourcing externe.",
  },
  {
    question: "Pourquoi choisir le sur-mesure plutôt qu'un logiciel SaaS de recrutement ?",
    answer: "Les SaaS RH 'sur étagère' imposent leurs processus à votre cabinet et facturent souvent à la licence ou au volume. En construisant votre propre moteur d'automatisation, vous évitez le 'vendor lock-in', vous déployez des workflows uniques à votre cabinet, et vous traitez des volumes massifs (scraping de milliers de profils) sans que vos coûts d'infrastructure n'explosent.",
  },
  {
    question: "Concrètement, comment mesurez-vous le ROI de vos systèmes ?",
    answer: "Nous pilotons notre succès sur 3 KPIs métiers : la réduction de votre Time-to-fill (souvent divisé par deux), l'augmentation du temps de closing (nous libérons en moyenne 10 à 15h de sourcing manuel par semaine et par consultant), et la réduction de vos coûts d'acquisition candidats via les jobboards. Le ROI moyen constaté dépasse les 700%.",
  },
  {
    question: "Où sont hébergées nos données et nos bases de CV ?",
    answer: "L'intégralité de nos solutions et de vos workflows automatisés est hébergée sur des serveurs souverains situés en Europe (comme OVHcloud ou Scaleway). Vos données de recrutement ne quittent jamais le territoire européen, garantissant une confidentialité totale pour vos clients et vos candidats.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Questions de dirigeants, réponses d'experts
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Les questions que posent nos de cabinets de recrutement
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
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

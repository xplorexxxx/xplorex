import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Comment garantissez-vous la conformité RGPD de vos solutions ?",
    answer: "Chaque flux est conçu avec la conformité RGPD comme prérequis, pas comme option. Consentement tracé, registre de traitement intégré, droit à l'oubli automatisé. Nos architectures respectent les directives ePrivacy et CNIL. Nous fournissons une documentation complète de conformité exploitable par votre DPO.",
  },
  {
    question: "Où sont hébergées et traitées nos données ?",
    answer: "Exclusivement dans l'Union Européenne. Nous utilisons des infrastructures souveraines sans aucun transfert vers des juridictions non-adéquates. Vos données ne sont jamais utilisées pour entraîner des modèles tiers. Export complet disponible sur demande, conformément au principe de portabilité RGPD.",
  },
  {
    question: "Qu'est-ce que l'Account-Based Excellence ?",
    answer: "C'est l'évolution de l'ABM traditionnel, augmenté par l'intelligence artificielle souveraine. Au lieu de cibler des listes statiques, nos systèmes identifient dynamiquement les signaux d'intention, qualifient les comptes en temps réel et personnalisent l'engagement à l'échelle — avec une traçabilité complète de chaque interaction.",
  },
  {
    question: "Comment mesurez-vous le ROI prédictif ?",
    answer: "Le ROI prédictif combine des données historiques, des signaux d'engagement et des modèles de scoring propriétaires pour estimer le retour sur investissement de chaque action commerciale avant qu'elle ne soit exécutée. Ce n'est pas de la projection — c'est de la modélisation prédictive basée sur vos données réelles, auditable par votre DAF.",
  },
  {
    question: "Nos équipes doivent-elles changer leurs outils ?",
    answer: "Non. Nous nous intégrons à votre stack existant (CRM, outils de communication, ERP). Notre infrastructure agit comme une couche d'intelligence qui augmente vos outils actuels sans les remplacer. La transition est transparente pour vos équipes — elles gardent leurs habitudes, avec des capacités décuplées.",
  },
  {
    question: "Quel est le modèle de gouvernance IA que vous appliquez ?",
    answer: "Chaque modèle IA déployé est versionné, documenté et auditable. Nous monitorons les biais potentiels, assurons l'explicabilité des décisions et fournissons des logs d'audit en temps réel. Notre politique de gouvernance est formalisée et disponible sur demande pour vos équipes compliance et juridique.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 font-poppins">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Questions de dirigeants, réponses d'experts
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Les questions que posent les Directeurs Commerciaux, CTO et DPO avant de s'engager.
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

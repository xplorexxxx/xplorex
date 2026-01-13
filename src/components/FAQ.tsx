import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this estimate accurate?",
    answer: "This calculator provides a reliable ballpark estimate based on the inputs you provide. Real-world results may vary based on task complexity, interruptions, and other factors. The goal is to highlight the scale of potential savings—even if actual numbers differ by 20-30%, the opportunity is usually significant.",
  },
  {
    question: "What hourly cost should I use?",
    answer: "Use the fully-loaded cost—not just salary. This includes benefits, taxes, office space, equipment, and overhead. A good rule of thumb: multiply the gross salary by 1.3-1.5 and divide by annual working hours (typically 1,800-2,000). Most companies land between €35-€70 per hour for operational roles.",
  },
  {
    question: "What types of tasks are best for automation?",
    answer: "Tasks that are high-volume, rules-based, and repetitive are prime candidates. Examples: data entry, report generation, email responses, status updates, invoice processing, and customer FAQ handling. If you can write a clear checklist for it, it's likely automatable.",
  },
  {
    question: "Do I need AI, or just automation?",
    answer: "It depends on the task. Simple, structured tasks (like moving data between systems) only need workflow automation. Tasks requiring judgment, language understanding, or handling unstructured data benefit from AI. Many solutions combine both—automation for the flow, AI for the decisions.",
  },
  {
    question: "How fast can we implement a pilot?",
    answer: "Most automation pilots can be scoped, built, and tested within 2-4 weeks. Simple integrations may take just days. The key is starting with a well-defined, measurable process. We recommend beginning with your biggest time-waster—that's where ROI is fastest.",
  },
  {
    question: "Is my data safe?",
    answer: "This calculator runs entirely in your browser—no data is sent to any server. When you request a report, the data is stored locally on your device. If you book a call, only the information you explicitly provide is shared with our team.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about the calculator and automation opportunities.
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

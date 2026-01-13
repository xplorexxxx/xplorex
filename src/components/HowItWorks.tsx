import { ClipboardList, Calculator, Lightbulb } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Enter Your Data",
    description: "Tell us about your team, the repetitive task, and how often it happens. Takes 30 seconds.",
  },
  {
    icon: Calculator,
    step: "02",
    title: "See the Numbers",
    description: "Get instant calculations showing hours and euros wasted annually—with full transparency on the math.",
  },
  {
    icon: Lightbulb,
    step: "03",
    title: "Spot Opportunities",
    description: "Understand your automation potential and get a detailed report to share with your team.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Three simple steps to uncover your hidden operational costs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-card border border-border/50 group hover:border-accent/30 transition-all duration-300"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              {/* Step number */}
              <div className="text-5xl font-bold text-accent/10 absolute top-4 right-6">
                {step.step}
              </div>
              
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <step.icon className="w-6 h-6 text-accent" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

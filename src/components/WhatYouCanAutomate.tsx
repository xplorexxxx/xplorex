import { Workflow, Bot, BookOpen, Brain, CheckCircle } from "lucide-react";

const solutions = [
  {
    icon: Workflow,
    title: "n8n Workflows",
    description: "Connect your tools and automate multi-step processes without code.",
  },
  {
    icon: Bot,
    title: "LLM Chatbots",
    description: "Deploy AI assistants to handle customer queries and internal questions 24/7.",
  },
  {
    icon: BookOpen,
    title: "RAG Knowledge Base",
    description: "Give AI access to your docs so it can answer questions accurately.",
  },
  {
    icon: Brain,
    title: "AI Agents",
    description: "Autonomous systems that can research, analyze, and execute tasks for you.",
  },
];

const WhatYouCanAutomate = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What you can automate after this
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Once you identify the leak, here's how modern automation and AI can plug it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl border border-border/50 bg-card hover:border-accent/30 transition-all duration-300 group overflow-hidden"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, hsl(162 72% 41% / 0.02) 0%, hsl(162 72% 41% / 0.05) 100%)" }} />
              
              <div className="relative flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <solution.icon className="w-6 h-6 text-accent" />
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
            Designed to help you spot automation and AI opportunities
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Reduce manual workload by 40-80%",
              "Faster response times for customers",
              "Free your team for high-value work",
              "Scale operations without scaling headcount",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
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

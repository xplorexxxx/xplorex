import { Clock, Zap, RefreshCw, FileSearch, MessageSquare, Database } from "lucide-react";

const leaks = [
  {
    icon: Clock,
    title: "Time Wasted on Manual Entry",
    description: "Copy-pasting data between systems, filling forms, updating spreadsheets manually.",
  },
  {
    icon: Zap,
    title: "Slow Decision Making",
    description: "Waiting for approvals, chasing stakeholders, delayed responses that stall projects.",
  },
  {
    icon: RefreshCw,
    title: "Repetitive Processes",
    description: "Running the same reports, sending similar emails, performing identical checks daily.",
  },
  {
    icon: FileSearch,
    title: "Information Hunting",
    description: "Searching for documents, hunting down answers, navigating scattered knowledge bases.",
  },
  {
    icon: MessageSquare,
    title: "Answering Repeat Questions",
    description: "Same customer queries, internal FAQs, onboarding questions asked over and over.",
  },
  {
    icon: Database,
    title: "Data Reconciliation",
    description: "Matching records across systems, fixing inconsistencies, validating data integrity.",
  },
];

const CommonLeaks = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Common leaks we see
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            These are the hidden time drains that quietly cost businesses thousands every year.
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

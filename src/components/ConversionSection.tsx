import { useState } from "react";
import { Mail, ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface CalculatorResults {
  annualHours: number;
  annualCost: number;
  potentialSavingsHours: number;
  potentialSavingsCost: number;
}

interface ConversionSectionProps {
  results: CalculatorResults | null;
  onBookCallClick: () => void;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("de-DE").format(Math.round(value));
};

const ConversionSection = ({ results, onBookCallClick }: ConversionSectionProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email to receive the report.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Store in localStorage
    const submissions = JSON.parse(localStorage.getItem("reportSubmissions") || "[]");
    submissions.push({
      email,
      results,
      submittedAt: new Date().toISOString(),
      type: "report",
    });
    localStorage.setItem("reportSubmissions", JSON.stringify(submissions));

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);
    navigate("/thank-you", { 
      state: { 
        type: "report", 
        email,
        results,
      } 
    });
  };

  return (
    <section className="pb-16 sm:pb-20">
      <div className="container-narrow">
        <div className="glass-card p-6 sm:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Email Report */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Get the Detailed Report</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Receive a breakdown of your calculations with actionable next steps via email.
              </p>

              {results && (
                <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Your current calculation:</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatNumber(results.annualHours)} hours / {formatCurrency(results.annualCost)} wasted annually
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="input-field flex-1"
                  maxLength={255}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary whitespace-nowrap disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send My Report"}
                </button>
              </form>
            </div>

            {/* Book a Call */}
            <div className="md:border-l md:border-border/50 md:pl-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Prefer to Talk?</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Book a free 15-minute call to discuss your specific automation opportunities and get personalized recommendations.
              </p>
              <button onClick={onBookCallClick} className="btn-secondary w-full md:w-auto">
                Book a Free Call
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionSection;

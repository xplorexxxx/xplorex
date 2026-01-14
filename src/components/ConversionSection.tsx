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
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("fr-FR").format(Math.round(value));
};

const ConversionSection = ({ results, onBookCallClick }: ConversionSectionProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: "Email requis",
        description: "Veuillez entrer votre email pour recevoir le rapport.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
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
                <h3 className="text-lg font-semibold text-foreground">Recevoir le rapport détaillé</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Recevez une analyse détaillée de vos calculs avec les prochaines étapes concrètes par email.
              </p>

              {results && (
                <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Votre calcul actuel :</p>
                  <p className="text-sm font-medium text-foreground">
                    {formatNumber(results.annualHours)} heures / {formatCurrency(results.annualCost)} perdus annuellement
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@entreprise.com"
                  className="input-field flex-1"
                  maxLength={255}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary whitespace-nowrap disabled:opacity-50"
                >
                  {isSubmitting ? "Envoi..." : "Envoyer mon rapport"}
                </button>
              </form>
            </div>

            {/* Book a Call */}
            <div className="md:border-l md:border-border/50 md:pl-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Préférez-vous échanger ?</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Réservez un appel gratuit de 15 minutes pour discuter de vos opportunités d'automatisation spécifiques et obtenir des recommandations personnalisées.
              </p>
              <button onClick={onBookCallClick} className="btn-secondary w-full md:w-auto">
                Réserver un appel gratuit
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

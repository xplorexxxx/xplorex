import { useState, useRef, useEffect } from "react";
import { Mail, ArrowRight, Calendar, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CalculatorInputs {
  teamSize: number;
  timePerTask: number;
  frequencyType: "day" | "week";
  frequencyValue: number;
  workingDays: number;
  hourlyCost: number;
  automationPotential: number;
}

interface CalculatorResults {
  annualHours: number;
  annualCost: number;
  potentialSavingsHours: number;
  potentialSavingsCost: number;
}

interface ConversionSectionProps {
  results: CalculatorResults | null;
  inputs?: CalculatorInputs | null;
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

// Rate limiting: max 3 sends per hour
const RATE_LIMIT_KEY = "report_send_timestamps";
const MAX_SENDS_PER_HOUR = 3;

const checkRateLimit = (): boolean => {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const timestamps: number[] = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || "[]");
  const recentTimestamps = timestamps.filter((ts) => ts > oneHourAgo);
  return recentTimestamps.length < MAX_SENDS_PER_HOUR;
};

const recordSend = () => {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const timestamps: number[] = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || "[]");
  const recentTimestamps = timestamps.filter((ts) => ts > oneHourAgo);
  recentTimestamps.push(now);
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentTimestamps));
};

const ConversionSection = ({ results, inputs, onBookCallClick }: ConversionSectionProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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

    // Email length validation
    if (email.length > 255) {
      toast({
        title: "Email trop long",
        description: "L'adresse email ne peut pas dépasser 255 caractères.",
        variant: "destructive",
      });
      return;
    }

    // Check rate limit
    if (!checkRateLimit()) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint la limite d'envois. Veuillez réessayer dans une heure.",
        variant: "destructive",
      });
      return;
    }

    if (!results || !inputs) {
      toast({
        title: "Données manquantes",
        description: "Veuillez d'abord calculer vos résultats.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-report", {
        body: {
          email: email.trim(),
          inputs,
          results,
        },
      });

      if (error) {
        console.error("Edge function error:", error);
        // Handle rate limit errors specifically
        if (error.message?.includes("429") || error.message?.includes("Rate limit")) {
          throw new Error("Limite d'envois atteinte. Veuillez réessayer dans une heure.");
        }
        throw new Error(error.message || "Failed to send report");
      }

      if (data?.error) {
        // Handle specific validation errors
        if (data.details && Array.isArray(data.details)) {
          throw new Error(`Données invalides : ${data.details.join(", ")}`);
        }
        throw new Error(data.error);
      }

      // Record successful send for rate limiting
      recordSend();

      // Store in localStorage for history
      const submissions = JSON.parse(localStorage.getItem("reportSubmissions") || "[]");
      submissions.push({
        email: email.trim(),
        results,
        inputs,
        submittedAt: new Date().toISOString(),
        type: "report",
      });
      localStorage.setItem("reportSubmissions", JSON.stringify(submissions));

      toast({
        title: "Rapport envoyé !",
        description: "Nous vous répondrons dans les 24 heures.",
      });

      navigate("/thank-you", {
        state: {
          type: "report",
          email: email.trim(),
          results,
        },
      });
    } catch (error: any) {
      console.error("Error sending report:", error);
      
      // Format user-friendly error messages
      let errorMessage = "Une erreur est survenue. Veuillez réessayer.";
      if (error.message) {
        if (error.message.includes("Limite") || error.message.includes("Rate limit")) {
          errorMessage = error.message;
        } else if (error.message.includes("Données invalides")) {
          errorMessage = error.message;
        } else if (error.message.includes("Invalid email")) {
          errorMessage = "Adresse email invalide.";
        } else if (error.message.includes("Invalid input")) {
          errorMessage = "Données du calculateur invalides. Veuillez vérifier vos entrées.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Erreur d'envoi",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pb-16 sm:pb-20">
      <div className="container-narrow">
        <div className="glass-card p-6 sm:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Email Report */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
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
                    {formatNumber(results.annualHours)} heures / {formatCurrency(results.annualCost)} perdus
                    annuellement
                  </p>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@entreprise.com"
                  className="input-field flex-1"
                  maxLength={255}
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary whitespace-nowrap disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    "Envoyer mon rapport"
                  )}
                </button>
              </form>
            </div>

            {/* Book a Call */}
            <div className="md:border-l md:border-border/50 md:pl-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Préférez-vous échanger ?</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Réservez un appel offert de 15 minutes pour discuter de vos opportunités d'automatisation spécifiques et
                obtenir des recommandations personnalisées.
              </p>
              <button onClick={onBookCallClick} className="btn-secondary w-full md:w-auto">
                Réserver un appel offert
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

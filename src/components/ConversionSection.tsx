import { useState, useRef, useMemo } from "react";
import { Mail, ArrowRight, Calendar, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import TurnstileWidget, { TurnstileStatus } from "./TurnstileWidget";

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

// Rate limiting: max 3 sends per hour (client-side backup)
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

// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email: string): { valid: boolean; message?: string } => {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false };
  }
  if (trimmed.length > 200) {
    return { valid: false, message: "Email trop long (max 200 caractères)" };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, message: "Format d'email invalide" };
  }
  return { valid: true };
};

const ConversionSection = ({ results, inputs, onBookCallClick }: ConversionSectionProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState<TurnstileStatus>("loading");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Live email validation
  const emailValidation = useMemo(() => validateEmail(email), [email]);
  const showEmailError = emailTouched && email.trim() !== "" && !emailValidation.valid;

  // Button enable logic
  const isButtonEnabled = emailValidation.valid && turnstileToken !== null && !isSubmitting;

  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
  };

  const handleTurnstileStatusChange = (status: TurnstileStatus) => {
    setTurnstileStatus(status);
    if (status === "error" || status === "expired") {
      setTurnstileToken(null);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setEmailTouched(true);

    if (!emailValidation.valid) {
      toast({
        title: "Email invalide",
        description: emailValidation.message || "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    // Check Turnstile verification
    if (!turnstileToken) {
      if (turnstileStatus === "error") {
        toast({
          title: "Vérification anti-spam échouée",
          description: "Veuillez rafraîchir la page et réessayer.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Vérification en cours",
          description: "Veuillez patienter pendant la vérification de sécurité.",
          variant: "destructive",
        });
      }
      return;
    }

    // Check client-side rate limit (backup)
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
          turnstileToken,
          inputs,
          results,
        },
      });

      if (error) {
        console.error("Edge function error:", error);
        // Handle specific error codes
        if (error.message?.includes("429") || error.message?.includes("Rate limit") || error.message?.includes("Please wait")) {
          throw new Error("Limite d'envois atteinte. Veuillez réessayer plus tard.");
        }
        if (error.message?.includes("403") || error.message?.includes("Bot verification")) {
          throw new Error("Vérification de sécurité échouée. Veuillez rafraîchir la page et réessayer.");
        }
        throw new Error(error.message || "Failed to send report");
      }

      if (data?.error) {
        // Handle specific validation errors
        if (data.details && Array.isArray(data.details)) {
          throw new Error(`Données invalides : ${data.details.join(", ")}`);
        }
        // Handle bot verification errors
        if (data.error.includes("Bot verification") || data.error.includes("security check")) {
          throw new Error("Vérification de sécurité échouée. Veuillez rafraîchir la page et réessayer.");
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
      
      // Reset turnstile token on error to require re-verification
      setTurnstileToken(null);
      
      // Format user-friendly error messages
      let errorMessage = "Impossible d'envoyer le rapport. Veuillez réessayer.";
      if (error.message) {
        if (error.message.includes("Limite") || error.message.includes("Rate limit") || error.message.includes("Please wait")) {
          errorMessage = error.message;
        } else if (error.message.includes("Vérification") || error.message.includes("verification")) {
          errorMessage = error.message;
        } else if (error.message.includes("Données invalides")) {
          errorMessage = error.message;
        } else if (error.message.includes("Invalid email")) {
          errorMessage = "Adresse email invalide.";
        } else if (error.message.includes("Invalid input")) {
          errorMessage = "Données du calculateur invalides. Veuillez vérifier vos entrées.";
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

  // Determine what status message to show
  const getStatusMessage = () => {
    if (turnstileStatus === "loading") {
      return null; // Loading state is shown in the widget itself
    }
    if (turnstileStatus === "verified" && turnstileToken) {
      return (
        <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
          <ShieldCheck className="w-3 h-3" />
          <span>Vérifié</span>
        </div>
      );
    }
    if (submitAttempted && turnstileStatus === "error") {
      return (
        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Vérification échouée. Veuillez rafraîchir la page.
        </p>
      );
    }
    if (submitAttempted && turnstileStatus === "expired") {
      return (
        <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Vérification expirée. Veuillez recommencer.
        </p>
      );
    }
    return null;
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

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-1">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    placeholder="vous@entreprise.com"
                    className={`input-field w-full ${showEmailError ? 'border-destructive focus:ring-destructive' : ''}`}
                    maxLength={200}
                    disabled={isSubmitting}
                    aria-invalid={showEmailError}
                    aria-describedby={showEmailError ? "email-error" : undefined}
                  />
                  {showEmailError && emailValidation.message && (
                    <p id="email-error" className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {emailValidation.message}
                    </p>
                  )}
                  {!email.trim() && !emailTouched && (
                    <p className="text-xs text-muted-foreground">
                      Entrez votre email pour recevoir le rapport.
                    </p>
                  )}
                </div>
                
                {/* Turnstile Widget */}
                <div className="flex flex-col items-center">
                  <TurnstileWidget
                    onVerify={handleTurnstileVerify}
                    onStatusChange={handleTurnstileStatusChange}
                  />
                  {getStatusMessage()}
                </div>

                <button
                  type="submit"
                  disabled={!isButtonEnabled}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Envoi en cours...
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

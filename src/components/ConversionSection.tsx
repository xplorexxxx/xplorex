import { useState, useRef, useMemo } from "react";
import { Mail, ArrowRight, Calendar, Loader2, AlertCircle, CheckCircle, Gift } from "lucide-react";
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

const BOOKING_LINK = "https://app.iclosed.io/e/raphaelgenin/audit-offert-30-minutes";

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
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState<TurnstileStatus>("loading");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Live email validation
  const emailValidation = useMemo(() => validateEmail(email), [email]);
  const showEmailError = emailTouched && email.trim() !== "" && !emailValidation.valid;

  // Button enable logic:
  // - Email must be valid
  // - Turnstile must be verified OR unavailable (fallback to server-side rate limiting)
  // - Not currently submitting
  const turnstileReady = turnstileToken !== null || turnstileStatus === "unavailable";
  const isButtonEnabled = emailValidation.valid && turnstileReady && !isSubmitting;

  const handleTurnstileVerify = (token: string) => {
    console.log("[ConversionSection] Turnstile verified");
    setTurnstileToken(token);
    setSubmitError(null);
  };

  const handleTurnstileStatusChange = (status: TurnstileStatus) => {
    console.log("[ConversionSection] Turnstile status:", status);
    setTurnstileStatus(status);
    if (status === "error" || status === "expired") {
      setTurnstileToken(null);
    }
  };

  const handleTurnstileUnavailable = () => {
    console.log("[ConversionSection] Turnstile unavailable, server-side protection only");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSubmitError(null);
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setSubmitError(null);

    console.log("[ConversionSection] Submit clicked", {
      email: email.trim(),
      emailValid: emailValidation.valid,
      hasTurnstileToken: !!turnstileToken,
      turnstileStatus,
    });

    // Validate email
    if (!emailValidation.valid) {
      setSubmitError(emailValidation.message || "Veuillez entrer une adresse email valide.");
      return;
    }

    // Check Turnstile - require token unless unavailable
    if (!turnstileToken && turnstileStatus !== "unavailable") {
      if (turnstileStatus === "loading") {
        setSubmitError("Vérification en cours, veuillez patienter...");
      } else if (turnstileStatus === "error" || turnstileStatus === "expired") {
        setSubmitError("Vérification expirée ou échouée. Veuillez rafraîchir la page.");
      } else {
        setSubmitError("Veuillez compléter la vérification anti-spam.");
      }
      return;
    }

    // Check client-side rate limit
    if (!checkRateLimit()) {
      setSubmitError("Limite atteinte. Veuillez réessayer dans une heure.");
      return;
    }

    // Check calculator data
    if (!results || !inputs) {
      setSubmitError("Données du calculateur manquantes. Veuillez d'abord calculer vos résultats.");
      return;
    }

    setIsSubmitting(true);
    console.log("[ConversionSection] Sending report...");

    try {
      const requestBody = {
        email: email.trim(),
        turnstileToken: turnstileToken || undefined,
        inputs,
        results,
      };

      console.log("[ConversionSection] Request:", {
        ...requestBody,
        turnstileToken: requestBody.turnstileToken ? "present" : "absent",
      });

      const { data, error } = await supabase.functions.invoke("send-report", {
        body: requestBody,
      });

      console.log("[ConversionSection] Response:", { data, error });

      if (error) {
        console.error("[ConversionSection] Edge function error:", error);
        
        // Parse error message for user-friendly display
        const errorMsg = error.message || "";
        if (errorMsg.includes("429") || errorMsg.includes("Rate limit") || errorMsg.includes("Please wait")) {
          throw new Error("Limite d'envois atteinte. Veuillez réessayer plus tard.");
        }
        if (errorMsg.includes("403") || errorMsg.includes("Bot verification") || errorMsg.includes("security")) {
          throw new Error("Vérification de sécurité échouée. Veuillez rafraîchir la page.");
        }
        throw new Error(error.message || "Erreur lors de l'envoi du rapport.");
      }

      if (data?.error) {
        console.error("[ConversionSection] API error:", data.error);
        if (data.details && Array.isArray(data.details)) {
          throw new Error(`Données invalides : ${data.details.join(", ")}`);
        }
        throw new Error(data.error);
      }

      // Success!
      recordSend();
      console.log("[ConversionSection] Report sent successfully!");

      toast({
        title: "Rapport envoyé !",
        description: "Vous recevrez une réponse sous 24 heures.",
      });

      setIsSuccess(true);
    } catch (error: any) {
      console.error("[ConversionSection] Error:", error);
      setTurnstileToken(null); // Reset token to require re-verification
      
      let errorMessage = "Impossible d'envoyer le rapport. Veuillez réessayer.";
      if (error.message) {
        if (
          error.message.includes("Limite") ||
          error.message.includes("Rate limit") ||
          error.message.includes("Vérification") ||
          error.message.includes("Données invalides") ||
          error.message.includes("security")
        ) {
          errorMessage = error.message;
        } else if (error.message.includes("network") || error.message.includes("fetch")) {
          errorMessage = "Erreur réseau. Veuillez vérifier votre connexion.";
        }
      }
      
      setSubmitError(errorMessage);
      toast({
        title: "Erreur d'envoi",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state - show thank you message
  if (isSuccess) {
    return (
      <section className="pb-16 sm:pb-20">
        <div className="container-narrow">
          <div className="glass-card p-6 sm:p-8">
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Merci — votre rapport a été envoyé !
              </h3>
              <p className="text-muted-foreground mb-6">
                Nous vous répondrons dans les 24 heures.
                <br />
                <span className="text-sm">Si vous ne recevez rien sous 2 minutes, vérifiez vos spams.</span>
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Gift className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Prochaine étape recommandée</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Réservez un audit offert de 30 minutes pour identifier vos opportunités d'automatisation.
                </p>
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Réserver mon audit offert
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
                {/* Email Input */}
                <div className="flex flex-col gap-1">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    placeholder="vous@entreprise.com"
                    className={`input-field w-full ${showEmailError ? "border-destructive focus:ring-destructive" : ""}`}
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
                    onUnavailable={handleTurnstileUnavailable}
                  />
                </div>

                {/* Submit Error Message */}
                {submitError && (
                  <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submit Button */}
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
                Réservez un appel offert de 15 minutes pour discuter de vos opportunités d'automatisation
                spécifiques et obtenir des recommandations personnalisées.
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

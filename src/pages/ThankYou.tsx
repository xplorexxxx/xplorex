import { useLocation, Link } from "react-router-dom";
import { CheckCircle, ArrowLeft, Mail, Calendar } from "lucide-react";

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

const ThankYou = () => {
  const location = useLocation();
  const state = location.state as {
    type?: "report" | "book_call";
    email?: string;
    name?: string;
    results?: {
      annualHours: number;
      annualCost: number;
      potentialSavingsHours: number;
      potentialSavingsCost: number;
    };
  } | null;

  const isReport = state?.type === "report";
  const isBookCall = state?.type === "book_call";

  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-4" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-accent/10 flex items-center justify-center animate-in-up">
          <CheckCircle className="w-10 h-10 text-accent" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {isBookCall ? "Nous vous recontacterons !" : "Vérifiez votre boîte de réception !"}
        </h1>

        {/* Message based on type */}
        {isReport && (
          <div className="mb-8">
            <p className="text-lg text-muted-foreground mb-6">
              Votre rapport ROI détaillé est en route vers{" "}
              <span className="font-semibold text-foreground">{state.email}</span>
            </p>

            {state.results && (
              <div className="glass-card p-6 text-left mb-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  Résumé de votre calcul
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Heures perdues par an</span>
                    <span className="font-semibold text-foreground">{formatNumber(state.results.annualHours)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coût perdu par an</span>
                    <span className="font-semibold text-foreground">{formatCurrency(state.results.annualCost)}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Économies potentielles (heures)</span>
                    <span className="font-semibold gradient-text">{formatNumber(state.results.potentialSavingsHours)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Économies potentielles (euros)</span>
                    <span className="font-semibold gradient-text">{formatCurrency(state.results.potentialSavingsCost)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {isBookCall && (
          <div className="mb-8">
            <p className="text-lg text-muted-foreground mb-6">
              Merci{state.name ? `, ${state.name}` : ""} ! Nous avons bien reçu votre demande et vous contacterons sous 24 heures pour planifier votre consultation gratuite sur l'automatisation.
            </p>

            <div className="glass-card p-6 text-left">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                À quoi s'attendre
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  Un appel de 15 minutes pour comprendre vos plus grandes pertes de temps
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  Des recommandations d'automatisation personnalisées
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  Des gains rapides que vous pouvez implémenter immédiatement
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Fallback for direct access */}
        {!isReport && !isBookCall && (
          <p className="text-lg text-muted-foreground mb-8">
            Merci de votre intérêt ! Si vous avez soumis un formulaire, vous devriez avoir de nos nouvelles bientôt.
          </p>
        )}

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au calculateur
        </Link>
      </div>
    </main>
  );
};

export default ThankYou;

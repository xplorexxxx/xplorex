import { useState, useEffect, useMemo, useCallback } from "react";
import { RotateCcw, Share2, ChevronDown, ChevronUp, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AnimatedSection from "./AnimatedSection";

// Use string | number for inputs to handle empty states
interface CalculatorInputsRaw {
  teamSize: string;
  timePerTask: string;
  frequencyType: "day" | "week";
  frequencyValue: string;
  workingDays: string;
  hourlyCost: string;
  automationPotential: number; // Slider always has a value
}

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

interface CalculatorProps {
  onResultsChange?: (results: CalculatorResults, inputs: CalculatorInputs) => void;
}

// Parse URL params to pre-fill, otherwise return empty state
const getInitialInputs = (): CalculatorInputsRaw => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const teamSize = params.get("ts");
    const timePerTask = params.get("tpt");
    const frequencyType = params.get("ft");
    const frequencyValue = params.get("fv");
    const workingDays = params.get("wd");
    const hourlyCost = params.get("hc");
    const automationPotential = params.get("ap");

    // Only prefill if URL params exist
    if (teamSize || timePerTask || frequencyType || frequencyValue || workingDays || hourlyCost || automationPotential) {
      return {
        teamSize: teamSize || "",
        timePerTask: timePerTask || "",
        frequencyType: frequencyType === "week" ? "week" : "day",
        frequencyValue: frequencyValue || "",
        workingDays: workingDays || "",
        hourlyCost: hourlyCost || "",
        automationPotential: automationPotential ? Math.min(90, Math.max(10, parseInt(automationPotential))) : 40,
      };
    }
  }
  
  // Default: all empty except slider
  return {
    teamSize: "",
    timePerTask: "",
    frequencyType: "day",
    frequencyValue: "",
    workingDays: "",
    hourlyCost: "",
    automationPotential: 40,
  };
};

const Calculator = ({ onResultsChange }: CalculatorProps) => {
  const [rawInputs, setRawInputs] = useState<CalculatorInputsRaw>(getInitialInputs);
  const [showFormula, setShowFormula] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Convert raw string inputs to numbers for calculations (use 0 if empty)
  const inputs = useMemo<CalculatorInputs>(() => ({
    teamSize: rawInputs.teamSize ? parseInt(rawInputs.teamSize) || 0 : 0,
    timePerTask: rawInputs.timePerTask ? parseInt(rawInputs.timePerTask) || 0 : 0,
    frequencyType: rawInputs.frequencyType,
    frequencyValue: rawInputs.frequencyValue ? parseInt(rawInputs.frequencyValue) || 0 : 0,
    workingDays: rawInputs.workingDays ? parseInt(rawInputs.workingDays) || 0 : 0,
    hourlyCost: rawInputs.hourlyCost ? parseInt(rawInputs.hourlyCost) || 0 : 0,
    automationPotential: rawInputs.automationPotential,
  }), [rawInputs]);

  const results = useMemo<CalculatorResults>(() => {
    const annualRuns =
      inputs.frequencyType === "day"
        ? inputs.frequencyValue * inputs.workingDays * 52
        : inputs.frequencyValue * 52;

    const annualMinutes = inputs.teamSize * inputs.timePerTask * annualRuns;
    const annualHours = annualMinutes / 60;
    const annualCost = annualHours * inputs.hourlyCost;

    const potentialSavingsHours = annualHours * (inputs.automationPotential / 100);
    const potentialSavingsCost = annualCost * (inputs.automationPotential / 100);

    return {
      annualHours,
      annualCost,
      potentialSavingsHours,
      potentialSavingsCost,
    };
  }, [inputs]);

  useEffect(() => {
    onResultsChange?.(results, inputs);
  }, [results, inputs, onResultsChange]);

  const handleInputChange = useCallback((field: keyof CalculatorInputsRaw, value: string | number) => {
    setRawInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleReset = useCallback(() => {
    setRawInputs({
      teamSize: "",
      timePerTask: "",
      frequencyType: "day",
      frequencyValue: "",
      workingDays: "",
      hourlyCost: "",
      automationPotential: 40,
    });
    setTouched({});
    // Clear URL params
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const handleShare = useCallback(async () => {
    // Only share if there are actual values
    if (!inputs.teamSize && !inputs.timePerTask) {
      toast({
        title: "Remplissez le calculateur",
        description: "Entrez vos données avant de partager.",
        variant: "destructive",
      });
      return;
    }

    const params = new URLSearchParams({
      ts: inputs.teamSize.toString(),
      tpt: inputs.timePerTask.toString(),
      ft: inputs.frequencyType,
      fv: inputs.frequencyValue.toString(),
      wd: inputs.workingDays.toString(),
      hc: inputs.hourlyCost.toString(),
      ap: inputs.automationPotential.toString(),
    });

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}#calculator`;

    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Lien copié !",
        description: "Partagez ce lien pour montrer votre calcul.",
      });
    } catch {
      toast({
        title: "Impossible de copier",
        description: "Veuillez copier l'URL manuellement depuis votre navigateur.",
        variant: "destructive",
      });
    }
  }, [inputs]);

  // Check if any field has been filled
  const hasData = inputs.teamSize > 0 || inputs.timePerTask > 0 || inputs.frequencyValue > 0;

  return (
    <section id="calculator" className="section-padding">
      <div className="container-narrow">
        <AnimatedSection>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Calculez votre perte de ROI
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto px-2">
              Entrez vos chiffres ci-dessous pour voir combien de temps et d'argent votre équipe perd chaque année.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="glass-card p-4 sm:p-6 lg:p-10">
            {/* Mobile: Single column, Desktop: Two columns */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Inputs Section */}
              <div className="space-y-5 sm:space-y-6 order-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6">Vos entrées</h3>

                {/* Team Size */}
                <div>
                  <label className="label-text">Taille de l'équipe concernée</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={rawInputs.teamSize}
                    onChange={(e) => handleInputChange("teamSize", e.target.value.replace(/[^0-9]/g, ""))}
                    onBlur={() => handleBlur("teamSize")}
                    placeholder="ex: 5"
                    className="input-field"
                  />
                  <p className="helper-text">Combien de personnes effectuent cette tâche ? (1-500)</p>
                </div>

                {/* Time per Task */}
                <div>
                  <label className="label-text">Temps par tâche (minutes)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={rawInputs.timePerTask}
                    onChange={(e) => handleInputChange("timePerTask", e.target.value.replace(/[^0-9]/g, ""))}
                    onBlur={() => handleBlur("timePerTask")}
                    placeholder="ex: 15"
                    className="input-field"
                  />
                  <p className="helper-text">Combien de temps faut-il pour terminer une fois ? (1-240 min)</p>
                </div>

                {/* Frequency Type - stacked on mobile */}
                <div>
                  <label className="label-text">Fréquence</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={rawInputs.frequencyType}
                      onChange={(e) => handleInputChange("frequencyType", e.target.value)}
                      className="input-field flex-1"
                    >
                      <option value="day">Fois par jour</option>
                      <option value="week">Fois par semaine</option>
                    </select>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={rawInputs.frequencyValue}
                      onChange={(e) => handleInputChange("frequencyValue", e.target.value.replace(/[^0-9]/g, ""))}
                      onBlur={() => handleBlur("frequencyValue")}
                      placeholder="ex: 10"
                      className="input-field w-full sm:w-28"
                    />
                  </div>
                  <p className="helper-text">À quelle fréquence cette tâche est-elle effectuée ? (1-500)</p>
                </div>

                {/* Working Days */}
                <div>
                  <label className="label-text">Jours de travail par semaine</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={rawInputs.workingDays}
                    onChange={(e) => handleInputChange("workingDays", e.target.value.replace(/[^0-9]/g, ""))}
                    onBlur={() => handleBlur("workingDays")}
                    placeholder="ex: 5"
                    className="input-field"
                  />
                  <p className="helper-text">Jours de travail de votre équipe (1-7)</p>
                </div>

                {/* Hourly Cost */}
                <div>
                  <label className="label-text">Coût horaire moyen chargé (€)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={rawInputs.hourlyCost}
                    onChange={(e) => handleInputChange("hourlyCost", e.target.value.replace(/[^0-9]/g, ""))}
                    onBlur={() => handleBlur("hourlyCost")}
                    placeholder="ex: 45"
                    className="input-field"
                  />
                  <p className="helper-text">Incluez salaire, avantages, charges (10€-300€)</p>
                </div>

                {/* Automation Potential Slider - Enhanced for mobile */}
                <div>
                  <label className="label-text flex items-center justify-between gap-2">
                    <span>Potentiel d'automatisation</span>
                    <span className="text-primary font-bold text-lg">{rawInputs.automationPotential}%</span>
                  </label>
                  <div className="py-2">
                    <input
                      type="range"
                      value={rawInputs.automationPotential}
                      onChange={(e) => handleInputChange("automationPotential", parseInt(e.target.value))}
                      min={10}
                      max={90}
                      step={5}
                      className="mobile-slider"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>10%</span>
                    <span>90%</span>
                  </div>
                </div>

                {/* Actions - full width on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={handleReset} 
                    className="btn-secondary flex-1 text-sm py-3.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Réinitialiser
                  </button>
                  <button 
                    type="button"
                    onClick={handleShare} 
                    className="btn-secondary flex-1 text-sm py-3.5"
                  >
                    <Share2 className="w-4 h-4" />
                    Partager
                  </button>
                </div>
              </div>

              {/* Results Section - Shows first on mobile for immediate feedback */}
              <div className="space-y-4 sm:space-y-6 order-2 lg:order-2">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6">Vos résultats</h3>

                {/* Main Results */}
                <div className="p-5 sm:p-6 rounded-2xl bg-primary text-primary-foreground">
                  <div className="space-y-5 sm:space-y-6">
                    <div>
                      <p className="text-xs sm:text-sm opacity-80 mb-1">Heures perdues par an</p>
                      <p className="text-3xl sm:text-4xl font-bold">
                        {hasData ? formatNumber(results.annualHours) : "—"}
                      </p>
                    </div>
                    <div className="h-px bg-primary-foreground/20" />
                    <div>
                      <p className="text-xs sm:text-sm opacity-80 mb-1">Perte annuelle</p>
                      <p className="text-3xl sm:text-4xl font-bold">
                        {hasData ? formatCurrency(results.annualCost) : "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Potential Savings */}
                <div 
                  className="p-5 sm:p-6 rounded-2xl border-2 border-success/30"
                  style={{ background: "linear-gradient(135deg, hsl(162 72% 41% / 0.05) 0%, hsl(162 72% 41% / 0.1) 100%)" }}
                >
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-success" />
                    </div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">
                      Économies ({rawInputs.automationPotential}% automatisation)
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">Heures économisées</p>
                      <p className="text-xl sm:text-2xl font-bold gradient-text">
                        {hasData ? formatNumber(results.potentialSavingsHours) : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1">Euros économisés</p>
                      <p className="text-xl sm:text-2xl font-bold gradient-text">
                        {hasData ? formatCurrency(results.potentialSavingsCost) : "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Math Transparency Accordion */}
                {hasData && (
                  <div className="border border-border rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowFormula(!showFormula)}
                      className="w-full px-4 py-3.5 flex items-center justify-between text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      <span>Transparence des calculs</span>
                      {showFormula ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                    {showFormula && (
                      <div className="px-4 py-3 bg-secondary/30 text-xs sm:text-sm text-muted-foreground border-t border-border space-y-2">
                        <p>
                          <strong>Exécutions annuelles :</strong>{" "}
                          {inputs.frequencyType === "day"
                            ? `${inputs.frequencyValue} × ${inputs.workingDays} jours × 52 semaines = ${formatNumber(inputs.frequencyValue * inputs.workingDays * 52)}`
                            : `${inputs.frequencyValue} × 52 semaines = ${formatNumber(inputs.frequencyValue * 52)}`}
                        </p>
                        <p>
                          <strong>Minutes annuelles :</strong> {inputs.teamSize} × {inputs.timePerTask} min × {formatNumber(inputs.frequencyType === "day" ? inputs.frequencyValue * inputs.workingDays * 52 : inputs.frequencyValue * 52)} = {formatNumber(results.annualHours * 60)}
                        </p>
                        <p>
                          <strong>Heures annuelles :</strong> {formatNumber(results.annualHours * 60)} ÷ 60 = {formatNumber(results.annualHours)}h
                        </p>
                        <p>
                          <strong>Coût annuel :</strong> {formatNumber(results.annualHours)}h × {inputs.hourlyCost}€ = {formatCurrency(results.annualCost)}
                        </p>
                        <p>
                          <strong>Économies :</strong> {formatCurrency(results.annualCost)} × {inputs.automationPotential}% = {formatCurrency(results.potentialSavingsCost)}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Calculator;
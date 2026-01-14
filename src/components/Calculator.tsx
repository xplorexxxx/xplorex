import { useState, useEffect, useMemo } from "react";
import { RotateCcw, Share2, ChevronDown, ChevronUp, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

const defaultInputs: CalculatorInputs = {
  teamSize: 3,
  timePerTask: 10,
  frequencyType: "day",
  frequencyValue: 10,
  workingDays: 5,
  hourlyCost: 40,
  automationPotential: 40,
};

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

const Calculator = ({ onResultsChange }: CalculatorProps) => {
  const [inputs, setInputs] = useState<CalculatorInputs>(() => {
    // Check for URL params
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const teamSize = params.get("ts");
      const timePerTask = params.get("tpt");
      const frequencyType = params.get("ft");
      const frequencyValue = params.get("fv");
      const workingDays = params.get("wd");
      const hourlyCost = params.get("hc");
      const automationPotential = params.get("ap");

      if (teamSize || timePerTask || frequencyType || frequencyValue || workingDays || hourlyCost || automationPotential) {
        return {
          teamSize: teamSize ? Math.min(500, Math.max(1, parseInt(teamSize))) : defaultInputs.teamSize,
          timePerTask: timePerTask ? Math.min(240, Math.max(1, parseInt(timePerTask))) : defaultInputs.timePerTask,
          frequencyType: frequencyType === "week" ? "week" : "day",
          frequencyValue: frequencyValue ? Math.min(500, Math.max(1, parseInt(frequencyValue))) : defaultInputs.frequencyValue,
          workingDays: workingDays ? Math.min(7, Math.max(1, parseInt(workingDays))) : defaultInputs.workingDays,
          hourlyCost: hourlyCost ? Math.min(300, Math.max(10, parseInt(hourlyCost))) : defaultInputs.hourlyCost,
          automationPotential: automationPotential ? Math.min(90, Math.max(10, parseInt(automationPotential))) : defaultInputs.automationPotential,
        };
      }
    }
    return defaultInputs;
  });

  const [showFormula, setShowFormula] = useState(false);

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

  const handleInputChange = (field: keyof CalculatorInputs, value: number | string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setInputs(defaultInputs);
    // Clear URL params
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", window.location.pathname);
    }
  };

  const handleShare = async () => {
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
  };

  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

  return (
    <section id="calculator" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Calculez votre perte de ROI
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Entrez vos chiffres ci-dessous pour voir combien de temps et d'argent votre équipe perd chaque année sur des tâches répétitives.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 lg:p-10">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Inputs Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Vos entrées</h3>

              {/* Team Size */}
              <div>
                <label className="label-text">Taille de l'équipe concernée</label>
                <input
                  type="number"
                  value={inputs.teamSize}
                  onChange={(e) => handleInputChange("teamSize", clamp(parseInt(e.target.value) || 1, 1, 500))}
                  min={1}
                  max={500}
                  className="input-field"
                />
                <p className="helper-text">Combien de personnes effectuent cette tâche ? (1-500)</p>
              </div>

              {/* Time per Task */}
              <div>
                <label className="label-text">Temps par tâche (minutes)</label>
                <input
                  type="number"
                  value={inputs.timePerTask}
                  onChange={(e) => handleInputChange("timePerTask", clamp(parseInt(e.target.value) || 1, 1, 240))}
                  min={1}
                  max={240}
                  className="input-field"
                />
                <p className="helper-text">Combien de temps faut-il pour terminer une fois ? (1-240 min)</p>
              </div>

              {/* Frequency Type */}
              <div>
                <label className="label-text">Fréquence</label>
                <div className="flex gap-3">
                  <select
                    value={inputs.frequencyType}
                    onChange={(e) => handleInputChange("frequencyType", e.target.value)}
                    className="input-field flex-1"
                  >
                    <option value="day">Fois par jour</option>
                    <option value="week">Fois par semaine</option>
                  </select>
                  <input
                    type="number"
                    value={inputs.frequencyValue}
                    onChange={(e) => handleInputChange("frequencyValue", clamp(parseInt(e.target.value) || 1, 1, 500))}
                    min={1}
                    max={500}
                    className="input-field w-24"
                  />
                </div>
                <p className="helper-text">À quelle fréquence cette tâche est-elle effectuée ? (1-500)</p>
              </div>

              {/* Working Days */}
              <div>
                <label className="label-text">Jours de travail par semaine</label>
                <input
                  type="number"
                  value={inputs.workingDays}
                  onChange={(e) => handleInputChange("workingDays", clamp(parseInt(e.target.value) || 1, 1, 7))}
                  min={1}
                  max={7}
                  className="input-field"
                />
                <p className="helper-text">Jours de travail de votre équipe (1-7)</p>
              </div>

              {/* Hourly Cost */}
              <div>
                <label className="label-text">Coût horaire moyen chargé (€)</label>
                <input
                  type="number"
                  value={inputs.hourlyCost}
                  onChange={(e) => handleInputChange("hourlyCost", clamp(parseInt(e.target.value) || 10, 10, 300))}
                  min={10}
                  max={300}
                  className="input-field"
                />
                <p className="helper-text">Incluez salaire, avantages, charges (10€-300€)</p>
              </div>

              {/* Automation Potential Slider */}
              <div>
                <label className="label-text flex items-center gap-2">
                  Potentiel d'automatisation estimé
                  <span className="text-accent font-semibold">{inputs.automationPotential}%</span>
                </label>
                <input
                  type="range"
                  value={inputs.automationPotential}
                  onChange={(e) => handleInputChange("automationPotential", parseInt(e.target.value))}
                  min={10}
                  max={90}
                  step={5}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>10%</span>
                  <span>90%</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button onClick={handleReset} className="btn-secondary flex-1 text-sm">
                  <RotateCcw className="w-4 h-4" />
                  Réinitialiser
                </button>
                <button onClick={handleShare} className="btn-secondary flex-1 text-sm">
                  <Share2 className="w-4 h-4" />
                  Partager
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Vos résultats</h3>

              {/* Main Results */}
              <div className="p-6 rounded-2xl bg-primary text-primary-foreground">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm opacity-80 mb-1">Heures perdues par an</p>
                    <p className="text-4xl font-bold">{formatNumber(results.annualHours)}</p>
                  </div>
                  <div className="h-px bg-primary-foreground/20" />
                  <div>
                    <p className="text-sm opacity-80 mb-1">Coût perdu par an</p>
                    <p className="text-4xl font-bold">{formatCurrency(results.annualCost)}</p>
                  </div>
                </div>
              </div>

              {/* Potential Savings */}
              <div 
                className="p-6 rounded-2xl border-2 border-accent/30"
                style={{ background: "linear-gradient(135deg, hsl(162 72% 41% / 0.05) 0%, hsl(162 72% 41% / 0.1) 100%)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Info className="w-4 h-4 text-accent" />
                  </div>
                  <p className="font-semibold text-foreground">Économies potentielles ({inputs.automationPotential}% d'automatisation)</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Heures économisées</p>
                    <p className="text-2xl font-bold gradient-text">{formatNumber(results.potentialSavingsHours)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Euros économisés</p>
                    <p className="text-2xl font-bold gradient-text">{formatCurrency(results.potentialSavingsCost)}</p>
                  </div>
                </div>
              </div>

              {/* Math Transparency Accordion */}
              <div className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowFormula(!showFormula)}
                  className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                >
                  <span>Transparence des calculs</span>
                  {showFormula ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                {showFormula && (
                  <div className="px-4 py-3 bg-secondary/30 text-sm text-muted-foreground border-t border-border space-y-2">
                    <p>
                      <strong>Exécutions annuelles :</strong>{" "}
                      {inputs.frequencyType === "day"
                        ? `${inputs.frequencyValue} × ${inputs.workingDays} jours × 52 semaines = ${formatNumber(inputs.frequencyValue * inputs.workingDays * 52)}`
                        : `${inputs.frequencyValue} × 52 semaines = ${formatNumber(inputs.frequencyValue * 52)}`}
                    </p>
                    <p>
                      <strong>Minutes annuelles :</strong> {inputs.teamSize} personnes × {inputs.timePerTask} min × {formatNumber(inputs.frequencyType === "day" ? inputs.frequencyValue * inputs.workingDays * 52 : inputs.frequencyValue * 52)} exécutions = {formatNumber(results.annualHours * 60)}
                    </p>
                    <p>
                      <strong>Heures annuelles :</strong> {formatNumber(results.annualHours * 60)} min ÷ 60 = {formatNumber(results.annualHours)} heures
                    </p>
                    <p>
                      <strong>Coût annuel :</strong> {formatNumber(results.annualHours)} heures × {inputs.hourlyCost}€ = {formatCurrency(results.annualCost)}
                    </p>
                    <p>
                      <strong>Économies potentielles :</strong> {formatCurrency(results.annualCost)} × {inputs.automationPotential}% = {formatCurrency(results.potentialSavingsCost)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;

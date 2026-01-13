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
        title: "Link copied!",
        description: "Share this link to show your calculation.",
      });
    } catch {
      toast({
        title: "Couldn't copy",
        description: "Please copy the URL manually from your browser.",
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
            Calculate Your ROI Leak
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Enter your numbers below to see how much time and money your team loses to repetitive tasks each year.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 lg:p-10">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Inputs Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Your Inputs</h3>

              {/* Team Size */}
              <div>
                <label className="label-text">Team size affected</label>
                <input
                  type="number"
                  value={inputs.teamSize}
                  onChange={(e) => handleInputChange("teamSize", clamp(parseInt(e.target.value) || 1, 1, 500))}
                  min={1}
                  max={500}
                  className="input-field"
                />
                <p className="helper-text">How many people perform this task? (1-500)</p>
              </div>

              {/* Time per Task */}
              <div>
                <label className="label-text">Time per task (minutes)</label>
                <input
                  type="number"
                  value={inputs.timePerTask}
                  onChange={(e) => handleInputChange("timePerTask", clamp(parseInt(e.target.value) || 1, 1, 240))}
                  min={1}
                  max={240}
                  className="input-field"
                />
                <p className="helper-text">How long does it take to complete once? (1-240 min)</p>
              </div>

              {/* Frequency Type */}
              <div>
                <label className="label-text">Frequency</label>
                <div className="flex gap-3">
                  <select
                    value={inputs.frequencyType}
                    onChange={(e) => handleInputChange("frequencyType", e.target.value)}
                    className="input-field flex-1"
                  >
                    <option value="day">Times per day</option>
                    <option value="week">Times per week</option>
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
                <p className="helper-text">How often is this task performed? (1-500)</p>
              </div>

              {/* Working Days */}
              <div>
                <label className="label-text">Working days per week</label>
                <input
                  type="number"
                  value={inputs.workingDays}
                  onChange={(e) => handleInputChange("workingDays", clamp(parseInt(e.target.value) || 1, 1, 7))}
                  min={1}
                  max={7}
                  className="input-field"
                />
                <p className="helper-text">Your team's working days (1-7)</p>
              </div>

              {/* Hourly Cost */}
              <div>
                <label className="label-text">Average fully-loaded hourly cost (€)</label>
                <input
                  type="number"
                  value={inputs.hourlyCost}
                  onChange={(e) => handleInputChange("hourlyCost", clamp(parseInt(e.target.value) || 10, 10, 300))}
                  min={10}
                  max={300}
                  className="input-field"
                />
                <p className="helper-text">Include salary, benefits, overhead (€10-300)</p>
              </div>

              {/* Automation Potential Slider */}
              <div>
                <label className="label-text flex items-center gap-2">
                  Estimated automation potential
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
                  Reset
                </button>
                <button onClick={handleShare} className="btn-secondary flex-1 text-sm">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Your Results</h3>

              {/* Main Results */}
              <div className="p-6 rounded-2xl bg-primary text-primary-foreground">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm opacity-80 mb-1">Hours wasted per year</p>
                    <p className="text-4xl font-bold">{formatNumber(results.annualHours)}</p>
                  </div>
                  <div className="h-px bg-primary-foreground/20" />
                  <div>
                    <p className="text-sm opacity-80 mb-1">Cost wasted per year</p>
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
                  <p className="font-semibold text-foreground">Potential Savings ({inputs.automationPotential}% automation)</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hours saved</p>
                    <p className="text-2xl font-bold gradient-text">{formatNumber(results.potentialSavingsHours)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Euros saved</p>
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
                  <span>Math transparency</span>
                  {showFormula ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                {showFormula && (
                  <div className="px-4 py-3 bg-secondary/30 text-sm text-muted-foreground border-t border-border space-y-2">
                    <p>
                      <strong>Annual runs:</strong>{" "}
                      {inputs.frequencyType === "day"
                        ? `${inputs.frequencyValue} × ${inputs.workingDays} days × 52 weeks = ${formatNumber(inputs.frequencyValue * inputs.workingDays * 52)}`
                        : `${inputs.frequencyValue} × 52 weeks = ${formatNumber(inputs.frequencyValue * 52)}`}
                    </p>
                    <p>
                      <strong>Annual minutes:</strong> {inputs.teamSize} people × {inputs.timePerTask} min × {formatNumber(inputs.frequencyType === "day" ? inputs.frequencyValue * inputs.workingDays * 52 : inputs.frequencyValue * 52)} runs = {formatNumber(results.annualHours * 60)}
                    </p>
                    <p>
                      <strong>Annual hours:</strong> {formatNumber(results.annualHours * 60)} min ÷ 60 = {formatNumber(results.annualHours)} hours
                    </p>
                    <p>
                      <strong>Annual cost:</strong> {formatNumber(results.annualHours)} hours × €{inputs.hourlyCost} = {formatCurrency(results.annualCost)}
                    </p>
                    <p>
                      <strong>Potential savings:</strong> {formatCurrency(results.annualCost)} × {inputs.automationPotential}% = {formatCurrency(results.potentialSavingsCost)}
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

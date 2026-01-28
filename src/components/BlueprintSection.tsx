import { Shield, Zap, RefreshCw, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

interface Blueprint {
  id: string;
  title: string;
  problem: string;
  system: string[];
  safeguards: string[];
  outcome: string;
  timeToValue: string;
  version: string;
  tested: string;
  errorRate: string;
}

const blueprints: Blueprint[] = [
  {
    id: "BP-001",
    title: "Auto-Reconciliation Comptable",
    problem: "Rapprochements bancaires manuels — 12h/semaine perdues en copier-coller et vérifications.",
    system: ["n8n", "OCR", "Airtable", "API Bancaire"],
    safeguards: ["Validation humaine > 5k€", "Retry automatique x3", "Alerte Slack si écart > 2%"],
    outcome: "12h/semaine récupérées • Erreurs ÷10",
    timeToValue: "Déployé en 5 jours",
    version: "v2.3",
    tested: "14 000 transactions",
    errorRate: "< 0.02%"
  },
  {
    id: "BP-002",
    title: "Inbox Triage Intelligent",
    problem: "Emails entrants routés manuellement — délai de réponse moyen 4h, erreurs d'attribution.",
    system: ["LangGraph", "GPT-4", "Gmail API", "CRM Webhook"],
    safeguards: ["Fallback manuel si confiance < 80%", "Log structuré", "Dashboard temps réel"],
    outcome: "0 intervention manuelle • Réponse < 15min",
    timeToValue: "Déployé en 7 jours",
    version: "v1.8",
    tested: "8 500 emails",
    errorRate: "< 0.5%"
  },
  {
    id: "BP-003",
    title: "Pipeline RevOps Self-Healing",
    problem: "Données CRM incohérentes — doublons, champs vides, deals orphelins qui faussent les forecasts.",
    system: ["n8n", "Supabase", "HubSpot API", "RAG Validator"],
    safeguards: ["Circuit breaker si > 50 corrections/h", "Rollback automatique", "Audit trail complet"],
    outcome: "Données CRM fiables à 99.8% • 6h/semaine ops",
    timeToValue: "Déployé en 10 jours",
    version: "v3.1",
    tested: "42 000 records",
    errorRate: "< 0.1%"
  }
];

const BlueprintCard = ({ blueprint }: { blueprint: Blueprint }) => {
  return (
    <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300 group">
      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-mono text-emerald-400">Opérationnel</span>
      </div>

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-zinc-500">{blueprint.id}</span>
          <span className="text-xs font-mono text-zinc-600">•</span>
          <span className="text-xs font-mono text-zinc-500">{blueprint.version}</span>
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
          {blueprint.title}
        </h3>
      </div>

      {/* Problem */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="h-3 w-3 text-amber-500" />
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Problème</span>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">{blueprint.problem}</p>
      </div>

      {/* System */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-3 w-3 text-blue-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Système</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {blueprint.system.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Safeguards */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-3 w-3 text-violet-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Safeguards</span>
        </div>
        <ul className="space-y-1">
          {blueprint.safeguards.map((safeguard) => (
            <li key={safeguard} className="flex items-start gap-2 text-xs text-zinc-400">
              <span className="text-violet-400 mt-0.5">→</span>
              <span className="font-mono">{safeguard}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Outcome */}
      <div className="mb-4 p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600">Résultat</span>
        </div>
        <p className="text-sm font-semibold text-emerald-400">{blueprint.outcome}</p>
      </div>

      {/* Time to Value */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-zinc-500" />
          <span className="text-xs font-mono text-zinc-400">{blueprint.timeToValue}</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
          <span>Testé sur {blueprint.tested}</span>
          <span className="text-emerald-500">Erreur {blueprint.errorRate}</span>
        </div>
      </div>
    </div>
  );
};

const BlueprintSection = () => {
  return (
    <section id="blueprints" className="py-24 md:py-32 bg-zinc-950">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full mb-4">
            <RefreshCw className="h-3 w-3 text-emerald-400" />
            <span className="text-xs font-mono text-zinc-400">Blueprints éprouvés</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Pas de promesses. Des systèmes.
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Chaque blueprint est un workflow testé en production. 
            Avec gouvernance, monitoring, et modes de repli.
          </p>
        </div>

        {/* Blueprint Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blueprints.map((blueprint) => (
            <BlueprintCard key={blueprint.id} blueprint={blueprint} />
          ))}
        </div>

        {/* Technical Note */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-zinc-600">
            Tous les blueprints incluent : logs structurés • alertes temps réel • documentation technique • support 90 jours
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlueprintSection;

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const BREVO_SENDER_EMAIL = "contact@xplorex.io";
const BREVO_SENDER_NAME = "ROI Leak Calculator";
const RECIPIENT_EMAIL = "contact@xplorex.io";
const ICLOSED_BOOKING_LINK = "https://app.iclosed.io/e/raphaelgenin/audit-offert-30-minutes";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReportRequest {
  email: string;
  inputs: {
    teamSize: number;
    timePerTask: number;
    frequencyType: "day" | "week";
    frequencyValue: number;
    workingDays: number;
    hourlyCost: number;
    automationPotential: number;
  };
  results: {
    annualHours: number;
    annualCost: number;
    potentialSavingsHours: number;
    potentialSavingsCost: number;
  };
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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY is not set");
      throw new Error("Email service not configured");
    }

    const { email, inputs, results }: ReportRequest = await req.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate inputs
    if (!inputs || !results) {
      return new Response(
        JSON.stringify({ error: "Missing calculator data" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Calculate intermediate values for transparency
    const annualRuns = inputs.frequencyType === "day"
      ? inputs.frequencyValue * inputs.workingDays * 52
      : inputs.frequencyValue * 52;
    const annualMinutes = inputs.teamSize * inputs.timePerTask * annualRuns;

    const frequencyLabel = inputs.frequencyType === "day" ? "Fois par jour" : "Fois par semaine";

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 30px; border-radius: 12px; margin-bottom: 24px; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { margin: 8px 0 0 0; opacity: 0.9; }
    .section { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .section h2 { margin: 0 0 16px 0; font-size: 18px; color: #1e293b; }
    .data-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
    .data-row:last-child { border-bottom: none; }
    .data-label { color: #64748b; }
    .data-value { font-weight: 600; color: #1e293b; }
    .results-box { background: #6366f1; color: white; padding: 24px; border-radius: 12px; margin-bottom: 20px; }
    .results-box h2 { margin: 0 0 16px 0; font-size: 18px; }
    .result-item { margin-bottom: 16px; }
    .result-item:last-child { margin-bottom: 0; }
    .result-label { opacity: 0.8; font-size: 14px; }
    .result-value { font-size: 28px; font-weight: bold; }
    .savings-box { background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.2)); border: 2px solid rgba(34, 197, 94, 0.3); padding: 20px; border-radius: 12px; margin-bottom: 20px; }
    .savings-box h2 { margin: 0 0 12px 0; font-size: 18px; color: #166534; }
    .savings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .savings-item .label { font-size: 14px; color: #64748b; }
    .savings-item .value { font-size: 24px; font-weight: bold; color: #166534; }
    .math-section { background: #fefce8; border: 1px solid #fef08a; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .math-section h2 { margin: 0 0 12px 0; font-size: 16px; color: #854d0e; }
    .math-section p { margin: 8px 0; font-size: 14px; color: #713f12; }
    .math-section code { background: #fef9c3; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
    .cta-box { background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px; border-radius: 12px; text-align: center; margin-top: 30px; }
    .cta-box h2 { margin: 0 0 12px 0; color: white; font-size: 20px; }
    .cta-box p { margin: 0 0 16px 0; color: rgba(255,255,255,0.9); }
    .cta-button { display: inline-block; background: white; color: #6366f1; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; }
    .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 ROI Leak Report</h1>
    <p>Analyse de votre perte de productivité</p>
  </div>

  <div class="section">
    <h2>📊 Vos entrées</h2>
    <div class="data-row">
      <span class="data-label">Taille de l'équipe concernée</span>
      <span class="data-value">${inputs.teamSize} personnes</span>
    </div>
    <div class="data-row">
      <span class="data-label">Temps par tâche</span>
      <span class="data-value">${inputs.timePerTask} minutes</span>
    </div>
    <div class="data-row">
      <span class="data-label">Fréquence</span>
      <span class="data-value">${frequencyLabel} : ${inputs.frequencyValue}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Jours de travail par semaine</span>
      <span class="data-value">${inputs.workingDays} jours</span>
    </div>
    <div class="data-row">
      <span class="data-label">Coût horaire moyen chargé</span>
      <span class="data-value">${formatCurrency(inputs.hourlyCost)}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Potentiel d'automatisation</span>
      <span class="data-value">${inputs.automationPotential}%</span>
    </div>
  </div>

  <div class="results-box">
    <h2>🚨 Résultats</h2>
    <div class="result-item">
      <div class="result-label">Heures perdues par an</div>
      <div class="result-value">${formatNumber(results.annualHours)} heures</div>
    </div>
    <div class="result-item">
      <div class="result-label">Perte annuelle</div>
      <div class="result-value">${formatCurrency(results.annualCost)}</div>
    </div>
  </div>

  <div class="savings-box">
    <h2>💡 Économies potentielles (${inputs.automationPotential}% automatisation)</h2>
    <div class="savings-grid">
      <div class="savings-item">
        <div class="label">Heures économisées</div>
        <div class="value">${formatNumber(results.potentialSavingsHours)}</div>
      </div>
      <div class="savings-item">
        <div class="label">Euros économisés</div>
        <div class="value">${formatCurrency(results.potentialSavingsCost)}</div>
      </div>
    </div>
  </div>

  <div class="math-section">
    <h2>🧮 Transparence des calculs</h2>
    <p><strong>Formule exécutions annuelles :</strong><br>
    ${inputs.frequencyType === "day" 
      ? `<code>${inputs.frequencyValue} × ${inputs.workingDays} jours × 52 semaines = ${formatNumber(annualRuns)}</code>`
      : `<code>${inputs.frequencyValue} × 52 semaines = ${formatNumber(annualRuns)}</code>`
    }</p>
    <p><strong>Minutes annuelles :</strong><br>
    <code>${inputs.teamSize} personnes × ${inputs.timePerTask} min × ${formatNumber(annualRuns)} exécutions = ${formatNumber(annualMinutes)} min</code></p>
    <p><strong>Heures annuelles :</strong><br>
    <code>${formatNumber(annualMinutes)} min ÷ 60 = ${formatNumber(results.annualHours)} heures</code></p>
    <p><strong>Coût annuel :</strong><br>
    <code>${formatNumber(results.annualHours)} heures × ${inputs.hourlyCost}€ = ${formatCurrency(results.annualCost)}</code></p>
    <p><strong>Économies potentielles :</strong><br>
    <code>${formatCurrency(results.annualCost)} × ${inputs.automationPotential}% = ${formatCurrency(results.potentialSavingsCost)}</code></p>
  </div>

  <div class="cta-box">
    <h2>🎁 Prêt à récupérer ce temps ?</h2>
    <p>Réservez un audit offert de 30 minutes pour identifier vos opportunités d'automatisation.</p>
    <a href="${ICLOSED_BOOKING_LINK}" class="cta-button">Réserver mon audit offert →</a>
  </div>

  <div class="footer">
    <p>Ce rapport a été généré par ROI Leak Calculator • XPLORE X</p>
    <p>Email de contact : ${email}</p>
  </div>
</body>
</html>
    `;

    // Send email via Brevo
    console.log("Sending email to:", RECIPIENT_EMAIL);
    
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: BREVO_SENDER_NAME,
          email: BREVO_SENDER_EMAIL,
        },
        to: [{ email: RECIPIENT_EMAIL }],
        replyTo: { email: email },
        subject: `ROI Leak Report — ${formatCurrency(results.annualCost)}/an perdu — ${formatNumber(results.annualHours)}h/an`,
        htmlContent: emailHtml,
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.text();
      console.error("Brevo API error:", errorData);
      throw new Error(`Failed to send email: ${brevoResponse.status}`);
    }

    const responseData = await brevoResponse.json();
    console.log("Email sent successfully:", responseData);

    return new Response(
      JSON.stringify({ success: true, messageId: responseData.messageId }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-report function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send report" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);

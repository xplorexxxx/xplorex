import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

/**
 * SEND REPORT - Edge Function
 * 
 * This function handles the ROI Leak Calculator report sending:
 * 1. Validates Turnstile token (bot protection)
 * 2. Validates and sanitizes all inputs
 * 3. Recomputes all calculations server-side (never trust client)
 * 4. Sends email via Brevo transactional API
 * 5. Enforces rate limiting (3/hour, 30s cooldown)
 */

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");

// Email configuration
const BREVO_SENDER_EMAIL = "contact@xplorex.io";
const BREVO_SENDER_NAME = "ROI Leak Calculator";
const RECIPIENT_EMAIL = "contact@xplorex.io";
const ICLOSED_BOOKING_LINK = "https://app.iclosed.io/e/raphaelgenin/audit-offert-30-minutes";

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3;
const MIN_REQUEST_INTERVAL_MS = 30 * 1000; // 30 seconds cooldown

// In-memory rate limiting store (per IP)
const rateLimitStore = new Map<string, { count: number; windowStart: number; lastRequest: number }>();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReportRequest {
  email: string;
  turnstileToken?: string;
  inputs: {
    teamSize: number;
    timePerTask: number;
    frequencyType: string;
    frequencyValue: number;
    workingDays: number;
    hourlyCost: number;
    automationPotential: number;
  };
}

// Verify Cloudflare Turnstile token
const verifyTurnstileToken = async (token: string, ip: string): Promise<{ success: boolean; error?: string }> => {
  if (!TURNSTILE_SECRET_KEY) {
    console.warn("[send-report] TURNSTILE_SECRET_KEY not configured");
    return { success: true }; // Allow if not configured
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", TURNSTILE_SECRET_KEY);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const result = await response.json();
    console.log("[send-report] Turnstile result:", JSON.stringify(result));

    if (result.success) {
      return { success: true };
    }

    const errorCodes = result["error-codes"] || [];
    return { success: false, error: `Verification failed: ${errorCodes.join(", ") || "invalid token"}` };
  } catch (error) {
    console.error("[send-report] Turnstile verification error:", error);
    return { success: false, error: "Verification service unavailable" };
  }
};

// Sanitize string input
const sanitizeString = (input: string): string => {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, "")
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim()
    .slice(0, 200);
};

// Validate number
const validateNumber = (value: unknown, min: number, max: number): number | null => {
  const num = Number(value);
  if (isNaN(num) || !isFinite(num) || num < min || num > max) return null;
  return num;
};

// Validate integer
const validateInteger = (value: unknown, min: number, max: number): number | null => {
  const num = validateNumber(value, min, max);
  if (num === null) return null;
  return Math.floor(num);
};

// Get client IP
const getClientIP = (req: Request): string => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIP = req.headers.get("x-real-ip");
  if (realIP) return realIP;
  const cfIP = req.headers.get("cf-connecting-ip");
  if (cfIP) return cfIP;
  return "unknown";
};

// Check rate limit
const checkRateLimit = (ip: string): { allowed: boolean; retryAfter?: number; reason?: string } => {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Cleanup old entries
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now - value.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record) {
    rateLimitStore.set(ip, { count: 1, windowStart: now, lastRequest: now });
    return { allowed: true };
  }

  // Reset if window expired
  if (now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now, lastRequest: now });
    return { allowed: true };
  }

  // Cooldown check (30s between requests)
  if (now - record.lastRequest < MIN_REQUEST_INTERVAL_MS) {
    const retryAfter = Math.ceil((MIN_REQUEST_INTERVAL_MS - (now - record.lastRequest)) / 1000);
    return { allowed: false, retryAfter, reason: `Please wait ${retryAfter} seconds.` };
  }

  // Max requests check (3/hour)
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter, reason: `Rate limit exceeded. Try again in ${Math.ceil(retryAfter / 60)} minutes.` };
  }

  // Update record
  record.count++;
  record.lastRequest = now;
  rateLimitStore.set(ip, record);
  return { allowed: true };
};

// Format helpers
const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const formatNumber = (value: number): string =>
  new Intl.NumberFormat("fr-FR").format(Math.round(value));

// Main handler
const handler = async (req: Request): Promise<Response> => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP = getClientIP(req);
  console.log(`[send-report] Request from IP: ${clientIP}`);

  try {
    // ========== RATE LIMIT ==========
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      console.log(`[send-report] Rate limited: ${clientIP}`);
      return new Response(JSON.stringify({ error: rateLimitResult.reason }), {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": String(rateLimitResult.retryAfter || 60), ...corsHeaders },
      });
    }

    // Check Brevo API key
    if (!BREVO_API_KEY) {
      console.error("[send-report] BREVO_API_KEY not set");
      throw new Error("Email service not configured");
    }

    // Parse body
    let requestBody: ReportRequest;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { email, turnstileToken, inputs } = requestBody;

    // ========== TURNSTILE VERIFICATION ==========
    if (turnstileToken) {
      const turnstileResult = await verifyTurnstileToken(turnstileToken, clientIP);
      if (!turnstileResult.success) {
        console.log(`[send-report] Turnstile failed: ${turnstileResult.error}`);
        return new Response(JSON.stringify({ error: "Bot verification failed. Please refresh and try again." }), {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      console.log("[send-report] Turnstile verified");
    } else {
      console.log("[send-report] No Turnstile token, relying on rate limiting");
    }

    // ========== VALIDATE EMAIL ==========
    const sanitizedEmail = sanitizeString(email || "");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!sanitizedEmail || !emailRegex.test(sanitizedEmail) || sanitizedEmail.length > 200) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // ========== VALIDATE INPUTS ==========
    if (!inputs || typeof inputs !== "object") {
      return new Response(JSON.stringify({ error: "Missing calculator inputs" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const validationErrors: string[] = [];

    const teamSize = validateInteger(inputs.teamSize, 1, 500);
    if (teamSize === null) validationErrors.push("Team size: 1-500");

    const timePerTask = validateInteger(inputs.timePerTask, 1, 240);
    if (timePerTask === null) validationErrors.push("Time per task: 1-240 minutes");

    const frequencyType = String(inputs.frequencyType || "");
    if (!["day", "week"].includes(frequencyType)) validationErrors.push("Frequency type: day or week");

    const frequencyValue = validateInteger(inputs.frequencyValue, 1, 500);
    if (frequencyValue === null) validationErrors.push("Frequency value: 1-500");

    const workingDays = validateInteger(inputs.workingDays, 1, 7);
    if (workingDays === null) validationErrors.push("Working days: 1-7");

    const hourlyCost = validateNumber(inputs.hourlyCost, 10, 300);
    if (hourlyCost === null) validationErrors.push("Hourly cost: 10-300 EUR");

    const automationPotential = validateInteger(inputs.automationPotential, 0, 90);
    if (automationPotential === null) validationErrors.push("Automation potential: 0-90%");

    if (validationErrors.length > 0) {
      return new Response(JSON.stringify({ error: "Invalid input data", details: validationErrors }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // ========== COMPUTE RESULTS SERVER-SIDE ==========
    const annualRuns = frequencyType === "day" ? frequencyValue! * workingDays! * 52 : frequencyValue! * 52;
    const annualMinutes = teamSize! * timePerTask! * annualRuns;
    const annualHours = annualMinutes / 60;
    const annualCost = annualHours * hourlyCost!;
    const potentialSavingsHours = annualHours * (automationPotential! / 100);
    const potentialSavingsCost = annualCost * (automationPotential! / 100);

    console.log(`[send-report] Computed: ${annualHours.toFixed(1)}h, ${formatCurrency(annualCost)}`);

    const frequencyLabel = frequencyType === "day" ? "Fois par jour" : "Fois par semaine";

    // ========== BUILD EMAIL HTML ==========
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
      <span class="data-value">${teamSize} personnes</span>
    </div>
    <div class="data-row">
      <span class="data-label">Temps par tâche</span>
      <span class="data-value">${timePerTask} minutes</span>
    </div>
    <div class="data-row">
      <span class="data-label">Fréquence</span>
      <span class="data-value">${frequencyLabel} : ${frequencyValue}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Jours de travail par semaine</span>
      <span class="data-value">${workingDays} jours</span>
    </div>
    <div class="data-row">
      <span class="data-label">Coût horaire moyen chargé</span>
      <span class="data-value">${formatCurrency(hourlyCost!)}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Potentiel d'automatisation</span>
      <span class="data-value">${automationPotential}%</span>
    </div>
  </div>

  <div class="results-box">
    <h2>🚨 Résultats</h2>
    <div class="result-item">
      <div class="result-label">Heures perdues par an</div>
      <div class="result-value">${formatNumber(annualHours)} heures</div>
    </div>
    <div class="result-item">
      <div class="result-label">Perte annuelle</div>
      <div class="result-value">${formatCurrency(annualCost)}</div>
    </div>
  </div>

  <div class="savings-box">
    <h2>💡 Économies potentielles (${automationPotential}% automatisation)</h2>
    <div class="savings-grid">
      <div class="savings-item">
        <div class="label">Heures économisées</div>
        <div class="value">${formatNumber(potentialSavingsHours)}</div>
      </div>
      <div class="savings-item">
        <div class="label">Euros économisés</div>
        <div class="value">${formatCurrency(potentialSavingsCost)}</div>
      </div>
    </div>
  </div>

  <div class="math-section">
    <h2>🧮 Transparence des calculs</h2>
    <p><strong>Formule exécutions annuelles :</strong><br>
    ${frequencyType === "day"
      ? `<code>${frequencyValue} × ${workingDays} jours × 52 semaines = ${formatNumber(annualRuns)}</code>`
      : `<code>${frequencyValue} × 52 semaines = ${formatNumber(annualRuns)}</code>`
    }</p>
    <p><strong>Minutes annuelles :</strong><br>
    <code>${teamSize} personnes × ${timePerTask} min × ${formatNumber(annualRuns)} exécutions = ${formatNumber(annualMinutes)} min</code></p>
    <p><strong>Heures annuelles :</strong><br>
    <code>${formatNumber(annualMinutes)} min ÷ 60 = ${formatNumber(annualHours)} heures</code></p>
    <p><strong>Coût annuel :</strong><br>
    <code>${formatNumber(annualHours)} heures × ${hourlyCost}€ = ${formatCurrency(annualCost)}</code></p>
    <p><strong>Économies potentielles :</strong><br>
    <code>${formatCurrency(annualCost)} × ${automationPotential}% = ${formatCurrency(potentialSavingsCost)}</code></p>
  </div>

  <div class="cta-box">
    <h2>🎁 Prêt à récupérer ce temps ?</h2>
    <p>Réservez un audit offert de 30 minutes pour identifier vos opportunités d'automatisation.</p>
    <a href="${ICLOSED_BOOKING_LINK}" class="cta-button">Réserver mon audit offert →</a>
  </div>

  <div class="footer">
    <p>Ce rapport a été généré par ROI Leak Calculator • XPLORE X</p>
    <p>Email de contact : ${sanitizedEmail}</p>
  </div>
</body>
</html>
    `;

    // ========== SEND EMAIL VIA BREVO ==========
    console.log(`[send-report] Sending email to: ${RECIPIENT_EMAIL}`);

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
        to: [{ email: RECIPIENT_EMAIL }],
        replyTo: { email: sanitizedEmail },
        subject: `ROI Leak Report — ${formatCurrency(annualCost)}/an perdu — ${formatNumber(annualHours)}h/an`,
        htmlContent: emailHtml,
      }),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      console.error("[send-report] Brevo error:", errorText);
      throw new Error(`Email service error: ${brevoResponse.status}`);
    }

    const brevoData = await brevoResponse.json();
    console.log("[send-report] Email sent:", brevoData);

    return new Response(JSON.stringify({ success: true, messageId: brevoData.messageId }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("[send-report] Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to send report" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);

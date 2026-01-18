import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");
const BREVO_SENDER_EMAIL = "contact@xplorex.io";
const BREVO_SENDER_NAME = "ROI Leak Calculator";
const RECIPIENT_EMAIL = "contact@xplorex.io";
const ICLOSED_BOOKING_LINK = "https://app.iclosed.io/e/raphaelgenin/audit-offert-30-minutes";

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3;
const MIN_REQUEST_INTERVAL_MS = 30 * 1000; // 30 seconds between requests (cooldown)

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
  results?: {
    annualHours: number;
    annualCost: number;
    potentialSavingsHours: number;
    potentialSavingsCost: number;
  };
}

// Verify Cloudflare Turnstile token
const verifyTurnstileToken = async (token: string, ip: string): Promise<{ success: boolean; error?: string }> => {
  if (!TURNSTILE_SECRET_KEY) {
    console.warn("[send-report] TURNSTILE_SECRET_KEY not configured, skipping verification");
    return { success: true }; // Allow if not configured (for development)
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', TURNSTILE_SECRET_KEY);
    formData.append('response', token);
    formData.append('remoteip', ip);

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const result = await response.json();
    console.log("[send-report] Turnstile verification result:", JSON.stringify(result));

    if (result.success) {
      return { success: true };
    } else {
      const errorCodes = result['error-codes'] || [];
      return { 
        success: false, 
        error: `Bot verification failed: ${errorCodes.join(', ') || 'invalid token'}` 
      };
    }
  } catch (error) {
    console.error("[send-report] Turnstile verification error:", error);
    return { success: false, error: "Bot verification service unavailable" };
  }
};

// Sanitize string input - remove HTML tags and trim
const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&[^;]+;/g, '') // Remove HTML entities
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .trim()
    .slice(0, 200); // Limit length to 200 chars
};

// Validate and sanitize number input
const validateNumber = (value: unknown, min: number, max: number): number | null => {
  const num = Number(value);
  if (isNaN(num) || !isFinite(num) || num < min || num > max) {
    return null;
  }
  return num;
};

// Validate integer
const validateInteger = (value: unknown, min: number, max: number): number | null => {
  const num = validateNumber(value, min, max);
  if (num === null) return null;
  return Math.floor(num);
};

// Get client IP from request
const getClientIP = (req: Request): string => {
  // Check various headers for the real IP
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  const cfConnectingIP = req.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  // Fallback to a generic identifier
  return 'unknown';
};

// Check rate limit for an IP
const checkRateLimit = (ip: string): { allowed: boolean; retryAfter?: number; reason?: string } => {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Clean up old entries periodically
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now - value.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record) {
    // First request from this IP
    rateLimitStore.set(ip, { count: 1, windowStart: now, lastRequest: now });
    return { allowed: true };
  }

  // Check if window has expired
  if (now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    // Reset window
    rateLimitStore.set(ip, { count: 1, windowStart: now, lastRequest: now });
    return { allowed: true };
  }

  // Check cooldown between requests (30 seconds)
  if (now - record.lastRequest < MIN_REQUEST_INTERVAL_MS) {
    const retryAfter = Math.ceil((MIN_REQUEST_INTERVAL_MS - (now - record.lastRequest)) / 1000);
    return { 
      allowed: false, 
      retryAfter, 
      reason: `Please wait ${retryAfter} seconds before sending another report.` 
    };
  }

  // Check max requests per window (3 per hour)
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);
    const minutesRemaining = Math.ceil(retryAfter / 60);
    return { 
      allowed: false, 
      retryAfter, 
      reason: `Rate limit exceeded. Maximum ${MAX_REQUESTS_PER_WINDOW} reports per hour. Try again in ${minutesRemaining} minutes.` 
    };
  }

  // Update record
  record.count++;
  record.lastRequest = now;
  rateLimitStore.set(ip, record);
  return { allowed: true };
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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP = getClientIP(req);
  console.log(`[send-report] Request from IP: ${clientIP}`);

  try {
    // ==========================================
    // CHECK RATE LIMIT FIRST
    // ==========================================
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      console.log(`[send-report] Rate limited IP: ${clientIP}, reason: ${rateLimitResult.reason}`);
      return new Response(
        JSON.stringify({ error: rateLimitResult.reason }),
        { 
          status: 429, 
          headers: { 
            "Content-Type": "application/json", 
            "Retry-After": String(rateLimitResult.retryAfter || 60),
            ...corsHeaders 
          } 
        }
      );
    }

    if (!BREVO_API_KEY) {
      console.error("[send-report] BREVO_API_KEY is not set");
      throw new Error("Email service not configured");
    }

    let requestBody: ReportRequest;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { email, turnstileToken, inputs } = requestBody;

    // ==========================================
    // VERIFY TURNSTILE TOKEN (BOT PROTECTION)
    // ==========================================
    // Turnstile token is optional - if not provided, we rely on rate limiting
    // This allows the form to work even if Turnstile fails to load (e.g., domain not configured)
    if (turnstileToken) {
      const turnstileResult = await verifyTurnstileToken(turnstileToken, clientIP);
      if (!turnstileResult.success) {
        console.log(`[send-report] Turnstile verification failed for IP: ${clientIP}, error: ${turnstileResult.error}`);
        return new Response(
          JSON.stringify({ error: turnstileResult.error || "Bot verification failed. Please try again." }),
          { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      console.log(`[send-report] Turnstile verification passed for IP: ${clientIP}`);
    } else {
      console.log(`[send-report] No Turnstile token provided from IP: ${clientIP}, relying on rate limiting`);
    }

    // ==========================================
    // VALIDATE EMAIL
    // ==========================================
    const sanitizedEmail = sanitizeString(email || '');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!sanitizedEmail || !emailRegex.test(sanitizedEmail) || sanitizedEmail.length > 200) {
      console.log(`[send-report] Invalid email: ${sanitizedEmail}`);
      return new Response(
        JSON.stringify({ error: "Invalid email address (max 200 characters)" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // ==========================================
    // VALIDATE ALL CALCULATOR INPUTS
    // ==========================================
    if (!inputs || typeof inputs !== 'object') {
      return new Response(
        JSON.stringify({ error: "Missing calculator inputs" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const validationErrors: string[] = [];

    // Validate team_size: integer 1-500
    const teamSize = validateInteger(inputs.teamSize, 1, 500);
    if (teamSize === null) {
      validationErrors.push("Team size must be an integer between 1 and 500");
    }

    // Validate time_per_task_minutes: integer 1-240
    const timePerTask = validateInteger(inputs.timePerTask, 1, 240);
    if (timePerTask === null) {
      validationErrors.push("Time per task must be an integer between 1 and 240 minutes");
    }

    // Validate frequency_type: enum ["day", "week"]
    const frequencyType = String(inputs.frequencyType || '');
    if (!['day', 'week'].includes(frequencyType)) {
      validationErrors.push("Frequency type must be 'day' or 'week'");
    }

    // Validate frequency_value: integer 1-500
    const frequencyValue = validateInteger(inputs.frequencyValue, 1, 500);
    if (frequencyValue === null) {
      validationErrors.push("Frequency value must be an integer between 1 and 500");
    }

    // Validate working_days_per_week: integer 1-7
    const workingDays = validateInteger(inputs.workingDays, 1, 7);
    if (workingDays === null) {
      validationErrors.push("Working days must be an integer between 1 and 7");
    }

    // Validate hourly_cost_eur: number 10-300
    const hourlyCost = validateNumber(inputs.hourlyCost, 10, 300);
    if (hourlyCost === null) {
      validationErrors.push("Hourly cost must be a number between 10 and 300 EUR");
    }

    // Validate automation_potential_percent: integer 0-90
    const automationPotential = validateInteger(inputs.automationPotential, 0, 90);
    if (automationPotential === null) {
      validationErrors.push("Automation potential must be an integer between 0 and 90%");
    }

    // Return all validation errors at once
    if (validationErrors.length > 0) {
      console.log(`[send-report] Validation errors: ${validationErrors.join(', ')}`);
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: validationErrors }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // ==========================================
    // RECOMPUTE ALL OUTPUTS SERVER-SIDE
    // (Do not trust client-provided results)
    // ==========================================
    const annualRuns = frequencyType === "day"
      ? frequencyValue! * workingDays! * 52
      : frequencyValue! * 52;
    
    const annualMinutes = teamSize! * timePerTask! * annualRuns;
    const annualHours = annualMinutes / 60;
    const annualCost = annualHours * hourlyCost!;
    const potentialSavingsHours = annualHours * (automationPotential! / 100);
    const potentialSavingsCost = annualCost * (automationPotential! / 100);

    console.log(`[send-report] Computed results: annualHours=${annualHours.toFixed(2)}, annualCost=${annualCost.toFixed(2)}`);

    // Use validated inputs for the email
    const validatedInputs = {
      teamSize: teamSize!,
      timePerTask: timePerTask!,
      frequencyType: frequencyType as "day" | "week",
      frequencyValue: frequencyValue!,
      workingDays: workingDays!,
      hourlyCost: hourlyCost!,
      automationPotential: automationPotential!,
    };

    const computedResults = {
      annualHours,
      annualCost,
      potentialSavingsHours,
      potentialSavingsCost,
    };

    const frequencyLabel = validatedInputs.frequencyType === "day" ? "Fois par jour" : "Fois par semaine";

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
      <span class="data-value">${validatedInputs.teamSize} personnes</span>
    </div>
    <div class="data-row">
      <span class="data-label">Temps par tâche</span>
      <span class="data-value">${validatedInputs.timePerTask} minutes</span>
    </div>
    <div class="data-row">
      <span class="data-label">Fréquence</span>
      <span class="data-value">${frequencyLabel} : ${validatedInputs.frequencyValue}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Jours de travail par semaine</span>
      <span class="data-value">${validatedInputs.workingDays} jours</span>
    </div>
    <div class="data-row">
      <span class="data-label">Coût horaire moyen chargé</span>
      <span class="data-value">${formatCurrency(validatedInputs.hourlyCost)}</span>
    </div>
    <div class="data-row">
      <span class="data-label">Potentiel d'automatisation</span>
      <span class="data-value">${validatedInputs.automationPotential}%</span>
    </div>
  </div>

  <div class="results-box">
    <h2>🚨 Résultats</h2>
    <div class="result-item">
      <div class="result-label">Heures perdues par an</div>
      <div class="result-value">${formatNumber(computedResults.annualHours)} heures</div>
    </div>
    <div class="result-item">
      <div class="result-label">Perte annuelle</div>
      <div class="result-value">${formatCurrency(computedResults.annualCost)}</div>
    </div>
  </div>

  <div class="savings-box">
    <h2>💡 Économies potentielles (${validatedInputs.automationPotential}% automatisation)</h2>
    <div class="savings-grid">
      <div class="savings-item">
        <div class="label">Heures économisées</div>
        <div class="value">${formatNumber(computedResults.potentialSavingsHours)}</div>
      </div>
      <div class="savings-item">
        <div class="label">Euros économisés</div>
        <div class="value">${formatCurrency(computedResults.potentialSavingsCost)}</div>
      </div>
    </div>
  </div>

  <div class="math-section">
    <h2>🧮 Transparence des calculs</h2>
    <p><strong>Formule exécutions annuelles :</strong><br>
    ${validatedInputs.frequencyType === "day" 
      ? `<code>${validatedInputs.frequencyValue} × ${validatedInputs.workingDays} jours × 52 semaines = ${formatNumber(annualRuns)}</code>`
      : `<code>${validatedInputs.frequencyValue} × 52 semaines = ${formatNumber(annualRuns)}</code>`
    }</p>
    <p><strong>Minutes annuelles :</strong><br>
    <code>${validatedInputs.teamSize} personnes × ${validatedInputs.timePerTask} min × ${formatNumber(annualRuns)} exécutions = ${formatNumber(annualMinutes)} min</code></p>
    <p><strong>Heures annuelles :</strong><br>
    <code>${formatNumber(annualMinutes)} min ÷ 60 = ${formatNumber(computedResults.annualHours)} heures</code></p>
    <p><strong>Coût annuel :</strong><br>
    <code>${formatNumber(computedResults.annualHours)} heures × ${validatedInputs.hourlyCost}€ = ${formatCurrency(computedResults.annualCost)}</code></p>
    <p><strong>Économies potentielles :</strong><br>
    <code>${formatCurrency(computedResults.annualCost)} × ${validatedInputs.automationPotential}% = ${formatCurrency(computedResults.potentialSavingsCost)}</code></p>
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

    // Send email via Brevo
    console.log(`[send-report] Sending email to: ${RECIPIENT_EMAIL}, reply-to: ${sanitizedEmail}`);
    
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
        replyTo: { email: sanitizedEmail },
        subject: `ROI Leak Report — ${formatCurrency(computedResults.annualCost)}/an perdu — ${formatNumber(computedResults.annualHours)}h/an`,
        htmlContent: emailHtml,
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.text();
      console.error("[send-report] Brevo API error:", errorData);
      throw new Error(`Failed to send email: ${brevoResponse.status}`);
    }

    const responseData = await brevoResponse.json();
    console.log("[send-report] Email sent successfully:", responseData);

    return new Response(
      JSON.stringify({ success: true, messageId: responseData.messageId }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("[send-report] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send report" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);

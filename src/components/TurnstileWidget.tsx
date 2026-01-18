import { useEffect, useRef, useCallback, useState } from "react";
import { Loader2, AlertTriangle, ShieldCheck } from "lucide-react";

/**
 * PRODUCTION TURNSTILE CONFIGURATION
 * 
 * IMPORTANT: You MUST configure your Turnstile site key in Cloudflare Dashboard:
 * https://dash.cloudflare.com/?to=/:account/turnstile
 * 
 * 1. Create a new Turnstile widget
 * 2. Add your production domain(s): xplorex.lovable.app (and any custom domains)
 * 3. Copy the Site Key here
 * 4. Add the Secret Key to your Supabase secrets as TURNSTILE_SECRET_KEY
 */

// PRODUCTION SITE KEY - Replace with your Cloudflare Turnstile Site Key
// This key must be configured for your published domain in Cloudflare Dashboard
const TURNSTILE_SITE_KEY = "0x4AAAAAACNQAJakize4fWyt";

export type TurnstileStatus = "loading" | "ready" | "verified" | "error" | "expired" | "unavailable";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onStatusChange?: (status: TurnstileStatus) => void;
  onError?: () => void;
  onExpire?: () => void;
  onUnavailable?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const TurnstileWidget = ({ onVerify, onStatusChange, onError, onExpire, onUnavailable }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptLoadedRef = useRef(false);
  const mountedRef = useRef(true);
  const retryCountRef = useRef(0);
  const maxRetries = 2;
  const [status, setStatus] = useState<TurnstileStatus>("loading");

  const updateStatus = useCallback((newStatus: TurnstileStatus) => {
    if (!mountedRef.current) return;
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  }, [onStatusChange]);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || !mountedRef.current) {
      console.log("[Turnstile] Container or API not ready");
      return;
    }
    
    // Remove existing widget if any
    if (widgetIdRef.current) {
      try {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      } catch (e) {
        // Ignore errors from removing non-existent widget
      }
    }

    console.log("[Turnstile] Rendering widget with site key:", TURNSTILE_SITE_KEY.substring(0, 12) + "...");
    updateStatus("ready");

    // Render new widget
    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          if (!mountedRef.current) return;
          console.log("[Turnstile] Verification successful, token received");
          updateStatus("verified");
          onVerify(token);
        },
        "error-callback": (errorCode: unknown) => {
          if (!mountedRef.current) return;
          console.error("[Turnstile] Verification error code:", errorCode);
          retryCountRef.current++;
          
          if (retryCountRef.current <= maxRetries) {
            console.log(`[Turnstile] Retrying... (${retryCountRef.current}/${maxRetries})`);
            setTimeout(() => renderWidget(), 1500);
          } else {
            console.log("[Turnstile] Max retries reached, marking as unavailable");
            updateStatus("unavailable");
            onUnavailable?.();
            onError?.();
          }
        },
        "expired-callback": () => {
          if (!mountedRef.current) return;
          console.log("[Turnstile] Token expired");
          updateStatus("expired");
          onExpire?.();
        },
        theme: "light",
        size: "normal",
        appearance: "always",
      });
      console.log("[Turnstile] Widget rendered with id:", widgetIdRef.current);
    } catch (e) {
      console.error("[Turnstile] Failed to render widget:", e);
      updateStatus("unavailable");
      onUnavailable?.();
    }
  }, [onVerify, onError, onExpire, onUnavailable, updateStatus]);

  useEffect(() => {
    mountedRef.current = true;

    // Check if Turnstile script is already loaded and API available
    if (window.turnstile) {
      console.log("[Turnstile] API already loaded, rendering widget");
      renderWidget();
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector('script[src*="turnstile"]');
    if (existingScript) {
      console.log("[Turnstile] Script tag exists, waiting for load");
      window.onTurnstileLoad = () => {
        if (mountedRef.current) renderWidget();
      };
      return;
    }

    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    console.log("[Turnstile] Loading script...");

    // Load the Turnstile script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      console.error("[Turnstile] Failed to load script");
      if (mountedRef.current) {
        updateStatus("unavailable");
        onUnavailable?.();
      }
    };

    window.onTurnstileLoad = () => {
      console.log("[Turnstile] Script loaded successfully");
      if (mountedRef.current) renderWidget();
    };

    document.head.appendChild(script);

    return () => {
      mountedRef.current = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [renderWidget, updateStatus, onUnavailable]);

  return (
    <div className="flex flex-col items-center w-full">
      {status === "loading" && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-3">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Chargement de la vérification...</span>
        </div>
      )}
      {status === "unavailable" && (
        <div className="flex items-center gap-2 text-xs text-amber-600 py-2 px-3 bg-amber-50 rounded-lg">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>Vérification indisponible — protection par limite de requêtes active</span>
        </div>
      )}
      {status === "verified" && (
        <div className="flex items-center gap-2 text-xs text-green-600 py-2 px-3 bg-green-50 rounded-lg">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span>Vérification réussie</span>
        </div>
      )}
      <div 
        ref={containerRef} 
        className="turnstile-container flex justify-center my-2"
        style={{ 
          minHeight: (status === "loading" || status === "unavailable" || status === "verified") ? "0px" : "70px",
          display: (status === "loading" || status === "unavailable" || status === "verified") ? "none" : "flex"
        }}
      />
    </div>
  );
};

export default TurnstileWidget;

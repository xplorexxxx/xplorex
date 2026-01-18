import { useEffect, useRef, useCallback, useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";

// Cloudflare Turnstile Site Key - this is safe to be public
// Get your own keys at: https://dash.cloudflare.com/?to=/:account/turnstile
// IMPORTANT: You need to add your domain(s) to the Turnstile site key configuration
const TURNSTILE_SITE_KEY = "0x4AAAAAABeB-kXvXpFn31fB";

// Cloudflare provides test keys for development:
// Always passes: 1x00000000000000000000AA
// Always fails: 2x00000000000000000000AB
// Forces interactive challenge: 3x00000000000000000000FF
const DEV_TURNSTILE_SITE_KEY = "1x00000000000000000000AA"; // Always passes for testing

// Use dev key in development/preview environments
const isDevEnvironment = window.location.hostname.includes('lovableproject.com') || 
                         window.location.hostname.includes('lovable.app') ||
                         window.location.hostname === 'localhost';

const ACTIVE_SITE_KEY = isDevEnvironment ? DEV_TURNSTILE_SITE_KEY : TURNSTILE_SITE_KEY;

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
  const retryCountRef = useRef(0);
  const maxRetries = 2;
  const [status, setStatus] = useState<TurnstileStatus>("loading");

  const updateStatus = useCallback((newStatus: TurnstileStatus) => {
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  }, [onStatusChange]);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile) {
      console.log("[Turnstile] Container or API not ready");
      return;
    }
    
    // Remove existing widget if any
    if (widgetIdRef.current) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch (e) {
        // Ignore errors from removing non-existent widget
      }
    }

    console.log("[Turnstile] Rendering widget with key:", ACTIVE_SITE_KEY.substring(0, 10) + "...");
    updateStatus("ready");

    // Render new widget
    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: ACTIVE_SITE_KEY,
        callback: (token: string) => {
          console.log("[Turnstile] Verification successful, token received");
          updateStatus("verified");
          onVerify(token);
        },
        "error-callback": (error: unknown) => {
          console.error("[Turnstile] Verification error:", error);
          retryCountRef.current++;
          
          if (retryCountRef.current <= maxRetries) {
            console.log(`[Turnstile] Retrying... (${retryCountRef.current}/${maxRetries})`);
            // Retry after a short delay
            setTimeout(() => renderWidget(), 1000);
          } else {
            console.log("[Turnstile] Max retries reached, marking as unavailable");
            updateStatus("unavailable");
            onUnavailable?.();
            onError?.();
          }
        },
        "expired-callback": () => {
          console.log("[Turnstile] Token expired");
          updateStatus("expired");
          onExpire?.();
        },
        theme: "light",
        size: "normal",
      });
    } catch (e) {
      console.error("[Turnstile] Failed to render widget:", e);
      updateStatus("unavailable");
      onUnavailable?.();
    }
  }, [onVerify, onError, onExpire, onUnavailable, updateStatus]);

  useEffect(() => {
    // Check if script is already loaded
    if (window.turnstile) {
      renderWidget();
      return;
    }

    // Check if script is already in DOM
    const existingScript = document.querySelector('script[src*="turnstile"]');
    if (existingScript && !scriptLoadedRef.current) {
      // Wait for it to load
      window.onTurnstileLoad = renderWidget;
      return;
    }

    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    // Load the Turnstile script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      console.error("[Turnstile] Failed to load script");
      updateStatus("unavailable");
      onUnavailable?.();
    };

    window.onTurnstileLoad = renderWidget;

    document.head.appendChild(script);

    return () => {
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
    <div className="flex flex-col items-center">
      {status === "loading" && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-4">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Chargement de la vérification...</span>
        </div>
      )}
      {status === "unavailable" && (
        <div className="flex items-center gap-2 text-xs text-amber-600 py-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Vérification anti-spam indisponible</span>
        </div>
      )}
      <div 
        ref={containerRef} 
        className="turnstile-container flex justify-center"
        style={{ 
          minHeight: status === "loading" || status === "unavailable" ? "0px" : "65px", 
          display: status === "loading" || status === "unavailable" ? "none" : "flex" 
        }}
      />
    </div>
  );
};

export default TurnstileWidget;

import { useEffect, useRef, useCallback, useState } from "react";
import { Loader2 } from "lucide-react";

// Cloudflare Turnstile Site Key - this is safe to be public
// Get your own keys at: https://dash.cloudflare.com/?to=/:account/turnstile
const TURNSTILE_SITE_KEY = "0x4AAAAAABeB-kXvXpFn31fB";

export type TurnstileStatus = "loading" | "ready" | "verified" | "error" | "expired";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onStatusChange?: (status: TurnstileStatus) => void;
  onError?: () => void;
  onExpire?: () => void;
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

const TurnstileWidget = ({ onVerify, onStatusChange, onError, onExpire }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptLoadedRef = useRef(false);
  const [status, setStatus] = useState<TurnstileStatus>("loading");

  const updateStatus = useCallback((newStatus: TurnstileStatus) => {
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  }, [onStatusChange]);

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile) return;
    
    // Remove existing widget if any
    if (widgetIdRef.current) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch (e) {
        // Ignore errors from removing non-existent widget
      }
    }

    updateStatus("ready");

    // Render new widget
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => {
        console.log("[Turnstile] Verification successful");
        updateStatus("verified");
        onVerify(token);
      },
      "error-callback": () => {
        console.error("[Turnstile] Verification error");
        updateStatus("error");
        onError?.();
      },
      "expired-callback": () => {
        console.log("[Turnstile] Token expired");
        updateStatus("expired");
        onExpire?.();
      },
      theme: "light",
      size: "normal",
    });
  }, [onVerify, onError, onExpire, updateStatus]);

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
  }, [renderWidget]);

  return (
    <div className="flex flex-col items-center">
      {status === "loading" && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground py-4">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Chargement de la vérification...</span>
        </div>
      )}
      <div 
        ref={containerRef} 
        className="turnstile-container flex justify-center"
        style={{ minHeight: status === "loading" ? "0px" : "65px", display: status === "loading" ? "none" : "flex" }}
      />
    </div>
  );
};

export default TurnstileWidget;

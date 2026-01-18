import { useEffect, useRef, useCallback } from "react";

// Cloudflare Turnstile Site Key - this is safe to be public
// Get your own keys at: https://dash.cloudflare.com/?to=/:account/turnstile
// Replace this with your actual site key
const TURNSTILE_SITE_KEY = "0x4AAAAAABeB-kXvXpFn31fB"; // Replace with your site key

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
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

const TurnstileWidget = ({ onVerify, onError, onExpire }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptLoadedRef = useRef(false);

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

    // Render new widget
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => {
        console.log("[Turnstile] Verification successful");
        onVerify(token);
      },
      "error-callback": () => {
        console.error("[Turnstile] Verification error");
        onError?.();
      },
      "expired-callback": () => {
        console.log("[Turnstile] Token expired");
        onExpire?.();
      },
      theme: "light",
      size: "normal",
    });
  }, [onVerify, onError, onExpire]);

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
    <div 
      ref={containerRef} 
      className="turnstile-container flex justify-center my-3"
      style={{ minHeight: "65px" }}
    />
  );
};

export default TurnstileWidget;

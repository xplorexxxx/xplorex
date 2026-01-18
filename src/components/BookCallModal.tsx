import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICLOSED_SCRIPT_SRC = "https://app.iclosed.io/assets/widget.js";
const ICLOSED_WIDGET_URL = "https://app.iclosed.io/e/raphaelgenin/audit-offert-30-minutes";

const BookCallModal = ({ isOpen, onClose }: BookCallModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Load iClosed script once
  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${ICLOSED_SCRIPT_SRC}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = ICLOSED_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Focus trap and ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus the modal
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      // Restore focus to previous element
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-xl border border-border/50 animate-in-up"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary bg-card/80 backdrop-blur-sm"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-0">
          <h3 id="modal-title" className="text-2xl font-bold text-foreground mb-2">
            🎁 Audit offert — 30 minutes
          </h3>
          <p className="text-muted-foreground">
            Réservez votre créneau pour discuter de vos opportunités d'automatisation.
          </p>
        </div>

        {/* iClosed Widget - No wrapper, direct placement */}
        <div
          className="iclosed-widget"
          data-url={ICLOSED_WIDGET_URL}
          title="🎁 Audit offert — 30 minutes"
          style={{
            width: "100%",
            height: "620px",
            background: "transparent",
            border: "none",
            boxShadow: "none",
            borderRadius: 0,
            padding: 0,
            margin: 0,
          }}
        />
      </div>
    </div>
  );
};

export default BookCallModal;

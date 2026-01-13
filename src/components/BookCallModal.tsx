import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookCallModal = ({ isOpen, onClose }: BookCallModalProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    timeWaster: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "Name and email are required.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Store in localStorage
    const submissions = JSON.parse(localStorage.getItem("bookCallSubmissions") || "[]");
    submissions.push({
      ...formData,
      submittedAt: new Date().toISOString(),
      type: "book_call",
    });
    localStorage.setItem("bookCallSubmissions", JSON.stringify(submissions));

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);
    onClose();
    navigate("/thank-you", { state: { type: "book_call", name: formData.name } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-xl border border-border/50 p-6 sm:p-8 animate-in-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold text-foreground mb-2">
          Book a Free Call
        </h3>
        <p className="text-muted-foreground mb-6">
          Let's discuss your automation opportunities. We'll get back to you within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-text">
              Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Your name"
              className="input-field"
              maxLength={100}
            />
          </div>

          <div>
            <label className="label-text">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
              placeholder="Your company"
              className="input-field"
              maxLength={100}
            />
          </div>

          <div>
            <label className="label-text">
              Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="you@company.com"
              className="input-field"
              maxLength={255}
            />
          </div>

          <div>
            <label className="label-text">Biggest time-waster</label>
            <textarea
              value={formData.timeWaster}
              onChange={(e) => setFormData((prev) => ({ ...prev, timeWaster: e.target.value }))}
              placeholder="What repetitive task costs you the most time?"
              className="input-field min-h-[100px] resize-none"
              maxLength={500}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Request a Call"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookCallModal;

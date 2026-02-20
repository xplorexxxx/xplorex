import { useState, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Phone, Calculator, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";

const Footer = lazy(() => import("@/components/Footer"));
const BookCallModal = lazy(() => import("@/components/BookCallModal"));

const departments = [
  "Fondateur / Associé",
  "Directeur de cabinet",
  "Responsable sourcing",
  "Recruteur senior",
  "Consultant indépendant",
  "Autre",
];

const Contact = () => {
  const navigate = useNavigate();
  const [isBookCallModalOpen, setIsBookCallModalOpen] = useState(false);
  const openBookCallModal = useCallback(() => setIsBookCallModalOpen(true), []);
  const closeBookCallModal = useCallback(() => setIsBookCallModalOpen(false), []);

  const [form, setForm] = useState({
    firstName: "",
    email: "",
    company: "",
    department: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/thank-you");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookCallClick={openBookCallModal} />

      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding bg-background">
          <div className="container-narrow text-center">
            <AnimatedSection>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Contact</p>
              <h1 className="font-heading text-foreground mb-6">
                Parlons de votre cabinet
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Diagnostic offert de votre stack sourcing ou échange stratégique avec un spécialiste IA recrutement.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Form + Info */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Form */}
              <AnimatedSection className="lg:col-span-3">
                <form
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-8 rounded-2xl bg-card border border-border/50"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <h2 className="text-xl font-heading text-foreground mb-6">Envoyez-nous un message</h2>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="label-text">Prénom</label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="label-text">Email professionnel</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="vous@entreprise.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="company" className="label-text">Entreprise</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={form.company}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div>
                      <label htmlFor="department" className="label-text">Département</label>
                      <select
                        id="department"
                        name="department"
                        required
                        value={form.department}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="" disabled>Sélectionnez</option>
                        {departments.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="label-text">Message <span className="text-muted-foreground font-normal">(optionnel)</span></label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="input-field resize-none"
                      placeholder="Décrivez votre cabinet : nombre de recruteurs, secteurs couverts, outils utilisés (ATS, LinkedIn Recruiter, etc.)..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    <Send className="w-4 h-4" />
                    Envoyer
                  </button>
                </form>
              </AnimatedSection>

              {/* Info */}
              <AnimatedSection className="lg:col-span-2" delay={150}>
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-card border border-border/50" style={{ boxShadow: "var(--shadow-sm)" }}>
                    <Phone className="w-5 h-5 text-primary mb-3" />
                    <h3 className="text-base font-heading text-foreground mb-2">Préférez un échange direct ?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Réservez 30 min avec un spécialiste IA recrutement pour auditer votre process de sourcing.
                    </p>
                    <button type="button" onClick={openBookCallModal} className="btn-primary text-sm py-2.5 w-full">
                      Réserver un créneau
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-card border border-border/50" style={{ boxShadow: "var(--shadow-sm)" }}>
                    <Calculator className="w-5 h-5 text-primary mb-3" />
                    <h3 className="text-base font-heading text-foreground mb-2">Diagnostic en 2 minutes</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Estimez votre potentiel d'économie avec notre calculateur ROI offert.
                    </p>
                    <a href="/#calculator" className="btn-secondary text-sm py-2.5 w-full text-center">
                      Calculer mon ROI
                    </a>
                  </div>

                  <div className="p-5 rounded-xl bg-success/5 border border-success/20">
                    <ShieldCheck className="w-5 h-5 text-success mb-2" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">Conformité RGPD native</span> · Données hébergées en UE · NDA sur demande
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {isBookCallModalOpen && (
        <Suspense fallback={null}>
          <BookCallModal isOpen={isBookCallModalOpen} onClose={closeBookCallModal} />
        </Suspense>
      )}
    </div>
  );
};

export default Contact;

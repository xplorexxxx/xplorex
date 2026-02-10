import { Link } from "react-router-dom";
import { Shield, Users, Target, Award, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import AnimatedSection from "@/components/AnimatedSection";

const leadership = [
  {
    initials: "AB",
    name: "Alexandre B.",
    role: "CEO & Fondateur",
    bio: "15 ans d'expérience en transformation digitale B2B. Ex-McKinsey, ex-Salesforce Europe.",
  },
  {
    initials: "MC",
    name: "Marie C.",
    role: "CTO",
    bio: "Architecte systèmes distribués. Spécialiste RAG et LLM sécurisés. Ex-Google Cloud.",
  },
  {
    initials: "PD",
    name: "Philippe D.",
    role: "VP Engineering",
    bio: "Expert en pipelines ML/IA conformes. Certifié ISO 27001. Ex-Datadog.",
  },
  {
    initials: "SL",
    name: "Sophie L.",
    role: "DPO & Head of Compliance",
    bio: "Juriste spécialisée RGPD et gouvernance de l'IA. Certifiée CIPP/E, CIPM.",
  },
];

const values = [
  { icon: Shield, title: "Éthique par design", description: "Chaque décision algorithmique est traçable, explicable et auditable." },
  { icon: Target, title: "ROI prédictif", description: "Nous ne promettons pas — nous mesurons. Chaque action est indexée sur un résultat." },
  { icon: Users, title: "L'Humain au centre", description: "L'IA augmente l'intelligence humaine, elle ne la remplace jamais." },
  { icon: Award, title: "Excellence opérationnelle", description: "Standards de qualité alignés SOC2, ISO 27001 et RGPD natif." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="bg-background/95 backdrop-blur-xl border-b border-border/50 sticky top-0" style={{ zIndex: 50 }}>
        <div className="container-wide flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <img src={logo} alt="XPLORE X AI Logo" className="h-8 w-8 object-contain" width={32} height={32} />
            <span className="font-heading text-xl tracking-tight">XPLORE X</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="section-padding bg-background">
          <div className="container-narrow text-center">
            <AnimatedSection>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">À propos</p>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
                Infrastructure souveraine au service de l'intelligence commerciale
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Xplore X conçoit et déploie des systèmes d'intelligence commerciale éthiques, conformes et performants 
                pour les organisations qui refusent de choisir entre innovation et gouvernance.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedSection direction="left">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-4">Notre mission</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Démocratiser l'accès à une infrastructure d'intelligence commerciale de niveau enterprise 
                    — sans compromettre la souveraineté des données ni l'éthique algorithmique.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Nous croyons qu'une IA responsable et transparente n'est pas un frein à la performance. 
                    C'est son fondement.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection direction="right">
                <div className="grid grid-cols-2 gap-4">
                  {values.map((v) => {
                    const Icon = v.icon;
                    return (
                      <div key={v.title} className="p-4 rounded-xl bg-card border border-border/50" style={{ boxShadow: "var(--shadow-sm)" }}>
                        <Icon className="w-5 h-5 text-primary mb-2" />
                        <h4 className="text-sm font-semibold text-foreground mb-1">{v.title}</h4>
                        <p className="text-xs text-muted-foreground">{v.description}</p>
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="section-padding bg-background">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Gouvernance</p>
              <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-4">
                L'équipe dirigeante
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Des experts qui mettent un visage et une responsabilité sur chaque engagement.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-reveal">
              {leadership.map((person) => (
                <AnimatedSection key={person.name}>
                  <div className="p-6 rounded-2xl bg-card border border-border/50 text-center h-full" style={{ boxShadow: "var(--shadow-sm)" }}>
                    <div className="w-20 h-20 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-navy">{person.initials}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-0.5">{person.name}</h3>
                    <p className="text-xs font-medium text-primary mb-3">{person.role}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{person.bio}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;

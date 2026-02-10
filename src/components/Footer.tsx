import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Shield, Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="section-navy">
      <div className="container-wide py-16">
        {/* Trust badges row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 pb-10 border-b border-navy-foreground/10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-foreground/5 border border-navy-foreground/10">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-navy-foreground/80">RGPD Compliant</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-foreground/5 border border-navy-foreground/10">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-navy-foreground/80">SOC2-Ready</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-foreground/5 border border-navy-foreground/10">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-xs font-medium text-navy-foreground/80">Hébergement UE</span>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="XPLORE X AI Logo" className="h-8 w-8 object-contain brightness-0 invert" />
              <span className="font-poppins font-bold italic text-lg">XPLORE X</span>
            </div>
            <p className="text-sm text-navy-foreground/60 leading-relaxed max-w-xs">
              Infrastructure d'intelligence commerciale souveraine pour les organisations qui exigent performance, éthique et conformité.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-navy-foreground/50">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-navy-foreground/60">
              <li><span className="hover:text-navy-foreground transition-colors cursor-default">Prospection IA</span></li>
              <li><span className="hover:text-navy-foreground transition-colors cursor-default">Automatisation de Workflow</span></li>
              <li><span className="hover:text-navy-foreground transition-colors cursor-default">Intelligence de Données</span></li>
              <li><span className="hover:text-navy-foreground transition-colors cursor-default">Account-Based Excellence</span></li>
            </ul>
          </div>

          {/* Trust & Governance */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-navy-foreground/50">
              Confiance & Gouvernance
            </h4>
            <ul className="space-y-2.5 text-sm text-navy-foreground/60">
              <li><span className="hover:text-navy-foreground transition-colors cursor-default">Trust Center</span></li>
              <li><span className="hover:text-navy-foreground transition-colors cursor-default">Gouvernance IA</span></li>
              <li><span className="hover:text-navy-foreground transition-colors cursor-default">Rapport ESG & Durabilité</span></li>
              <li><span className="hover:text-navy-foreground transition-colors cursor-default">Documentation de sécurité</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-navy-foreground/50">
              Mentions légales
            </h4>
            <ul className="space-y-2.5 text-sm text-navy-foreground/60">
              <li>
                <Link to="/privacy" className="hover:text-navy-foreground transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-navy-foreground transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li><span className="hover:text-navy-foreground transition-colors cursor-default">Mentions légales</span></li>
              <li>
                <Link to="/about" className="hover:text-navy-foreground transition-colors">
                  À propos & Gouvernance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-navy-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-foreground/30">
            © {new Date().getFullYear()} Xplore X · Infrastructure souveraine · Hébergement UE
          </p>
          <div className="flex items-center gap-4 text-xs text-navy-foreground/30">
            <span>ISO 27001 Aligné</span>
            <span>·</span>
            <span>RGPD & ePrivacy</span>
            <span>·</span>
            <span>SOC2-Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

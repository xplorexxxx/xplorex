import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50 bg-foreground text-background">
      <div className="container-wide">
        {/* Main Footer Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="XPLORE X AI Logo" className="h-8 w-8 object-contain brightness-0 invert" />
              <span className="font-poppins font-bold italic text-lg">XPLORE X</span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Infrastructure d'intelligence commerciale souveraine. 
              IA éthique, conformité native, résultats mesurables.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background/80">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-background/60">
              <li><span className="hover:text-background transition-colors cursor-default">Account-Based Excellence</span></li>
              <li><span className="hover:text-background transition-colors cursor-default">Intelligence prédictive</span></li>
              <li><span className="hover:text-background transition-colors cursor-default">Orchestration ABM</span></li>
              <li><span className="hover:text-background transition-colors cursor-default">Agents IA contextuels</span></li>
            </ul>
          </div>

          {/* Trust & Governance */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background/80">
              Confiance & Gouvernance
            </h4>
            <ul className="space-y-2.5 text-sm text-background/60">
              <li><span className="hover:text-background transition-colors cursor-default">Trust Center</span></li>
              <li><span className="hover:text-background transition-colors cursor-default">Gouvernance IA</span></li>
              <li><span className="hover:text-background transition-colors cursor-default">Rapport ESG & Durabilité</span></li>
              <li><span className="hover:text-background transition-colors cursor-default">Documentation de sécurité</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background/80">
              Mentions légales
            </h4>
            <ul className="space-y-2.5 text-sm text-background/60">
              <li>
                <Link to="/privacy" className="hover:text-background transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-background transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li><span className="hover:text-background transition-colors cursor-default">Mentions légales</span></li>
              <li><span className="hover:text-background transition-colors cursor-default">Politique cookies</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Xplore X · Infrastructure souveraine · Hébergement UE
          </p>
          <div className="flex items-center gap-4 text-xs text-background/40">
            <span>RGPD Compliant</span>
            <span>·</span>
            <span>SOC2-Ready</span>
            <span>·</span>
            <span>Hébergement UE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

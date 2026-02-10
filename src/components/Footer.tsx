import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Shield, Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container-wide py-16">
        {/* Trust badges row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 pb-10 border-b border-white/10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-white/80">RGPD Compliant</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-white/80">SOC2-Ready</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-xs font-medium text-white/80">Hébergement UE</span>
          </div>
        </div>

        {/* Simplified Footer Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="XPLORE X AI Logo" className="h-8 w-8 object-contain brightness-0 invert" />
              <span className="font-heading text-xl" style={{ letterSpacing: "0.03em" }}>XPLORE X</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Infrastructure d'intelligence commerciale souveraine pour les organisations qui exigent performance, éthique et conformité.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-white/50">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Calculateur ROI
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Comment ça marche
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-white/50">
              Mentions légales
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li><span className="text-white/60 cursor-default">Mentions légales</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Xplore X · Infrastructure souveraine · Hébergement UE
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
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

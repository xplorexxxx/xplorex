import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-lg text-foreground">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Calculator className="w-4 h-4 text-accent-foreground" />
            </div>
            <span>ROI Leak Calculator</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ROI Leak Calculator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

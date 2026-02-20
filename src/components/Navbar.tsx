import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

interface NavbarProps {
  onBookCallClick: () => void;
}

const allNavLinks = [
  { label: "Services", href: "/services", isPage: true, homeOnly: false },
  { label: "Calculateur", href: "#calculator", isPage: false, homeOnly: true },
  { label: "FAQ", href: "#faq", isPage: false, homeOnly: true },
];

const Navbar = ({ onBookCallClick }: NavbarProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navLinks = allNavLinks.filter((link) => !link.homeOnly || isHome);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const scrollToSection = useCallback((href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, []);

  const handleBookCall = useCallback(() => {
    setIsOpen(false);
    onBookCallClick();
  }, [onBookCallClick]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-xl shadow-sm" : "bg-background/80 backdrop-blur-xl"
      } border-b border-border/50`}
      style={{ zIndex: 50 }}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 text-foreground" style={{ touchAction: "manipulation" }}>
            <img src={logo} alt="XPLORE X AI Logo" className="h-8 w-8 object-contain" loading="eager" width={32} height={32} />
            <span className="font-heading text-xl tracking-tight">XPLORE X</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={link.isPage ? undefined : (e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
                style={{ touchAction: "manipulation" }}
              >
                {link.label}
              </a>
            ))}

            <a
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
              style={{ touchAction: "manipulation" }}
            >
              Contact
            </a>

            <button
              type="button"
              onClick={handleBookCall}
              className="btn-primary text-sm py-2.5 px-6 ml-4"
            >
              Demander un audit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden p-3 -mr-2 text-foreground active:scale-95 transition-transform"
            style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 bg-background/98 backdrop-blur-xl lg:hidden"
          style={{ zIndex: 40, pointerEvents: "auto" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="flex flex-col p-6 mobile-menu-enter overflow-y-auto max-h-[calc(100vh-4rem)]" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={link.isPage ? () => setIsOpen(false) : (e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="py-4 text-lg font-medium text-foreground text-left border-b border-border/50 block"
                style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              >
                {link.label}
              </a>
            ))}

            <a
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="py-4 text-lg font-medium text-foreground text-left border-b border-border/50 block"
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              Contact
            </a>

            <button
              type="button"
              onClick={handleBookCall}
              className="btn-primary text-base py-4 w-full mt-6"
            >
              Demander un audit
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

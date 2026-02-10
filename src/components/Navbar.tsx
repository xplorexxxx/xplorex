import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, ChevronDown, Brain, Workflow, Database, Server, Shield, Cloud, FileText, BookOpen, Lock } from "lucide-react";
import logo from "@/assets/logo.png";

interface NavbarProps {
  onBookCallClick: () => void;
}

const megaMenuData = {
  solutions: {
    label: "Solutions",
    columns: [
      {
        heading: "Intelligence commerciale",
        links: [
          { icon: Brain, label: "Prospection IA", desc: "Account-Based Excellence & ciblage stratégique" },
          { icon: Workflow, label: "Automatisation de Workflow", desc: "Orchestration des processus commerciaux" },
          { icon: Database, label: "Intelligence de Données", desc: "Enrichissement et scoring prédictif" },
        ],
      },
    ],
  },
  expertise: {
    label: "Expertise",
    columns: [
      {
        heading: "Infrastructure",
        links: [
          { icon: Server, label: "Infrastructure RAG", desc: "Retrieval-Augmented Generation propriétaire" },
          { icon: Shield, label: "Pipelines LLM sécurisés", desc: "Cloisonnement et anonymisation des données" },
          { icon: Cloud, label: "Souveraineté Cloud", desc: "Hébergement UE et conformité native" },
        ],
      },
    ],
  },
  resources: {
    label: "Ressources",
    columns: [
      {
        heading: "Documentation",
        links: [
          { icon: FileText, label: "Whitepapers", desc: "Recherche et publications techniques" },
          { icon: BookOpen, label: "Documentation API", desc: "Guides d'intégration et références" },
          { icon: Lock, label: "Trust Center", desc: "Sécurité, conformité et gouvernance" },
        ],
      },
    ],
  },
};

type MenuKey = keyof typeof megaMenuData;

const Navbar = ({ onBookCallClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<MenuKey | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

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

  const handleMegaEnter = useCallback((key: MenuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMega(key);
  }, []);

  const handleMegaLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 150);
  }, []);

  const scrollToSection = useCallback((href: string) => {
    setIsOpen(false);
    setActiveMega(null);
    const element = document.querySelector(href);
    if (element) {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, []);

  const handleBookCall = useCallback(() => {
    setIsOpen(false);
    setActiveMega(null);
    onBookCallClick();
  }, [onBookCallClick]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-xl shadow-sm" : "bg-background/80 backdrop-blur-xl"
      } border-b border-border/50`}
      style={{ zIndex: 50 }}
      ref={megaRef}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 text-foreground" style={{ touchAction: "manipulation" }}>
            <img src={logo} alt="XPLORE X AI Logo" className="h-8 w-8 object-contain" loading="eager" width={32} height={32} />
            <span className="font-poppins font-bold italic text-lg">XPLORE X</span>
          </a>

          {/* Desktop Nav - Mega Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {(Object.keys(megaMenuData) as MenuKey[]).map((key) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleMegaEnter(key)}
                onMouseLeave={handleMegaLeave}
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeMega === key ? "text-primary bg-secondary" : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ touchAction: "manipulation" }}
                >
                  {megaMenuData[key].label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMega === key ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => scrollToSection("#calculator")}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
              style={{ touchAction: "manipulation" }}
            >
              Diagnostic
            </button>

            <a
              href="/about"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
              style={{ touchAction: "manipulation" }}
            >
              À propos
            </a>

            <button
              type="button"
              onClick={handleBookCall}
              className="btn-primary text-sm py-2.5 px-5 ml-3"
            >
              Demander un audit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="lg:hidden p-3 -mr-2 text-foreground active:scale-95 transition-transform"
            style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      {activeMega && (
        <div
          className="mega-menu hidden lg:block"
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          onMouseLeave={handleMegaLeave}
        >
          <div className="container-wide py-6">
            <div className="grid grid-cols-3 gap-8">
              {megaMenuData[activeMega].columns.map((col) => (
                <div key={col.heading} className="mega-menu-column">
                  <h5>{col.heading}</h5>
                  <div className="space-y-1">
                    {col.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <button
                          key={link.label}
                          type="button"
                          className="mega-menu-link flex items-start gap-3 w-full text-left"
                          onClick={() => setActiveMega(null)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-medium">{link.label}</span>
                            <p>{link.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 bg-background/98 backdrop-blur-xl lg:hidden"
          style={{ zIndex: 40, pointerEvents: "auto" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="flex flex-col p-6 mobile-menu-enter overflow-y-auto max-h-[calc(100vh-4rem)]" onClick={(e) => e.stopPropagation()}>
            {(Object.keys(megaMenuData) as MenuKey[]).map((key) => (
              <div key={key} className="border-b border-border/50">
                <p className="py-3 text-xs font-semibold uppercase tracking-wider text-steel">
                  {megaMenuData[key].label}
                </p>
                {megaMenuData[key].columns.map((col) =>
                  col.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <button
                        type="button"
                        key={link.label}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 py-3 pl-2 w-full text-left text-foreground active:bg-secondary/50"
                        style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{link.label}</span>
                      </button>
                    );
                  })
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => scrollToSection("#calculator")}
              className="py-4 text-lg font-medium text-foreground text-left border-b border-border/50"
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              Diagnostic
            </button>

            <a
              href="/about"
              className="py-4 text-lg font-medium text-foreground text-left border-b border-border/50 block"
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              À propos
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

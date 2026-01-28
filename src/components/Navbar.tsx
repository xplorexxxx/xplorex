import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

interface NavbarProps {
  onBookCallClick: () => void;
}

const Navbar = ({ onBookCallClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "#calculator", label: "Calculateur" },
    { href: "#how-it-works", label: "Comment ça marche" },
    { href: "#faq", label: "FAQ" },
  ];

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleBookCall = () => {
    setIsOpen(false);
    onBookCallClick();
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-xl shadow-sm" : "bg-background/80 backdrop-blur-xl"
      } border-b border-border/50`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 text-foreground">
            <img 
              src={logo} 
              alt="XPLORE X AI Logo" 
              className="h-8 w-8 object-contain"
              loading="eager"
            />
            <span className="font-poppins font-bold italic text-lg">XPLORE X</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button onClick={handleBookCall} className="btn-primary text-sm py-2.5 px-5">
              Réserver un appel
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 -mr-2 text-foreground touch-manipulation active:scale-95 transition-transform"
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
          className="fixed inset-0 top-16 bg-background/98 backdrop-blur-xl md:hidden z-40"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="flex flex-col p-6 mobile-menu-enter"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="py-4 text-lg font-medium text-foreground hover:text-primary transition-colors text-left border-b border-border/50 touch-manipulation active:bg-secondary/50"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={handleBookCall} 
              className="btn-primary text-base py-4 w-full mt-6"
            >
              Réserver un appel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
